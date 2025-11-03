/**
 * UUID Utilities
 * Generic functions for generating and manipulating UUIDs
 */

/**
 * Generate a RFC 4.4 v4 UUID
 * Falls back to timestamp-based UUID if crypto.randomUUID is not available
 */
export const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return `uuid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Convert UUID to numeric ID
 * Takes first 8 characters of UUID and converts to number
 * Useful for legacy systems that require numeric IDs
 */
export const uuidToNumericId = (uuid: string): number => {
  const hex = uuid.substring(0, 8);
  return parseInt(hex.replace(/[^0-9a-f]/gi, '0'), 16);
};

/**
 * Check if string is a valid UUID v4
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Generate a shorter, URL-safe UUID variant (nanoid-style)
 * 21 characters, URL-safe
 */
export const generateShortUUID = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let result = '';
  for (let i = 0; i < 21; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate multiple UUIDs at once
 */
export const generateUUIDs = (count: number): string[] => {
  return Array.from({ length: count }, () => generateUUID());
};

/**
 * Hash a string to a numeric ID (deterministic)
 * Useful for converting names or codes to consistent numeric IDs
 */
export const hashToNumericId = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};
