
import { _decorator, Component, Graphics, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Prefab, UITransform, v3, Node } from 'cc';
import { Box2D_Base } from './Box2D.Base';
import { editor_property, singleton } from 'db://pts-core/scripts/utils/pClass';
import { pConst, pEngine, pGlobal } from 'db://pts-core/scripts/utils';
import { Box2D_Shape } from './Box2D.Shape';
import { Event_Listener } from 'db://pts-core/scripts/Components/Event/Event.Listener';
import { Pooler_Node_Asset } from 'db://pts-core/scripts/pooler/Pooler.Node.Asset';

const { ccclass, property, executionOrder } = _decorator;

const _$methods = ['_BeginContact', '_EndContact', '_PreSolve', '_PostSolve'];

const _$tempWorldPos = v3();
const _$tempNodePos = v3();
const _$RAD2DEG = 180 / Math.PI;

@ccclass('Box2D_Manager')
@singleton()
@executionOrder(0)
export class Box2D_Manager extends Box2D_Base {
    @property({ type: Pooler_Node_Asset, group: pConst.GROUPS.CORE, visible: true })
    protected _pooler: Pooler_Node_Asset[] = [];

    @property({ visible: true, group: pConst.GROUPS.EDITOR, tooltip: "Enable mapping of prefabs to poolers for efficient object pooling." })
    protected _enableMapDict: boolean = true;

    @property({ tooltip: "Enable debug drawing of shape bounds (Circle: RED, Box: GREEN)", group: pConst.GROUPS.EDITOR })
    debugDraw: boolean = false;

    @property({ type: Event_Listener, group: pConst.GROUPS.LISTENER })
    recycler: Event_Listener = new Event_Listener();

    @property({ type: Graphics, tooltip: "Graphics component to use for debug drawing. If empty, it will be automatically added/retrieved.", group: pConst.GROUPS.EDITOR })
    graphics: Graphics = null;

    @editor_property(Component)
    protected _bodies: Box2D_Shape[] = [];

    protected _world: b2.b2World = null;

    protected _map: Record<string, Pooler_Node_Asset> = {};
    getPooler(fab: Prefab | Node | string) {
        let _fab: string = null;
        if(typeof fab === 'string') {
            _fab = fab;
        } else if(fab instanceof Prefab) {
            _fab = fab.uuid;
        } else if(fab instanceof Node) {
            _fab = fab['_prefab']?.asset?.uuid;
        }

        return this._getPoolerByUUID(_fab);
    }

    put(fab: Node) {
        if(!fab || !fab.isValid) return;

        const _pooler = this.getPooler(fab);
        if(!_pooler) {
            fab.destroy();
            return;
        }
        _pooler.put(fab)
    }

    public get bodies() {
        return this._bodies;
    }

    public addBody(shape: Box2D_Shape): void {
        if (!shape || !shape.body || !shape.node) return;
        if (this._bodies.indexOf(shape) !== -1) return;

        this._bodies.push(shape);
    }

    public removeBody(shape: Box2D_Shape): void {
        if (!shape) return;
        const idx = this._bodies.indexOf(shape);
        if (idx !== -1) {
            this._bodies.splice(idx, 1);
        }
    }

    protected _getPoolerByUUID(uuid: string): Pooler_Node_Asset {
        return this._map[uuid] || null;
    }

    ready() {
        return Promise.all(this._pooler.map(_ret => _ret.ready));
    }

    protected onLoad(): void {
        if(this._enableMapDict) {
            this.ready().then( () => {
                for(const _ret of this._pooler) {
                    this._map[_ret.template_uuid] = _ret
                }
            })
        } else {
            this._getPoolerByUUID = _uuid => this._pooler.find(_ => _.template_uuid == _uuid )
        }

        this._world = PhysicsSystem2D.instance.physicsWorld.impl as b2.b2World;
        this._fixed(this._world);

        Event_Listener.add(this.recycler, { func: this._onRecyle, binder: this });
    }

    protected _onRecyle() {
        const bodies = this._bodies.slice();
        this._bodies = [];
        bodies.forEach(_ => {
            if (_) {
                const node = _.node;
                _.revoke();
                this.put(node);
            }
        });
    }

    protected lateUpdate(): void {
        const _transform = pEngine.CompUtils.get(this, UITransform);

        for (let i = this._bodies.length - 1; i >= 0; i--) {
            const item = this._bodies[i];
            const _node = item.node;
            const _body = item.body;

            if (!_node || !_node.isValid || !_body) {
                if (_body) {
                    try {
                        if (this._world.IsLocked()) {
                            const b = _body;
                            setTimeout(() => { try { this._world.DestroyBody(b); } catch (e) {} }, 0);
                        } else {
                            this._world.DestroyBody(_body);
                        }
                    } catch (e) {}
                }
                this._bodies.splice(i, 1);
                continue;
            }

            const _pos = _body.GetPosition();
            const _angle = _body.GetAngle();

            _$tempWorldPos.set(_pos.x * PHYSICS_2D_PTM_RATIO, _pos.y * PHYSICS_2D_PTM_RATIO, 0);
            if (_transform) {
                _transform.convertToNodeSpaceAR(_$tempWorldPos, _$tempNodePos);
                _node.setPosition(_$tempNodePos);
            } else {
                _node.setPosition(_$tempWorldPos);
            }
            _node.angle = _angle * _$RAD2DEG;
        }

        if (!this.debugDraw) {
            if (this.graphics) {
                this.graphics.clear();
            }
        } else {
            if (!this.graphics) {
                this.graphics = this.getComponent(Graphics) || this.addComponent(Graphics);
            }
            const g = this.graphics;
            g.clear();

            this._bodies.forEach(item => {
                const _node = item.node;
                if (!_node || !_node.isValid) return;

                const localPos = _node.position;
                item.debug(g, localPos);
            });
        }
    }

    protected onDestroy(): void {
        this.purge();
    }

    purge() {
        const _world = PhysicsSystem2D.instance?.physicsWorld?.impl as b2.b2World;
        if (_world) {
            this._bodies.forEach(item => {
                try {
                    _world.DestroyBody(item.body);
                } catch (e) {
                    // Suppress if already destroyed
                }
            });
        }
        this._bodies = [];
    }

    protected _fixed(_world?: b2.b2World) {
        if (!_world) return;

        const _stack = _world.m_contactManager?.m_broadPhase?.m_tree?.m_stack;
        if (_stack && !_stack['_$safe']) {
            _stack['_$safe'] = true;
            const _pop = _stack.Pop;
            _stack.Pop = function () {
                try {
                    return _pop.bind(_stack)();
                } catch (e) {
                    return null;
                }
            };
        }

        const _contact = _world.m_contactManager?.m_contactListener;
        if (_contact && !(_contact as any)._safePatched) {
            (_contact as any)._safePatched = true;

            _$methods.forEach(_method => {
                const _origin = (_contact as any)[_method];
                if (typeof _origin === 'function') {
                    (_contact as any)[_method] = function (contact: any, impulse: any) {
                        try {
                            _origin.call(this, contact, impulse);
                        } catch (e) {
                            // Suppress null component crashes when custom Box2D bodies without Cocos Colliders collide
                        }
                    };
                }
            });
        }
    }
}
