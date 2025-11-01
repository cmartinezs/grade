/**
 * Data loading utilities
 * Handles loading seed data from JSON files
 */

import { LevelCategory, EducationalLevel } from '@/types/level';

/**
 * Load level categories from JSON file
 */
export async function loadLevelCategories(): Promise<LevelCategory[]> {
  try {
    const response = await fetch('/data/level-categories.json');
    if (!response.ok) {
      throw new Error(`Failed to load level categories: ${response.statusText}`);
    }
    const data: unknown = await response.json();
    const categories = data as LevelCategory[];
    return categories.map((cat) => ({
      ...cat,
      createdAt: new Date(cat.createdAt),
      updatedAt: new Date(cat.updatedAt),
      deletedAt: cat.deletedAt ? new Date(cat.deletedAt) : null,
    }));
  } catch (error) {
    console.error('Error loading level categories:', error);
    return [];
  }
}

/**
 * Load education levels from JSON file
 */
export async function loadEducationLevels(): Promise<EducationalLevel[]> {
  try {
    const response = await fetch('/data/education-levels.json');
    if (!response.ok) {
      throw new Error(`Failed to load education levels: ${response.statusText}`);
    }
    const data: unknown = await response.json();
    const levels = data as EducationalLevel[];
    return levels.map((level) => ({
      ...level,
      createdAt: new Date(level.createdAt),
      updatedAt: new Date(level.updatedAt),
      deletedAt: level.deletedAt ? new Date(level.deletedAt) : null,
    }));
  } catch (error) {
    console.error('Error loading education levels:', error);
    return [];
  }
}

/**
 * Load level categories synchronously (for server-side use)
 */
export function loadLevelCategoriesSync(): LevelCategory[] {
  // Note: This requires the data to be imported directly
  // Used primarily for build-time data initialization
  return [];
}

/**
 * Load education levels synchronously (for server-side use)
 */
export function loadEducationLevelsSync(): EducationalLevel[] {
  // Note: This requires the data to be imported directly
  // Used primarily for build-time data initialization
  return [];
}
