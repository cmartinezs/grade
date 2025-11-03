# UUID Utility - Quick Reference

**File:** `src/lib/uuid.ts`

## Usage

```typescript
import { generateUUID, uuidToNumericId } from './uuid';

// Generate a new UUID
const id = generateUUID();
// "550e8400-e29b-41d4-a716-446655440000"

// Convert UUID to numeric ID for cache
const numericId = uuidToNumericId(id);
// 1429355840
```

## All Functions

| Function | Returns | Use Case |
|----------|---------|----------|
| `generateUUID()` | `string` | Generate RFC v4 UUID with fallback |
| `uuidToNumericId(uuid)` | `number` | Convert UUID to numeric ID for cache/DB |
| `isValidUUID(uuid)` | `boolean` | Validate UUID format |
| `generateShortUUID()` | `string` | Generate 21-char URL-safe ID |
| `generateUUIDs(count)` | `string[]` | Generate multiple UUIDs |
| `hashToNumericId(str)` | `number` | Convert string to deterministic number |

## Files Using This Utility

- ✅ `levelDataConnect.ts` - Level entity creation
- ✅ `levelStore.ts` - Level cache synchronization  
- ✅ `taxonomyDataConnect.ts` - Taxonomy entity creation
- ✅ `taxonomyStore.ts` - Taxonomy cache synchronization
- ✅ `userDataConnect.ts` - User creation

## Before vs After

**Before (scattered across files):**
```typescript
const categoryId = crypto.randomUUID?.() || `uuid-${Date.now()}`;
const id = parseInt(categoryId.substring(0, 8), 16);
```

**After (centralized in uuid.ts):**
```typescript
const categoryId = generateUUID();
const id = uuidToNumericId(categoryId);
```

## Pattern in Data Connect Files

```typescript
import { generateUUID } from './uuid';

export const createNewEntity = async (...) => {
  const entityId = generateUUID(); // ← Simple and clear
  await dcCreate({ entityId, ...rest });
};
```

## Pattern in Store Files

```typescript
import { generateUUID, uuidToNumericId } from './uuid';

export const createEntity = async (...) => {
  await createNewEntity(...);
  
  const entityUuid = generateUUID();
  const newEntity = {
    id: uuidToNumericId(entityUuid), // ← For cache compatibility
    ...rest
  };
  
  cache.entities.push(newEntity);
};
```

## Why This Matters

1. **DRY Principle** - UUID logic defined once, used everywhere
2. **Consistency** - All entities generate IDs the same way
3. **Maintainability** - Change UUID logic in one place
4. **Type Safety** - TypeScript types on all UUID operations
5. **Testability** - Easy to mock UUID generation in tests
