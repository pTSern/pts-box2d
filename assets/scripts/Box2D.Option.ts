import { _decorator, CCInteger, Prefab, UITransform, Vec2 } from "cc";
import { Box2D_EShape } from "./Box2D.Enums";

const { ccclass, property } = _decorator

@ccclass("Box2D_Option")
export class Box2D_Option {
    @property({ type: Box2D_EShape })
    shapeType: Box2D_EShape = Box2D_EShape.Circle;

    @property({ type: [Prefab] })
    prefabs: Prefab[] = [];

    @property({ min: 1, type: CCInteger })
    amount: number = 5;

    @property({ min: 0.01 })
    interval: number = 0.5;

    @property({ min: 0, type: CCInteger })
    max: number = 100;

    @property({ type: UITransform })
    box: UITransform = null;

    @property({ min: 0 })
    preDelay: number = 0;
}
