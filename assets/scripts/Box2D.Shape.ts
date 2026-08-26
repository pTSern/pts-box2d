import { _decorator, Component, Graphics, IVec2Like, Node, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, randomRange, v2, Vec2, Vec3 } from 'cc';
import { Box2D_IRaycastHit, Box2D_IShape } from './Box2D.Interfaces';

const { ccclass, property } = _decorator;

@ccclass('Box2D_Shape')
export abstract class Box2D_Shape extends Component implements Box2D_IShape {
    shape: b2.b2Shape
    body: b2.b2Body

    @property({  })
    gravity: Vec2 = v2(1, 1);

    @property({ min: 0 })
    numLinearDamping: number = 0;

    @property({ min: 0 })
    numAngularDamping: number = 0;

    @property()
    isFixedRotation: boolean = false;

    @property()
    density: number = 1.0;

    @property({ min: 0, max: 1, step: 0.01, slide: true })
    friction: number = 0.2;

    @property({ min: 0, max: 1, step: 0.01, slide: true })
    restitution: number = 0.5;

    protected abstract _getShape(): b2.b2Shape;

    create(wpos: IVec2Like, bounc: Node) {
        const _world = PhysicsSystem2D.instance.physicsWorld.impl as b2.b2World;
        const _bodyDef = new b2.b2BodyDef();
        _bodyDef.type = b2.b2BodyType.b2_dynamicBody;
        _bodyDef.position.Set(
            wpos.x / PHYSICS_2D_PTM_RATIO,
            wpos.y / PHYSICS_2D_PTM_RATIO
        );

        _bodyDef.gravityScale = randomRange(this.gravity.x, this.gravity.y);
        _bodyDef.linearDamping = this.numLinearDamping;
        _bodyDef.angularDamping = this.numAngularDamping;
        _bodyDef.fixedRotation = this.isFixedRotation;
        const _body = _world.CreateBody(_bodyDef);
        this.shape = this._getShape();

        const _fixtureDef = new b2.b2FixtureDef();
        _fixtureDef.shape = this.shape;
        _fixtureDef.density = this.density;
        _fixtureDef.friction = this.friction;
        _fixtureDef.restitution = this.restitution;

        const _fixture = _body.CreateFixture(_fixtureDef);

        _body.SetUserData(bounc);
        if (_fixture) {
            _fixture.SetUserData({ collider: null, node: bounc, impl: null });
        }

        this.body = _body;
        return _body;
    }

    revoke() {
    }

    abstract debug(graphic: Graphics, lpos: Vec3): void
    abstract raycast(p1: Vec2, p2: Vec2, center: Vec2): Box2D_IRaycastHit
}
