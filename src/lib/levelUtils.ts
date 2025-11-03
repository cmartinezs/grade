/**
 * Utility functions for educational levels
 * Helper functions for managing hierarchical parametric entities
 *
 * Niveles Educacionales y Categorías son entidades paramétricas
 * con relación jerárquica padre-hijo
 */

import {
  EducationalLevel,
  LevelCategory,
  EducationalLevelWithCategory,
} from '@/types/level';

/**
 * Group educational levels by their parent category
 * @param levels - Array of educational levels
 * @param categories - Array of level categories
 * @returns Levels organized by category
 */
export function groupLevelsByCategory(
  levels: EducationalLevel[],
  categories: LevelCategory[]
): { category: LevelCategory; levels: EducationalLevel[] }[] {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));
  const grouped = new Map<string, EducationalLevel[]>();

  // Initialize all categories
  categories.forEach((cat) => {
    grouped.set(cat.id, []);
  });

  // Group levels by their parent category
  levels.forEach((level) => {
    if (!grouped.has(level.categoryId)) {
      grouped.set(level.categoryId, []);
    }
    grouped.get(level.categoryId)!.push(level);
  });

  // Convert to array with sorted levels
  return Array.from(grouped.entries())
    .map(([categoryId, categoryLevels]) => ({
      category: categoryMap.get(categoryId)!,
      levels: sortLevelsInCategory(categoryLevels),
    }))
    .filter((group) => group.category) // Filter out unmapped categories
    .sort((a, b) => a.category.name.localeCompare(b.category.name));
}

/**
 * Get levels for a specific category
 * @param levels - Array of all educational levels
 * @param categoryId - Category ID to filter by
 * @returns Levels that belong to the specified category
 */
export function getLevelsByCategory(
  levels: EducationalLevel[],
  categoryId: string
): EducationalLevel[] {
  return levels
    .filter((level) => level.categoryId === categoryId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a specific category by ID
 * @param categories - Array of all categories
 * @param categoryId - Category ID
 * @returns The category or undefined
 */
export function getCategoryById(
  categories: LevelCategory[],
  categoryId: string
): LevelCategory | undefined {
  return categories.find((cat) => cat.id === categoryId);
}

/**
 * Get a specific level by ID
 * @param levels - Array of all levels
 * @param levelId - Level ID
 * @returns The level or undefined
 */
export function getLevelById(
  levels: EducationalLevel[],
  levelId: string
): EducationalLevel | undefined {
  return levels.find((level) => level.id === levelId);
}

/**
 * Get a specific level by code
 * @param levels - Array of all levels
 * @param code - Level code
 * @returns The level or undefined
 */
export function getLevelByCode(
  levels: EducationalLevel[],
  code: string
): EducationalLevel | undefined {
  return levels.find((level) => level.code === code);
}

/**
 * Enrich levels with their category information
 * @param levels - Array of educational levels
 * @param categories - Array of level categories
 * @returns Levels with populated category data
 */
export function enrichLevelsWithCategory(
  levels: EducationalLevel[],
  categories: LevelCategory[]
): EducationalLevelWithCategory[] {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  return levels.map((level) => ({
    ...level,
    category: categoryMap.get(level.categoryId),
  }));
}

/**
 * Calculate statistics for a specific category
 * @param levels - Array of all levels
 * @param categoryId - Category ID
 * @returns Statistics object
 */
export function calculateCategoryStats(
  levels: EducationalLevel[],
  categoryId: string
): { total: number; active: number; inactive: number } {
  const categoryLevels = levels.filter((level) => level.categoryId === categoryId);

  return {
    total: categoryLevels.length,
    active: categoryLevels.filter((l) => l.isActive).length,
    inactive: categoryLevels.filter((l) => !l.isActive).length,
  };
}

/**
 * Get statistics for all categories
 * @param levels - Array of all levels
 * @param categories - Array of all categories
 * @returns Map of category ID to statistics
 */
export function getCategoryStatistics(
  levels: EducationalLevel[],
  categories: LevelCategory[]
): Map<
  string,
  { category: LevelCategory; total: number; active: number; inactive: number }
> {
  const stats = new Map();

  categories.forEach((category) => {
    const categoryStats = calculateCategoryStats(levels, category.id);
    stats.set(category.id, {
      category,
      ...categoryStats,
    });
  });

  return stats;
}

/**
 * Sort levels within a category (by name, numerically if applicable)
 * @param levels - Levels to sort
 * @returns Sorted levels
 */
export function sortLevelsInCategory(levels: EducationalLevel[]): EducationalLevel[] {
  return [...levels].sort((a, b) => {
    // Try to extract numbers from names like "1° Básico", "2° Medio"
    const aMatch = a.name.match(/^\d+/);
    const bMatch = b.name.match(/^\d+/);

    if (aMatch && bMatch) {
      return parseInt(aMatch[0], 10) - parseInt(bMatch[0], 10);
    }

    return a.name.localeCompare(b.name);
  });
}

/**
 * Get all active categories
 * @param categories - Array of all categories
 * @returns Active categories only
 */
export function getActiveCategories(categories: LevelCategory[]): LevelCategory[] {
  return categories.filter((cat) => cat.isActive && !cat.deletedAt);
}

/**
 * Get all active levels
 * @param levels - Array of all levels
 * @returns Active levels only
 */
export function getActiveLevels(levels: EducationalLevel[]): EducationalLevel[] {
  return levels.filter((level) => level.isActive && !level.deletedAt);
}

/**
 * Validate that a category code is unique
 * @param categories - Array of all categories
 * @param code - Code to validate
 * @param excludeId - ID to exclude from check (for updates)
 * @returns True if code is unique
 */
export function isCategoryCodeUnique(
  categories: LevelCategory[],
  code: string,
  excludeId?: string
): boolean {
  return !categories.some(
    (cat) => cat.code === code && !cat.deletedAt && cat.id !== excludeId
  );
}

/**
 * Validate that a level code is unique
 * @param levels - Array of all levels
 * @param code - Code to validate
 * @param excludeId - ID to exclude from check (for updates)
 * @returns True if code is unique
 */
export function isLevelCodeUnique(
  levels: EducationalLevel[],
  code: string,
  excludeId?: string
): boolean {
  return !levels.some(
    (level) => level.code === code && !level.deletedAt && level.id !== excludeId
  );
}

/**
 * Get child categories of a parent category
 * @param categories - Array of all categories
 * @param parentCategoryId - Parent category ID
 * @returns Child categories
 */
export function getCategoryChildren(
  categories: LevelCategory[],
  parentCategoryId: string | null
): LevelCategory[] {
  return categories.filter(
    (cat) => !cat.deletedAt && cat.categoryId === parentCategoryId
  );
}

/**
 * Get the full hierarchy path for a category
 * @param categories - Array of all categories
 * @param categoryId - Category ID
 * @returns Array of categories from root to target
 */
export function getCategoryHierarchyPath(
  categories: LevelCategory[],
  categoryId: string
): LevelCategory[] {
  const path: LevelCategory[] = [];
  let currentId: string | null = categoryId;

  while (currentId !== null) {
    const current = categories.find((cat) => cat.id === currentId);
    if (!current) break;

    path.unshift(current);
    currentId = current.categoryId || null;
  }

  return path;
}
