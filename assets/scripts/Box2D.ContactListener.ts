
import { _decorator, Node, UITransform, PHYSICS_2D_PTM_RATIO } from "cc";
import { pConst } from "db://pts-core/scripts/utils";
import { editor_property, instance } from "db://pts-core/scripts/utils/pClass";
import { Box2D_Manager } from "./Box2D.Manager";
import { Box2D_Base } from "./Box2D.Base";
import { Box2D_Shape } from "./Box2D.Shape";

const { ccclass, property, executionOrder } = _decorator;

interface ContactState {
    previous: Set<Node>;
    current: Set<Node>;
    frame: number;
}

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

    protected _pcontacts: Map<Node, ContactState> = new Map();
    @editor_property()
    protected _contactFrame: number = 0;

    protected abstract _onEnter(target: Node, other: Node): void
    protected abstract _onStay(target: Node, other: Node): void
    protected abstract _onExit(target: Node, other: Node): void

    protected onDisable(): void {
        this._pcontacts.forEach((state, target) => {
            const isTargetShape = !!(target.getComponent(Box2D_Shape));
            for (const node of state.previous) {
                if (node && node.isValid) {
                    if (!this.isCollideShapes && isTargetShape) {
                        continue;
                    }
                    this._onExit(target, node);

                    this.isDestroyOnExit && node.destroy();
                }
            }
        });
        this._pcontacts.clear();
    }

    protected lateUpdate() {
        const _bodies = instance(Box2D_Manager).bodies;
        const _count = _bodies.length;
        const frame = ++this._contactFrame;

        if (this.targets.length > 0) {
            for (let i = 0; i < this.targets.length; i++) {
                this._step(this.targets[i], _bodies, _count, frame);
            }
        } else {
            this._step(this.node, _bodies, _count, frame);
        }

        this._cleanup(frame);
    }

    private _step(target: Node, bodies: Box2D_Shape[], bodyCount: number, frame: number): void {
        if (!target || !target.isValid) return;

        const transform = target.getComponent(UITransform);
        if (!transform) return;

        let state = this._pcontacts.get(target);
        if (!state) {
            state = { previous: new Set<Node>(), current: new Set<Node>(), frame };
            this._pcontacts.set(target, state);
        } else {
            state.frame = frame;
        }

        const isTargetShape = !!target.getComponent(Box2D_Shape);
        const current = state.current;
        current.clear();

        // Box2D_Manager only registers Box2D_Shape instances, so this target can never have a valid candidate.
        if (!isTargetShape || this.isCollideShapes) {
            const bound = transform.getBoundingBoxToWorld();
            const xMin = bound.xMin;
            const xMax = bound.xMax;
            const yMin = bound.yMin;
            const yMax = bound.yMax;

            for (let i = 0; i < bodyCount; i++) {
                const item = bodies[i];
                const node = item.node;
                if (!node || !node.isValid || node === target) continue;

                const pos = item.body.GetPosition();
                const px = pos.x * PHYSICS_2D_PTM_RATIO;
                const py = pos.y * PHYSICS_2D_PTM_RATIO;

                if (this.useShapeOverlap) {
                    const radius = item.getBounce();
                    if (px + radius < xMin || px - radius > xMax || py + radius < yMin || py - radius > yMax) continue;
                } else if (px < xMin || px > xMax || py < yMin || py > yMax) {
                    continue;
                }

                current.add(node);
            }
        }

        const previous = state.previous;
        for (const node of current) {
            if (previous.has(node)) {
                this._onStay(target, node);
            } else {
                this._onEnter(target, node);
            }
        }

        for (const node of previous) {
            if (current.has(node)) continue;
            if (!this.isCollideShapes && isTargetShape) continue;
            this._onExit(target, node);
            this.isDestroyOnExit && node.destroy();
        }

        state.previous = current;
        state.current = previous;
    }

    private _cleanup(frame: number): void {
        for (const [target, state] of this._pcontacts) {
            if (state.frame === frame) continue;

            if (target && target.isValid) {
                const isTargetShape = !!target.getComponent(Box2D_Shape);
                for (const node of state.previous) {
                    if (!this.isCollideShapes && isTargetShape) continue;
                    this._onExit(target, node);
                    this.isDestroyOnExit && node.destroy();
                }
            }
            this._pcontacts.delete(target);
        }
    }
}
