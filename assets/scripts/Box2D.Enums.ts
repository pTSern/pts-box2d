import { pLazy } from "db://pts-core/scripts/utils";

export enum Box2D_ESpawnOpt {
    Parallel,
    Sequence
}

export enum Box2D_EShape {
    Circle,
    Box
}

export const Box2D_EContactEvent = {
    EXIT: 'b2e_exit',
    STAY: 'b2e_stay',
    ENTER: 'b2e_enter'
}

export type Box2D_EContactEvent = 'b2e_exit' | 'b2e_stay' | 'b2e_enter';

pLazy.enums(Box2D_ESpawnOpt, Box2D_EShape, Box2D_EContactEvent);
