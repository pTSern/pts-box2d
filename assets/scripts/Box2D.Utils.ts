import { PhysicsGroup2D } from 'cc';

export type TPhysicsGroupInput = PhysicsGroup2D | number | string;

const _$ = {
    /**
     * Converts a PhysicsGroup2D input (string enum key e.g. "DEFAULT" or "STONE",
     * numeric string "1", "2", number bitmask 1, 2, or object with tag/group)
     * to the actual numeric tag bitmask used in Box2D.Shape.
     *
     * @param value The PhysicsGroup2D value, string name, or number.
     * @returns The resolved numeric tag bitmask (categoryBits).
     */
    toTag(value: TPhysicsGroupInput | any): number {
        if (value === null || value === undefined) {
            return 0;
        }

        // If it's an object with tag/group/value property
        if (typeof value === 'object') {
            if (typeof value.tag === 'number' || typeof value.tag === 'string') {
                return _$.toTag(value.tag);
            }
            if (typeof value.group === 'number' || typeof value.group === 'string') {
                return _$.toTag(value.group);
            }
            if (typeof value.value === 'number' || typeof value.value === 'string') {
                return _$.toTag(value.value);
            }
        }

        // If it's already a number
        if (typeof value === 'number') {
            if (isNaN(value)) return 0;
            return value;
        }

        // If it's a string
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (!trimmed) return 0;

            // 1. Direct match on PhysicsGroup2D enum key (e.g. "DEFAULT", "STONE")
            if (trimmed in PhysicsGroup2D && typeof (PhysicsGroup2D as any)[trimmed] === 'number') {
                return (PhysicsGroup2D as any)[trimmed];
            }

            // 2. Case-insensitive search on PhysicsGroup2D enum keys
            const lower = trimmed.toLowerCase();
            for (const key of Object.keys(PhysicsGroup2D)) {
                if (key.toLowerCase() === lower && typeof (PhysicsGroup2D as any)[key] === 'number') {
                    return (PhysicsGroup2D as any)[key];
                }
            }

            // 3. Numeric string (e.g. "1", "2", "4")
            const parsedNum = Number(trimmed);
            if (!isNaN(parsedNum)) {
                return parsedNum;
            }
        }

        return 0;
    },

    /**
     * Converts a PhysicsGroup2D or tag number into its human-readable string group name.
     * E.g. 1 -> "DEFAULT", 2 -> "STONE".
     *
     * @param value The PhysicsGroup2D value or tag number.
     * @returns The group name string.
     */
    toGroupName(value: TPhysicsGroupInput | any): string {
        const tag = _$.toTag(value);
        if (tag in PhysicsGroup2D && typeof (PhysicsGroup2D as any)[tag] === 'string') {
            return (PhysicsGroup2D as any)[tag];
        }
        if (typeof value === 'string') {
            return value;
        }
        return String(tag);
    },

    /**
     * Compares two physics group representations or checks if a tag fits any of the target groups.
     * Accurately matches even if one is string ("STONE" or "2") and the other is number (2).
     *
     * @param currentTag The shape tag or group value to test.
     * @param target The target group, tag number, string name, or array of groups.
     * @returns True if currentTag matches target or is contained in target array.
     */
    compare(currentTag: TPhysicsGroupInput | any, target: TPhysicsGroupInput | TPhysicsGroupInput[] | any): boolean {
        if (Array.isArray(target)) {
            return target.some(t => _$.compare(currentTag, t));
        }

        const tagA = _$.toTag(currentTag);
        const tagB = _$.toTag(target);

        if (tagA !== 0 && tagB !== 0) {
            return tagA === tagB;
        }

        // Fallback for 0 or unknown strings (case-insensitive string comparison)
        return String(currentTag).trim().toLowerCase() === String(target).trim().toLowerCase();
    }
};

export default _$;
