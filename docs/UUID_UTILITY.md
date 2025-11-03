/**
 * UUID Utility Documentation
 * 
 * Location: src/lib/uuid.ts
 * 
 * A generic UUID utility module that eliminates code duplication across the application.
 * Used in: levelDataConnect.ts, taxonomyDataConnect.ts, userDataConnect.ts, 
 *          levelStore.ts, taxonomyStore.ts
 */

// =============================================================================
// MAIN FUNCTIONS
// =============================================================================

/**
 * generateUUID(): string
 * 
 * Generates a RFC 4.4 v4 UUID.
 * Falls back to timestamp-based UUID if crypto.randomUUID is not available.
 * 
 * Usage:
 *   const categoryId = generateUUID();
 *   // Returns: "550e8400-e29b-41d4-a716-446655440000" or "uuid-1699030000000-abc1234"
 */


/**
 * uuidToNumericId(uuid: string): number
 * 
 * Converts UUID to numeric ID by taking first 8 characters and parsing as hex.
 * Useful for legacy systems that require numeric IDs.
 * 
 * Usage:
 *   const uuid = generateUUID();
 *   const numericId = uuidToNumericId(uuid);
 *   // Returns: 1234567890
 */


/**
 * isValidUUID(uuid: string): boolean
 * 
 * Validates if a string is a valid RFC 4.4 v4 UUID format.
 * 
 * Usage:
 *   if (isValidUUID(userId)) {
 *     // Process valid UUID
 *   }
 */


/**
 * generateShortUUID(): string
 * 
 * Generates a shorter, URL-safe UUID variant (nanoid-style).
 * Returns 21 characters, uses alphanumeric + "_" + "-" charset.
 * Useful for shorter identifiers in URLs or display.
 * 
 * Usage:
 *   const shortId = generateShortUUID();
 *   // Returns: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
 */


/**
 * generateUUIDs(count: number): string[]
 * 
 * Generates multiple UUIDs at once.
 * 
 * Usage:
 *   const ids = generateUUIDs(5);
 *   // Returns array of 5 UUIDs
 */


/**
 * hashToNumericId(str: string): number
 * 
 * Converts a string (like name or code) to a deterministic numeric ID.
 * Same input always produces same output.
 * 
 * Usage:
 *   const idFromCode = hashToNumericId("CAT_BASIC");
 *   // Returns: Same number every time for "CAT_BASIC"
 */


// =============================================================================
// IMPORT PATTERN
// =============================================================================

/**
 * Standard import in any file needing UUIDs:
 * 
 *   import { generateUUID, uuidToNumericId } from './uuid';
 * 
 * Then use:
 *   const id = generateUUID();
 *   const numId = uuidToNumericId(id);
 */


// =============================================================================
// USAGE EXAMPLES IN EXISTING CODE
// =============================================================================

/**
 * Example 1: levelDataConnect.ts
 * 
 *   export const createNewLevelCategory = async (
 *     code: string,
 *     name: string,
 *     description: string,
 *     createdBy: string
 *   ): Promise<void> => {
 *     const categoryId = generateUUID();  // <-- UUID generation
 *     await dcCreateLevelCategory({ categoryId, code, name, description, createdBy });
 *   };
 */


/**
 * Example 2: levelStore.ts (cache sync)
 * 
 *   export const createLevelCategory = async (
 *     code: string,
 *     name: string,
 *     description: string,
 *     createdBy: string
 *   ): Promise<void> => {
 *     await createNewLevelCategory(code, name, description, createdBy);
 *     
 *     const categoryUuid = generateUUID();
 *     const newCategory: LevelCategory = {
 *       id: uuidToNumericId(categoryUuid),  // <-- Convert to numeric for cache
 *       code,
 *       name,
 *       description,
 *       // ...
 *     };
 *     
 *     if (cache.categories && Array.isArray(cache.categories)) {
 *       cache.categories.push(newCategory);
 *     }
 *   };
 */


/**
 * Example 3: taxonomyDataConnect.ts
 * 
 *   export const createNewSubject = async (
 *     name: string,
 *     code: string,
 *     createdBy: string
 *   ): Promise<void> => {
 *     const subjectId = generateUUID();  // <-- Centralized UUID generation
 *     await dcCreateSubject({ subjectId, name, code, createdBy });
 *   };
 */


/**
 * Example 4: userDataConnect.ts
 * 
 *   export const createNewUser = async (
 *     userData: { name: string; email: string; role: string },
 *     createdBy: string
 *   ): Promise<UserData | null> => {
 *     const userId = generateUUID();  // <-- Same pattern across all entities
 *     const authId = `auth_${Date.now()}`;
 *     
 *     const result = await dcCreateUser({
 *       userId,
 *       ...userData,
 *       authId,
 *       createdBy
 *     });
 *     // ...
 *   };
 */


// =============================================================================
// FILES REFACTORED TO USE UUID UTIL
// =============================================================================

/**
 * ✅ src/lib/uuid.ts - NEW FILE (utility module)
 * ✅ src/lib/levelDataConnect.ts - Uses generateUUID()
 * ✅ src/lib/levelStore.ts - Uses generateUUID(), uuidToNumericId()
 * ✅ src/lib/taxonomyDataConnect.ts - Uses generateUUID()
 * ✅ src/lib/taxonomyStore.ts - Uses generateUUID()
 * ✅ src/lib/userDataConnect.ts - Uses generateUUID()
 */


// =============================================================================
// BENEFITS OF THIS REFACTORING
// =============================================================================

/**
 * 1. CONSISTENCY
 *    - All UUID generation follows same pattern
 *    - Single source of truth for UUID logic
 * 
 * 2. NO CODE DUPLICATION
 *    - Before: crypto.randomUUID?.() || `uuid-${Date.now()}`  in 6+ places
 *    - After: generateUUID() everywhere
 * 
 * 3. MAINTAINABILITY
 *    - If UUID logic changes, only update uuid.ts
 *    - Easy to add new UUID variants without touching existing code
 * 
 * 4. SCALABILITY
 *    - New files automatically use same pattern
 *    - Easy to switch to different UUID library if needed
 * 
 * 5. TYPE SAFETY
 *    - All UUID operations have proper TypeScript types
 *    - Validation functions prevent invalid UUIDs
 */


// =============================================================================
// FUTURE ENHANCEMENTS
// =============================================================================

/**
 * Could add:
 * - parseUUID(uuid): { timestamp, random } - extract parts from UUID
 * - uuidFromTimestamp(timestamp): string - create UUID from timestamp
 * - validateUUIDv4(uuid): boolean - more strict validation
 * - uuidToString(uuid): string - formatted display
 * 
 * All without changing existing code!
 */
