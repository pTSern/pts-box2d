import { _decorator, GraphicsComponent, math, PHYSICS_2D_PTM_RATIO, v2, Vec3 } from 'cc';
import { Box2D_Shape } from './Box2D.Shape';
import { Box2D_IRaycastHit } from './Box2D.Interfaces';

const { ccclass, property } = _decorator;

@ccclass('Box2D_Shape_Circle')
export class Box2D_Shape_Circle extends Box2D_Shape {

    @property({ min: 0 })
    radius: number = 10;

    protected _getShape() {
        const _circle = new b2.b2CircleShape();
        _circle.m_radius = this.radius / PHYSICS_2D_PTM_RATIO;
        return _circle;
    }

    debug(g: GraphicsComponent, lpos: Vec3): void {
        const _angle = this.body.GetAngle();
        g.circle(lpos.x, lpos.y, this.radius);
        g.stroke();

        const rx = lpos.x + this.radius * Math.cos(_angle);
        const ry = lpos.y + this.radius * Math.sin(_angle);

        g.moveTo(lpos.x, lpos.y);
        g.lineTo(rx, ry);
        g.stroke();
    }

    raycast(p1: math.Vec2, p2: math.Vec2, center: math.Vec2): Box2D_IRaycastHit {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const fx = p1.x - center.x;
        const fy = p1.y - center.y;

        const a = dx * dx + dy * dy;
        if (a === 0) return null;

        const b = 2 * (fx * dx + fy * dy);
        const c = fx * fx + fy * fy - this.radius * this.radius;

        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) return null;

        const sqrtDisc = Math.sqrt(discriminant);
        let t = (-b - sqrtDisc) / (2 * a);

        if (t < 0 || t > 1) {
            t = (-b + sqrtDisc) / (2 * a);
        }

        if (t < 0 || t > 1) return null;

        const hitX = p1.x + dx * t;
        const hitY = p1.y + dy * t;
        const normX = (hitX - center.x) / (this.radius || 1);
        const normY = (hitY - center.y) / (this.radius || 1);

        return {
            fixture: this.body.GetFixtureList(),
            point: v2(hitX, hitY),
            normal: v2(normX, normY),
            fraction: t,
            item: this,
        };
    }
}
