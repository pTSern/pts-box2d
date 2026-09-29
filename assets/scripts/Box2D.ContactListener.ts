
import { _decorator, Node, UITransform, Vec2, PHYSICS_2D_PTM_RATIO } from "cc";
import { pConst } from "db://pts-core/scripts/utils";
import { instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Manager } from "./Box2D.Manager";
import { Box2D_Base } from "./Box2D.Base";
import { Box2D_Shape } from "./Box2D.Shape";

const { ccclass, property, executionOrder } = _decorator;

@ccclass("Box2D_ContactListener")
@executionOrder(100)
export abstract class Box2D_ContactListener extends Box2D_Base {
    @property({ group: pConst.GROUPS.OPTION, type: [Node], tooltip: "Trigger zone nodes. We check if solid bodies overlap their world bounds." })
    targets: Node[] = [];

    @property({ group: pConst.GROUPS.OPTION, tooltip: "If true, we check if the entire shape overlaps (AABB bounding box approximation). If false, we only check if the center point is inside the target." })
    useShapeOverlap: boolean = true;

    @property({ group: pConst.GROUPS.OPTION })
    isDestroyOnExit: boolean = false;

    @property({ group: pConst.GROUPS.OPTION, tooltip: "If false, collision events (_onEnter, _onStay, _onExit) between two Box2D_Shape nodes are ignored." })
    isCollideShapes: boolean = false;

    get canCollideShapes(): boolean { return this.isCollideShapes; }
    set canCollideShapes(v: boolean) { this.isCollideShapes = v; }

    get collideShapes(): boolean { return this.isCollideShapes; }
    set collideShapes(v: boolean) { this.isCollideShapes = v; }

    protected _pcontacts: Map<Node, Set<Node>> = new Map();

    protected abstract _onEnter(target: Node, other: Node): void
    protected abstract _onStay(target: Node, other: Node): void
    protected abstract _onExit(target: Node, other: Node): void

    protected onDisable(): void {
        this._pcontacts.forEach((prevNodes, target) => {
            const isTargetShape = !!(target.getComponent(Box2D_Shape));
            prevNodes.forEach(node => {
                if (node && node.isValid) {
                    if (!this.isCollideShapes && isTargetShape && node.getComponent(Box2D_Shape)) {
                        return;
                    }
                    this._onExit(target, node);

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

        const targetList = this.targets.length > 0 ? this.targets : (this.node ? [this.node] : []);

        targetList.forEach(target => {
            if (!target || !target.isValid) return;

            const _trans = target.getComponent(UITransform);
            if (!_trans) return;

            const isTargetShape = !!(target.getComponent(Box2D_Shape));

            const _bound = _trans.getBoundingBoxToWorld();
            const _nodes = new Set<Node>();

            for (let i = 0; i < _count; i++) {
                const _item = _bodies[i];
                const _node = _item.node;
                const _body = _item.body;

                if (!_node || !_node.isValid) continue;

                // Never collide a shape with itself
                if (_node === target) continue;

                // When isCollideShapes is false, skip collisions between two Box2D_Shapes
                if (!this.isCollideShapes && isTargetShape && (_item instanceof Box2D_Shape || !!_node.getComponent(Box2D_Shape))) {
                    continue;
                }

                const pos = _body.GetPosition();
                const px = pos.x * PHYSICS_2D_PTM_RATIO;
                const py = pos.y * PHYSICS_2D_PTM_RATIO;

                let isOverlapping = false;

                if (this.useShapeOverlap) {
                    const radius = _item.getBounce();

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
                    this._onEnter(target, node);
                } else {
                    this._onStay(target, node);
                }
            });

            prevNodes.forEach(node => {
                if (!_nodes.has(node)) {
                    if (!this.isCollideShapes && isTargetShape && node.getComponent(Box2D_Shape)) {
                        return;
                    }
                    this._onExit(target, node);
                    this.isDestroyOnExit && node.destroy();
                }
            });

            this._pcontacts.set(target, _nodes);
        });
    }
}
