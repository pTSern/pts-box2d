import { js, PHYSICS_2D_PTM_RATIO, Vec2 } from "cc";
import { Box2D_IRaycastHit } from "./Box2D.Interfaces";
import { instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Manager } from "./Box2D.Manager";
import { Box2D_Shape } from "./Box2D.Shape";

interface _IRaycast {
    raycast(p1: Vec2, p2: Vec2): Box2D_IRaycastHit | null
    raycasts(p1: Vec2, p2: Vec2): Box2D_IRaycastHit[]
}

const _: _IRaycast = js.createMap(true);
_.raycasts = function(p1, p2) {
    const _mng = instance(Box2D_Manager);
    if(!_mng) return null

    const _bodies = _mng.bodies;
    const hits: Box2D_IRaycastHit[] = [];
    for (let i = 0; i < _bodies.length; i++) {
        const hit = _raycastItem(this._bodies[i], p1, p2);
        if (hit) {
            hits.push(hit);
        }
    }
    return hits.sort((a, b) => a.fraction - b.fraction);
}

_.raycast = function(p1, p2) {
    const hits = _.raycasts(p1, p2);
    return hits.length > 0 ? hits[0] : null;
}

function _raycastItem(item: Box2D_Shape, p1: Vec2, p2: Vec2): Box2D_IRaycastHit | null {
    if (!item.node || !item.node.isValid || !item.body) return null;

    const body = item.body;
    const fixture = body.GetFixtureList();
    if (!fixture) return null;

    const p1Meters = { x: p1.x / PHYSICS_2D_PTM_RATIO, y: p1.y / PHYSICS_2D_PTM_RATIO };
    const p2Meters = { x: p2.x / PHYSICS_2D_PTM_RATIO, y: p2.y / PHYSICS_2D_PTM_RATIO };

    try {
        if (typeof (b2 as any).b2RayCastInput !== 'undefined' && typeof (b2 as any).b2RayCastOutput !== 'undefined') {
            const input = new (b2 as any).b2RayCastInput();
            input.p1.Set(p1Meters.x, p1Meters.y);
            input.p2.Set(p2Meters.x, p2Meters.y);
            input.maxFraction = 1.0;

            const output = new (b2 as any).b2RayCastOutput();
            if ((fixture as any).RayCast && (fixture as any).RayCast(output, input, 0)) {
                const frac = output.fraction;
                const hitX = p1.x + (p2.x - p1.x) * frac;
                const hitY = p1.y + (p2.y - p1.y) * frac;

                return {
                    fixture,
                    point: new Vec2(hitX, hitY),
                    normal: new Vec2(output.normal.x, output.normal.y),
                    fraction: frac,
                    item
                };
            }
        }
    } catch (e) {
    }

    const _bodyPos = body.GetPosition();
    const _wcenter = new Vec2(_bodyPos.x * PHYSICS_2D_PTM_RATIO, _bodyPos.y * PHYSICS_2D_PTM_RATIO);
    return item.raycast(p1, p2, _wcenter);

}

export const Box2D_Raycast = _;
