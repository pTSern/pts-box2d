import { editor_ccclass, editor_property, instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Option } from "./Box2D.Option";
import { Node, PhysicsSystem2D, randomRange, UITransform, v3 } from "cc";
import { pEngine, pMath } from "db://pts-core/scripts/utils";
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

        if (this.option.preDelay > 0) {
            this.papa.scheduleOnce(this._delayFunc, this.option.preDelay);
        } else {
            this.execute(onFinishedCallback);
        }
    }

    stop(): void {
        if (this._spawnFunc) {
            this.papa.unschedule(this._spawnFunc);
        }
        if (this._delayFunc) {
            this.papa.unschedule(this._delayFunc);
        }
        this.isSpawning = false;
    }

    spawn(onFinishedCallback: () => void): void {
        if (this.option.max > 0 && this.counter >= this.option.max) {
            this.stop();
            this.isFinished = true;
            onFinishedCallback();
            return;
        }

        const _world = PhysicsSystem2D.instance.physicsWorld.impl as b2.b2World;
        if (!_world) return;

        const opt = this.option;
        const countToSpawn = opt.max > 0 ? Math.min(opt.amount, opt.max - this.counter) : opt.amount;
        const transform = opt.box || pEngine.CompUtils.get(this.papa, UITransform);

        const _width = transform.width;
        const _height = transform.height;
        const _anchor = transform.anchorPoint;

        for (let i = 0; i < countToSpawn; i++) {
            const _localX = randomRange(-_anchor.x * _width, (1 - _anchor.x) * _width);
            const _localY = randomRange(-_anchor.y * _height, (1 - _anchor.y) * _height);

            const _worldPos = transform.convertToWorldSpaceAR(v3(_localX, _localY, 0));

            const fab = pMath.rand(opt.prefabs);
            pEngine.NodeUtils.create({
                name: `solid_${i}`,
                fab,
                parent: this.pool,
                pos: { position: _worldPos, isWorldPos: true },
                isDisconnectPrefabLink: true
            }, [
                {
                    type: Box2D_Shape,
                    modifier: (_comp, _node) => {
                        _comp.create(_worldPos, _node);
                        this.papa.addBody(_comp);
                        this.counter++;
                    }
                }
            ]);
        }
    }

    protected execute(onFinishedCallback: () => void): void {
        this.isSpawning = true;
        this.spawn(onFinishedCallback);

        this._spawnFunc = this.spawn.bind(this, onFinishedCallback);
        this.papa.schedule(this._spawnFunc, this.option.interval);
    }
}
