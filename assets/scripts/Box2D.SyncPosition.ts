import { _decorator, ERigidBody2DType, game, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, RigidBody2D, v2 } from 'cc';
import { Smart_StartUp } from 'db://pts-core/scripts/Components/Smart/Smart.StartUp';

const { ccclass } = _decorator;

@ccclass('Box2D_SyncPosition')
export class Box2D_SyncPosition extends Smart_StartUp {

    protected __preload(): void {
        super.__preload();
        if(!PhysicsSystem2D || !PhysicsSystem2D.PHYSICS_BOX2D || !PhysicsSystem2D.instance) {
            this.destroy();
            return;
        }

        this._onPreLoad?.();
    }

    protected _onExecute(): Promise<void> | void {
        const _rigids = this.getComponentsInChildren(RigidBody2D);
        _rigids.forEach(_rigid => {
            const _impl: b2.b2Body = _rigid.impl.impl;
            const _wpos = _rigid.node.getWorldPosition();
            const _temp = _rigid.type === ERigidBody2DType.Animated ? _impl.GetLinearVelocity().Clone() : _impl.GetPosition().Clone();

            _temp.x = _wpos.x / PHYSICS_2D_PTM_RATIO;
            _temp.y = _wpos.y / PHYSICS_2D_PTM_RATIO;

            if(_rigid.type === ERigidBody2DType.Animated) {
                const _pos = _impl.GetPosition();
                const _rate = Number(game.frameRate);
                _temp.x = (_temp.x - _pos.x) * _rate;
                _temp.y = (_temp.y - _pos.y) * _rate;

                _impl.SetAwake(true);
                _impl.SetLinearVelocity(_temp);
            } else {
                _impl.SetTransformVec(_temp, _impl.GetAngle());
            }
        })

        console.log('Box2D_SyncPosition: Synced positions for', _rigids, 'rigid bodies.');
    }

    protected _onPause(): void {
    }

    protected _onResume(): void {
    }

    protected _onStop(): void {
    }
}
