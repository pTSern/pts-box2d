
import { _decorator, Node, UITransform, Vec2, PHYSICS_2D_PTM_RATIO } from "cc";
import { Event_Flexer } from "db://pts-core/scripts/Components/Event/Event.Flexer";
import { pConst } from "db://pts-core/scripts/utils";
import { Box2D_EShape } from "./Box2D.Enums";
import { instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Manager } from "./Box2D.Manager";
import { Box2D_Base } from "./Box2D.Base";

const { ccclass, property, executionOrder } = _decorator;

@ccclass("Box2D_ContactListener")
@executionOrder(100)
export class Box2D_ContactListener extends Box2D_Base {
    @property({ group: pConst.GROUPS.OPTION, type: [Node], tooltip: "Trigger zone nodes. We check if solid bodies overlap their world bounds." })
    targets: Node[] = [];

    @property({ group: pConst.GROUPS.OPTION, tooltip: "If true, we check if the entire shape overlaps (AABB bounding box approximation). If false, we only check if the center point is inside the target." })
    useShapeOverlap: boolean = true;

    @property({ group: pConst.GROUPS.OPTION })
    isDestroyOnExit: boolean = false;

    @property({ type: Event_Flexer, group: pConst.GROUPS.EVENT })
    onEnter: Event_Flexer = new Event_Flexer();

    @property({ type: Event_Flexer, group: pConst.GROUPS.EVENT })
    onStay: Event_Flexer = new Event_Flexer();

    @property({ type: Event_Flexer, group: pConst.GROUPS.EVENT })
    onExit: Event_Flexer = new Event_Flexer();

    protected _pcontacts: Map<Node, Set<Node>> = new Map();

    protected onDisable(): void {
        this._pcontacts.forEach((prevNodes, target) => {
            prevNodes.forEach(node => {
                if (node && node.isValid) {
                    this.onExit.emit(target, node);

                    this.isDestroyOnExit && node.destroy();
                }
            });
        });
        this._pcontacts.clear();
    }

    protected lateUpdate() {
        const _bodies = instance(Box2D_Manager).bodies;
        const _count = _bodies.length;
        if (_count === 0) return;

        this.targets.forEach(target => {
            if (!target || !target.isValid) return;

            const _trans = target.getComponent(UITransform);
            if (!_trans) return;

            const _bound = _trans.getBoundingBoxToWorld();
            const _nodes = new Set<Node>();

            for (let i = 0; i < _count; i++) {
                const _item = _bodies[i];
                const _node = _item.node;
                const _body = _item.body;

                if (!_node || !_node.isValid) continue;

                const pos = _body.GetPosition();
                const px = pos.x * PHYSICS_2D_PTM_RATIO;
                const py = pos.y * PHYSICS_2D_PTM_RATIO;

                let isOverlapping = false;

                if (this.useShapeOverlap) {
                    let radius = 0;
                    if (_item.shapeType === Box2D_EShape.Circle) {
                        radius = _item.radius;
                    } else {
                        radius = Math.sqrt(_item.size.x * _item.size.x + _item.size.y * _item.size.y) / 2;
                    }

                    const minX = px - radius;
                    const maxX = px + radius;
                    const minY = py - radius;
                    const maxY = py + radius;

                    isOverlapping = !(maxX < _bound.xMin || minX > _bound.xMax || maxY < _bound.yMin || minY > _bound.yMax);
                } else {
                    isOverlapping = _bound.contains(new Vec2(px, py));
                }

                if (isOverlapping) {
                    _nodes.add(_node);
                }
            }

            let prevNodes = this._pcontacts.get(target);
            if (!prevNodes) {
                prevNodes = new Set<Node>();
                this._pcontacts.set(target, prevNodes);
            }

            _nodes.forEach(node => {
                if (!prevNodes.has(node)) {
                    this.onEnter.emit(target, node)
                } else {
                    this.onStay.emit(target, node);
                }
            });

            prevNodes.forEach(node => {
                if (!_nodes.has(node)) {
                    this.onExit.emit(target, node);
                    this.isDestroyOnExit && node.destroy();
                }
            });

            this._pcontacts.set(target, _nodes);
        });
    }
}
