import { _decorator, CCInteger, Prefab, UITransform } from "cc";
import { pTSAsset } from "db://pts-core/scripts/pTSAsset";

const { ccclass, property } = _decorator

@ccclass("Box2D_Option_Fabs")
export class Box2D_Option_Fabs extends pTSAsset {
    @property({ type: [Prefab] })
    prefabs: Prefab[] = [];
}

@ccclass("Box2D_Option_Timer")
export class Box2D_Option_Timer extends pTSAsset {
    @property({ min: 0.01 })
    interval: number = 0.5;

    @property({ min: 0 })
    preDelay: number = 0;
}

@ccclass("Box2D_Option_Data")
export class Box2D_Option_Data extends pTSAsset {
    @property({ min: 1, type: CCInteger })
    amount: number = 5;
    @property({ min: 0, type: CCInteger })
    max: number = 100;
}

@ccclass("Box2D_Option")
export class Box2D_Option {
    @property({ type: Box2D_Option_Data })
    data: Box2D_Option_Data = null;
    @property({ type: Box2D_Option_Fabs })
    fabs: Box2D_Option_Fabs = null;
    @property({ type: Box2D_Option_Timer })
    timer: Box2D_Option_Timer = null;

    @property({ type: UITransform })
    box: UITransform = null;
}

