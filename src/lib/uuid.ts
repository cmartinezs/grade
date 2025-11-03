/**
 * UUID Utility
 * Generates RFC v4 UUIDs with fallback
 */

/**
 * Generate a RFC 4.4 v4 UUID
 * Falls back to timestamp-based UUID if crypto.randomUUID is not available
 * 
 * Returns string UUIDs that are used directly as entity IDs
 * (no numeric conversion needed - all IDs are strings)
 */
export const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `uuid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
