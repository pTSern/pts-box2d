import { _decorator, Enum, Layers, Node, IVec2Like, PHYSICS_2D_PTM_RATIO, PhysicsGroup2D, PhysicsSystem2D } from 'cc';
import { Box2D_Shape_Circle } from './Box2D.Shape.Circle';
import { Box2D_Manager } from './Box2D.Manager';
import { instance } from 'db://pts-core/scripts/utils/pClass';

const { ccclass, property } = _decorator;

export enum Box2D_ELiquidType {
    WATER = 0,
    DIRTY = 1,
    LAVA = 2,
    ICE = 3
}
Enum(Box2D_ELiquidType);

// Cocos Creator layer value for WATER (value: 2 -> bitmask: 1 << 2 = 4)
export const WATER_LAYER_BITMASK = (Layers.Enum as unknown as Record<string, number>).WATER ?? (1 << 2);

@ccclass('Box2D_Shape_LiquidDroplet')
export class Box2D_Shape_LiquidDroplet extends Box2D_Shape_Circle {
    @property({ type: Enum(Box2D_ELiquidType), tooltip: 'Type of liquid (Water, Dirty, Lava, Ice)' })
    liquidType: Box2D_ELiquidType = Box2D_ELiquidType.WATER;

    @property({ tooltip: 'Automatic layer assignment to WATER layer' })
    autoSetWaterLayer: boolean = true;

    protected onLoad(): void {
        this.radius = 14;
        this.density = 1.0;
        this.friction = 0.02;
        this.restitution = 0.05;
        this.isFixedRotation = true;

        if (this.autoSetWaterLayer && this.node) {
            this.node.layer = WATER_LAYER_BITMASK;
        }
    }
}

export interface Box2D_IParticleSystemDef {
    radius?: number;
    dampingStrength?: number;
    gravityScale?: number;
    density?: number;
    viscousStrength?: number;
    surfaceTensionPressureStrength?: number;
    surfaceTensionNormalStrength?: number;
    elasticStrength?: number;
    springStrength?: number;
}

/**
 * Native LiquidFun particle system bridge wrapping b2ParticleSystem in b2.js.
 */
@ccclass('Box2D_Liquid_ParticleSystem')
export class Box2D_Liquid_ParticleSystem {
    private _system: unknown = null;

    public init(world: b2.b2World, def?: Box2D_IParticleSystemDef): unknown {
        if (!world || typeof world !== 'object') {
            return null;
        }

        if (!('CreateParticleSystem' in world) || typeof world.CreateParticleSystem !== 'function') {
            return null;
        }

        const psd = {
            strictContactCheck: false,
            density: def?.density ?? 1.0,
            gravityScale: def?.gravityScale ?? 1.0,
            radius: (def?.radius ?? 14) / PHYSICS_2D_PTM_RATIO,
            maxCount: 0,
            pressureStrength: 0.05,
            dampingStrength: def?.dampingStrength ?? 1.0,
            elasticStrength: def?.elasticStrength ?? 0.25,
            springStrength: def?.springStrength ?? 0.25,
            viscousStrength: def?.viscousStrength ?? 0.0,
            surfaceTensionPressureStrength: def?.surfaceTensionPressureStrength ?? 0.2,
            surfaceTensionNormalStrength: def?.surfaceTensionNormalStrength ?? 0.2,
            repulsiveStrength: 1.0,
            powderStrength: 0.5,
            ejectionStrength: 0.5,
            staticPressureStrength: 0.2,
            staticPressureRelaxation: 0.2,
            staticPressureIterations: 8,
            colorMixingStrength: 0.5,
            destroyByAge: true,
            lifetimeGranularity: 1.0 / 60.0
        };

        this._system = world.CreateParticleSystem(psd);
        return this._system;
    }

    public get system(): unknown {
        return this._system;
    }

    public getParticleCount(): number {
        const sys = this._system;
        if (sys && typeof sys === 'object' && 'GetParticleCount' in sys && typeof sys.GetParticleCount === 'function') {
            return Number(sys.GetParticleCount());
        }
        return 0;
    }

    public destroy(): void {
        const sys = this._system;
        if (sys) {
            const impl = PhysicsSystem2D.instance?.physicsWorld?.impl;
            if (impl && typeof impl === 'object' && 'DestroyParticleSystem' in impl && typeof impl.DestroyParticleSystem === 'function') {
                impl.DestroyParticleSystem(sys);
            }
            this._system = null;
        }
    }
}
