import { editor_ccclass, editor_property, instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Option } from "./Box2D.Option";
import { Node, PhysicsSystem2D, randomRange, UITransform, v3 } from "cc";
import { pEngine } from "db://pts-core/scripts/utils";
import { Box2D_Manager } from "./Box2D.Manager";
import { Box2D_Shape } from "./Box2D.Shape";

@editor_ccclass("Box2d_Runtime")
export class Box2D_Runtime {
    @editor_property(Box2D_Option)
    option: Box2D_Option = null;

    @editor_property()
    counter: number = 0;
    @editor_property()
    isSpawning: boolean = false;
    @editor_property()
    isFinished: boolean = false;

    @editor_property()
    pool: Node = null

    @editor_property(Box2D_Shape)
    protected _warms: Box2D_Shape[] = [];

    protected _spawnFunc: () => void = null;
    protected _delayFunc: () => void = null;

    get papa() {
        return instance(Box2D_Manager)
    }

    constructor(option: Box2D_Option, pool: Node) {
        this.option = option;
        this.pool = pool;
    }

    start(onFinishedCallback: () => void): void {
        this._delayFunc = () => {
            this.execute(onFinishedCallback);
        };

        if (this.option.timer.preDelay > 0) {
            this.papa.scheduleOnce(this._delayFunc, this.option.timer.preDelay);
        } else {
            this.execute(onFinishedCallback);
        }
    }

    stop(): void {
        if (this._spawnFunc) {
            this.papa?.unschedule(this._spawnFunc);
        }
        if (this._delayFunc) {
            this.papa?.unschedule(this._delayFunc);
        }
        this.isSpawning = false;
    }

    clear(): void {
        this.stop();
        while (this._warms.length > 0) {
            const shape = this._warms.shift();
            if (shape && shape.node && shape.node.isValid) {
                shape.revoke();
                if (this.papa?.pooler) {
                    this.papa.pooler.put(shape.node);
                } else {
                    shape.node.destroy();
                }
            }
        }
    }

    warmup() {
        const opt = this.option;
        console.log(`Box2D_Runtime warmup: `, opt);
        for(let i = 0; i < opt.data.max; i++) {
            pEngine.NodeUtils.create({
                name: `solid_${i}`,
                fab: opt.fabs.prefabs,
                pool: this.papa.pooler
            }, [
                {
                    type: Box2D_Shape,
                    modifier: _ => {
                        this._warms.push(_);
                    }
                }
            ])
        }
    }

    spawn(onFinishedCallback: () => void): void {
        if (this.option.data.max > 0 && this.counter >= this.option.data.max) {
            this.stop();
            this.isFinished = true;
            onFinishedCallback?.();
            return;
        }

        const _world = PhysicsSystem2D.instance.physicsWorld.impl as b2.b2World;
        if (!_world) return;

        const opt = this.option;
        const countToSpawn = opt.data.max > 0 ? Math.min(opt.data.amount, opt.data.max - this.counter) : opt.data.amount;
        const transform = opt.box || pEngine.CompUtils.get(this.papa, UITransform);

        const _width = transform.width;
        const _height = transform.height;
        const _anchor = transform.anchorPoint;

        const _warms: Box2D_Shape[] = [];
        for (let i = 0; i < countToSpawn; i++) {
            let comp: Box2D_Shape = null;

            while (this._warms.length > 0) {
                const candidate = this._warms.shift();
                if (candidate && candidate.isValid && candidate.node && candidate.node.isValid) {
                    comp = candidate;
                    break;
                }
            }

            if (!comp) {
                const res = pEngine.NodeUtils.create({
                    name: `solid_${this.counter + i}`,
                    fab: opt.fabs?.prefabs,
                    pool: this.papa?.pooler
                }, [
                    {
                        type: Box2D_Shape,
                        modifier: _ => { comp = _; }
                    }
                ]);
                if (!comp && res.node && res.node.isValid) {
                    comp = res.node.getComponent(Box2D_Shape);
                }
            }

            if (comp && comp.node && comp.node.isValid) {
                _warms.push(comp);
            }
        }

        _warms.forEach(_comp => {
            const _localX = randomRange(-_anchor.x * _width, (1 - _anchor.x) * _width);
            const _localY = randomRange(-_anchor.y * _height, (1 - _anchor.y) * _height);

            const _worldPos = transform.convertToWorldSpaceAR(v3(_localX, _localY, 0));
            if (this.pool && this.pool.isValid) {
                _comp.node.setParent(this.pool);
            }
            _comp.node.setWorldPosition(_worldPos);
            _comp.create(_worldPos, _comp.node);
            this.papa?.addBody(_comp);
            this.counter++;

        });
        onFinishedCallback?.();

        //for (let i = 0; i < countToSpawn; i++) {
        //    const _localX = randomRange(-_anchor.x * _width, (1 - _anchor.x) * _width);
        //    const _localY = randomRange(-_anchor.y * _height, (1 - _anchor.y) * _height);

        //    const _worldPos = transform.convertToWorldSpaceAR(v3(_localX, _localY, 0));

        //    const fab = pMath.rand(opt.prefabs);
        //    pEngine.NodeUtils.create({
        //        name: `solid_${i}`,
        //        fab,
        //        parent: this.pool,
        //        pos: { position: _worldPos, isWorldPos: true },
        //        isDisconnectPrefabLink: true,
        //        pool: this.papa.pooler
        //    }, [
        //        {
        //            type: Box2D_Shape,
        //            modifier: (_comp, _node) => {
        //                _comp.create(_worldPos, _node);
        //                this.papa.addBody(_comp);
        //                this.counter++;
        //            }
        //        }
        //    ]);
        //}
    }

    protected execute(onFinishedCallback: () => void): void {
        this.isSpawning = true;
        this.spawn(onFinishedCallback);

        this._spawnFunc = this.spawn.bind(this, onFinishedCallback);
        this.papa.schedule(this._spawnFunc, this.option.timer.interval);
    }
}
