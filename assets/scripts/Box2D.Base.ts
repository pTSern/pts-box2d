import { _decorator, Component, PhysicsSystem2D } from 'cc';

const { ccclass } = _decorator;

@ccclass('Box2D_Base')
export class Box2D_Base extends Component {
    protected __preload(): void {
        if(!PhysicsSystem2D || !PhysicsSystem2D.PHYSICS_BOX2D || !PhysicsSystem2D.instance) {
            this.destroy();
            return;
        }

        this._onPreLoad?.();
    }

    protected _onPreLoad?(): void
}

