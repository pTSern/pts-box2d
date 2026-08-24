import { Vec2, Node } from "cc";

export interface Box2D_IShape {
    body: b2.b2Body;
    node: Node;
}

export interface Box2D_IBody_Circle extends Box2D_IShape {
    radius: number;
}

export interface Box2D_IBody_Box extends Box2D_IShape {
    size: Vec2
}

export interface Box2D_IRaycastHit {
    fixture: b2.b2Fixture;
    point: Vec2;
    normal: Vec2;
    fraction: number;
    item: Box2D_IShape
}
