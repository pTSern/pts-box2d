# `pts-box2d` - 2D Physics Integration Engine

> **Author**: pTSern  
> **Version**: `1.0.0`  
> **Cocos Creator Compatibility**: `>= 3.8.0`  
> **Category**: Physics Simulation & Collision Handling

---

## 1. Overview

`pts-box2d` provides a native integration of the battle-tested **Box2D** physics engine (compiled to WASM/JS) into Cocos Creator. It replaces or complements Cocos Creator's default 2D physics subsystem with predictable, deterministic rigid-body dynamics, customizable shape fixtures, flexible contact listeners, collision filtering matrices, and high-performance transform synchronization.

---

## 2. Process Architecture & Topology

```
┌─────────────────────────────────────────────────────────────┐
│                 AssetDB Mount: `db://assets`                │
│  Mounted from `./assets` as read-only runtime package       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Box2D Simulation World                    │
│                 (`Box2D_Manager` Component)                 │
│                                                             │
│  ┌──────────────────────┐        ┌───────────────────────┐  │
│  │ Rigidbody Dynamics   │        │ Collision & Shapes    │  │
│  │ - Box2D_Base (Body)  │        │ - Box2D_Shape_Box     │  │
│  │ - Dynamic / Static   │        │ - Box2D_Shape_Circle  │  │
│  │ - Velocity / Gravity │        │ - Collision Filters   │  │
│  └──────────┬───────────┘        └───────────┬───────────┘  │
│             │                                │              │
│             ▼                                ▼              │
│  ┌──────────────────────┐        ┌───────────────────────┐  │
│  │ Transform Sync       │        │ Contact & Raycast     │  │
│  │ - Box2D_SyncPosition │        │ - ContactListener     │  │
│  │ - Smooth cc.Node sync│        │ - ContactListener_Simp│  │
│  │                      │        │ - Box2D_Raycast       │  │
│  └──────────────────────┘        └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Core Physics Subsystems

### 3.1. World Management (`Box2D.Manager.ts`)
* `Box2D_Manager` manages the underlying `b2World` instance.
* Configures global gravity vector (e.g. `(0, -9.8)` or top-down `(0, 0)`).
* Manages velocity iterations, position iterations, and variable/fixed delta time steps.
* Controls debug rendering lines, colliders, and contact points in the editor or development builds.

---

### 3.2. Rigid Bodies (`Box2D.Base.ts`)
`Box2D_Base` attaches to a `cc.Node` and creates a corresponding `b2Body`:
* **Body Types**:
  * `Static`: Immovable environmental geometry (walls, floors, obstacles).
  * `Dynamic`: Fully simulated bodies affected by forces, gravity, and impulses (balls, characters, debris).
  * `Kinematic`: Velocity-driven bodies unaffected by external forces (moving platforms, elevators).
* **Properties**: Linear damping, angular damping, fixed rotation lock, continuous collision detection (`bullet: true`).

---

### 3.3. Fixtures & Shapes (`Box2D.Shape.ts`)
Fixtures define the physical geometry, friction, and collision boundaries of a body:
* **`Box2D_Shape_Box`**: Rectangular collision box. Automatically sizes to the node's `UITransform` or custom half-widths.
* **`Box2D_Shape_Circle`**: Circular collision disk with radius and local center offsets.
* **Fixture Properties**:
  * `density`: Determines body mass calculated from shape area.
  * `friction`: Surface roughness affecting sliding resistance.
  * `restitution`: Bounciness coefficient `[0.0, 1.0]`.
  * `isSensor`: Trigger mode detecting contacts without physical reaction.
  * `categoryBits` & `maskBits`: Bitmask filtering to control which object layers collide.

---

### 3.4. Contact & Collision Listening (`Box2D.ContactListener.ts`)
* **`Box2D_ContactListener`**:
  * Abstract base class providing callbacks: `BeginContact`, `EndContact`, `PreSolve`, and `PostSolve`.
  * Passes full `b2Contact` structures with manifold normals and impulse magnitudes.
* **`Box2D_ContactListener_Simple`**:
  * Declarative inspector component that links collision events to specific tag/layer filters and triggers Unity-style entry/exit handlers or `Event_Flexer` events.

---

### 3.5. Transform Synchronization (`Box2D.SyncPosition.ts`)
* Because Box2D operates in meter-based physics coordinates and Cocos Creator operates in pixel-based local/world coordinates, `Box2D_SyncPosition` converts coordinates smoothly.
* Each simulation frame, it updates the attached `cc.Node`'s world position and rotation to reflect the Box2D body state.

---

### 3.6. Raycasting (`Box2D.Raycast.ts`)
Provides high-performance line-of-sight and trajectory raycasting:
```typescript
import { Box2D_Manager } from 'db://pts-box2d/scripts/Box2D.Manager';
import { Vec2 } from 'cc';

const hit = Box2D_Manager.instance.raycast(
    new Vec2(originX, originY),
    new Vec2(targetX, targetY),
    maskBits
);

if (hit) {
    console.log(`Hit fixture on node: ${hit.fixture.GetBody().GetUserData()?.name}`);
}
```

---

## 4. Setup & Usage Example

### Creating a Bouncing Physics Entity:
1. Create a `Node` and add a `Sprite` component.
2. Add `Box2D_Base` component:
   * Set `Body Type` to `Dynamic`.
3. Add `Box2D_Shape_Circle` component:
   * Set `Radius` to match sprite width / 2.
   * Set `Restitution` to `0.8` (high bounce).
   * Set `Friction` to `0.2`.
4. Add `Box2D_SyncPosition` component.
5. In your scene root, ensure a node with `Box2D_Manager` exists.
6. Run the scene — the node will fall under gravity and bounce realistically!

---

## 5. Integration with `pts-core`

* Relies on `pts-core/assets/plugins/physics_2d/b2.js` for the compiled Box2D WebAssembly / JavaScript runtime.
* Uses TypeScript declarations in `assets/.dev/b2.d.ts` for full editor intellisense and compiler safety.
* Integrates with `pts-core/scripts/pooler/Pooler.Node` for efficient physical bullet and particle pooling.
