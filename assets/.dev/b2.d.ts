declare namespace b2 {
    export class b2GrowableStack<T> {
        m_stack: T[];
        m_count: number;
        GetCount(): number;
        Pop(): T | null;
        Push(item: T): void;
        Reset(): void
    }
    /**
     * common/b2_settings.d.ts
     */
    /**
     * You can use this to change the length scale used by your game.
     * For example for inches you could use 39.4.
     */
    export const b2_lengthUnitsPerMeter: number;
    /**
     * The maximum number of vertices on a convex polygon. You cannot increase
     * this too much because b2BlockAllocator has a maximum object size.
     */
    export const b2_maxPolygonVertices: number;

    /**
     * config.d.ts
     */
    export interface b2Settings {
        /**
         * You can use this to change the length scale used by your game.
         * For example for inches you could use 39.4.
         */
        lengthUnitsPerMeter: number;
        /**
         * The maximum number of vertices on a convex polygon. You cannot increase
         * this too much because b2BlockAllocator has a maximum object size.
         */
        maxPolygonVertices: number;
    }
    export const settings: b2Settings;
    export function configure(changes: Partial<b2Settings>): void;

    /**
     * common/b2_common.d.ts
     */
    export function b2Assert(condition: boolean, message?: string): asserts condition;
    export function b2Verify<T>(value: T | null): T;
    export const b2_maxFloat = 1e+37;
    export const b2_epsilon = 0.00001;
    export const b2_epsilon_sq: number;
    /**
     * The maximum number of contact points between two convex shapes. Do
     * not change this value.
     */
    export const b2_maxManifoldPoints = 2;
    /**
     * This is used to fatten AABBs in the dynamic tree. This allows proxies
     * to move by a small amount without triggering a tree adjustment.
     * This is in meters.
     */
    export const b2_aabbExtension: number;
    /**
     * This is used to fatten AABBs in the dynamic tree. This is used to predict
     * the future position based on the current displacement.
     * This is a dimensionless multiplier.
     */
    export const b2_aabbMultiplier = 4;
    /**
     * A small length used as a collision and constraint tolerance. Usually it is
     * chosen to be numerically significant, but visually insignificant. In meters.
     */
    export const b2_linearSlop: number;
    /**
     * A small angle used as a collision and constraint tolerance. Usually it is
     * chosen to be numerically significant, but visually insignificant.
     */
    export const b2_angularSlop: number;
    /**
     * The radius of the polygon/edge shape skin. This should not be modified. Making
     * this smaller means polygons will have an insufficient buffer for continuous collision.
     * Making it larger may create artifacts for vertex collision.
     */
    export const b2_polygonRadius: number;
    /** Maximum number of sub-steps per contact in continuous physics simulation. */
    export const b2_maxSubSteps = 8;
    /** Maximum number of contacts to be handled to solve a TOI impact. */
    export const b2_maxTOIContacts = 32;
    /**
     * The maximum linear position correction used when solving constraints. This helps to
     * prevent overshoot. Meters.
     */
    export const b2_maxLinearCorrection: number;
    /**
     * The maximum angular position correction used when solving constraints. This helps to
     * prevent overshoot.
     */
    export const b2_maxAngularCorrection: number;
    /**
     * The maximum linear translation of a body per step. This limit is very large and is used
     * to prevent numerical problems. You shouldn't need to adjust this. Meters.
     */
    export const b2_maxTranslation: number;
    export const b2_maxTranslationSquared: number;
    /**
     * The maximum angular velocity of a body. This limit is very large and is used
     * to prevent numerical problems. You shouldn't need to adjust this.
     */
    export const b2_maxRotation: number;
    export const b2_maxRotationSquared: number;
    /**
     * This scale factor controls how fast overlap is resolved. Ideally this would be 1 so
     * that overlap is removed in one time step. However using values close to 1 often lead
     * to overshoot.
     */
    export const b2_baumgarte = 0.2;
    export const b2_toiBaumgarte = 0.75;
    /** The time that a body must be still before it will go to sleep. */
    export const b2_timeToSleep = 0.5;
    /** A body cannot sleep if its linear velocity is above this tolerance. */
    export const b2_linearSleepTolerance: number;
    /** A body cannot sleep if its angular velocity is above this tolerance. */
    export const b2_angularSleepTolerance: number;
    /**
     * Current version.
     * @see http://en.wikipedia.org/wiki/Software_versioning
     */
    export const b2_version: {
        major: number;
        minor: number;
        patch: number;
    };
    export function b2MakeNumberArray(length: number, init?: number): number[];
    export function b2MakeBooleanArray(length: number, init?: boolean): boolean[];
    export interface NoArgsConstructor<T> {
        new (): T;
    }
    export function b2MakeArray<T>(length: number, Class: NoArgsConstructor<T>): T[];

    /**
     * common/b2_math.d.ts
     */
    export const b2_pi_over_180: number;
    export const b2_180_over_pi: number;
    export const b2_two_pi: number;
    export function b2Clamp(a: number, low: number, high: number): number;
    export function b2DegToRad(degrees: number): number;
    export function b2RadToDeg(radians: number): number;
    /**
     * "Next Largest Power of 2
     * Given a binary integer value x, the next largest power of 2 can be computed by a SWAR algorithm
     * that recursively "folds" the upper bits into the lower bits. This process yields a bit vector with
     * the same most significant 1 as x, but all 1's below it. Adding 1 to that value yields the next
     * largest power of 2. For a 32-bit value:"
     */
    export function b2NextPowerOfTwo(x: number): number;
    export function b2IsPowerOfTwo(x: number): boolean;
    export function b2Random(): number;
    export function b2RandomFloat(lo: number, hi: number): number;
    export function b2RandomInt(lo: number, hi: number): number;
    interface IXY { x: number, y: number }

    export class XY implements IXY {
        Clone(): XY
        SetZero(): this
        Set(x: number, y: number): this
        Copy(target: IXY): this
        SelfAdd(v: IXY): this
        SelfAddXY(x: number, y: number): this
        SelfSub(v: IXY): this
        SelfSubXY(x: number, y: number): this
        SelfMul(s: number): this
        SelfMulAdd(s: number, v: IXY): this
        SelfMulSub(s: number, v: IXY): this
        Dot(v: IXY): number
        Cross(v: IXY): number
        Length(): number
        LengthSquared(): number
        Normalize(): number
        SelfNormalize(): this
        SelfRotate(radians: number): this
        SelfRotateCosSin(c: number, s: number): this
        IsValid(): boolean
        SelfCrossVS(t: number): this
        SelfCrossSV(t: number): this
        SelfMinV(t: IXY): this
        SelfMaxV(t: IXY): this
        selfAbs(): this
        SelfNeg(): this
        SelfSkew(): this
    }
    /**
     * A 2D column vector.
     */
    export class b2Vec2 implements XY {
        static readonly ZERO: b2Readonly<b2Vec2>;
        static readonly UNITX: b2Readonly<b2Vec2>;
        static readonly UNITY: b2Readonly<b2Vec2>;
        static readonly s_t0: b2Vec2;
        static readonly s_t1: b2Vec2;
        static readonly s_t2: b2Vec2;
        static readonly s_t3: b2Vec2;
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        Clone(): b2Vec2;
        /**
         * Set this vector to all zeros.
         */
        SetZero(): this;
        /**
         * Set this vector to some specified coordinates.
         */
        Set(x: number, y: number): this;
        Copy(other: Readonly<XY>): this;
        /**
         * Add a vector to this vector.
         */
        Add(v: Readonly<XY>): this;
        /**
         * Add a vector to this vector.
         */
        AddXY(x: number, y: number): this;
        /**
         * Subtract a vector from this vector.
         */
        Subtract(v: Readonly<XY>): this;
        /**
         * Subtract a vector from this vector.
         */
        SubtractXY(x: number, y: number): this;
        /**
         * Multiply this vector by a scalar.
         */
        Scale(s: number): this;
        AddScaled(s: number, v: Readonly<XY>): this;
        SubtractScaled(s: number, v: Readonly<XY>): this;
        /**
         * Perform the dot product on two vectors.
         */
        Dot(v: Readonly<XY>): number;
        /**
         * Perform the cross product on two vectors. In 2D this produces a scalar.
         */
        Cross(v: Readonly<XY>): number;
        /**
         * Get the length of this vector (the norm).
         */
        Length(): number;
        /**
         * Get the length squared. For performance, use this instead of
         * b2Vec2::Length (if possible).
         */
        LengthSquared(): number;
        /**
         * Convert this vector into a unit vector. Returns the length.
         */
        Normalize(): number;
        Rotate(radians: number): this;
        RotateCosSin(c: number, s: number): this;
        /**
         * Does this vector contain finite coordinates?
         */
        IsValid(): boolean;
        Abs(): this;
        GetAbs<T extends XY>(out: T): T;
        /**
         * Negate this vector.
         */
        Negate(): this;
        /**
         * Skew this vector such that dot(skew_vec, other) == cross(vec, other)
         */
        Skew(): this;
        static Min<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        static Max<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        static Clamp<T extends XY>(v: Readonly<XY>, lo: Readonly<XY>, hi: Readonly<XY>, out: T): T;
        static Rotate<T extends XY>(v: Readonly<XY>, radians: number, out: T): T;
        /** Perform the dot product on two vectors. */
        static Dot(a: Readonly<XY>, b: Readonly<XY>): number;
        /** Perform the cross product on two vectors. In 2D this produces a scalar. */
        static Cross(a: Readonly<XY>, b: Readonly<XY>): number;
        /**
         * Perform the cross product on a vector and a scalar. In 2D this produces
         * a vector.
         */
        static CrossVec2Scalar<T extends XY>(v: Readonly<XY>, s: number, out: T): T;
        static CrossVec2One<T extends XY>(v: Readonly<XY>, out: T): T;
        /**
         * Perform the cross product on a scalar and a vector. In 2D this produces
         * a vector.
         */
        static CrossScalarVec2<T extends XY>(s: number, v: Readonly<XY>, out: T): T;
        static CrossOneVec2<T extends XY>(v: Readonly<XY>, out: T): T;
        /**
         * Add two vectors component-wise.
         */
        static Add<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        /**
         * Subtract two vectors component-wise.
         */
        static Subtract<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        static Scale<T extends XY>(s: number, v: Readonly<XY>, out: T): T;
        static AddScaled<T extends XY>(a: Readonly<XY>, s: number, b: Readonly<XY>, out: T): T;
        static SubtractScaled<T extends XY>(a: Readonly<XY>, s: number, b: Readonly<XY>, out: T): T;
        static AddCrossScalarVec2<T extends XY>(a: Readonly<XY>, s: number, v: Readonly<XY>, out: T): T;
        static Mid<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        static Extents<T extends XY>(a: Readonly<XY>, b: Readonly<XY>, out: T): T;
        static Equals(a: Readonly<XY>, b: Readonly<XY>): boolean;
        static Distance(a: Readonly<XY>, b: Readonly<XY>): number;
        static DistanceSquared(a: Readonly<XY>, b: Readonly<XY>): number;
        /**
         * Negate a vector.
         */
        static Negate<T extends XY>(v: Readonly<XY>, out: T): T;
        static Normalize<T extends XY>(v: Readonly<XY>, out: T): T;
        /**
         * Skew a vector such that dot(skew_vec, other) == cross(vec, other)
         */
        static Skew<T extends XY>(v: Readonly<XY>, out: T): T;
    }
    export interface XYZ extends XY {
        z: number;
    }
    /**
     * A 2D column vector with 3 elements.
     */
    export class b2Vec3 implements XYZ {
        static readonly ZERO: b2Readonly<b2Vec3>;
        static readonly s_t0: b2Vec3;
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
        Clone(): b2Vec3;
        /**
         * Set this vector to all zeros.
         */
        SetZero(): this;
        /**
         * Set this vector to some specified coordinates.
         */
        Set(x: number, y: number, z: number): this;
        Copy(other: Readonly<XYZ>): this;
        /**
         * Negate this vector.
         */
        Negate(): this;
        /**
         * Add a vector to this vector.
         */
        Add(v: Readonly<XYZ>): this;
        /**
         * Add a vector to this vector.
         */
        AddXYZ(x: number, y: number, z: number): this;
        /**
         * Subtract a vector from this vector.
         */
        Subtract(v: Readonly<XYZ>): this;
        /**
         * Subtract a vector from this vector.
         */
        SubtractXYZ(x: number, y: number, z: number): this;
        /**
         * Multiply this vector by a scalar.
         */
        Scale(s: number): this;
        /**
         * Perform the dot product on two vectors.
         */
        static Dot(a: Readonly<XYZ>, b: Readonly<XYZ>): number;
        /**
         * Perform the cross product on two vectors.
         */
        static Cross<T extends XYZ>(a: Readonly<XYZ>, b: Readonly<XYZ>, out: T): T;
    }
    /**
     * A 2-by-2 matrix. Stored in column-major order.
     */
    export class b2Mat22 {
        static readonly IDENTITY: b2Readonly<b2Mat22>;
        readonly ex: b2Vec2;
        readonly ey: b2Vec2;
        Clone(): b2Mat22;
        /**
         * Construct a matrix using columns.
         */
        static FromColumns(c1: Readonly<XY>, c2: Readonly<XY>): b2Mat22;
        /**
         * Construct a matrix using scalars.
         */
        static FromScalars(r1c1: number, r1c2: number, r2c1: number, r2c2: number): b2Mat22;
        static FromAngle(radians: number): b2Mat22;
        /**
         * Set this matrix using scalars.
         */
        SetScalars(r1c1: number, r1c2: number, r2c1: number, r2c2: number): this;
        /**
         * Initialize this matrix using columns.
         */
        SetColumns(c1: Readonly<XY>, c2: Readonly<XY>): this;
        SetAngle(radians: number): this;
        Copy(other: b2Readonly<b2Mat22>): this;
        /**
         * Set this to the identity matrix.
         */
        SetIdentity(): this;
        /**
         * Set this matrix to all zeros.
         */
        SetZero(): this;
        GetAngle(): number;
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient
         * than computing the inverse in one-shot cases.
         */
        Solve<T extends XY>(b_x: number, b_y: number, out: T): T;
        Abs(): this;
        Inverse(): this;
        Add(M: b2Readonly<b2Mat22>): this;
        Subtract(M: b2Readonly<b2Mat22>): this;
        GetInverse(out: b2Mat22): b2Mat22;
        GetAbs(out: b2Mat22): b2Mat22;
        /**
         * Multiply a matrix times a vector. If a rotation matrix is provided,
         * then this transforms the vector from one frame to another.
         */
        static MultiplyVec2<T extends XY>(M: b2Readonly<b2Mat22>, v: Readonly<XY>, out: T): T;
        /**
         * Multiply a matrix transpose times a vector. If a rotation matrix is provided,
         * then this transforms the vector from one frame to another (inverse transform).
         */
        static TransposeMultiplyVec2<T extends XY>(M: b2Readonly<b2Mat22>, v: Readonly<XY>, out: T): T;
        static Add(A: b2Readonly<b2Mat22>, B: b2Readonly<b2Mat22>, out: b2Mat22): b2Mat22;
        /** A * B */
        static Multiply(A: b2Readonly<b2Mat22>, B: b2Readonly<b2Mat22>, out: b2Mat22): b2Mat22;
        /** A^T * B */
        static TransposeMultiply(A: b2Readonly<b2Mat22>, B: b2Readonly<b2Mat22>, out: b2Mat22): b2Mat22;
    }
    /**
     * A 3-by-3 matrix. Stored in column-major order.
     */
    export class b2Mat33 {
        static readonly IDENTITY: b2Readonly<b2Mat33>;
        readonly ex: b2Vec3;
        readonly ey: b2Vec3;
        readonly ez: b2Vec3;
        Clone(): b2Mat33;
        /**
         * Set this matrix using columns.
         */
        SetColumns(c1: Readonly<XYZ>, c2: Readonly<XYZ>, c3: Readonly<XYZ>): this;
        Copy(other: b2Readonly<b2Mat33>): this;
        SetIdentity(): this;
        /**
         * Set this matrix to all zeros.
         */
        SetZero(): this;
        Add(M: b2Readonly<b2Mat33>): this;
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient
         * than computing the inverse in one-shot cases.
         */
        Solve33<T extends XYZ>(b_x: number, b_y: number, b_z: number, out: T): T;
        /**
         * Solve A * x = b, where b is a column vector. This is more efficient
         * than computing the inverse in one-shot cases. Solve only the upper
         * 2-by-2 matrix equation.
         */
        Solve22<T extends XY>(b_x: number, b_y: number, out: T): T;
        /**
         * Get the inverse of this matrix as a 2-by-2.
         * Returns the zero matrix if singular.
         */
        GetInverse22(M: b2Mat33): void;
        /**
         * Get the symmetric inverse of this matrix as a 3-by-3.
         * Returns the zero matrix if singular.
         */
        GetSymInverse33(M: b2Mat33): void;
        /**
         * Multiply a matrix times a vector.
         */
        static MultiplyVec3<T extends XYZ>(A: b2Readonly<b2Mat33>, v: Readonly<XYZ>, out: T): T;
        /**
         * Multiply a matrix times a vector.
         */
        static MultiplyVec2<T extends XY>(A: b2Readonly<b2Mat33>, v: Readonly<XY>, out: T): T;
    }
    /**
     * Rotation
     */
    export class b2Rot {
        static readonly IDENTITY: b2Readonly<b2Rot>;
        /** Sine */
        s: number;
        /** Cosine */
        c: number;
        /**
         * Initialize from an angle in radians
         */
        constructor(angle?: number);
        Clone(): b2Rot;
        Copy(other: b2Readonly<b2Rot>): this;
        /**
         * Set using an angle in radians.
         */
        Set(angle: number): this;
        /**
         * Set to the identity rotation
         */
        SetIdentity(): this;
        /**
         * Get the angle in radians
         */
        GetAngle(): number;
        /**
         * Get the x-axis
         */
        GetXAxis<T extends XY>(out: T): T;
        /**
         * Get the u-axis
         */
        GetYAxis<T extends XY>(out: T): T;
        /**
         * Multiply two rotations: q * r
         */
        static Multiply(q: b2Readonly<b2Rot>, r: b2Readonly<b2Rot>, out: b2Rot): b2Rot;
        /**
         * Transpose multiply two rotations: qT * r
         */
        static TransposeMultiply(q: b2Readonly<b2Rot>, r: b2Readonly<b2Rot>, out: b2Rot): b2Rot;
        /**
         * Rotate a vector
         */
        static MultiplyVec2<T extends XY>(q: b2Readonly<b2Rot>, v: Readonly<XY>, out: T): T;
        /**
         * Inverse rotate a vector
         */
        static TransposeMultiplyVec2<T extends XY>(q: b2Readonly<b2Rot>, v: Readonly<XY>, out: T): T;
    }
    /**
     * A transform contains translation and rotation. It is used to represent
     * the position and orientation of rigid frames.
     */
    export class b2Transform {
        static readonly IDENTITY: b2Readonly<b2Transform>;
        readonly p: b2Vec2;
        readonly q: b2Rot;
        Clone(): b2Transform;
        Copy(other: b2Readonly<b2Transform>): this;
        /**
         * Set this to the identity transform.
         */
        SetIdentity(): this;
        /**
         * Set this based on the position and rotation.
         */
        SetPositionRotation(position: Readonly<XY>, q: b2Readonly<b2Rot>): this;
        /**
         * Set this based on the position and angle.
         */
        SetPositionAngle(pos: Readonly<XY>, a: number): this;
        SetPosition(position: Readonly<XY>): this;
        SetPositionXY(x: number, y: number): this;
        SetRotation(rotation: b2Readonly<b2Rot>): this;
        SetRotationAngle(radians: number): this;
        GetPosition(): b2Readonly<b2Vec2>;
        GetRotation(): b2Readonly<b2Rot>;
        GetAngle(): number;
        static MultiplyVec2<T extends XY>(T: b2Readonly<b2Transform>, v: Readonly<XY>, out: T): T;
        static TransposeMultiplyVec2<T extends XY>(T: b2Readonly<b2Transform>, v: Readonly<XY>, out: T): T;
        /**
         * v2 = A.q.Rot(B.q.Rot(v1) + B.p) + A.p
         *    = (A.q * B.q).Rot(v1) + A.q.Rot(B.p) + A.p
         */
        static Multiply(A: b2Readonly<b2Transform>, B: b2Readonly<b2Transform>, out: b2Transform): b2Transform;
        /**
         * v2 = A.q' * (B.q * v1 + B.p - A.p)
         *    = A.q' * B.q * v1 + A.q' * (B.p - A.p)
         */
        static TransposeMultiply(A: b2Readonly<b2Transform>, B: b2Readonly<b2Transform>, out: b2Transform): b2Transform;
    }
    /**
     * This describes the motion of a body/shape for TOI computation.
     * Shapes are defined with respect to the body origin, which may
     * no coincide with the center of mass. However, to support dynamics
     * we must interpolate the center of mass position.
     */
    export class b2Sweep {
        /** Local center of mass position */
        readonly localCenter: b2Vec2;
        /** Center world position at time 0 */
        readonly c0: b2Vec2;
        /** Center world position at time 1 */
        readonly c: b2Vec2;
        /** World angle at time 0 */
        a0: number;
        /** World angle at time 1 */
        a: number;
        /**
         * Fraction of the current time step in the range [0,1]
         * c0 and a0 are the positions at alpha0.
         */
        alpha0: number;
        Clone(): b2Sweep;
        Copy(other: b2Sweep): this;
        /**
         * Get the interpolated transform at a specific time.
         *
         * @param transform The output transform
         * @param beta Is a factor in [0,1], where 0 indicates alpha0.
         * @see https://fgiesen.wordpress.com/2012/08/15/linear-interpolation-past-present-and-future/
         */
        GetTransform(xf: b2Transform, beta: number): b2Transform;
        /**
         * Advance the sweep forward, yielding a new initial state.
         *
         * @param alpha The new initial time.
         */
        Advance(alpha: number): void;
        /**
         * Normalize an angle in radians to be between -pi and pi
         */
        Normalize(): void;
    }

    /**
     * common/b2_readonly.d.ts
     */
    /**
     * A map, so b2Readonly can determine the readonly properties of a Type
     *
     * The key should be the name of the type to be readonly-fied. The value is a tuple with 3 parts:
     * - The type that can be made readonly
     * - The properties that should be picked from that type
     * - A manual set of properties to be added to the readonly type.
     *   Use this to specify properties which need to use b2Readonly.
     *   Set it to `unknown` if there is no need for manual properties
     */
    export interface b2ReadonlyTypes {
        b2Vec2: [
            b2Vec2,
            "x" | "y" | "Clone" | "Dot" | "Cross" | "Length" | "LengthSquared" | "IsValid" | "GetAbs",
            unknown
        ];
        b2Vec3: [b2Vec3, "x" | "y" | "z" | "Clone", unknown];
        b2Mat22: [
            b2Mat22,
            "Clone" | "GetAngle" | "GetInverse" | "GetAbs",
            {
                ex: b2Readonly<b2Vec2>;
                ey: b2Readonly<b2Vec2>;
            }
        ];
        b2Mat33: [
            b2Mat33,
            "Clone" | "Solve33" | "Solve22" | "GetInverse22" | "GetSymInverse33",
            {
                ex: b2Readonly<b2Vec3>;
                ey: b2Readonly<b2Vec3>;
                ez: b2Readonly<b2Vec3>;
            }
        ];
        b2Rot: [b2Rot, "s" | "c" | "Clone" | "GetAngle" | "GetXAxis" | "GetYAxis", unknown];
        b2Transform: [
            b2Transform,
            "GetPosition" | "GetRotation" | "GetAngle",
            {
                p: b2Readonly<b2Vec2>;
                q: b2Readonly<b2Rot>;
            }
        ];
        b2Sweep: [b2Sweep, "a0" | "a" | "alpha" | "Clone" | "GetTransform", {
            localCenter: b2Vec2;
            c0: b2Vec2;
            c: b2Vec2;
        }];
    }
    type GetFromTypes<T> = {
        [TKey in keyof b2ReadonlyTypes as b2ReadonlyTypes[TKey] extends [T, any, any] ? "result" : never]: b2ReadonlyTypes[TKey] extends [T, infer TPicks, infer TManual] ? [TPicks, TManual] : never;
    };
    /**
     * This type can be used to make a type like ReadonlyArray without introducing new types to learn.
     * So you can simply write `b2Readonly<b2Vec2>` instead of `b2ReadonlyVec2`.
     *
     * By default it only works with math types from @box2d/core, but you can extend it via declaration merging of `b2ReadonlyTypes`.
     */
    export type b2Readonly<T> = T extends (...args: any[]) => any ? T : GetFromTypes<T> extends {
        result: [infer TProperties extends keyof T, infer TManual];
    } ? Readonly<TManual & {
        [TKey in TProperties]: b2Readonly<T[TKey]>;
    }> : Readonly<T>;

    /**
     * common/b2_draw.d.ts
     */
    export interface RGB {
        r: number;
        g: number;
        b: number;
    }
    export interface RGBA extends RGB {
        a: number;
    }
    /**
     * Color for debug drawing. Each value has the range [0,1].
     */
    export class b2Color implements RGBA {
        static readonly ZERO: Readonly<RGBA>;
        static readonly RED: Readonly<RGBA>;
        static readonly GREEN: Readonly<RGBA>;
        static readonly BLUE: Readonly<RGBA>;
        static readonly WHITE: Readonly<RGBA>;
        static readonly BLACK: Readonly<RGBA>;
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(r?: number, g?: number, b?: number, a?: number);
        Clone(): b2Color;
        Copy(other: RGBA): this;
        IsEqual(color: RGBA): boolean;
        IsZero(): boolean;
        SetByteRGB(r: number, g: number, b: number): this;
        SetByteRGBA(r: number, g: number, b: number, a: number): this;
        SetRGB(r: number, g: number, b: number): this;
        SetRGBA(r: number, g: number, b: number, a: number): this;
        Add(color: RGBA): this;
        Subtract(color: RGBA): this;
        Scale(s: number): this;
        Mix(mixColor: RGBA, strength: number): void;
        static Add<T extends RGBA>(colorA: RGBA, colorB: RGBA, out: T): T;
        static Subtract<T extends RGBA>(colorA: RGBA, colorB: RGBA, out: T): T;
        static Scale<T extends RGBA>(color: RGBA, s: number, out: T): T;
        static MixColors(colorA: RGBA, colorB: RGBA, strength: number): void;
    }
    /**
     * Implement and register this class with a b2World to provide debug drawing of physics
     * entities in your game.
     */
    export interface b2Draw {
        PushTransform(xf: b2Readonly<b2Transform>): void;
        PopTransform(xf: b2Readonly<b2Transform>): void;
        /** Draw a closed polygon provided in CCW order. */
        DrawPolygon(vertices: ReadonlyArray<Readonly<XY>>, vertexCount: number, color: RGBA): void;
        /** Draw a solid closed polygon provided in CCW order. */
        DrawSolidPolygon(vertices: ReadonlyArray<Readonly<XY>>, vertexCount: number, color: RGBA): void;
        /** Draw a circle. */
        DrawCircle(center: Readonly<XY>, radius: number, color: RGBA): void;
        /** Draw a solid circle. */
        DrawSolidCircle(center: Readonly<XY>, radius: number, axis: Readonly<XY>, color: RGBA): void;
        /** Draw a line segment. */
        DrawSegment(p1: Readonly<XY>, p2: Readonly<XY>, color: RGBA): void;
        /**
         * Draw a transform. Choose your own length scale.
         * @param xf a transform.
         */
        DrawTransform(xf: b2Readonly<b2Transform>): void;
        /** Draw a point. */
        DrawPoint(p: Readonly<XY>, size: number, color: RGBA): void;
    }
    export const debugColors: {
        badBody: b2Color;
        disabledBody: b2Color;
        staticBody: b2Color;
        kinematicBody: b2Color;
        sleepingBody: b2Color;
        body: b2Color;
        pair: b2Color;
        aabb: b2Color;
        joint1: b2Color;
        joint2: b2Color;
        joint3: b2Color;
        joint4: b2Color;
        joint5: b2Color;
        joint6: b2Color;
        joint7: b2Color;
        joint8: b2Color;
        rope: b2Color;
        ropePointG: b2Color;
        ropePointD: b2Color;
    };

    /**
     * common/b2_draw_helper.d.ts
     */
    export function GetShapeColor(b: b2Body): b2Color;
    export function DrawShapes(draw: b2Draw, world: b2World, within?: b2AABB): void;
    export function DrawJoints(draw: b2Draw, world: b2World): void;
    export function DrawPairs(draw: b2Draw, world: b2World): void;
    export function DrawAABBs(draw: b2Draw, world: b2World, within?: b2AABB): void;
    export function DrawCenterOfMasses(draw: b2Draw, world: b2World): void;

    /**
     * common/b2_timer.d.ts
     */
    /**
     * Timer for profiling. This has platform specific code and may
     * not work on every platform.
     */
    export class b2Timer {
        m_start: number;
        /**
         * Reset the timer.
         */
        Reset(): b2Timer;
        /**
         * Get the time since construction or the last reset.
         */
        GetMilliseconds(): number;
    }

    /**
     * common/b2_augment.d.ts
     */
    export type b2Augmentation<T extends {
        [s: string]: any;
    }> = {
        [P in keyof T]?: (original: T[P], ...args: Parameters<T[P]>) => ReturnType<T[P]>;
    };
    export function b2_augment<T extends {
        [s: string]: any;
    }>(host: T, augmentations: b2Augmentation<T>): void;
    export type b2Writeable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    /**
     * collision/b2_collision.d.ts
     */
    export enum b2ContactFeatureType {
        e_vertex = 0,
        e_face = 1
    }
    /**
     * The features that intersect to form the contact point
     * This must be 4 bytes or less.
     */
    export class b2ContactFeature {
        m_key: number;
        m_key_invalid: boolean;
        /** Feature index on shapeA */
        m_indexA: number;
        /** Feature index on shapeB */
        m_indexB: number;
        /** The feature type on shapeA */
        m_typeA: number;
        /** The feature type on shapeB */
        m_typeB: number;
        get key(): number;
        set key(value: number);
        get indexA(): number;
        set indexA(value: number);
        get indexB(): number;
        set indexB(value: number);
        get typeA(): number;
        set typeA(value: number);
        get typeB(): number;
        set typeB(value: number);
    }
    /**
     * Contact ids to facilitate warm starting.
     */
    export class b2ContactID {
        readonly cf: b2ContactFeature;
        Copy(o: b2ContactID): b2ContactID;
        Clone(): b2ContactID;
        get key(): number;
        set key(value: number);
    }
    /**
     * A manifold point is a contact point belonging to a contact
     * manifold. It holds details related to the geometry and dynamics
     * of the contact points.
     * The local point usage depends on the manifold type:
     * -e_circles: the local center of circleB
     * -e_faceA: the local center of cirlceB or the clip point of polygonB
     * -e_faceB: the clip point of polygonA
     * This structure is stored across time steps, so we keep it small.
     * Note: the impulses are used for internal caching and may not
     * provide reliable contact forces, especially for high speed collisions.
     */
    export class b2ManifoldPoint {
        /** Usage depends on manifold type */
        readonly localPoint: b2Vec2;
        /** The non-penetration impulse */
        normalImpulse: number;
        /** The friction impulse */
        tangentImpulse: number;
        /** Uniquely identifies a contact point between two shapes */
        readonly id: b2ContactID;
        Reset(): void;
        Copy(o: b2ManifoldPoint): b2ManifoldPoint;
    }
    export enum b2ManifoldType {
        e_circles = 0,
        e_faceA = 1,
        e_faceB = 2
    }
    /**
     * A manifold for two touching convex shapes.
     * Box2D supports multiple types of contact:
     * - clip point versus plane with radius
     * - point versus point with radius (circles)
     * The local point usage depends on the manifold type:
     * -e_circles: the local center of circleA
     * -e_faceA: the center of faceA
     * -e_faceB: the center of faceB
     * Similarly the local normal usage:
     * -e_circles: not used
     * -e_faceA: the normal on polygonA
     * -e_faceB: the normal on polygonB
     * We store contacts in this way so that position correction can
     * account for movement, which is critical for continuous physics.
     * All contact scenarios must be expressed in one of these types.
     * This structure is stored across time steps, so we keep it small.
     */
    export class b2Manifold {
        /** The points of contact */
        readonly points: b2ManifoldPoint[];
        /** Not use for Type::e_points */
        readonly localNormal: b2Vec2;
        /** Usage depends on manifold type */
        readonly localPoint: b2Vec2;
        type: b2ManifoldType;
        /** The number of manifold points */
        pointCount: number;
        Reset(): void;
        Copy(o: b2Manifold): b2Manifold;
        Clone(): b2Manifold;
    }
    /**
     * This is used to compute the current state of a contact manifold.
     */
    export class b2WorldManifold {
        /** World vector pointing from A to B */
        readonly normal: b2Vec2;
        /** World contact point (point of intersection) */
        readonly points: b2Vec2[];
        /** A negative value indicates overlap, in meters */
        readonly separations: number[];
        static Initialize_s_pointA: b2Vec2;
        static Initialize_s_pointB: b2Vec2;
        static Initialize_s_cA: b2Vec2;
        static Initialize_s_cB: b2Vec2;
        static Initialize_s_planePoint: b2Vec2;
        static Initialize_s_clipPoint: b2Vec2;
        /**
         * Evaluate the manifold with supplied transforms. This assumes
         * modest motion from the original state. This does not change the
         * point count, impulses, etc. The radii must come from the shapes
         * that generated the manifold.
         */
        Initialize(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, radiusA: number, xfB: b2Readonly<b2Transform>, radiusB: number): void;
    }
    /**
     * This is used for determining the state of contact points.
     */
    export enum b2PointState {
        /** Point does not exist */
        b2_nullState = 0,
        /** Point was added in the update */
        b2_addState = 1,
        /** Point persisted across the update */
        b2_persistState = 2,
        /** Point was removed in the update */
        b2_removeState = 3
    }
    /**
     * Compute the point states given two manifolds. The states pertain to the transition from manifold1
     * to manifold2. So state1 is either persist or remove while state2 is either add or persist.
     */
    export function b2GetPointStates(state1: b2PointState[], state2: b2PointState[], manifold1: b2Manifold, manifold2: b2Manifold): void;
    /**
     * Used for computing contact manifolds.
     */
    export class b2ClipVertex {
        readonly v: b2Vec2;
        readonly id: b2ContactID;
        Copy(other: b2ClipVertex): b2ClipVertex;
    }
    /**
     * Ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
     */
    export class b2RayCastInput {
        readonly p1: b2Vec2;
        readonly p2: b2Vec2;
        maxFraction: number;
        Copy(o: b2RayCastInput): b2RayCastInput;
    }
    /**
     * Ray-cast output data. The ray hits at p1 + fraction * (p2 - p1), where p1 and p2
     * come from b2RayCastInput.
     */
    export class b2RayCastOutput {
        readonly normal: b2Vec2;
        fraction: number;
        Copy(o: b2RayCastOutput): b2RayCastOutput;
    }
    /**
     * An axis aligned bounding box.
     */
    export class b2AABB {
        /** The lower vertex */
        readonly lowerBound: b2Vec2;
        /** The upper vertex */
        readonly upperBound: b2Vec2;
        Copy(o: b2AABB): b2AABB;
        /**
         * Verify that the bounds are sorted.
         */
        IsValid(): boolean;
        /**
         * Get the center of the AABB.
         */
        GetCenter(out: XY): XY;
        /**
         * Get the extents of the AABB (half-widths).
         */
        GetExtents(out: XY): XY;
        /**
         * Get the perimeter length
         */
        GetPerimeter(): number;
        /**
         * Combine an AABB into this one.
         */
        Combine1(aabb: b2AABB): b2AABB;
        /**
         * Combine two AABBs into this one.
         */
        Combine2(aabb1: b2AABB, aabb2: b2AABB): b2AABB;
        static Combine(aabb1: b2AABB, aabb2: b2AABB, out: b2AABB): b2AABB;
        /**
         * Does this aabb contain the provided AABB.
         */
        Contains(aabb: b2AABB): boolean;
        RayCast(output: b2RayCastOutput, input: b2RayCastInput): boolean;
        TestContain(point: XY): boolean;
        TestOverlap(other: b2AABB): boolean;
    }
    /**
     * Clipping for contact manifolds.
     * Sutherland-Hodgman clipping.
     */
    export function b2ClipSegmentToLine(vOut: readonly [b2ClipVertex, b2ClipVertex], [vIn0, vIn1]: readonly [b2ClipVertex, b2ClipVertex], normal: b2Readonly<b2Vec2>, offset: number, vertexIndexA: number): number;
    /**
     * Determine if two generic shapes overlap.
     */
    export function b2TestOverlap(shapeA: b2Shape, indexA: number, shapeB: b2Shape, indexB: number, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): boolean;
    /** Convex hull used for polygon collision */
    export type b2Hull = Array<Readonly<XY>>;
    /**
     * Compute the convex hull of a set of points.
     * quickhull algorithm
     * - merges vertices based on b2_linearSlop
     * - removes collinear points using b2_linearSlop
     * - returns an empty hull if it fails
     *
     * Some failure cases:
     * - all points very close together
     * - all points on a line
     * - less than 3 points
     * - more than b2_maxPolygonVertices points
     *
     * This welds close points and removes collinear points.
     *
     * @returns an empty hull if it fails.
     */
    export function b2ComputeHull(points: ReadonlyArray<Readonly<XY>>, count: number): Readonly<b2Hull>;
    /**
     * This determines if a hull is valid. Checks for:
     * - convexity
     * - collinear points
     * This is expensive and should not be called at runtime.
     */
    export function b2ValidateHull(hull: Readonly<b2Hull>, count: number): boolean;

    /**
     * collision/b2_distance.d.ts
     */
    /**
     * A distance proxy is used by the GJK algorithm.
     * It encapsulates any shape.
     */
    export class b2DistanceProxy {
        readonly m_buffer: b2Vec2[];
        m_vertices: b2Vec2[];
        m_count: number;
        m_radius: number;
        Copy(other: Readonly<b2DistanceProxy>): this;
        Reset(): b2DistanceProxy;
        SetShape(shape: b2Shape, index: number): void;
        /**
         * Initialize the proxy using the given shape. The shape
         * must remain in scope while the proxy is in use.
         * Initialize the proxy using a vertex cloud and radius. The vertices
         * must remain in scope while the proxy is in use.
         */
        SetVerticesRadius(vertices: b2Vec2[], count: number, radius: number): void;
        /** Get the supporting vertex index in the given direction. */
        GetSupport(d: b2Readonly<b2Vec2>): number;
        /** Get the supporting vertex in the given direction. */
        GetSupportVertex(d: b2Readonly<b2Vec2>): b2Readonly<b2Vec2>;
        /** Get the vertex count. */
        GetVertexCount(): number;
        /** Get a vertex by index. Used by b2Distance. */
        GetVertex(index: number): b2Readonly<b2Vec2>;
    }
    /**
     * Used to warm start b2Distance.
     * Set count to zero on first call.
     */
    export class b2SimplexCache {
        /** Length or area */
        metric: number;
        count: number;
        /** Vertices on shape A */
        readonly indexA: [number, number, number];
        /** Vertices on shape B */
        readonly indexB: [number, number, number];
        Reset(): b2SimplexCache;
    }
    /**
     * Input for b2Distance.
     * You have to option to use the shape radii
     * in the computation. Even
     */
    export class b2DistanceInput {
        readonly proxyA: b2DistanceProxy;
        readonly proxyB: b2DistanceProxy;
        readonly transformA: b2Transform;
        readonly transformB: b2Transform;
        useRadii: boolean;
        Reset(): b2DistanceInput;
    }
    /**
     * Output for b2Distance.
     */
    export class b2DistanceOutput {
        /** Closest point on shapeA */
        readonly pointA: b2Vec2;
        /** Closest point on shapeB */
        readonly pointB: b2Vec2;
        distance: number;
        /** Number of GJK iterations used */
        iterations: number;
        Reset(): b2DistanceOutput;
    }
    /**
     * Input parameters for b2ShapeCast
     */
    export class b2ShapeCastInput {
        readonly proxyA: b2DistanceProxy;
        readonly proxyB: b2DistanceProxy;
        readonly transformA: b2Transform;
        readonly transformB: b2Transform;
        readonly translationB: b2Vec2;
    }
    /**
     * Output results for b2ShapeCast
     */
    export class b2ShapeCastOutput {
        readonly point: b2Vec2;
        readonly normal: b2Vec2;
        lambda: number;
        iterations: number;
    }
    /** GJK using Voronoi regions (Christer Ericson) and Barycentric coordinates. */
    export const b2Gjk: {
        calls: number;
        iters: number;
        maxIters: number;
        reset(): void;
    };
    /**
     * Compute the closest points between two shapes. Supports any combination of:
     * b2CircleShape, b2PolygonShape, b2EdgeShape. The simplex cache is input/output.
     * On the first call set b2SimplexCache.count to zero.
     */
    export function b2Distance(output: b2DistanceOutput, cache: b2SimplexCache, input: b2DistanceInput): void;
    /**
     * Perform a linear shape cast of shape B moving and shape A fixed. Determines the hit point, normal, and translation fraction.
     * GJK-raycast
     * Algorithm by Gino van den Bergen.
     * "Smooth Mesh Contacts with GJK" in Game Physics Pearls. 2010
     *
     * @returns true if hit, false if there is no hit or an initial overlap
     */
    export function b2ShapeCast(output: b2ShapeCastOutput, input: b2ShapeCastInput): boolean;

    /**
     * collision/b2_broad_phase.d.ts
     */
    /**
     * The broad-phase is used for computing pairs and performing volume queries and ray casts.
     * This broad-phase does not persist pairs. Instead, this reports potentially new pairs.
     * It is up to the client to consume the new pairs and to track subsequent overlap.
     */
    export class b2BroadPhase<T> {
        readonly m_tree: b2DynamicTree<T>;
        m_proxyCount: number;
        m_moveCount: number;
        readonly m_moveBuffer: (b2TreeNode<T> | null)[];
        m_pairCount: number;
        readonly m_pairBuffer: [b2TreeNode<T>, b2TreeNode<T>][];
        m_queryProxy: b2TreeNode<T>;
        /**
         * Create a proxy with an initial AABB. Pairs are not reported until
         * UpdatePairs is called.
         */
        CreateProxy(aabb: b2AABB, userData: T): b2TreeNode<T>;
        /**
         * Destroy a proxy. It is up to the client to remove any pairs.
         */
        DestroyProxy(proxy: b2TreeNode<T>): void;
        /**
         * Call MoveProxy as many times as you like, then when you are done
         * call UpdatePairs to finalized the proxy pairs (for your time step).
         */
        MoveProxy(proxy: b2TreeNode<T>, aabb: b2AABB, displacement: b2Readonly<b2Vec2>): void;
        /**
         * Call to trigger a re-processing of it's pairs on the next call to UpdatePairs.
         */
        TouchProxy(proxy: b2TreeNode<T>): void;
        /**
         * Get the number of proxies.
         */
        GetProxyCount(): number;
        /**
         * Update the pairs. This results in pair callbacks. This can only add pairs.
         */
        UpdatePairs(callback: (a: T, b: T) => void): void;
        /**
         * Query an AABB for overlapping proxies. The callback class
         * is called for each proxy that overlaps the supplied AABB.
         */
        Query(aabb: b2AABB, callback: (node: b2TreeNode<T>) => boolean): void;
        QueryPoint(point: XY, callback: (node: b2TreeNode<T>) => boolean): void;
        /** This is called from b2DynamicTree::Query when we are gathering pairs. */
        QueryCallback(proxy: b2TreeNode<T>): boolean;
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback
         * to perform a exact ray-cast in the case were the proxy contains a shape.
         * The callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         *
         * @param input The ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
         * @param callback A callback class that is called for each proxy that is hit by the ray.
         */
        RayCast(input: b2RayCastInput, callback: (input: b2RayCastInput, node: b2TreeNode<T>) => number): void;
        /**
         * Get the height of the embedded tree.
         */
        GetTreeHeight(): number;
        /**
         * Get the balance of the embedded tree.
         */
        GetTreeBalance(): number;
        /**
         * Get the quality metric of the embedded tree.
         */
        GetTreeQuality(): number;
        /**
         * Shift the world origin. Useful for large worlds.
         * The shift formula is: position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        ShiftOrigin(newOrigin: XY): void;
        BufferMove(proxy: b2TreeNode<T>): void;
        UnBufferMove(proxy: b2TreeNode<T>): void;
    }

    /**
     * collision/b2_dynamic_tree.d.ts
     */
    /**
     * A node in the dynamic tree. The client does not interact with this directly.
     */
    export class b2TreeNode<T> {
        readonly id: number;
        /** Enlarged AABB */
        readonly aabb: b2AABB;
        userData: T | null;
        parent: b2TreeNode<T> | null;
        child1: b2TreeNode<T> | null;
        child2: b2TreeNode<T> | null;
        height: number;
        moved: boolean;
        constructor();
        Reset(): void;
        IsLeaf(): boolean;
        GetArea(): number;
        /** Compute the height of a sub-tree. */
        ComputeHeight(): number;
        GetMaxBalance(): number;
        ShiftOrigin(newOrigin: XY): void;
    }
    /**
     * A dynamic AABB tree broad-phase, inspired by Nathanael Presson's btDbvt.
     * A dynamic tree arranges data in a binary tree to accelerate
     * queries such as volume queries and ray casts. Leafs are proxies
     * with an AABB. In the tree we expand the proxy AABB by b2_fatAABBFactor
     * so that the proxy AABB is bigger than the client object. This allows the client
     * object to move by small amounts without triggering a tree update.
     *
     * Nodes are pooled
     */
    export class b2DynamicTree<T> {
        m_root: b2TreeNode<T> | null;
        m_freeList: b2TreeNode<T> | null;
        m_path: number;
        m_stack: b2GrowableStack<b2TreeNode<T>>;
        /**
         * Query an AABB for overlapping proxies. The callback class
         * is called for each proxy that overlaps the supplied AABB.
         */
        Query(aabb: b2AABB, callback: (node: b2TreeNode<T>) => boolean): void;
        QueryPoint(point: XY, callback: (node: b2TreeNode<T>) => boolean): void;
        /**
         * Ray-cast against the proxies in the tree. This relies on the callback
         * to perform a exact ray-cast in the case were the proxy contains a shape.
         * The callback also performs the any collision filtering. This has performance
         * roughly equal to k * log(n), where k is the number of collisions and n is the
         * number of proxies in the tree.
         * @param input the ray-cast input data. The ray extends from p1 to p1 + maxFraction * (p2 - p1).
         * @param callback a callback class that is called for each proxy that is hit by the ray.
         */
        RayCast(input: b2RayCastInput, callback: (input: b2RayCastInput, node: b2TreeNode<T>) => number): void;
        /** Allocate a node from the pool. Grow the pool if necessary. */
        AllocateNode(): b2TreeNode<T>;
        /** Return a node to the pool. */
        FreeNode(node: b2TreeNode<T>): void;
        /**
         * Create a proxy. Provide a tight fitting AABB and a userData pointer.
         * Create a proxy in the tree as a leaf node. We return the index
         * of the node instead of a pointer so that we can grow
         * the node pool.
         */
        CreateProxy(aabb: b2AABB, userData: T): b2TreeNode<T>;
        /** Destroy a proxy. This asserts if the id is invalid. */
        DestroyProxy(node: b2TreeNode<T>): void;
        /**
         * Move a proxy with a swepted AABB. If the proxy has moved outside of its fattened AABB,
         * the function returns immediately.
         * @return true if the proxy was re-inserted.
         */
        MoveProxy(node: b2TreeNode<T>, aabb: b2AABB, displacement: b2Readonly<b2Vec2>): boolean;
        InsertLeaf(leaf: b2TreeNode<T>): void;
        RemoveLeaf(leaf: b2TreeNode<T>): void;
        /**
         * Perform a left or right rotation if node A is imbalanced.
         * Returns the new root index.
         */
        Balance(iA: b2TreeNode<T>): b2TreeNode<T>;
        /**
         * Compute the height of the binary tree in O(N) time. Should not be
         * called often.
         */
        GetHeight(): number;
        /** Get the ratio of the sum of the node areas to the root area. */
        GetAreaRatio(): number;
        /**
         * Get the maximum balance of an node in the tree. The balance is the difference
         * in height of the two children of a node.
         */
        GetMaxBalance(): number;
        /**
         * Shift the world origin. Useful for large worlds.
         * The shift formula is: position -= newOrigin
         * @param newOrigin the new origin with respect to the old origin
         */
        ShiftOrigin(newOrigin: XY): void;
    }

    /**
     * collision/b2_time_of_impact.d.ts
     */
    export const b2Toi: {
        time: number;
        maxTime: number;
        calls: number;
        iters: number;
        maxIters: number;
        rootIters: number;
        maxRootIters: number;
        reset(): void;
    };
    /**
     * Input parameters for b2TimeOfImpact
     */
    export class b2TOIInput {
        readonly proxyA: b2DistanceProxy;
        readonly proxyB: b2DistanceProxy;
        readonly sweepA: b2Sweep;
        readonly sweepB: b2Sweep;
        tMax: number;
    }
    export enum b2TOIOutputState {
        e_unknown = 0,
        e_failed = 1,
        e_overlapped = 2,
        e_touching = 3,
        e_separated = 4
    }
    /**
     * Output parameters for b2TimeOfImpact.
     */
    export class b2TOIOutput {
        state: b2TOIOutputState;
        t: number;
    }
    /**
     * CCD via the local separating axis method. This seeks progression
     * by computing the largest time at which separation is maintained.
     * Compute the upper bound on time before two shapes penetrate. Time is represented as
     * a fraction between [0,tMax]. This uses a swept separating axis and may miss some intermediate,
     * again.
     * Note: use b2Distance to compute the contact point and normal at the time of impact.
     */
    export function b2TimeOfImpact(output: b2TOIOutput, input: b2TOIInput): void;

    /**
     * collision/b2_shape.d.ts
     */
    /**
     * This holds the mass data computed for a shape.
     */
    export class b2MassData {
        /** The mass of the shape, usually in kilograms. */
        mass: number;
        /** The position of the shape's centroid relative to the shape's origin. */
        readonly center: b2Vec2;
        /** The rotational inertia of the shape about the local origin. */
        I: number;
    }
    export enum b2ShapeType {
        e_unknown = -1,
        e_circle = 0,
        e_edge = 1,
        e_polygon = 2,
        e_chain = 3,
        e_typeCount = 4
    }
    /**
     * A shape is used for collision detection. You can create a shape however you like.
     * Shapes used for simulation in b2World are created automatically when a b2Fixture
     * is created. Shapes may encapsulate a one or more child shapes.
     */
    export abstract class b2Shape {
        readonly m_type: b2ShapeType;
        /**
         * Radius of a shape. For polygonal shapes this must be b2_polygonRadius. There is no support for
         * making rounded polygons.
         */
        m_radius: number;
        constructor(type: b2ShapeType, radius: number);
        /**
         * Clone the concrete shape.
         */
        abstract Clone(): b2Shape;
        Copy(other: b2Shape): b2Shape;
        /**
         * Get the type of this shape. You can use this to down cast to the concrete shape.
         *
         * @returns The shape type.
         */
        GetType(): b2ShapeType;
        /**
         * Get the number of child primitives.
         */
        abstract GetChildCount(): number;
        /**
         * Test a point for containment in this shape. This only works for convex shapes.
         *
         * @param xf The shape world transform.
         * @param p A point in world coordinates.
         */
        abstract TestPoint(xf: b2Readonly<b2Transform>, p: XY): boolean;
        /**
         * Cast a ray against a child shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         * @param transform The transform to be applied to the shape.
         * @param childIndex The child shape index
         */
        abstract RayCast(output: b2RayCastOutput, input: b2RayCastInput, transform: b2Readonly<b2Transform>, childIndex: number): boolean;
        /**
         * Given a transform, compute the associated axis aligned bounding box for a child shape.
         *
         * @param aabb Returns the axis aligned box.
         * @param xf The world transform of the shape.
         * @param childIndex The child shape
         */
        abstract ComputeAABB(aabb: b2AABB, xf: b2Readonly<b2Transform>, childIndex: number): void;
        /**
         * Compute the mass properties of this shape using its dimensions and density.
         * The inertia tensor is computed about the local origin.
         *
         * @param massData Returns the mass data for this shape.
         * @param density The density in kilograms per meter squared.
         */
        abstract ComputeMass(massData: b2MassData, density: number): void;
        abstract SetupDistanceProxy(proxy: b2DistanceProxy, index: number): void;
        abstract Draw(draw: b2Draw, color: b2Color): void;
    }

    /**
     * collision/b2_circle_shape.d.ts
     */
    /**
     * A solid circle shape
     */
    export class b2CircleShape extends b2Shape {
        /** Position */
        readonly m_p: b2Vec2;
        constructor(radius?: number);
        Set(position: XY, radius?: number): this;
        /**
         * Implement b2Shape.
         */
        Clone(): b2CircleShape;
        Copy(other: b2CircleShape): b2CircleShape;
        /**
         * @see b2Shape::GetChildCount
         */
        GetChildCount(): number;
        static TestPoint_s_center: b2Vec2;
        static TestPoint_s_d: b2Vec2;
        /**
         * Implement b2Shape.
         */
        TestPoint(transform: b2Readonly<b2Transform>, p: XY): boolean;
        static RayCast_s_position: b2Vec2;
        static RayCast_s_s: b2Vec2;
        static RayCast_s_r: b2Vec2;
        /**
         * Implement b2Shape.
         *
         * @note because the circle is solid, rays that start inside do not hit because the normal is
         * not defined. Collision Detection in Interactive 3D Environments by Gino van den Bergen
         * From Section 3.1.2
         * x = s + a * r
         * norm(x) = radius
         */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, transform: b2Readonly<b2Transform>, _childIndex: number): boolean;
        static ComputeAABB_s_p: b2Vec2;
        /**
         * @see b2Shape::ComputeAABB
         */
        ComputeAABB(aabb: b2AABB, transform: b2Readonly<b2Transform>, _childIndex: number): void;
        /**
         * @see b2Shape::ComputeMass
         */
        ComputeMass(massData: b2MassData, density: number): void;
        SetupDistanceProxy(proxy: b2DistanceProxy, _index: number): void;
        Draw(draw: b2Draw, color: b2Color): void;
    }

    /**
     * collision/b2_polygon_shape.d.ts
     */
    /**
     * A solid convex polygon. It is assumed that the interior of the polygon is to
     * the left of each edge.
     * Polygons have a maximum number of vertices equal to b2_maxPolygonVertices.
     * In most cases you should not need many vertices for a convex polygon.
     */
    export class b2PolygonShape extends b2Shape {
        readonly m_centroid: b2Vec2;
        m_vertices: b2Vec2[];
        m_normals: b2Vec2[];
        m_count: number;
        constructor();
        /**
         * Implement b2Shape.
         */
        Clone(): b2PolygonShape;
        Copy(other: b2PolygonShape): b2PolygonShape;
        /**
         * @see b2Shape::GetChildCount
         */
        GetChildCount(): number;
        /**
         * Create a convex hull from the given array of local points.
         * The count must be in the range [3, b2_maxPolygonVertices].
         *
         * @warning the points may be re-ordered, even if they form a convex polygon
         * @warning if this fails then the polygon is invalid
         * @returns true if valid
         */
        Set(vertices: XY[], count?: number): boolean;
        /**
         * Create a polygon from a given convex hull (see b2ComputeHull).
         * @warning the hull must be valid or this will crash or have unexpected behavior
         */
        SetHull(hull: Readonly<b2Hull>, count: number): b2PolygonShape;
        /**
         * Build vertices to represent an axis-aligned box centered on the local origin.
         *
         * @param hx The half-width.
         * @param hy The half-height.
         * @param center The center of the box in local coordinates.
         * @param angle The rotation of the box in local coordinates.
         */
        SetAsBox(hx: number, hy: number, center?: XY, angle?: number): b2PolygonShape;
        /**
         * @see b2Shape::TestPoint
         */
        TestPoint(xf: b2Readonly<b2Transform>, p: XY): boolean;
        /**
         * Implement b2Shape.
         *
         * @note because the polygon is solid, rays that start inside do not hit because the normal is
         * not defined.
         */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, xf: b2Readonly<b2Transform>, _childIndex: number): boolean;
        /**
         * @see b2Shape::ComputeAABB
         */
        ComputeAABB(aabb: b2AABB, xf: b2Readonly<b2Transform>, _childIndex: number): void;
        /**
         * @see b2Shape::ComputeMass
         */
        ComputeMass(massData: b2MassData, density: number): void;
        /**
         * Validate convexity. This is a very time consuming operation.
         * @returns true if valid
         */
        Validate(): boolean;
        SetupDistanceProxy(proxy: b2DistanceProxy, _index: number): void;
        Draw(draw: b2Draw, color: b2Color): void;
    }

    /**
     * collision/b2_edge_shape.d.ts
     */
    /**
     * A line segment (edge) shape. These can be connected in chains or loops
     * to other edge shapes. Edges created independently are two-sided and do
     * no provide smooth movement across junctions.
     */
    export class b2EdgeShape extends b2Shape {
        /** These are the edge vertices */
        readonly m_vertex1: b2Vec2;
        readonly m_vertex2: b2Vec2;
        /** Optional adjacent vertices. These are used for smooth collision. */
        readonly m_vertex0: b2Vec2;
        readonly m_vertex3: b2Vec2;
        /** Uses m_vertex0 and m_vertex3 to create smooth collision. */
        m_oneSided: boolean;
        constructor();
        /**
         * Set this as a part of a sequence. Vertex v0 precedes the edge and vertex v3
         * follows. These extra vertices are used to provide smooth movement
         * across junctions. This also makes the collision one-sided. The edge
         * normal points to the right looking from v1 to v2.
         */
        SetOneSided(v0: XY, v1: XY, v2: XY, v3: XY): b2EdgeShape;
        /**
         * Set this as an isolated edge. Collision is two-sided.
         */
        SetTwoSided(v1: XY, v2: XY): b2EdgeShape;
        /**
         * Implement b2Shape.
         */
        Clone(): b2EdgeShape;
        Copy(other: b2EdgeShape): b2EdgeShape;
        /**
         * @see b2Shape::GetChildCount
         */
        GetChildCount(): number;
        /**
         * @see b2Shape::TestPoint
         */
        TestPoint(_xf: b2Readonly<b2Transform>, _p: XY): boolean;
        static RayCast_s_p1: b2Vec2;
        static RayCast_s_p2: b2Vec2;
        static RayCast_s_d: b2Vec2;
        static RayCast_s_e: b2Vec2;
        static RayCast_s_q: b2Vec2;
        static RayCast_s_r: b2Vec2;
        /**
         * Implement b2Shape.
         *
         * p = p1 + t * d
         * v = v1 + s * e
         * p1 + t * d = v1 + s * e
         * s * e - t * d = p1 - v1
         */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, xf: b2Readonly<b2Transform>, _childIndex: number): boolean;
        static ComputeAABB_s_v1: b2Vec2;
        static ComputeAABB_s_v2: b2Vec2;
        /**
         * @see b2Shape::ComputeAABB
         */
        ComputeAABB(aabb: b2AABB, xf: b2Readonly<b2Transform>, _childIndex: number): void;
        /**
         * @see b2Shape::ComputeMass
         */
        ComputeMass(massData: b2MassData, _density: number): void;
        SetupDistanceProxy(proxy: b2DistanceProxy, _index: number): void;
        Draw(draw: b2Draw, color: b2Color): void;
    }

    /**
     * collision/b2_chain_shape.d.ts
     */
    /**
     * A chain shape is a free form sequence of line segments.
     * The chain has one-sided collision, with the surface normal pointing to the right of the edge.
     * This provides a counter-clockwise winding like the polygon shape.
     * Connectivity information is used to create smooth collisions.
     *
     * @warning the chain will not collide properly if there are self-intersections.
     */
    export class b2ChainShape extends b2Shape {
        m_vertices: b2Vec2[];
        readonly m_prevVertex: b2Vec2;
        readonly m_nextVertex: b2Vec2;
        constructor();
        /**
         * Create a loop. This automatically adjusts connectivity.
         *
         * @param vertices An array of vertices, these are copied
         * @param count The vertex count
         */
        CreateLoop(vertices: XY[], count?: number): b2ChainShape;
        /**
         * Create a chain with ghost vertices to connect multiple chains together.
         *
         * @param vertices An array of vertices, these are copied
         * @param count The vertex count
         * @param prevVertex Previous vertex from chain that connects to the start
         * @param nextVertex Next vertex from chain that connects to the end
         */
        CreateChain(vertices: XY[], count: number, prevVertex: Readonly<XY>, nextVertex: Readonly<XY>): b2ChainShape;
        /**
         * Implement b2Shape. Vertices are cloned using b2Alloc.
         */
        Clone(): b2ChainShape;
        Copy(other: b2ChainShape): b2ChainShape;
        /**
         * @see b2Shape::GetChildCount
         */
        GetChildCount(): number;
        /**
         * Get a child edge.
         */
        GetChildEdge(edge: b2EdgeShape, index: number): void;
        /**
         * This always return false.
         *
         * @see b2Shape::TestPoint
         */
        TestPoint(_xf: b2Readonly<b2Transform>, _p: XY): boolean;
        static RayCast_s_edgeShape: b2EdgeShape;
        /**
         * Implement b2Shape.
         */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, xf: b2Readonly<b2Transform>, childIndex: number): boolean;
        static ComputeAABB_s_v1: b2Vec2;
        static ComputeAABB_s_v2: b2Vec2;
        static ComputeAABB_s_lower: b2Vec2;
        static ComputeAABB_s_upper: b2Vec2;
        /**
         * @see b2Shape::ComputeAABB
         */
        ComputeAABB(aabb: b2AABB, xf: b2Readonly<b2Transform>, childIndex: number): void;
        /**
         * Chains have zero mass.
         *
         * @see b2Shape::ComputeMass
         */
        ComputeMass(massData: b2MassData, _density: number): void;
        SetupDistanceProxy(proxy: b2DistanceProxy, index: number): void;
        Draw(draw: b2Draw, color: b2Color): void;
    }

    /**
     * collision/b2_collide_circle.d.ts
     */
    export function b2CollideCircles(manifold: b2Manifold, circleA: b2CircleShape, xfA: b2Readonly<b2Transform>, circleB: b2CircleShape, xfB: b2Readonly<b2Transform>): void;
    export function b2CollidePolygonAndCircle(manifold: b2Manifold, polygonA: b2PolygonShape, xfA: b2Readonly<b2Transform>, circleB: b2CircleShape, xfB: b2Readonly<b2Transform>): void;

    /**
     * collision/b2_collide_polygon.d.ts
     */
    /**
     * Find edge normal of max separation on A - return if separating axis is found
     * Find edge normal of max separation on B - return if separation axis is found
     * Choose reference edge as min(minA, minB)
     * Find incident edge
     * Clip

     * The normal points from 1 to 2
     */
    export function b2CollidePolygons(manifold: b2Manifold, polyA: b2PolygonShape, xfA: b2Readonly<b2Transform>, polyB: b2PolygonShape, xfB: b2Readonly<b2Transform>): void;

    /**
     * collision/b2_collide_edge.d.ts
     */
    /**
     * Compute contact points for edge versus circle.
     * This accounts for edge connectivity.
     */
    export function b2CollideEdgeAndCircle(manifold: b2Manifold, edgeA: b2EdgeShape, xfA: b2Readonly<b2Transform>, circleB: b2CircleShape, xfB: b2Readonly<b2Transform>): void;
    export function b2CollideEdgeAndPolygon(manifold: b2Manifold, edgeA: b2EdgeShape, xfA: b2Readonly<b2Transform>, polygonB: b2PolygonShape, xfB: b2Readonly<b2Transform>): void;

    /**
     * dynamics/b2_time_step.d.ts
     */
    /**
     * Profiling data. Times are in milliseconds.
     */
    export class b2Profile {
        step: number;
        collide: number;
        solve: number;
        solveInit: number;
        solveVelocity: number;
        solvePosition: number;
        broadphase: number;
        solveTOI: number;
        Reset(): this;
    }
    export interface b2StepConfig {
        velocityIterations: number;
        positionIterations: number;
    }
    /**
     * This is an internal structure.
     */
    export class b2TimeStep {
        dt: number;
        inv_dt: number;
        dtRatio: number;
        config: b2StepConfig;
        warmStarting: boolean;
        constructor();
        static Create(): b2TimeStep;
        Copy(step: b2TimeStep): b2TimeStep;
    }
    /**
     * This is an internal structure.
     */
    export class b2Position {
        readonly c: b2Vec2;
        a: number;
    }
    /**
     * This is an internal structure.
     */
    export class b2Velocity {
        readonly v: b2Vec2;
        w: number;
    }
    /**
     * Solver Data
     */
    export class b2SolverData {
        readonly step: b2TimeStep;
        positions: b2Position[];
        velocities: b2Velocity[];
    }

    /**
     * dynamics/b2_world_callbacks.d.ts
     */
    /**
     * Joints and fixtures are destroyed when their associated
     * body is destroyed. Implement this listener so that you
     * may nullify references to these joints and shapes.
     */
    export class b2DestructionListener {
        /**
         * Called when any joint is about to be destroyed due
         * to the destruction of one of its attached bodies.
         */
        SayGoodbyeJoint(_joint: b2Joint): void;
        /**
         * Called when any fixture is about to be destroyed due
         * to the destruction of its parent body.
         */
        SayGoodbyeFixture(_fixture: b2Fixture): void;
    }
    /**
     * Implement this class to provide collision filtering. In other words, you can implement
     * this class if you want finer control over contact creation.
     */
    export class b2ContactFilter {
        /**
         * Return true if contact calculations should be performed between these two shapes.
         *
         * @warning for performance reasons this is only called when the AABBs begin to overlap.
         */
        ShouldCollide(fixtureA: b2Fixture, fixtureB: b2Fixture): boolean;
        static readonly b2_defaultFilter: b2ContactFilter;
    }
    /**
     * Contact impulses for reporting. Impulses are used instead of forces because
     * sub-step forces may approach infinity for rigid body collisions. These
     * match up one-to-one with the contact points in b2Manifold.
     */
    export class b2ContactImpulse {
        normalImpulses: number[];
        tangentImpulses: number[];
        count: number;
    }
    /**
     * Implement this class to get contact information. You can use these results for
     * things like sounds and game logic. You can also get contact results by
     * traversing the contact lists after the time step. However, you might miss
     * some contacts because continuous physics leads to sub-stepping.
     * Additionally you may receive multiple callbacks for the same contact in a
     * single time step.
     * You should strive to make your callbacks efficient because there may be
     * many callbacks per time step.
     *
     * @warning You cannot create/destroy Box2D entities inside these callbacks.
     */
    export class b2ContactListener {
        /**
         * Called when two fixtures begin to touch.
         */
        BeginContact(_contact: b2Contact): void;
        /**
         * Called when two fixtures cease to touch.
         */
        EndContact(_contact: b2Contact): void;
        /**
         * This is called after a contact is updated. This allows you to inspect a
         * contact before it goes to the solver. If you are careful, you can modify the
         * contact manifold (e.g. disable contact).
         * A copy of the old manifold is provided so that you can detect changes.
         * Note: this is called only for awake bodies.
         * Note: this is called even when the number of contact points is zero.
         * Note: this is not called for sensors.
         * Note: if you set the number of contact points to zero, you will not
         * get an EndContact callback. However, you may get a BeginContact callback
         * the next step.
         */
        PreSolve(_contact: b2Contact, _oldManifold: b2Manifold): void;
        /**
         * This lets you inspect a contact after the solver is finished. This is useful
         * for inspecting impulses.
         * Note: the contact manifold does not include time of impact impulses, which can be
         * arbitrarily large if the sub-step is small. Hence the impulse is provided explicitly
         * in a separate data structure.
         * Note: this is only called for contacts that are touching, solid, and awake.
         */
        PostSolve(_contact: b2Contact, _impulse: b2ContactImpulse): void;
        static readonly b2_defaultListener: b2ContactListener;
    }
    /**
     * Callback class for AABB queries
     * See b2World::Query
     */
    export type b2QueryCallback = (fixture: b2Fixture) => boolean;
    /**
     * Callback class for ray casts.
     * See b2World::RayCast
     * Called for each fixture found in the query. You control how the ray cast
     * proceeds by returning a float:
     * return -1: ignore this fixture and continue
     * return 0: terminate the ray cast
     * return fraction: clip the ray to this point
     * return 1: don't clip the ray and continue
     *
     * @param fixture The fixture hit by the ray
     * @param point The point of initial intersection
     * @param normal The normal vector at the point of intersection
     * @param fraction The fraction along the ray at the point of intersection
     * @returns -1 to filter, 0 to terminate, fraction to clip the ray for
     * closest hit, 1 to continue
     */
    export type b2RayCastCallback = (fixture: b2Fixture, point: b2Readonly<b2Vec2>, normal: b2Readonly<b2Vec2>, fraction: number) => number;

    /**
     * dynamics/b2_fixture.d.ts
     */
    /**
     * This holds contact filtering data.
     */
    export interface b2Filter {
        /** The collision category bits. Normally you would just set one bit. */
        categoryBits: number;
        /**
         * The collision mask bits. This states the categories that this
         * shape would accept for collision.
         */
        maskBits: number;
        /**
         * Collision groups allow a certain group of objects to never collide (negative)
         * or always collide (positive). Zero means no collision group. Non-zero group
         * filtering always wins against the mask bits.
         */
        groupIndex: number;
    }
    export const b2DefaultFilter: Readonly<b2Filter>;
    /**
     * A fixture definition is used to create a fixture. This class defines an
     * abstract fixture definition. You can reuse fixture definitions safely.
     */
    export class b2FixtureDef {
        /**
         * The shape, this must be set. The shape will be cloned, so you
         * can create the shape on the stack.
         */
        shape: b2Shape;
        /** Use this to store application specific fixture data. */
        userData?: b2FixtureUserData;
        /** The friction coefficient, usually in the range [0,1]. */
        friction?: number;
        /** The restitution (elasticity) usually in the range [0,1]. */
        restitution?: number;
        /**
         * Restitution velocity threshold, usually in m/s. Collisions above this
         * speed have restitution applied (will bounce).
         */
        restitutionThreshold?: number;
        /** The density, usually in kg/m^2. */
        density?: number;
        /**
         * A sensor shape collects contact information but never generates a collision
         * response.
         */
        isSensor?: boolean;
        /** Contact filtering data. */
        filter?: Partial<b2Filter>;
    }
    /**
     * This proxy is used internally to connect fixtures to the broad-phase.
     */
    export class b2FixtureProxy {
        readonly aabb: b2AABB;
        readonly fixture: b2Fixture;
        readonly childIndex: number;
        readonly treeNode: b2TreeNode<b2FixtureProxy>;
        constructor(fixture: b2Fixture, broadPhase: b2BroadPhase<b2FixtureProxy>, xf: b2Readonly<b2Transform>, childIndex: number);
    }
    /**
     * A fixture is used to attach a shape to a body for collision detection. A fixture
     * inherits its transform from its parent. Fixtures hold additional non-geometric data
     * such as friction, collision filters, etc.
     * Fixtures are created via b2Body::CreateFixture.
     *
     * @warning you cannot reuse fixtures.
     */
    export class b2Fixture {
        protected m_density: number;
        protected m_next: b2Fixture | null;
        protected readonly m_body: b2Body;
        protected readonly m_shape: b2Shape;
        protected m_friction: number;
        protected m_restitution: number;
        protected m_restitutionThreshold: number;
        protected readonly m_proxies: b2FixtureProxy[];
        protected get m_proxyCount(): number;
        protected readonly m_filter: b2Filter;
        protected m_isSensor: boolean;
        protected readonly m_userData: b2FixtureUserData;
        protected constructor(body: b2Body, def: b2FixtureDef);
        /**
         * Get the type of the child shape. You can use this to down cast to the concrete shape.
         *
         * @returns The shape type.
         */
        GetType(): b2ShapeType;
        /**
         * Get the child shape. You can modify the child shape, however you should not change the
         * number of vertices because this will crash some collision caching mechanisms.
         * Manipulating the shape may lead to non-physical behavior.
         */
        GetShape(): b2Shape;
        /**
         * Set if this fixture is a sensor.
         */
        SetSensor(sensor: boolean): void;
        /**
         * Is this fixture a sensor (non-solid)?
         *
         * @returns The true if the shape is a sensor.
         */
        IsSensor(): boolean;
        /**
         * Set the contact filtering data. This will not update contacts until the next time
         * step when either parent body is active and awake.
         * This automatically calls Refilter.
         */
        SetFilterData(filter: Readonly<Partial<b2Filter>>): void;
        /**
         * Get the contact filtering data.
         */
        GetFilterData(): Readonly<b2Filter>;
        /**
         * Call this if you want to establish collision that was previously disabled by b2ContactFilter::ShouldCollide.
         */
        Refilter(): void;
        /**
         * Get the parent body of this fixture.
         *
         * @returns The parent body.
         */
        GetBody(): b2Body;
        /**
         * Get the next fixture in the parent body's fixture list.
         *
         * @returns The next shape.
         */
        GetNext(): b2Fixture | null;
        /**
         * Get the user data that was assigned in the fixture definition. Use this to
         * store your application specific data.
         */
        GetUserData(): b2FixtureUserData;
        /**
         * Set the user data. Use this to store your application specific data.
         * This is a merge operation. Only specified keys will be overridden.
         */
        SetUserData(data: b2FixtureUserData): void;
        /**
         * Test a point for containment in this fixture.
         *
         * @param p A point in world coordinates.
         */
        TestPoint(p: XY): boolean;
        /**
         * Cast a ray against this shape.
         *
         * @param output The ray-cast results.
         * @param input The ray-cast input parameters.
         */
        RayCast(output: b2RayCastOutput, input: b2RayCastInput, childIndex: number): boolean;
        /**
         * Get the mass data for this fixture. The mass data is based on the density and
         * the shape. The rotational inertia is about the shape's origin. This operation
         * may be expensive.
         */
        GetMassData(massData?: b2MassData): b2MassData;
        /**
         * Set the density of this fixture. This will _not_ automatically adjust the mass
         * of the body. You must call b2Body::ResetMassData to update the body's mass.
         */
        SetDensity(density: number): void;
        /**
         * Get the density of this fixture.
         */
        GetDensity(): number;
        /**
         * Get the coefficient of friction.
         */
        GetFriction(): number;
        /**
         * Set the coefficient of friction. This will _not_ change the friction of
         * existing contacts.
         */
        SetFriction(friction: number): void;
        /**
         * Get the coefficient of restitution.
         */
        GetRestitution(): number;
        /**
         * Set the coefficient of restitution. This will _not_ change the restitution of
         * existing contacts.
         */
        SetRestitution(restitution: number): void;
        /** Get the restitution velocity threshold. */
        GetRestitutionThreshold(): number;
        /**
         * Set the restitution threshold. This will _not_ change the restitution threshold of
         * existing contacts.
         */
        SetRestitutionThreshold(threshold: number): void;
        /**
         * Get the fixture's AABB. This AABB may be enlarge and/or stale.
         * If you need a more accurate AABB, compute it using the shape and
         * the body transform.
         */
        GetAABB(childIndex: number): Readonly<b2AABB>;
        /**
         * These support body activation/deactivation.
         */
        protected CreateProxies(broadPhase: b2BroadPhase<b2FixtureProxy>, xf: b2Readonly<b2Transform>): void;
        protected DestroyProxies(broadPhase: b2BroadPhase<b2FixtureProxy>): void;
        protected Synchronize(
            broadPhase: b2BroadPhase<b2FixtureProxy>,
            transform1: b2Readonly<b2Transform>,
            transform2: b2Readonly<b2Transform>
        ): void;
    }

    /**
     * dynamics/b2_body.d.ts
     */
    /**
     * The body type.
     * static: zero mass, zero velocity, may be manually moved
     * kinematic: zero mass, non-zero velocity set by user, moved by solver
     * dynamic: positive mass, non-zero velocity determined by forces, moved by solver
     */
    export enum b2BodyType {
        b2_staticBody = 0,
        b2_kinematicBody = 1,
        b2_dynamicBody = 2
    }
    /**
     * A body definition holds all the data needed to construct a rigid body.
     * You can safely re-use body definitions. Shapes are added to a body after construction.
     */
    export class b2BodyDef {
        /**
         * The body type: static, kinematic, or dynamic.
         * Note: if a dynamic body would have zero mass, the mass is set to one.
         */
        type?: b2BodyType;
        /**
         * The world position of the body. Avoid creating bodies at the origin
         * since this can lead to many overlapping shapes.
         */
        position?: XY;
        /** The world angle of the body in radians. */
        angle?: number;
        /** The linear velocity of the body's origin in world co-ordinates. */
        linearVelocity?: XY;
        /** The angular velocity of the body. */
        angularVelocity?: number;
        /**
         * Linear damping is use to reduce the linear velocity. The damping parameter
         * can be larger than 1   but the damping effect becomes sensitive to the
         * time step when the damping parameter is large.
         * Units are 1/time
         */
        linearDamping?: number;
        /**
         * Angular damping is use to reduce the angular velocity. The damping parameter
         * can be larger than 1   but the damping effect becomes sensitive to the
         * time step when the damping parameter is large.
         * Units are 1/time
         */
        angularDamping?: number;
        /**
         * Set this flag to false if this body should never fall asleep. Note that
         * this increases CPU usage.
         */
        allowSleep?: boolean;
        /** Is this body initially awake or sleeping? */
        awake?: boolean;
        /** Should this body be prevented from rotating? Useful for characters. */
        fixedRotation?: boolean;
        /**
         * Is this a fast moving body that should be prevented from tunneling through
         * other moving bodies? Note that all bodies are prevented from tunneling through
         * kinematic and static bodies. This setting is only considered on dynamic bodies.
         *
         * @warning You should use this flag sparingly since it increases processing time.
         */
        bullet?: boolean;
        /** Does this body start out enabled? */
        enabled?: boolean;
        /** Use this to store application specific body data. */
        userData?: b2BodyUserData;
        /** Scale the gravity applied to this body. */
        gravityScale?: number;
    }
    /**
     * A rigid body. These are created via b2World::CreateBody.
     */
    export class b2Body {
        m_type: b2BodyType;
        m_islandFlag: boolean;
        m_awakeFlag: boolean;
        m_autoSleepFlag: boolean;
        m_bulletFlag: boolean;
        m_fixedRotationFlag: boolean;
        m_enabledFlag: boolean;
        m_toiFlag: boolean;
        m_islandIndex: number;
        readonly m_xf: b2Transform;
        readonly m_sweep: b2Sweep;
        readonly m_linearVelocity: b2Vec2;
        m_angularVelocity: number;
        readonly m_force: b2Vec2;
        m_torque: number;
        readonly m_world: b2World;
        m_prev: b2Body | null;
        m_next: b2Body | null;
        m_fixtureList: b2Fixture | null;
        m_fixtureCount: number;
        m_jointList: b2JointEdge | null;
        m_contactList: b2ContactEdge | null;
        m_mass: number;
        m_invMass: number;
        m_I: number;
        m_invI: number;
        m_linearDamping: number;
        m_angularDamping: number;
        m_gravityScale: number;
        m_sleepTime: number;
        readonly m_userData: b2BodyUserData;
        constructor(bd: b2BodyDef, world: b2World);
        /**
         * Creates a fixture and attach it to this body. Use this function if you need
         * to set some fixture parameters, like friction. Otherwise you can create the
         * fixture directly from a shape.
         * If the density is non-zero, this function automatically updates the mass of the body.
         * Contacts are not created until the next time step.
         *
         * @param def The fixture definition.
         * @warning This function is locked during callbacks.
         */
        CreateFixture(def: b2FixtureDef): b2Fixture;
        /**
         * Destroy a fixture. This removes the fixture from the broad-phase and
         * destroys all contacts associated with this fixture. This will
         * automatically adjust the mass of the body if the body is dynamic and the
         * fixture has positive density.
         * All fixtures attached to a body are implicitly destroyed when the body is destroyed.
         *
         * @param fixture The fixture to be removed.
         * @warning This function is locked during callbacks.
         */
        DestroyFixture(fixture: b2Fixture): void;
        /**
         * Set the position of the body's origin and rotation.
         * This breaks any contacts and wakes the other bodies.
         * Manipulating a body's transform may cause non-physical behavior.
         *
         * @param position The world position of the body's local origin.
         * @param angle The world rotation in radians.
         */
        SetTransformVec(position: XY, angle: number): void;
        SetTransformXY(x: number, y: number, angle: number): void;
        SetTransform(xf: b2Readonly<b2Transform>): void;
        /**
         * Get the body transform for the body's origin.
         *
         * @returns The world transform of the body's origin.
         */
        GetTransform(): b2Readonly<b2Transform>;
        /**
         * Get the world body origin position.
         *
         * @returns The world position of the body's origin.
         */
        GetPosition(): b2Readonly<b2Vec2>;
        /**
         * Get the angle in radians.
         *
         * @returns The current world rotation angle in radians.
         */
        GetAngle(): number;
        SetAngle(angle: number): void;
        /**
         * Get the world position of the center of mass.
         */
        GetWorldCenter(): b2Readonly<b2Vec2>;
        /**
         * Get the local position of the center of mass.
         */
        GetLocalCenter(): b2Readonly<b2Vec2>;
        /**
         * Set the linear velocity of the center of mass.
         *
         * @param v The new linear velocity of the center of mass.
         */
        SetLinearVelocity(v: XY): void;
        /**
         * Get the linear velocity of the center of mass.
         *
         * @returns The linear velocity of the center of mass.
         */
        GetLinearVelocity(): b2Readonly<b2Vec2>;
        /**
         * Set the angular velocity.
         *
         * @param omega The new angular velocity in radians/second.
         */
        SetAngularVelocity(w: number): void;
        /**
         * Get the angular velocity.
         *
         * @returns The angular velocity in radians/second.
         */
        GetAngularVelocity(): number;
        /**
         * Apply a force at a world point. If the force is not
         * applied at the center of mass, it will generate a torque and
         * affect the angular velocity. This wakes up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        ApplyForce(force: XY, point: XY, wake?: boolean): void;
        /**
         * Apply a force to the center of mass. This wakes up the body.
         *
         * @param force The world force vector, usually in Newtons (N).
         * @param wake Also wake up the body
         */
        ApplyForceToCenter(force: XY, wake?: boolean): void;
        /**
         * Apply a torque. This affects the angular velocity
         * without affecting the linear velocity of the center of mass.
         *
         * @param torque About the z-axis (out of the screen), usually in N-m.
         * @param wake Also wake up the body
         */
        ApplyTorque(torque: number, wake?: boolean): void;
        /**
         * Apply an impulse at a point. This immediately modifies the velocity.
         * It also modifies the angular velocity if the point of application
         * is not at the center of mass. This wakes up the body.
         *
         * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
         * @param point The world position of the point of application.
         * @param wake Also wake up the body
         */
        ApplyLinearImpulse(impulse: XY, point: XY, wake?: boolean): void;
        /**
         * Apply an impulse to the center of mass. This immediately modifies the velocity.
         *
         * @param impulse The world impulse vector, usually in N-seconds or kg-m/s.
         * @param wake Also wake up the body
         */
        ApplyLinearImpulseToCenter(impulse: XY, wake?: boolean): void;
        /**
         * Apply an angular impulse.
         *
         * @param impulse The angular impulse in units of kg*m*m/s
         * @param wake Also wake up the body
         */
        ApplyAngularImpulse(impulse: number, wake?: boolean): void;
        /**
         * Get the total mass of the body.
         *
         * @returns The mass, usually in kilograms (kg).
         */
        GetMass(): number;
        /**
         * Get the rotational inertia of the body about the local origin.
         *
         * @returns The rotational inertia, usually in kg-m^2.
         */
        GetInertia(): number;
        /**
         * Get the mass data of the body.
         *
         * @returns A struct containing the mass, inertia and center of the body.
         */
        GetMassData(data: b2MassData): b2MassData;
        static SetMassData_s_oldCenter: b2Vec2;
        /**
         * Set the mass properties to override the mass properties of the fixtures.
         * Note that this changes the center of mass position.
         * Note that creating or destroying fixtures can also alter the mass.
         * This function has no effect if the body isn't dynamic.
         *
         * @param massData The mass properties.
         */
        SetMassData(massData: b2MassData): void;
        static ResetMassData_s_localCenter: b2Vec2;
        static ResetMassData_s_oldCenter: b2Vec2;
        static ResetMassData_s_massData: b2MassData;
        /**
         * This resets the mass properties to the sum of the mass properties of the fixtures.
         * This normally does not need to be called unless you called SetMassData to override
         * the mass and you later want to reset the mass.
         */
        ResetMassData(): void;
        /**
         * Get the world coordinates of a point given the local coordinates.
         *
         * @param localPoint A point on the body measured relative the the body's origin.
         * @returns The same point expressed in world coordinates.
         */
        GetWorldPoint<T extends XY>(localPoint: Readonly<XY>, out: T): T;
        /**
         * Get the world coordinates of a vector given the local coordinates.
         *
         * @param localVector A vector fixed in the body.
         * @returns The same vector expressed in world coordinates.
         */
        GetWorldVector<T extends XY>(localVector: Readonly<XY>, out: T): T;
        /**
         * Gets a local point relative to the body's origin given a world point.
         *
         * @param a Point in world coordinates.
         * @returns The corresponding local point relative to the body's origin.
         */
        GetLocalPoint<T extends XY>(worldPoint: Readonly<XY>, out: T): T;
        /**
         * Gets a local vector given a world vector.
         *
         * @param a Vector in world coordinates.
         * @returns The corresponding local vector.
         */
        GetLocalVector<T extends XY>(worldVector: Readonly<XY>, out: T): T;
        /**
         * Get the world linear velocity of a world point attached to this body.
         *
         * @param a Point in world coordinates.
         * @returns The world velocity of a point.
         */
        GetLinearVelocityFromWorldPoint<T extends XY>(worldPoint: Readonly<XY>, out: T): T;
        /**
         * Get the world velocity of a local point.
         *
         * @param a Point in local coordinates.
         * @returns The world velocity of a point.
         */
        GetLinearVelocityFromLocalPoint<T extends XY>(localPoint: Readonly<XY>, out: T): T;
        /**
         * Get the linear damping of the body.
         */
        GetLinearDamping(): number;
        /**
         * Set the linear damping of the body.
         */
        SetLinearDamping(linearDamping: number): void;
        /**
         * Get the angular damping of the body.
         */
        GetAngularDamping(): number;
        /**
         * Set the angular damping of the body.
         */
        SetAngularDamping(angularDamping: number): void;
        /**
         * Get the gravity scale of the body.
         */
        GetGravityScale(): number;
        /**
         * Set the gravity scale of the body.
         */
        SetGravityScale(scale: number): void;
        /**
         * Set the type of this body. This may alter the mass and velocity.
         */
        SetType(type: b2BodyType): void;
        /**
         * Get the type of this body.
         */
        GetType(): b2BodyType;
        /**
         * Should this body be treated like a bullet for continuous collision detection?
         */
        SetBullet(flag: boolean): void;
        /**
         * Is this body treated like a bullet for continuous collision detection?
         */
        IsBullet(): boolean;
        /**
         * You can disable sleeping on this body. If you disable sleeping, the
         * body will be woken.
         */
        SetSleepingAllowed(flag: boolean): void;
        /**
         * Is this body allowed to sleep
         */
        IsSleepingAllowed(): boolean;
        /**
         * Set the sleep state of the body. A sleeping body has very
         * low CPU cost.
         *
         * @param flag Set to true to wake the body, false to put it to sleep.
         */
        SetAwake(flag: boolean): void;
        /**
         * Get the sleeping state of this body.
         *
         * @returns true if the body is awake.
         */
        IsAwake(): boolean;
        /**
         * Allow a body to be disabled. A disabled body is not simulated and cannot
         * be collided with or woken up.
         * If you pass a flag of true, all fixtures will be added to the broad-phase.
         * If you pass a flag of false, all fixtures will be removed from the
         * broad-phase and all contacts will be destroyed.
         * Fixtures and joints are otherwise unaffected. You may continue
         * to create/destroy fixtures and joints on disabled bodies.
         * Fixtures on a disabled body are implicitly disabled and will
         * not participate in collisions, ray-casts, or queries.
         * Joints connected to a disabled body are implicitly disabled.
         * An disabled body is still owned by a b2World object and remains
         * in the body list.
         */
        SetEnabled(flag: boolean): void;
        /**
         * Get the active state of the body.
         */
        IsEnabled(): boolean;
        /**
         * Set this body to have fixed rotation. This causes the mass
         * to be reset.
         */
        SetFixedRotation(flag: boolean): void;
        /**
         * Does this body have fixed rotation?
         */
        IsFixedRotation(): boolean;
        /**
         * Get the list of all fixtures attached to this body.
         */
        GetFixtureList(): b2Fixture | null;
        /**
         * Get the list of all joints attached to this body.
         */
        GetJointList(): b2JointEdge | null;
        /**
         * Get the list of all contacts attached to this body.
         *
         * @warning this list changes during the time step and you may
         * miss some collisions if you don't use b2ContactListener.
         */
        GetContactList(): b2ContactEdge | null;
        /**
         * Get the next body in the world's body list.
         */
        GetNext(): b2Body | null;
        /**
         * Get the user data reference that was provided in the body definition.
         */
        GetUserData(): b2BodyUserData;
        /**
         * Set the user data. Use this to store your application specific data.
         * This is a merge operation. Only specified keys will be overridden.
         */
        SetUserData(data: b2BodyUserData): void;
        /**
         * Get the parent world of this body.
         */
        GetWorld(): b2World;
        static SynchronizeFixtures_s_xf1: b2Transform;
        SynchronizeFixtures(): void;
        SynchronizeTransform(): void;
        ShouldCollide(other: b2Body): boolean;
        ShouldCollideConnected(other: b2Body): boolean;
        Advance(alpha: number): void;
    }

    /**
     * dynamics/b2_contact.d.ts
     */
    /**
     * Friction mixing law. The idea is to allow either fixture to drive the friction to zero.
     * For example, anything slides on ice.
     */
    export function b2MixFriction(friction1: number, friction2: number): number;
    /**
     * Restitution mixing law. The idea is allow for anything to bounce off an inelastic surface.
     * For example, a superball bounces on anything.
     */
    export function b2MixRestitution(restitution1: number, restitution2: number): number;
    /**
     * Restitution mixing law. This picks the lowest value.
     */
    export function b2MixRestitutionThreshold(threshold1: number, threshold2: number): number;
    /**
     * A contact edge is used to connect bodies and contacts together
     * in a contact graph where each body is a node and each contact
     * is an edge. A contact edge belongs to a doubly linked list
     * maintained in each attached body. Each contact has two contact
     * nodes, one for each attached body.
     */
    export class b2ContactEdge {
        /** Provides quick access to the other body attached. */
        m_other: b2Body | null;
        get other(): b2Body;
        set other(value: b2Body);
        /** The contact */
        readonly contact: b2Contact;
        /** The previous contact edge in the body's contact list */
        prev: b2ContactEdge | null;
        /** The next contact edge in the body's contact list */
        next: b2ContactEdge | null;
        constructor(contact: b2Contact);
        Reset(): void;
    }
    /**
     * The class manages contact between two shapes. A contact exists for each overlapping
     * AABB in the broad-phase (except if filtered). Therefore a contact object may exist
     * that has no contact points.
     */
    export abstract class b2Contact<A extends b2Shape = b2Shape, B extends b2Shape = b2Shape> {
        /**
         * Used when crawling contact graph when forming islands.
         */
        protected m_islandFlag: boolean;
        /**
         * Set when the shapes are touching.
         */
        protected m_touchingFlag: boolean;
        /**
         * This contact can be disabled (by user)
         */
        protected m_enabledFlag: boolean;
        /**
         * This contact needs filtering because a fixture filter was changed.
         */
        protected m_filterFlag: boolean;
        /**
         * This bullet contact had a TOI event
         */
        protected m_bulletHitFlag: boolean;
        /**
         * This contact has a valid TOI in m_toi
         */
        protected m_toiFlag: boolean;
        /**
         * World pool and list pointers.
         */
        protected m_prev: b2Contact | null;
        protected m_next: b2Contact | null;
        /**
         * Nodes for connecting bodies.
         */
        protected readonly m_nodeA: b2ContactEdge;
        protected readonly m_nodeB: b2ContactEdge;
        protected m_fixtureA: b2Fixture;
        protected m_fixtureB: b2Fixture;
        protected m_indexA: number;
        protected m_indexB: number;
        protected m_manifold: b2Manifold;
        protected m_toiCount: number;
        protected m_toi: number;
        protected m_friction: number;
        protected m_restitution: number;
        protected m_restitutionThreshold: number;
        protected m_tangentSpeed: number;
        protected m_oldManifold: b2Manifold;
        /**
         * Get the contact manifold.
         * Do not modify the manifold unless you understand the internals of Box2D.
         */
        GetManifold(): b2Manifold;
        /** Get the world manifold. */
        GetWorldManifold(worldManifold: b2WorldManifold): void;
        /** Is this contact touching? */
        IsTouching(): boolean;
        /**
         * Enable/disable this contact. This can be used inside the pre-solve
         * contact listener. The contact is only disabled for the current
         * time step (or sub-step in continuous collisions).
         */
        SetEnabled(flag: boolean): void;
        /** Has this contact been disabled? */
        IsEnabled(): boolean;
        /** Get the next contact in the world's contact list. */
        GetNext(): b2Contact | null;
        /** Get fixture A in this contact. */
        GetFixtureA(): b2Fixture;
        /** Get the child primitive index for fixture A. */
        GetChildIndexA(): number;
        /** Get fixture A in this contact. */
        GetShapeA(): A;
        /** Get fixture B in this contact. */
        GetFixtureB(): b2Fixture;
        /** Get the child primitive index for fixture B. */
        GetChildIndexB(): number;
        GetShapeB(): B;
        /** Evaluate this contact with your own manifold and transforms. */
        abstract Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
        /**
         * Flag this contact for filtering. Filtering will occur the next time step.
         */
        protected FlagForFiltering(): void;
        /**
         * Override the default friction mixture.
         * You can call this in b2ContactListener::PreSolve.
         * This value persists until set or reset.
         */
        SetFriction(friction: number): void;
        /** Get the friction. */
        GetFriction(): number;
        /** Reset the friction mixture to the default value. */
        ResetFriction(): void;
        /**
         * Override the default restitution mixture.
         * You can call this in b2ContactListener::PreSolve.
         * The value persists until you set or reset.
         */
        SetRestitution(restitution: number): void;
        /** Get the restitution. */
        GetRestitution(): number;
        /** Reset the restitution to the default value. */
        ResetRestitution(): void;
        /**
         * Override the default restitution velocity threshold mixture. You can call this in b2ContactListener::PreSolve.
         * The value persists until you set or reset.
         */
        SetRestitutionThreshold(threshold: number): void;
        /**
         * Get the restitution threshold.
         */
        GetRestitutionThreshold(): number;
        /**
         * Reset the restitution threshold to the default value.
         */
        ResetRestitutionThreshold(): void;
        /** Set the desired tangent speed for a conveyor belt behavior. In meters per second. */
        SetTangentSpeed(speed: number): void;
        /** Get the desired tangent speed. In meters per second. */
        GetTangentSpeed(): number;
        Reset(fixtureA: b2Fixture, indexA: number, fixtureB: b2Fixture, indexB: number): void;
        /**
         * Update the contact manifold and touching status.
         * Note: do not assume the fixture AABBs are overlapping or are valid.
         */
        protected Update(listener: b2ContactListener): void;
    }

    /**
     * dynamics/b2_contact_manager.d.ts
     */
    /** Delegate of b2World. */
    export class b2ContactManager {
        readonly m_broadPhase: b2BroadPhase<b2FixtureProxy>;
        m_contactList: b2Contact | null;
        m_contactCount: number;
        m_contactFilter: b2ContactFilter;
        m_contactListener: b2ContactListener;
        readonly m_contactFactory: b2ContactFactory;
        /** Broad-phase callback. */
        AddPair: (proxyA: b2FixtureProxy, proxyB: b2FixtureProxy) => void;
        FindNewContacts(): void;
        Destroy(c: b2Contact): void;
        /**
         * This is the top level collision call for the time step. Here
         * all the narrow phase collision is processed for the world
         * contact list.
         */
        Collide(): void;
    }

    /**
     * dynamics/b2_contact_factory.d.ts
     */
    type CreateFcn = (fixtureA: b2Fixture, indexA: number, fixtureB: b2Fixture, indexB: number) => b2Contact;
    type DestroyFcn = (contact: b2Contact) => void;
    export type b2ContactRegister = undefined | {
        createFcn: CreateFcn;
        destroyFcn: DestroyFcn;
    };
    export class b2ContactFactory {
        readonly m_registers: b2ContactRegister[][];
        constructor();
        AddType(Contact: { new (): b2Contact }, typeA: b2ShapeType, typeB: b2ShapeType): void;
        Create(fixtureA: b2Fixture, indexA: number, fixtureB: b2Fixture, indexB: number): b2Contact | null;
        Destroy(contact: b2Contact): void;
    }

    /**
     * dynamics/b2_contact_solver.d.ts
     */
    export function b2SetBlockSolve(value: boolean): void;
    export function b2GetBlockSolve(): boolean;
    export class b2VelocityConstraintPoint {
        readonly rA: b2Vec2;
        readonly rB: b2Vec2;
        normalImpulse: number;
        tangentImpulse: number;
        normalMass: number;
        tangentMass: number;
        velocityBias: number;
    }
    export class b2ContactVelocityConstraint {
        readonly points: b2VelocityConstraintPoint[];
        readonly normal: b2Vec2;
        readonly tangent: b2Vec2;
        readonly normalMass: b2Mat22;
        readonly K: b2Mat22;
        indexA: number;
        indexB: number;
        invMassA: number;
        invMassB: number;
        invIA: number;
        invIB: number;
        friction: number;
        restitution: number;
        threshold: number;
        tangentSpeed: number;
        pointCount: number;
        contactIndex: number;
    }
    export class b2ContactPositionConstraint {
        readonly localPoints: b2Vec2[];
        readonly localNormal: b2Vec2;
        readonly localPoint: b2Vec2;
        indexA: number;
        indexB: number;
        invMassA: number;
        invMassB: number;
        readonly localCenterA: b2Vec2;
        readonly localCenterB: b2Vec2;
        invIA: number;
        invIB: number;
        type: b2ManifoldType;
        radiusA: number;
        radiusB: number;
        pointCount: number;
    }
    export class b2ContactSolverDef {
        readonly step: b2TimeStep;
        contacts: (b2Contact | null)[];
        count: number;
        positions: b2Position[];
        velocities: b2Velocity[];
    }
    export class b2PositionSolverManifold {
        readonly normal: b2Vec2;
        readonly point: b2Vec2;
        separation: number;
        Initialize(pc: b2ContactPositionConstraint, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>, index: number): void;
        static Initialize_s_pointA: b2Vec2;
        static Initialize_s_pointB: b2Vec2;
        static Initialize_s_planePoint: b2Vec2;
        static Initialize_s_clipPoint: b2Vec2;
    }
    export class b2ContactSolver {
        readonly m_step: b2TimeStep;
        readonly m_positionConstraints: b2ContactPositionConstraint[];
        readonly m_velocityConstraints: b2ContactVelocityConstraint[];
        m_positions: b2Position[];
        m_velocities: b2Velocity[];
        m_contacts: (b2Contact | null)[];
        m_count: number;
        Initialize(def: b2ContactSolverDef): this;
        InitializeVelocityConstraints(): void;
        WarmStart(): void;
        SolveVelocityConstraints(): void;
        StoreImpulses(): void;
        SolvePositionConstraints(): boolean;
        SolveTOIPositionConstraints(toiIndexA: number, toiIndexB: number): boolean;
    }

    /**
     * dynamics/b2_island.d.ts
     */
    export class b2Island {
        m_bodyCount: number;
        m_jointCount: number;
        m_contactCount: number;
        m_bodyCapacity: number;
        m_listener: b2ContactListener | null;
        readonly m_bodies: (b2Body | null)[];
        readonly m_contacts: (b2Contact | null)[];
        readonly m_joints: (b2Joint | null)[];
        readonly m_velocities: b2Velocity[];
        readonly m_positions: b2Position[];
        constructor(bodyCapacity: number, contactCapacity: number, jointCapacity: number, listener: b2ContactListener | null);
        Resize(bodyCapacity: number): void;
        Clear(): void;
        AddBody(body: b2Body): void;
        AddContact(contact: b2Contact): void;
        AddJoint(joint: b2Joint): void;
        Solve(profile: b2Profile, step: b2TimeStep, gravity: b2Readonly<b2Vec2>, allowSleep: boolean): void;
        SolveTOI(subStep: b2TimeStep, toiIndexA: number, toiIndexB: number): void;
        Report(constraints: b2ContactVelocityConstraint[]): void;
        static s_timer: b2Timer;
        static s_solverData: b2SolverData;
        static s_contactSolverDef: b2ContactSolverDef;
        static s_contactSolver: b2ContactSolver;
        static s_translation: b2Vec2;
        static s_impulse: b2ContactImpulse;
    }

    /**
     * dynamics/b2_circle_contact.d.ts
     */
    export class b2CircleContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
    }

    /**
     * dynamics/b2_polygon_contact.d.ts
     */
    export class b2PolygonContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
    }

    /**
     * dynamics/b2_polygon_circle_contact.d.ts
     */
    export class b2PolygonAndCircleContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
    }

    /**
     * dynamics/b2_edge_circle_contact.d.ts
     */
    export class b2EdgeAndCircleContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
    }

    /**
     * dynamics/b2_edge_polygon_contact.d.ts
     */
    export class b2EdgeAndPolygonContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
    }

    /**
     * dynamics/b2_chain_circle_contact.d.ts
     */
    export class b2ChainAndCircleContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
        static Evaluate_s_edge: b2EdgeShape;
    }

    /**
     * dynamics/b2_chain_polygon_contact.d.ts
     */
    export class b2ChainAndPolygonContact extends b2Contact {
        Evaluate(manifold: b2Manifold, xfA: b2Readonly<b2Transform>, xfB: b2Readonly<b2Transform>): void;
        static Evaluate_s_edge: b2EdgeShape;
    }

    /**
     * dynamics/b2_joint.d.ts
     */
    export enum b2JointType {
        e_unknownJoint = 0,
        e_revoluteJoint = 1,
        e_prismaticJoint = 2,
        e_distanceJoint = 3,
        e_pulleyJoint = 4,
        e_mouseJoint = 5,
        e_gearJoint = 6,
        e_wheelJoint = 7,
        e_weldJoint = 8,
        e_frictionJoint = 9,
        e_motorJoint = 10,
        e_areaJoint = 11
    }
    /**
     * A joint edge is used to connect bodies and joints together
     * in a joint graph where each body is a node and each joint
     * is an edge. A joint edge belongs to a doubly linked list
     * maintained in each attached body. Each joint has two joint
     * nodes, one for each attached body.
     */
    export class b2JointEdge {
        /** Provides quick access to the other body attached. */
        readonly other: b2Body;
        /** The joint */
        readonly joint: b2Joint;
        /** The previous joint edge in the body's joint list */
        prev: b2JointEdge | null;
        /** The next joint edge in the body's joint list */
        next: b2JointEdge | null;
        constructor(joint: b2Joint, other: b2Body);
    }
    /**
     * Joint definitions are used to construct joints.
     */
    export class b2IJointDef {
        /** The joint type is set automatically for concrete joint types. */
        type: b2JointType;
        /** Use this to attach application specific data to your joints. */
        userData: b2JointUserData;
        /** The first attached body. */
        bodyA: b2Body;
        /** The second attached body. */
        bodyB: b2Body;
        /** Set this flag to true if the attached bodies should collide. */
        collideConnected?: boolean;
    }
    /**
     * Joint definitions are used to construct joints.
     */
    export abstract class b2JointDef implements b2IJointDef {
        /** The joint type is set automatically for concrete joint types. */
        readonly type: b2JointType;
        /** Use this to attach application specific data to your joints. */
        readonly userData: b2JointUserData;
        /** The first attached body. */
        bodyA: b2Body;
        /** The second attached body. */
        bodyB: b2Body;
        /** Set this flag to true if the attached bodies should collide. */
        collideConnected: boolean;
        constructor(type: b2JointType);
    }
    /**
     * Utility to compute linear stiffness values from frequency and damping ratio
     */
    export function b2LinearStiffness(def: {
        stiffness: number;
        damping: number;
    }, frequencyHertz: number, dampingRatio: number, bodyA: b2Body, bodyB: b2Body): void;
    /**
     * Utility to compute rotational stiffness values frequency and damping ratio
     */
    export function b2AngularStiffness(def: {
        stiffness: number;
        damping: number;
    }, frequencyHertz: number, dampingRatio: number, bodyA: b2Body, bodyB: b2Body): void;
    /**
     * The base joint class. Joints are used to constraint two bodies together in
     * various fashions. Some joints also feature limits and motors.
     */
    export abstract class b2Joint {
        protected readonly m_type: b2JointType;
        protected m_prev: b2Joint | null;
        protected m_next: b2Joint | null;
        protected readonly m_edgeA: b2JointEdge;
        protected readonly m_edgeB: b2JointEdge;
        protected m_bodyA: b2Body;
        protected m_bodyB: b2Body;
        protected m_islandFlag: boolean;
        protected m_collideConnected: boolean;
        protected readonly m_userData: b2JointUserData;
        protected constructor(def: b2IJointDef);
        /**
         * Get the type of the concrete joint.
         */
        GetType(): b2JointType;
        /**
         * Get the first body attached to this joint.
         */
        GetBodyA(): b2Body;
        /**
         * Get the second body attached to this joint.
         */
        GetBodyB(): b2Body;
        /**
         * Get the anchor point on bodyA in world coordinates.
         */
        abstract GetAnchorA<T extends XY>(out: T): T;
        /**
         * Get the anchor point on bodyB in world coordinates.
         */
        abstract GetAnchorB<T extends XY>(out: T): T;
        /**
         * Get the reaction force on bodyB at the joint anchor in Newtons.
         */
        abstract GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        /**
         * Get the reaction torque on bodyB in N*m.
         */
        abstract GetReactionTorque(inv_dt: number): number;
        /**
         * Get the next joint the world joint list.
         */
        GetNext(): b2Joint | null;
        /**
         * Get the user data reference.
         */
        GetUserData(): b2JointUserData;
        /**
         * Set the user data. Use this to store your application specific data.
         * This is a merge operation. Only specified keys will be overridden.
         */
        SetUserData(data: b2JointUserData): void;
        /**
         * Short-cut function to determine if either body is enabled.
         */
        IsEnabled(): boolean;
        /**
         * Get collide connected.
         * Note: modifying the collide connect flag won't work correctly because
         * the flag is only checked when fixture AABBs begin to overlap.
         */
        GetCollideConnected(): boolean;
        /**
         * Shift the origin for any points stored in world coordinates.
         */
        ShiftOrigin(_newOrigin: XY): void;
        protected abstract InitVelocityConstraints(data: b2SolverData): void;
        protected abstract SolveVelocityConstraints(data: b2SolverData): void;
        /**
         * This returns true if the position errors are within tolerance.
         */
        protected abstract SolvePositionConstraints(data: b2SolverData): boolean;
        /** Debug draw this joint */
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_area_joint.d.ts
     */
    export interface b2IAreaJointDef extends b2IJointDef {
        bodies: b2Body[];
        stiffness?: number;
        damping?: number;
    }
    export class b2AreaJointDef extends b2JointDef implements b2IAreaJointDef {
        bodies: b2Body[];
        stiffness: number;
        damping: number;
        constructor();
        AddBody(body: b2Body): void;
    }
    export class b2AreaJoint extends b2Joint {
        m_bodies: b2Body[];
        m_stiffness: number;
        m_damping: number;
        m_impulse: number;
        readonly m_targetLengths: number[];
        m_targetArea: number;
        readonly m_normals: b2Vec2[];
        readonly m_joints: b2DistanceJoint[];
        readonly m_deltas: b2Vec2[];
        readonly m_delta: b2Vec2;
        constructor(def: b2IAreaJointDef);
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(_inv_dt: number): number;
        SetStiffness(stiffness: number): void;
        GetStiffness(): number;
        SetDamping(damping: number): void;
        GetDamping(): number;
        InitVelocityConstraints(data: b2SolverData): void;
        SolveVelocityConstraints(data: b2SolverData): void;
        SolvePositionConstraints(data: b2SolverData): boolean;
    }

    /**
     * dynamics/b2_distance_joint.d.ts
     */
    export interface b2IDistanceJointDef extends b2IJointDef {
        localAnchorA: XY;
        localAnchorB: XY;
        length: number;
        minLength: number;
        maxLength: number;
        stiffness?: number;
        damping?: number;
    }
    /**
     * Distance joint definition. This requires defining an anchor point on both
     * bodies and the non-zero distance of the distance joint. The definition uses
     * local anchor points so that the initial configuration can violate the
     * constraint slightly. This helps when saving and loading a game.
     */
    export class b2DistanceJointDef extends b2JointDef implements b2IDistanceJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The rest length of this joint. Clamped to a stable minimum value. */
        length: number;
        /** Minimum length. Clamped to a stable minimum value. */
        minLength: number;
        /** Maximum length. Must be greater than or equal to the minimum length. */
        maxLength: number;
        /** The linear stiffness in N/m. */
        stiffness: number;
        /** The linear damping in N*s/m. */
        damping: number;
        constructor();
        /**
         * Initialize the bodies, anchors, and rest length using world space anchors.
         * The minimum and maximum lengths are set to the rest length.
         */
        Initialize(b1: b2Body, b2: b2Body, anchor1: XY, anchor2: XY): void;
    }
    /**
     * A distance joint constrains two points on two bodies to remain at a fixed
     * distance from each other. You can view this as a massless, rigid rod.
     */
    export class b2DistanceJoint extends b2Joint {
        protected m_stiffness: number;
        protected m_damping: number;
        protected m_bias: number;
        protected m_length: number;
        protected m_minLength: number;
        protected m_maxLength: number;
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected m_gamma: number;
        protected m_impulse: number;
        protected m_lowerImpulse: number;
        protected m_upperImpulse: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_u: b2Vec2;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_currentLength: number;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected m_softMass: number;
        protected m_mass: number;
        protected constructor(def: b2IDistanceJointDef);
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        /**
         * Get the reaction force given the inverse time step.
         * Unit is N.
         */
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        /**
         * Get the reaction torque given the inverse time step.
         * Unit is N*m. This is always zero for a distance joint.
         */
        GetReactionTorque(_inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /**
         * Set the rest length
         * @returns clamped rest length
         */
        SetLength(length: number): number;
        /** Get the rest length */
        GetLength(): number;
        /**
         * Set the minimum length
         * @returns the clamped minimum length
         */
        SetMinLength(minLength: number): number;
        /** Get the minimum length */
        GetMinLength(): number;
        /**
         * Set the maximum length
         * @returns the clamped maximum length
         */
        SetMaxLength(maxLength: number): number;
        /** Get the maximum length */
        GetMaxLength(): number;
        /** Get the current length */
        GetCurrentLength(): number;
        /** Set the linear stiffness in N/m */
        SetStiffness(stiffness: number): void;
        /** Get the linear stiffness in N/m */
        GetStiffness(): number;
        /** Set linear damping in N*s/m */
        SetDamping(damping: number): void;
        /** Get linear damping in N*s/m */
        GetDamping(): number;
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_friction_joint.d.ts
     */
    export interface b2IFrictionJointDef extends b2IJointDef {
        localAnchorA: XY;
        localAnchorB: XY;
        maxForce?: number;
        maxTorque?: number;
    }
    /**
     * Friction joint definition.
     */
    export class b2FrictionJointDef extends b2JointDef implements b2IFrictionJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The maximum friction force in N. */
        maxForce: number;
        /** The maximum friction torque in N-m. */
        maxTorque: number;
        constructor();
        /**
         * Initialize the bodies, anchors, axis, and reference angle using the world
         * anchor and world axis.
         */
        Initialize(bA: b2Body, bB: b2Body, anchor: b2Readonly<b2Vec2>): void;
    }
    /**
     * Friction joint. This is used for top-down friction.
     * It provides 2D translational friction and angular friction.
     */
    export class b2FrictionJoint extends b2Joint {
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_linearImpulse: b2Vec2;
        protected m_angularImpulse: number;
        protected m_maxForce: number;
        protected m_maxTorque: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_linearMass: b2Mat22;
        protected m_angularMass: number;
        protected constructor(def: b2IFrictionJointDef);
        InitVelocityConstraints(data: b2SolverData): void;
        SolveVelocityConstraints(data: b2SolverData): void;
        SolvePositionConstraints(_data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /** Set the maximum friction force in N. */
        SetMaxForce(force: number): void;
        /** Get the maximum friction force in N. */
        GetMaxForce(): number;
        /** Set the maximum friction torque in N*m. */
        SetMaxTorque(torque: number): void;
        /** Get the maximum friction torque in N*m. */
        GetMaxTorque(): number;
    }

    /**
     * dynamics/b2_gear_joint.d.ts
     */
    export interface b2IGearJointDef extends b2IJointDef {
        joint1: b2RevoluteJoint | b2PrismaticJoint;
        joint2: b2RevoluteJoint | b2PrismaticJoint;
        ratio?: number;
    }
    /**
     * Gear joint definition. This definition requires two existing
     * revolute or prismatic joints (any combination will work).
     *
     * @warning bodyB on the input joints must both be dynamic
     */
    export class b2GearJointDef extends b2JointDef implements b2IGearJointDef {
        /** The first revolute/prismatic joint attached to the gear joint. */
        joint1: b2RevoluteJoint | b2PrismaticJoint;
        /** The second revolute/prismatic joint attached to the gear joint. */
        joint2: b2RevoluteJoint | b2PrismaticJoint;
        /**
         * The gear ratio.
         *
         * @see b2GearJoint for explanation.
         */
        ratio: number;
        constructor();
    }
    /**
     * A gear joint is used to connect two joints together. Either joint
     * can be a revolute or prismatic joint. You specify a gear ratio
     * to bind the motions together:
     * coordinate1 + ratio * coordinate2 = constant
     * The ratio can be negative or positive. If one joint is a revolute joint
     * and the other joint is a prismatic joint, then the ratio will have units
     * of length or units of 1/length.
     *
     * @warning You have to manually destroy the gear joint if joint1 or joint2
     * is destroyed.
     */
    export class b2GearJoint extends b2Joint {
        protected m_joint1: b2RevoluteJoint | b2PrismaticJoint;
        protected m_joint2: b2RevoluteJoint | b2PrismaticJoint;
        protected m_typeA: b2JointType;
        protected m_typeB: b2JointType;
        /** Body A is connected to body C */
        protected m_bodyC: b2Body;
        /** Body B is connected to body D */
        protected m_bodyD: b2Body;
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_localAnchorC: b2Vec2;
        protected readonly m_localAnchorD: b2Vec2;
        protected readonly m_localAxisC: b2Vec2;
        protected readonly m_localAxisD: b2Vec2;
        protected m_referenceAngleA: number;
        protected m_referenceAngleB: number;
        protected m_constant: number;
        protected m_ratio: number;
        protected m_tolerance: number;
        protected m_impulse: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected m_indexC: number;
        protected m_indexD: number;
        protected readonly m_lcA: b2Vec2;
        protected readonly m_lcB: b2Vec2;
        protected readonly m_lcC: b2Vec2;
        protected readonly m_lcD: b2Vec2;
        protected m_mA: number;
        protected m_mB: number;
        protected m_mC: number;
        protected m_mD: number;
        protected m_iA: number;
        protected m_iB: number;
        protected m_iC: number;
        protected m_iD: number;
        protected readonly m_JvAC: b2Vec2;
        protected readonly m_JvBD: b2Vec2;
        protected m_JwA: number;
        protected m_JwB: number;
        protected m_JwC: number;
        protected m_JwD: number;
        protected m_mass: number;
        protected constructor(def: b2IGearJointDef);
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** Get the first joint. */
        GetJoint1(): b2PrismaticJoint | b2RevoluteJoint;
        /** Get the second joint. */
        GetJoint2(): b2PrismaticJoint | b2RevoluteJoint;
        /** Get the gear ratio. */
        GetRatio(): number;
        /** Set the gear ratio. */
        SetRatio(ratio: number): void;
    }

    /**
     * dynamics/b2_motor_joint.d.ts
     */
    export interface b2IMotorJointDef extends b2IJointDef {
        linearOffset?: XY;
        angularOffset?: number;
        maxForce?: number;
        maxTorque?: number;
        correctionFactor?: number;
    }
    /**
     * Motor joint definition.
     */
    export class b2MotorJointDef extends b2JointDef implements b2IMotorJointDef {
        /** Position of bodyB minus the position of bodyA, in bodyA's frame, in meters. */
        readonly linearOffset: b2Vec2;
        /** The bodyB angle minus bodyA angle in radians. */
        angularOffset: number;
        /** The maximum motor force in N. */
        maxForce: number;
        /** The maximum motor torque in N-m. */
        maxTorque: number;
        /** Position correction factor in the range [0,1]. */
        correctionFactor: number;
        constructor();
        /** Initialize the bodies and offsets using the current transforms. */
        Initialize(bodyA: b2Body, bodyB: b2Body): void;
    }
    /**
     * A motor joint is used to control the relative motion
     * between two bodies. A typical usage is to control the movement
     * of a dynamic body with respect to the ground.
     */
    export class b2MotorJoint extends b2Joint {
        protected readonly m_linearOffset: b2Vec2;
        protected m_angularOffset: number;
        protected readonly m_linearImpulse: b2Vec2;
        protected m_angularImpulse: number;
        protected m_maxForce: number;
        protected m_maxTorque: number;
        protected m_correctionFactor: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected readonly m_linearError: b2Vec2;
        protected m_angularError: number;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_linearMass: b2Mat22;
        protected m_angularMass: number;
        protected constructor(def: b2IMotorJointDef);
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** Set the target linear offset, in frame A, in meters. */
        SetLinearOffset(linearOffset: b2Readonly<b2Vec2>): void;
        /** Get the target linear offset, in frame A, in meters. */
        GetLinearOffset(): b2Vec2;
        /** Set the target angular offset, in radians. */
        SetAngularOffset(angularOffset: number): void;
        /** Get the target angular offset, in radians. */
        GetAngularOffset(): number;
        /** Set the maximum friction force in N. */
        SetMaxForce(force: number): void;
        /** Get the maximum friction force in N. */
        GetMaxForce(): number;
        /** Set the maximum friction torque in N*m. */
        SetMaxTorque(torque: number): void;
        /** Get the maximum friction torque in N*m. */
        GetMaxTorque(): number;
        /** Get the position correction factor in the range [0,1]. */
        GetCorrectionFactor(): number;
        /** Set the position correction factor in the range [0,1]. */
        SetCorrectionFactor(factor: number): void;
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(_data: b2SolverData): boolean;
    }

    /**
     * dynamics/b2_mouse_joint.d.ts
     */
    export interface b2IMouseJointDef extends b2IJointDef {
        target?: XY;
        maxForce?: number;
        stiffness?: number;
        damping?: number;
    }
    /**
     * Mouse joint definition. This requires a world target point,
     * tuning parameters, and the time step.
     */
    export class b2MouseJointDef extends b2JointDef implements b2IMouseJointDef {
        /**
         * The initial world target point. This is assumed
         * to coincide with the body anchor initially.
         */
        readonly target: b2Vec2;
        /**
         * The maximum constraint force that can be exerted
         * to move the candidate body. Usually you will express
         * as some multiple of the weight (multiplier * mass * gravity).
         */
        maxForce: number;
        /** The linear stiffness in N/m */
        stiffness: number;
        /** The linear damping in N*s/m */
        damping: number;
        constructor();
    }
    /**
     * A mouse joint is used to make a point on a body track a
     * specified world point. This a soft constraint with a maximum
     * force. This allows the constraint to stretch and without
     * applying huge forces.
     * NOTE: this joint is not documented in the manual because it was
     * developed to be used in the testbed. If you want to learn how to
     * use the mouse joint, look at the testbed.
     */
    export class b2MouseJoint extends b2Joint {
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_targetA: b2Vec2;
        protected m_stiffness: number;
        protected m_damping: number;
        protected m_beta: number;
        protected readonly m_impulse: b2Vec2;
        protected m_maxForce: number;
        protected m_gamma: number;
        protected m_indexB: number;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassB: number;
        protected m_invIB: number;
        protected readonly m_mass: b2Mat22;
        protected readonly m_C: b2Vec2;
        protected constructor(def: b2IMouseJointDef);
        /** Use this to update the target point. */
        SetTarget(target: XY): void;
        GetTarget(): b2Vec2;
        /** Set the maximum force in Newtons. */
        SetMaxForce(force: number): void;
        /** Get the maximum force in Newtons. */
        GetMaxForce(): number;
        /** Set the linear stiffness in N/m */
        SetStiffness(stiffness: number): void;
        /** Get the linear stiffness in N/m */
        GetStiffness(): number;
        /** Set linear damping in N*s/m */
        SetDamping(damping: number): void;
        /** Get linear damping in N*s/m */
        GetDamping(): number;
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(_data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(_inv_dt: number): number;
        ShiftOrigin(newOrigin: XY): void;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_prismatic_joint.d.ts
     */
    export interface b2IPrismaticJointDef extends b2IJointDef {
        localAnchorA?: XY;
        localAnchorB?: XY;
        localAxisA?: XY;
        referenceAngle?: number;
        enableLimit?: boolean;
        lowerTranslation?: number;
        upperTranslation?: number;
        enableMotor?: boolean;
        maxMotorForce?: number;
        motorSpeed?: number;
    }
    /**
     * Prismatic joint definition. This requires defining a line of
     * motion using an axis and an anchor point. The definition uses local
     * anchor points and a local axis so that the initial configuration
     * can violate the constraint slightly. The joint translation is zero
     * when the local anchor points coincide in world space. Using local
     * anchors and a local axis helps when saving and loading a game.
     */
    export class b2PrismaticJointDef extends b2JointDef implements b2IPrismaticJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The local translation unit axis in bodyA. */
        readonly localAxisA: b2Vec2;
        /** The constrained angle between the bodies: bodyB_angle - bodyA_angle. */
        referenceAngle: number;
        /** Enable/disable the joint limit. */
        enableLimit: boolean;
        /** The lower translation limit, usually in meters. */
        lowerTranslation: number;
        /** The upper translation limit, usually in meters. */
        upperTranslation: number;
        /** Enable/disable the joint motor. */
        enableMotor: boolean;
        /** The maximum motor torque, usually in N-m. */
        maxMotorForce: number;
        /** The desired motor speed in radians per second. */
        motorSpeed: number;
        constructor();
        /**
         * Initialize the bodies, anchors, axis, and reference angle using the world
         * anchor and unit world axis.
         */
        Initialize(bA: b2Body, bB: b2Body, anchor: XY, axis: XY): void;
    }
    /**
     * A prismatic joint. This joint provides one degree of freedom: translation
     * along an axis fixed in bodyA. Relative rotation is prevented. You can
     * use a joint limit to restrict the range of motion and a joint motor to
     * drive the motion or to model joint friction.
     */
    export class b2PrismaticJoint extends b2Joint {
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_localXAxisA: b2Vec2;
        protected readonly m_localYAxisA: b2Vec2;
        protected m_referenceAngle: number;
        protected readonly m_impulse: b2Vec2;
        protected m_motorImpulse: number;
        protected m_lowerImpulse: number;
        protected m_upperImpulse: number;
        protected m_lowerTranslation: number;
        protected m_upperTranslation: number;
        protected m_maxMotorForce: number;
        protected m_motorSpeed: number;
        protected m_enableLimit: boolean;
        protected m_enableMotor: boolean;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_axis: b2Vec2;
        protected readonly m_perp: b2Vec2;
        protected m_s1: number;
        protected m_s2: number;
        protected m_a1: number;
        protected m_a2: number;
        protected readonly m_K: b2Mat22;
        protected m_translation: number;
        protected m_axialMass: number;
        protected constructor(def: b2IPrismaticJointDef);
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        /**
         * A velocity based solver computes reaction forces(impulses) using the velocity constraint solver.Under this context,
         * the position solver is not there to resolve forces.It is only there to cope with integration error.
         *
         * Therefore, the pseudo impulses in the position solver do not have any physical meaning.Thus it is okay if they suck.
         *
         * We could take the active state from the velocity solver.However, the joint might push past the limit when the velocity
         * solver indicates the limit is inactive.
         */
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /** The local joint axis relative to bodyA. */
        GetLocalAxisA(): b2Readonly<b2Vec2>;
        /** Get the reference angle. */
        GetReferenceAngle(): number;
        /** Get the current joint translation, usually in meters. */
        GetJointTranslation(): number;
        /** Get the current joint translation speed, usually in meters per second. */
        GetJointSpeed(): number;
        /** Is the joint limit enabled? */
        IsLimitEnabled(): boolean;
        /** Enable/disable the joint limit. */
        EnableLimit(flag: boolean): boolean;
        /** Get the lower joint limit, usually in meters. */
        GetLowerLimit(): number;
        /** Get the upper joint limit, usually in meters. */
        GetUpperLimit(): number;
        /** Set the joint limits, usually in meters. */
        SetLimits(lower: number, upper: number): void;
        /** Is the joint motor enabled? */
        IsMotorEnabled(): boolean;
        /** Enable/disable the joint motor. */
        EnableMotor(flag: boolean): boolean;
        /** Set the motor speed, usually in meters per second. */
        SetMotorSpeed(speed: number): number;
        /** Get the motor speed, usually in meters per second. */
        GetMotorSpeed(): number;
        /** Set the maximum motor force, usually in N. */
        SetMaxMotorForce(force: number): void;
        /** Get the maximum motor force, usually in N. */
        GetMaxMotorForce(): number;
        /** Get the current motor force given the inverse time step, usually in N. */
        GetMotorForce(inv_dt: number): number;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_pulley_joint.d.ts
     */
    export const b2_minPulleyLength = 2;
    export interface b2IPulleyJointDef extends b2IJointDef {
        groundAnchorA?: XY;
        groundAnchorB?: XY;
        localAnchorA?: XY;
        localAnchorB?: XY;
        lengthA?: number;
        lengthB?: number;
        ratio?: number;
    }
    /**
     * Pulley joint definition. This requires two ground anchors,
     * two dynamic body anchor points, and a pulley ratio.
     */
    export class b2PulleyJointDef extends b2JointDef implements b2IPulleyJointDef {
        /** The first ground anchor in world coordinates. This point never moves. */
        readonly groundAnchorA: b2Vec2;
        /** The second ground anchor in world coordinates. This point never moves. */
        readonly groundAnchorB: b2Vec2;
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The a reference length for the segment attached to bodyA. */
        lengthA: number;
        /** The a reference length for the segment attached to bodyB. */
        lengthB: number;
        /** The pulley ratio, used to simulate a block-and-tackle. */
        ratio: number;
        constructor();
        /** Initialize the bodies, anchors, lengths, max lengths, and ratio using the world anchors. */
        Initialize(bA: b2Body, bB: b2Body, groundA: Readonly<XY>, groundB: Readonly<XY>, anchorA: Readonly<XY>, anchorB: Readonly<XY>, r: number): void;
    }
    /**
     * The pulley joint is connected to two bodies and two fixed ground points.
     * The pulley supports a ratio such that:
     * length1 + ratio * length2 <= constant
     * Yes, the force transmitted is scaled by the ratio.
     * Warning: the pulley joint can get a bit squirrelly by itself. They often
     * work better when combined with prismatic joints. You should also cover the
     * the anchor points with static shapes to prevent one side from going to
     * zero length.
     */
    export class b2PulleyJoint extends b2Joint {
        protected readonly m_groundAnchorA: b2Vec2;
        protected readonly m_groundAnchorB: b2Vec2;
        protected m_lengthA: number;
        protected m_lengthB: number;
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected m_constant: number;
        protected m_ratio: number;
        protected m_impulse: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_uA: b2Vec2;
        protected readonly m_uB: b2Vec2;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected m_mass: number;
        protected constructor(def: b2IPulleyJointDef);
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(_inv_dt: number): number;
        /** Get the first ground anchor. */
        GetGroundAnchorA(): b2Vec2;
        /** Get the second ground anchor. */
        GetGroundAnchorB(): b2Vec2;
        /** Get the current length of the segment attached to bodyA. */
        GetLengthA(): number;
        /** Get the current length of the segment attached to bodyB. */
        GetLengthB(): number;
        /** Get the pulley ratio. */
        GetRatio(): number;
        /** Get the current length of the segment attached to bodyA. */
        GetCurrentLengthA(): number;
        /** Get the current length of the segment attached to bodyB. */
        GetCurrentLengthB(): number;
        ShiftOrigin(newOrigin: b2Readonly<b2Vec2>): void;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_revolute_joint.d.ts
     */
    export interface b2IRevoluteJointDef extends b2IJointDef {
        localAnchorA?: XY;
        localAnchorB?: XY;
        referenceAngle?: number;
        enableLimit?: boolean;
        lowerAngle?: number;
        upperAngle?: number;
        enableMotor?: boolean;
        motorSpeed?: number;
        maxMotorTorque?: number;
    }
    /**
     * Revolute joint definition. This requires defining an anchor point where the
     * bodies are joined. The definition uses local anchor points so that the
     * initial configuration can violate the constraint slightly. You also need to
     * specify the initial relative angle for joint limits. This helps when saving
     * and loading a game.
     * The local anchor points are measured from the body's origin
     * rather than the center of mass because:
     * 1. you might not know where the center of mass will be.
     * 2. if you add/remove shapes from a body and recompute the mass,
     * the joints will be broken.
     */
    export class b2RevoluteJointDef extends b2JointDef implements b2IRevoluteJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The bodyB angle minus bodyA angle in the reference state (radians). */
        referenceAngle: number;
        /** A flag to enable joint limits. */
        enableLimit: boolean;
        /** The lower angle for the joint limit (radians). */
        lowerAngle: number;
        /** The upper angle for the joint limit (radians). */
        upperAngle: number;
        /** A flag to enable the joint motor. */
        enableMotor: boolean;
        /** The desired motor speed. Usually in radians per second. */
        motorSpeed: number;
        /**
         * The maximum motor torque used to achieve the desired motor speed.
         * Usually in N-m.
         */
        maxMotorTorque: number;
        constructor();
        /** Initialize the bodies, anchors, and reference angle using a world anchor point. */
        Initialize(bA: b2Body, bB: b2Body, anchor: XY): void;
    }
    /**
     * A revolute joint constrains two bodies to share a common point while they
     * are free to rotate about the point. The relative rotation about the shared
     * point is the joint angle. You can limit the relative rotation with
     * a joint limit that specifies a lower and upper angle. You can use a motor
     * to drive the relative rotation about the shared point. A maximum motor torque
     * is provided so that infinite forces are not generated.
     */
    export class b2RevoluteJoint extends b2Joint {
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_impulse: b2Vec2;
        protected m_motorImpulse: number;
        protected m_lowerImpulse: number;
        protected m_upperImpulse: number;
        protected m_enableMotor: boolean;
        protected m_maxMotorTorque: number;
        protected m_motorSpeed: number;
        protected m_enableLimit: boolean;
        protected m_referenceAngle: number;
        protected m_lowerAngle: number;
        protected m_upperAngle: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_K: b2Mat22;
        protected m_angle: number;
        protected m_axialMass: number;
        protected constructor(def: b2IRevoluteJointDef);
        InitVelocityConstraints(data: b2SolverData): void;
        SolveVelocityConstraints(data: b2SolverData): void;
        SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        /**
         * Get the reaction force given the inverse time step.
         * Unit is N.
         */
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        /**
         * Get the reaction torque due to the joint limit given the inverse time step.
         * Unit is N*m.
         */
        GetReactionTorque(inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /** Get the reference angle. */
        GetReferenceAngle(): number;
        /** Get the current joint angle in radians. */
        GetJointAngle(): number;
        /** Get the current joint angle speed in radians per second. */
        GetJointSpeed(): number;
        /** Is the joint motor enabled? */
        IsMotorEnabled(): boolean;
        /** Enable/disable the joint motor. */
        EnableMotor(flag: boolean): boolean;
        /**
         * Get the current motor torque given the inverse time step.
         * Unit is N*m.
         */
        GetMotorTorque(inv_dt: number): number;
        /** Get the motor speed in radians per second. */
        GetMotorSpeed(): number;
        /** Set the maximum motor torque, usually in N-m. */
        SetMaxMotorTorque(torque: number): void;
        /** Get the maximum motor torque, usually in N-m. */
        GetMaxMotorTorque(): number;
        /** Is the joint limit enabled?  */
        IsLimitEnabled(): boolean;
        /** Enable/disable the joint limit. */
        EnableLimit(flag: boolean): boolean;
        /** Get the lower joint limit in radians. */
        GetLowerLimit(): number;
        /** Get the upper joint limit in radians. */
        GetUpperLimit(): number;
        /** Set the joint limits in radians. */
        SetLimits(lower: number, upper: number): void;
        /** Set the motor speed in radians per second. */
        SetMotorSpeed(speed: number): number;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_weld_joint.d.ts
     */
    export interface b2IWeldJointDef extends b2IJointDef {
        localAnchorA?: XY;
        localAnchorB?: XY;
        referenceAngle?: number;
        stiffness?: number;
        damping?: number;
    }
    /**
     * Weld joint definition. You need to specify local anchor points
     * where they are attached and the relative body angle. The position
     * of the anchor points is important for computing the reaction torque.
     */
    export class b2WeldJointDef extends b2JointDef implements b2IWeldJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The bodyB angle minus bodyA angle in the reference state (radians). */
        referenceAngle: number;
        /**
         * The rotational stiffness in N*m
         * Disable softness with a value of 0
         */
        stiffness: number;
        /** The rotational damping in N*m*s */
        damping: number;
        constructor();
        /**
         * Initialize the bodies, anchors, reference angle, stiffness, and damping.
         * @param bodyA the first body connected by this joint
         * @param bodyB the second body connected by this joint
         * @param anchor the point of connection in world coordinates
         */
        Initialize(bA: b2Body, bB: b2Body, anchor: Readonly<XY>): void;
    }
    /**
     * A weld joint essentially glues two bodies together. A weld joint may
     * distort somewhat because the island constraint solver is approximate.
     */
    export class b2WeldJoint extends b2Joint {
        protected m_stiffness: number;
        protected m_damping: number;
        protected m_bias: number;
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected m_referenceAngle: number;
        protected m_gamma: number;
        protected readonly m_impulse: b2Vec3;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_rA: b2Vec2;
        protected readonly m_rB: b2Vec2;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_mass: b2Mat33;
        protected constructor(def: b2IWeldJointDef);
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /** Get the reference angle. */
        GetReferenceAngle(): number;
        /** Set stiffness in N*m */
        SetStiffness(stiffness: number): void;
        /** Get stiffness in N*m */
        GetStiffness(): number;
        /** Set damping in N*m*s */
        SetDamping(damping: number): void;
        /** Get damping in N*m*s */
        GetDamping(): number;
    }

    /**
     * dynamics/b2_wheel_joint.d.ts
     */
    export interface b2IWheelJointDef extends b2IJointDef {
        /** The local anchor point relative to bodyA's origin. */
        localAnchorA?: XY;
        /** The local anchor point relative to bodyB's origin. */
        localAnchorB?: XY;
        /** The local translation axis in bodyA. */
        localAxisA?: XY;
        /** Enable/disable the joint limit. */
        enableLimit?: boolean;
        /** The lower translation limit, usually in meters. */
        lowerTranslation?: number;
        /** The upper translation limit, usually in meters. */
        upperTranslation?: number;
        /** Enable/disable the joint motor. */
        enableMotor?: boolean;
        /** The maximum motor torque, usually in N-m. */
        maxMotorTorque?: number;
        /** The desired motor speed in radians per second. */
        motorSpeed?: number;
        /** Suspension stiffness. Typically in units N/m. */
        stiffness?: number;
        /** Suspension damping. Typically in units of N*s/m. */
        damping?: number;
    }
    /**
     * Wheel joint definition. This requires defining a line of
     * motion using an axis and an anchor point. The definition uses local
     * anchor points and a local axis so that the initial configuration
     * can violate the constraint slightly. The joint translation is zero
     * when the local anchor points coincide in world space. Using local
     * anchors and a local axis helps when saving and loading a game.
     */
    export class b2WheelJointDef extends b2JointDef implements b2IWheelJointDef {
        /** The local anchor point relative to bodyA's origin. */
        readonly localAnchorA: b2Vec2;
        /** The local anchor point relative to bodyB's origin. */
        readonly localAnchorB: b2Vec2;
        /** The local translation axis in bodyA. */
        readonly localAxisA: b2Vec2;
        /** Enable/disable the joint limit. */
        enableLimit: boolean;
        /** The lower translation limit, usually in meters. */
        lowerTranslation: number;
        /** The upper translation limit, usually in meters. */
        upperTranslation: number;
        /** Enable/disable the joint motor. */
        enableMotor: boolean;
        /** The maximum motor torque, usually in N-m. */
        maxMotorTorque: number;
        /** The desired motor speed in radians per second. */
        motorSpeed: number;
        /** Suspension stiffness. Typically in units N/m. */
        stiffness: number;
        /** Suspension damping. Typically in units of N*s/m. */
        damping: number;
        constructor();
        /**
         * Initialize the bodies, anchors, axis, and reference angle using the world
         * anchor and world axis.
         */
        Initialize(bA: b2Body, bB: b2Body, anchor: Readonly<XY>, axis: Readonly<XY>): void;
    }
    /**
     * A wheel joint. This joint provides two degrees of freedom: translation
     * along an axis fixed in bodyA and rotation in the plane. In other words, it is a point to
     * line constraint with a rotational motor and a linear spring/damper. The spring/damper is
     * initialized upon creation. This joint is designed for vehicle suspensions.
     */
    export class b2WheelJoint extends b2Joint {
        protected readonly m_localAnchorA: b2Vec2;
        protected readonly m_localAnchorB: b2Vec2;
        protected readonly m_localXAxisA: b2Vec2;
        protected readonly m_localYAxisA: b2Vec2;
        protected m_impulse: number;
        protected m_motorImpulse: number;
        protected m_springImpulse: number;
        protected m_lowerImpulse: number;
        protected m_upperImpulse: number;
        protected m_translation: number;
        protected m_lowerTranslation: number;
        protected m_upperTranslation: number;
        protected m_maxMotorTorque: number;
        protected m_motorSpeed: number;
        protected m_enableLimit: boolean;
        protected m_enableMotor: boolean;
        protected m_stiffness: number;
        protected m_damping: number;
        protected m_indexA: number;
        protected m_indexB: number;
        protected readonly m_localCenterA: b2Vec2;
        protected readonly m_localCenterB: b2Vec2;
        protected m_invMassA: number;
        protected m_invMassB: number;
        protected m_invIA: number;
        protected m_invIB: number;
        protected readonly m_ax: b2Vec2;
        protected readonly m_ay: b2Vec2;
        protected m_sAx: number;
        protected m_sBx: number;
        protected m_sAy: number;
        protected m_sBy: number;
        protected m_mass: number;
        protected m_motorMass: number;
        protected m_axialMass: number;
        protected m_springMass: number;
        protected m_bias: number;
        protected m_gamma: number;
        protected constructor(def: b2IWheelJointDef);
        /** Get the motor speed, usually in radians per second. */
        GetMotorSpeed(): number;
        /** Set/Get the maximum motor force, usually in N-m. */
        GetMaxMotorTorque(): number;
        /** Set spring stiffness */
        SetStiffness(stiffness: number): void;
        /** Get spring stiffness */
        GetStiffness(): number;
        /** Set damping */
        SetDamping(damping: number): void;
        /** Get damping */
        GetDamping(): number;
        protected InitVelocityConstraints(data: b2SolverData): void;
        protected SolveVelocityConstraints(data: b2SolverData): void;
        protected SolvePositionConstraints(data: b2SolverData): boolean;
        GetAnchorA<T extends XY>(out: T): T;
        GetAnchorB<T extends XY>(out: T): T;
        GetReactionForce<T extends XY>(inv_dt: number, out: T): T;
        GetReactionTorque(inv_dt: number): number;
        /** The local anchor point relative to bodyA's origin. */
        GetLocalAnchorA(): b2Readonly<b2Vec2>;
        /** The local anchor point relative to bodyB's origin. */
        GetLocalAnchorB(): b2Readonly<b2Vec2>;
        /** The local joint axis relative to bodyA. */
        GetLocalAxisA(): b2Readonly<b2Vec2>;
        /** Get the current joint translation, usually in meters. */
        GetJointTranslation(): number;
        /** Get the current joint linear speed, usually in meters per second. */
        GetJointLinearSpeed(): number;
        /** Get the current joint angle in radians. */
        GetJointAngle(): number;
        /** Get the current joint angular speed in radians per second. */
        GetJointAngularSpeed(): number;
        /** Is the joint motor enabled? */
        IsMotorEnabled(): boolean;
        /** Enable/disable the joint motor. */
        EnableMotor(flag: boolean): boolean;
        /** Set the motor speed, usually in radians per second. */
        SetMotorSpeed(speed: number): number;
        /** Set the maximum motor force, usually in N-m. */
        SetMaxMotorTorque(torque: number): void;
        /** Get the current motor torque given the inverse time step, usually in N-m. */
        GetMotorTorque(inv_dt: number): number;
        /**
         * Is the joint limit enabled?
         */
        IsLimitEnabled(): boolean;
        /**
         * Enable/disable the joint translation limit.
         */
        EnableLimit(flag: boolean): boolean;
        /**
         * Get the lower joint translation limit, usually in meters.
         */
        GetLowerLimit(): number;
        /**
         * Get the upper joint translation limit, usually in meters.
         */
        GetUpperLimit(): number;
        /**
         * Set the joint translation limits, usually in meters.
         */
        SetLimits(lower: number, upper: number): void;
        Draw(draw: b2Draw): void;
    }

    /**
     * dynamics/b2_world.d.ts
     */
    /**
     * The world class manages all physics entities, dynamic simulation,
     * and asynchronous queries.
     */
    export class b2World {
        readonly m_contactManager: b2ContactManager;
        m_bodyList: b2Body | null;
        m_jointList: b2Joint | null;
        m_bodyCount: number;
        m_jointCount: number;
        readonly m_gravity: b2Vec2;
        m_allowSleep: boolean;
        m_destructionListener: b2DestructionListener | null;
        /**
         * This is used to compute the time step ratio to
         * support a variable time step.
         */
        m_inv_dt0: number;
        m_newContacts: boolean;
        m_locked: boolean;
        m_clearForces: boolean;
        m_warmStarting: boolean;
        m_continuousPhysics: boolean;
        m_subStepping: boolean;
        m_stepComplete: boolean;
        readonly m_profile: b2Profile;
        readonly m_island: b2Island;
        readonly s_stack: (b2Body | null)[];
        constructor(gravity: XY);
        /**
         * Construct a world object.
         *
         * @param gravity The world gravity vector.
         */
        static Create(gravity: XY): b2World;
        /**
         * Register a destruction listener. The listener is owned by you and must
         * remain in scope.
         */
        SetDestructionListener(listener: b2DestructionListener | null): void;
        /**
         * Get the current destruction listener
         */
        GetDestructionListener(): b2DestructionListener | null;
        /**
         * Register a contact filter to provide specific control over collision.
         * Otherwise the default filter is used (b2_defaultFilter). The listener is
         * owned by you and must remain in scope.
         */
        SetContactFilter(filter: b2ContactFilter): void;
        /**
         * Register a contact event listener. The listener is owned by you and must
         * remain in scope.
         */
        SetContactListener(listener: b2ContactListener): void;
        /**
         * Create a rigid body given a definition. No reference to the definition
         * is retained.
         *
         * @warning This function is locked during callbacks.
         */
        CreateBody(def?: b2BodyDef): b2Body;
        /**
         * Destroy a rigid body given a definition. No reference to the definition
         * is retained. This function is locked during callbacks.
         *
         * @warning This automatically deletes all associated shapes and joints.
         * @warning This function is locked during callbacks.
         */
        DestroyBody(b: b2Body): void;
        static Joint_Create(def: b2JointDef): b2Joint;
        /**
         * Create a joint to constrain bodies together. No reference to the definition
         * is retained. This may cause the connected bodies to cease colliding.
         *
         * @warning This function is locked during callbacks.
         */
        CreateJoint(def: b2IAreaJointDef): b2AreaJoint;
        CreateJoint(def: b2IDistanceJointDef): b2DistanceJoint;
        CreateJoint(def: b2IFrictionJointDef): b2FrictionJoint;
        CreateJoint(def: b2IGearJointDef): b2GearJoint;
        CreateJoint(def: b2IMotorJointDef): b2MotorJoint;
        CreateJoint(def: b2IMouseJointDef): b2MouseJoint;
        CreateJoint(def: b2IPrismaticJointDef): b2PrismaticJoint;
        CreateJoint(def: b2IPulleyJointDef): b2PulleyJoint;
        CreateJoint(def: b2IRevoluteJointDef): b2RevoluteJoint;
        CreateJoint(def: b2IWeldJointDef): b2WeldJoint;
        CreateJoint(def: b2IWheelJointDef): b2WheelJoint;
        /**
         * Destroy a joint. This may cause the connected bodies to begin colliding.
         *
         * @warning This function is locked during callbacks.
         */
        DestroyJoint(j: b2Joint): void;
        static Step_s_step: b2TimeStep;
        static Step_s_stepTimer: b2Timer;
        static Step_s_timer: b2Timer;
        /**
         * Take a time step. This performs collision detection, integration,
         * and constraint solution.
         *
         * @param dt The amount of time to simulate, this should not vary.
         * @param iterations Config for the solvers.
         */
        Step(dt: number, iterations: b2StepConfig): void;
        /**
         * Manually clear the force buffer on all bodies. By default, forces are cleared automatically
         * after each call to Step. The default behavior is modified by calling SetAutoClearForces.
         * The purpose of this function is to support sub-stepping. Sub-stepping is often used to maintain
         * a fixed sized time step under a variable frame-rate.
         * When you perform sub-stepping you will disable auto clearing of forces and instead call
         * ClearForces after all sub-steps are complete in one pass of your game loop.
         *
         * @see SetAutoClearForces
         */
        ClearForces(): void;
        /**
         * Query the world for all fixtures that potentially overlap the
         * provided AABB.
         *
         * @param aabb The query box.
         * @param callback A user implemented callback class or function.
         */
        QueryAABB(aabb: b2AABB, callback: b2QueryCallback): void;
        QueryAllAABB(aabb: b2AABB, out?: b2Fixture[]): b2Fixture[];
        /**
         * Query the world for all fixtures that potentially overlap the
         * provided point.
         *
         * @param point The query point.
         * @param callback A user implemented callback class or function.
         */
        QueryPointAABB(point: XY, callback: b2QueryCallback): void;
        QueryAllPointAABB(point: XY, out?: b2Fixture[]): b2Fixture[];
        static QueryFixtureShape_s_aabb: b2AABB;
        QueryFixtureShape(shape: b2Shape, index: number, transform: b2Readonly<b2Transform>, callback: b2QueryCallback): void;
        QueryAllFixtureShape(shape: b2Shape, index: number, transform: b2Readonly<b2Transform>, out?: b2Fixture[]): b2Fixture[];
        QueryFixturePoint(point: XY, callback: b2QueryCallback): void;
        QueryAllFixturePoint(point: XY, out?: b2Fixture[]): b2Fixture[];
        static RayCast_s_input: b2RayCastInput;
        static RayCast_s_output: b2RayCastOutput;
        static RayCast_s_point: b2Vec2;
        /**
         * Ray-cast the world for all fixtures in the path of the ray. Your callback
         * controls whether you get the closest point, any point, or n-points.
         * The ray-cast ignores shapes that contain the starting point.
         *
         * @param point1 The ray starting point
         * @param point2 The ray ending point
         * @param callback A user implemented callback class or function.
         */
        RayCast(point1: XY, point2: XY, callback: b2RayCastCallback): void;
        RayCastOne(point1: XY, point2: XY): b2Fixture | null;
        RayCastAll(point1: XY, point2: XY, out?: b2Fixture[]): b2Fixture[];
        /**
         * Get the world body list. With the returned body, use b2Body::GetNext to get
         * the next body in the world list. A NULL body indicates the end of the list.
         *
         * @returns The head of the world body list.
         */
        GetBodyList(): b2Body | null;
        /**
         * Get the world joint list. With the returned joint, use b2Joint::GetNext to get
         * the next joint in the world list. A NULL joint indicates the end of the list.
         *
         * @returns The head of the world joint list.
         */
        GetJointList(): b2Joint | null;
        /**
         * Get the world contact list. With the returned contact, use b2Contact::GetNext to get
         * the next contact in the world list. A NULL contact indicates the end of the list.
         *
         * @returns The head of the world contact list.
         * @warning contacts are created and destroyed in the middle of a time step.
         * Use b2ContactListener to avoid missing contacts.
         */
        GetContactList(): b2Contact | null;
        /**
         * Enable/disable sleep.
         */
        SetAllowSleeping(flag: boolean): void;
        GetAllowSleeping(): boolean;
        /**
         * Enable/disable warm starting. For testing.
         */
        SetWarmStarting(flag: boolean): void;
        GetWarmStarting(): boolean;
        /**
         * Enable/disable continuous physics. For testing.
         */
        SetContinuousPhysics(flag: boolean): void;
        GetContinuousPhysics(): boolean;
        /**
         * Enable/disable single stepped continuous physics. For testing.
         */
        SetSubStepping(flag: boolean): void;
        GetSubStepping(): boolean;
        /**
         * Get the number of broad-phase proxies.
         */
        GetProxyCount(): number;
        /**
         * Get the number of bodies.
         */
        GetBodyCount(): number;
        /**
         * Get the number of joints.
         */
        GetJointCount(): number;
        /**
         * Get the number of contacts (each may have 0 or more contact points).
         */
        GetContactCount(): number;
        /**
         * Get the height of the dynamic tree.
         */
        GetTreeHeight(): number;
        /**
         * Get the balance of the dynamic tree.
         */
        GetTreeBalance(): number;
        /**
         * Get the quality metric of the dynamic tree. The smaller the better.
         * The minimum is 1.
         */
        GetTreeQuality(): number;
        /**
         * Change the global gravity vector.
         */
        SetGravity(gravity: XY): void;
        /**
         * Get the global gravity vector.
         */
        GetGravity(): b2Readonly<b2Vec2>;
        /**
         * Is the world locked (in the middle of a time step).
         */
        IsLocked(): boolean;
        /**
         * Set flag to control automatic clearing of forces after each time step.
         */
        SetAutoClearForces(flag: boolean): void;
        /**
         * Get the flag that controls automatic clearing of forces after each time step.
         */
        GetAutoClearForces(): boolean;
        /**
         * Shift the world origin. Useful for large worlds.
         * The body shift formula is: position -= newOrigin
         *
         * @param newOrigin The new origin with respect to the old origin
         */
        ShiftOrigin(newOrigin: XY): void;
        /**
         * Get the contact manager for testing.
         */
        GetContactManager(): b2ContactManager;
        /**
         * Get the current profile.
         */
        GetProfile(): b2Profile;
        /** Find islands, integrate and solve constraints, solve position constraints */
        Solve(step: b2TimeStep): void;
        static SolveTOI_s_subStep: b2TimeStep;
        static SolveTOI_s_backup: b2Sweep;
        static SolveTOI_s_backup1: b2Sweep;
        static SolveTOI_s_backup2: b2Sweep;
        static SolveTOI_s_toi_input: b2TOIInput;
        static SolveTOI_s_toi_output: b2TOIOutput;
        SolveTOI(step: b2TimeStep): void;
    }

    /**
     * rope/b2_rope.d.ts
     */
        export class b2RopeStretch {
            i1: number;
            i2: number;
            invMass1: number;
            invMass2: number;
            L: number;
            lambda: number;
            spring: number;
            damper: number;
        }
        export class b2RopeBend {
            i1: number;
            i2: number;
            i3: number;
            invMass1: number;
            invMass2: number;
            invMass3: number;
            invEffectiveMass: number;
            lambda: number;
            L1: number;
            L2: number;
            alpha1: number;
            alpha2: number;
            spring: number;
            damper: number;
        }

    export enum b2StretchingModel {
        b2_pbdStretchingModel = 0,
        b2_xpbdStretchingModel = 1
    }
    export enum b2BendingModel {
        b2_springAngleBendingModel = 0,
        b2_pbdAngleBendingModel = 1,
        b2_xpbdAngleBendingModel = 2,
        b2_pbdDistanceBendingModel = 3,
        b2_pbdHeightBendingModel = 4,
        b2_pbdTriangleBendingModel = 5
    }
    export class b2RopeTuning {
        stretchingModel: b2StretchingModel;
        bendingModel: b2BendingModel;
        damping: number;
        stretchStiffness: number;
        stretchHertz: number;
        stretchDamping: number;
        bendStiffness: number;
        bendHertz: number;
        bendDamping: number;
        isometric: boolean;
        fixedEffectiveMass: boolean;
        warmStart: boolean;
        Copy(other: Readonly<b2RopeTuning>): this;
    }
    export interface b2RopeDef {
        position: XY;
        vertices: XY[];
        masses: number[];
        gravity: XY;
        tuning: b2RopeTuning;
    }
    export class b2Rope {
        readonly m_position: b2Vec2;
        m_count: number;
        m_stretchCount: number;
        m_bendCount: number;
        readonly m_stretchConstraints: b2RopeStretch[];
        readonly m_bendConstraints: b2RopeBend[];
        readonly m_bindPositions: b2Vec2[];
        readonly m_ps: b2Vec2[];
        readonly m_p0s: b2Vec2[];
        readonly m_vs: b2Vec2[];
        readonly m_invMasses: number[];
        readonly m_gravity: b2Vec2;
        readonly m_tuning: b2RopeTuning;
        constructor(def: b2RopeDef);
        SetTuning(tuning: b2RopeTuning): void;
        Step(dt: number, iterations: number, position: b2Readonly<b2Vec2>): void;
        Reset(position: b2Readonly<b2Vec2>): void;
        SolveStretch_PBD(): void;
        SolveStretch_XPBD(dt: number): void;
        SolveBend_PBD_Angle(): void;
        SolveBend_XPBD_Angle(dt: number): void;
        SolveBend_PBD_Distance(): void;
        /**
         * Constraint based implementation of:
         * P. Volino: Simple Linear Bending Stiffness in Particle Systems
         */
        SolveBend_PBD_Height(): void;
        /** M. Kelager: A Triangle Bending Constraint Model for PBD */
        SolveBend_PBD_Triangle(): void;
        ApplyBendForces(dt: number): void;
        Draw(draw: b2Draw): void;
    }

    /**
     * index.d.ts
     */
    export interface b2BodyUserDataMap {
    }
    export type b2BodyUserData = Partial<b2BodyUserDataMap>;
    export interface b2FixtureUserDataMap {
    }
    export type b2FixtureUserData = Partial<b2FixtureUserDataMap>;
    export interface b2JointUserDataMap {
    }
    export type b2JointUserData = Partial<b2JointUserDataMap>;
}
