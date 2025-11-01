/**
 * Educational Levels Management
 * Types for managing educational levels as parametric entities with hierarchy
 * 
 * Niveles Educacionales y Categorías son entidades paramétricas
 * con relación jerárquica padre-hijo
 */

/**
 * Educational Level Category (Super nivel)
 * Ejemplo: "Enseñanza Básica", "Enseñanza Media"
 */
export interface LevelCategory {
  id: number;
  code: string; // Unique code: "CAT_BASIC", "CAT_MEDIA", etc.
  name: string; // e.g., "Enseñanza Básica", "Enseñanza Media"
  description: string;
  categoryId?: number | null; // Reference to parent category (if hierarchical)
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}

/**
 * Educational Level (Specific level within a category)
 * Ejemplo: "1° Básico", "2° Medio"
 */
export interface EducationalLevel {
  id: number;
  code: string; // Unique code: "LEVEL_1B", "LEVEL_1M", etc.
  name: string; // e.g., "1° Básico", "2° Medio", etc.
  description: string;
  categoryId: number; // Reference to parent LevelCategory
  courseCount?: number; // Number of courses at this level
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}

/**
 * Input for creating a Level Category
 */
export interface CreateLevelCategoryInput {
  code: string;
  name: string;
  description: string;
  categoryId?: number | null; // Optional parent category
  isActive?: boolean;
}

/**
 * Input for editing a Level Category
 */
export interface EditLevelCategoryInput {
  code: string;
  name: string;
  description: string;
  categoryId?: number | null;
  isActive: boolean;
}

/**
 * Input for creating an Educational Level
 */
export interface CreateEducationalLevelInput {
  code: string;
  name: string;
  description: string;
  categoryId: number; // Required: parent category
  isActive?: boolean;
}

/**
 * Input for editing an Educational Level
 */
export interface EditEducationalLevelInput {
  code: string;
  name: string;
  description: string;
  categoryId: number;
  isActive: boolean;
}

/**
 * Predefined Chilean education level categories
 * Data loaded from: public/data/level-categories.json
 * 
 * Note: These are exported as empty arrays here for type reference.
 * The actual data is loaded at runtime from JSON files via dataLoader.ts
 */
export const CHILEAN_LEVEL_CATEGORIES: LevelCategory[] = [];

/**
 * Predefined Chilean education levels
 * Data loaded from: public/data/education-levels.json
 * 
 * Note: These are exported as empty arrays here for type reference.
 * The actual data is loaded at runtime from JSON files via dataLoader.ts
 */
export const CHILEAN_EDUCATION_LEVELS: EducationalLevel[] = [];

// Query result type for levels with their category information
export interface EducationalLevelWithCategory extends EducationalLevel {
  category?: LevelCategory; // Populated when joining with category
}

