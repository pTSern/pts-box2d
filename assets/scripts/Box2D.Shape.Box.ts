
import { _decorator, size, PHYSICS_2D_PTM_RATIO, Size, GraphicsComponent, math, Vec2 } from 'cc';
import { Box2D_Shape } from './Box2D.Shape';
import { Box2D_IRaycastHit } from './Box2D.Interfaces';

const { ccclass, property } = _decorator;

@ccclass('Box2D_Shape_Box')
export class Box2D_Shape_Box extends Box2D_Shape {

    @property({ min: 0 })
    size: Size = size()

    protected _getShape() {
        const _box = new b2.b2PolygonShape();
        _box.SetAsBox(
            (this.size.width / 2) / PHYSICS_2D_PTM_RATIO,
            (this.size.height / 2) / PHYSICS_2D_PTM_RATIO
        );
        return _box
    }

    debug(g: GraphicsComponent, lpos: math.Vec3): void {
        const _angle = this.body.GetAngle();
        const cos = Math.cos(_angle);
        const sin = Math.sin(_angle);
        const hx = this.size.x / 2;
        const hy = this.size.y / 2;

        const corners = [
            { x: -hx, y: -hy },
            { x: hx, y: -hy },
            { x: hx, y: hy },
            { x: -hx, y: hy }
        ];

        corners.forEach((c, idx) => {
            const rx = lpos.x + c.x * cos - c.y * sin;
            const ry = lpos.y + c.x * sin + c.y * cos;
            if (idx === 0) {
                g.moveTo(rx, ry);
            } else {
                g.lineTo(rx, ry);
            }
        });
        g.close();
        g.stroke();
    }

    raycast(p1: Vec2, p2: Vec2, center: Vec2): Box2D_IRaycastHit | null {
        const angle = this.body.GetAngle();
        const cos = Math.cos(-angle);
        const sin = Math.sin(-angle);

        const dx1 = p1.x - center.x;
        const dy1 = p1.y - center.y;
        const lx1 = dx1 * cos - dy1 * sin;
        const ly1 = dx1 * sin + dy1 * cos;

        const dx2 = p2.x - center.x;
        const dy2 = p2.y - center.y;
        const lx2 = dx2 * cos - dy2 * sin;
        const ly2 = dx2 * sin + dy2 * cos;

        const halfW = this.size.x / 2;
        const halfH = this.size.y / 2;

        const ldx = lx2 - lx1;
        const ldy = ly2 - ly1;

        let tmin = 0;
        let tmax = 1;

        let normLx = 0;
        let normLy = 0;

        if (Math.abs(ldx) < 1e-8) {
            if (lx1 < -halfW || lx1 > halfW) return null;
        } else {
            const ood = 1 / ldx;
            let t1 = (-halfW - lx1) * ood;
            let t2 = (halfW - lx1) * ood;
            let nx = -1;
            if (t1 > t2) {
                const tmp = t1; t1 = t2; t2 = tmp;
                nx = 1;
            }
            if (t1 > tmin) {
                tmin = t1;
                normLx = nx;
                normLy = 0;
            }
            if (t2 < tmax) tmax = t2;
            if (tmin > tmax) return null;
        }

        if (Math.abs(ldy) < 1e-8) {
            if (ly1 < -halfH || ly1 > halfH) return null;
        } else {
            const ood = 1 / ldy;
            let t1 = (-halfH - ly1) * ood;
            let t2 = (halfH - ly1) * ood;
            let ny = -1;
            if (t1 > t2) {
                const tmp = t1; t1 = t2; t2 = tmp;
                ny = 1;
            }
            if (t1 > tmin) {
                tmin = t1;
                normLx = 0;
                normLy = ny;
            }
            if (t2 < tmax) tmax = t2;
            if (tmin > tmax) return null;
        }

        if (tmin < 0 || tmin > 1) return null;

        const hitX = p1.x + (p2.x - p1.x) * tmin;
        const hitY = p1.y + (p2.y - p1.y) * tmin;

        const cosW = Math.cos(angle);
        const sinW = Math.sin(angle);
        const normWx = normLx * cosW - normLy * sinW;
        const normWy = normLx * sinW + normLy * cosW;

        return {
            fixture: this.body.GetFixtureList(),
            point: new Vec2(hitX, hitY),
            normal: new Vec2(normWx, normWy),
            fraction: tmin,
            item: this
        };
    }
}
