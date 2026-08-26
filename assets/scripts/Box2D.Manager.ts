
import { _decorator, Graphics, JsonAsset, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, UITransform, v3 } from 'cc';
import { Box2D_Base } from './Box2D.Base';
import { editor_property, singleton } from 'db://pts-core/scripts/utils/pClass';
import { pConst, pEngine } from 'db://pts-core/scripts/utils';
import { Box2D_Shape } from './Box2D.Shape';
import { Helper_IdSelector } from 'db://pts-core/scripts/helper/Helper.IdSelector';
import { Pooler_Node } from 'db://pts-core/scripts/pooler/Pooler.Node';

const { ccclass, property, executionOrder } = _decorator;

const _$methods = ['_BeginContact', '_EndContact', '_PreSolve', '_PostSolve'];

@ccclass('Box2D_Manager')
@singleton()
@executionOrder(0)
export class Box2D_Manager extends Box2D_Base {
    @property({ type: Helper_IdSelector, group: pConst.GROUPS.CORE })
    pool: Helper_IdSelector = new Helper_IdSelector();

    @property({ type: JsonAsset, group: pConst.GROUPS.get('Listener') })
    actRecycle: JsonAsset[] = [];

    @property({ tooltip: "Enable debug drawing of shape bounds (Circle: RED, Box: GREEN)", group: pConst.GROUPS.EDITOR })
    debugDraw: boolean = false;

    @property({ type: Graphics, tooltip: "Graphics component to use for debug drawing. If empty, it will be automatically added/retrieved.", group: pConst.GROUPS.EDITOR })
    graphics: Graphics = null;

    @editor_property(Box2D_Shape)
    protected _bodies: Box2D_Shape[] = [];
    protected _world: b2.b2World = null;

    @editor_property(Pooler_Node)
    protected _pooler: Pooler_Node = null;

    get pooler() { return this._pooler; }

    public get bodies() {
        return this._bodies;
    }

    public addBody(shape: Box2D_Shape): void {
        if(!shape || !shape.body || !shape.node) return;

        this._bodies.push(shape);
    }

    protected onLoad(): void {
        this._pooler = Pooler_Node.pool(this.pool);

        this._world = PhysicsSystem2D.instance.physicsWorld.impl as b2.b2World;
        this._fixed(this._world);

        pEngine.Json.event.add(this.actRecycle, { func: this._onRecyle, binder: this })
    }

    protected _onRecyle() {
        this._bodies.forEach(_ => {
            _.revoke();
            this._pooler.put(_.node);
        })
        this._bodies = [];
    }

    protected lateUpdate(): void {
        const _transform = pEngine.CompUtils.get(this, UITransform);

        for (let i = this._bodies.length - 1; i >= 0; i--) {
            const item = this._bodies[i];
            const _node = item.node;
            const _body = item.body;

            if (!_node || !_node.isValid) {
                this._world.DestroyBody(_body);
                this._bodies.splice(i, 1);
                continue;
            }

            const _pos = _body.GetPosition();
            const _angle = _body.GetAngle();

            _node.position = _transform.convertToNodeSpaceAR(v3(_pos.x * PHYSICS_2D_PTM_RATIO, _pos.y * PHYSICS_2D_PTM_RATIO));
            _node.angle = _angle * (180 / Math.PI);
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
