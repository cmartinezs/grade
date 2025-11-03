/**
 * Educational Levels Store
 * Manages both Level Categories and Educational Levels as parametric entities
 * with localStorage persistence
 */

import {
  EducationalLevel,
  LevelCategory,
} from '@/types/level';
import { generateUUID } from './uuid';

import {
  createNewLevelCategory,
  updateLevelCategoryInfo,
  deactivateLevelCategoryInfo,
  reactivateLevelCategoryInfo,
  createNewEducationalLevel,
  updateEducationalLevelInfo,
  deactivateEducationalLevelInfo,
  reactivateEducationalLevelInfo,
} from './levelDataConnect';

const CATEGORIES_STORAGE_KEY = 'parametric_level_categories';
const LEVELS_STORAGE_KEY = 'parametric_educational_levels';

// Seed data URLs
// These URLs are defined for future dynamic loading capabilities
// Currently, fallback seed data is commented out as auto-load is disabled

// DESHABILITADO: Ya no se cargan automáticamente
// const FALLBACK_CATEGORIES: LevelCategory[] = [
//   {
//     id: 'cat-basic-001',
//     code: 'CAT_BASIC',
//     name: 'Enseñanza Básica',
//     description: 'Educación básica (1° a 8° año)',
//     categoryId: null,
//     isActive: true,
//     createdAt: new Date('2025-01-01'),
//     createdBy: 'SYSTEM',
//     updatedAt: new Date('2025-01-01'),
//     updatedBy: 'SYSTEM',
//     deletedAt: null,
//     deletedBy: null,
//   },
//   {
//     id: 'cat-media-002',
//     code: 'CAT_MEDIA',
//     name: 'Enseñanza Media',
//     description: 'Educación media (1° a 4° año medio)',
//     categoryId: null,
//     isActive: true,
//     createdAt: new Date('2025-01-01'),
//     createdBy: 'SYSTEM',
//     updatedAt: new Date('2025-01-01'),
//     updatedBy: 'SYSTEM',
//     deletedAt: null,
//     deletedBy: null,
//   },
// ];

// const FALLBACK_LEVELS: EducationalLevel[] = [
//   { id: 'level-1b-001', code: 'LEVEL_1B', name: '1° Básico', description: 'Primer año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-2b-002', code: 'LEVEL_2B', name: '2° Básico', description: 'Segundo año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-3b-003', code: 'LEVEL_3B', name: '3° Básico', description: 'Tercer año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-4b-004', code: 'LEVEL_4B', name: '4° Básico', description: 'Cuarto año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-5b-005', code: 'LEVEL_5B', name: '5° Básico', description: 'Quinto año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-6b-006', code: 'LEVEL_6B', name: '6° Básico', description: 'Sexto año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-7b-007', code: 'LEVEL_7B', name: '7° Básico', description: 'Séptimo año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-8b-008', code: 'LEVEL_8B', name: '8° Básico', description: 'Octavo año de educación básica', categoryId: 'cat-basic-001', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-1m-009', code: 'LEVEL_1M', name: '1° Medio', description: 'Primer año de educación media', categoryId: 'cat-media-002', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-2m-010', code: 'LEVEL_2M', name: '2° Medio', description: 'Segundo año de educación media', categoryId: 'cat-media-002', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-3m-011', code: 'LEVEL_3M', name: '3° Medio', description: 'Tercer año de educación media', categoryId: 'cat-media-002', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
//   { id: 'level-4m-012', code: 'LEVEL_4M', name: '4° Medio', description: 'Cuarto año de educación media', categoryId: 'cat-media-002', isActive: true, createdAt: new Date('2025-01-01'), createdBy: 'SYSTEM', updatedAt: new Date('2025-01-01'), updatedBy: 'SYSTEM', deletedAt: null, deletedBy: null },
// ];

// ============================================================================
// LEVEL CATEGORIES STORE
// ============================================================================

class LevelCategoryStore {
  // Initialize with default categories if empty
  private initializeDefaultCategories(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (stored) return; // Already initialized

    // DESHABILITADO: No cargar automáticamente
    // Los datos deben cargarse desde Data-Connect o mediante carga manual desde JSON
    // Use fallback seed data
    // localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(FALLBACK_CATEGORIES));
    // console.log(`[CATEGORY] ${FALLBACK_CATEGORIES.length} categorías de base inicializadas`);
  }

  // Load categories from localStorage
  private loadCategories(): LevelCategory[] {
    if (typeof window === 'undefined') return [];

    // DESHABILITADO: this.initializeDefaultCategories();

    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!stored) return [];

    const categories = JSON.parse(stored);
    return categories.map((c: LevelCategory) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      deletedAt: c.deletedAt ? new Date(c.deletedAt) : null,
    }));
  }

  // Get all active categories
  getAllCategories(): LevelCategory[] {
    return this.loadCategories().filter((c) => !c.deletedAt);
  }

  // Get all categories including inactive
  getAllCategoriesIncludeInactive(): LevelCategory[] {
    return this.loadCategories();
  }

  // Get category by ID
  getCategoryById(id: string): LevelCategory | null {
    const categories = this.loadCategories();
    return categories.find((c) => c.id === id) || null;
  }

  // Get categories by parent ID (hierarchical)
  getCategoriesByParent(categoryId: string | null): LevelCategory[] {
    const categories = this.loadCategories();
    return categories.filter((c) => !c.deletedAt && c.categoryId === categoryId);
  }

  // Get category by code
  getCategoryByCode(code: string): LevelCategory | null {
    const categories = this.loadCategories();
    return categories.find((c) => !c.deletedAt && c.code === code) || null;
  }

  // Create new category
  createCategory(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
  }): LevelCategory {
    const categories = this.loadCategories();

    // Check if code already exists
    if (categories.some((c) => c.code === input.code && !c.deletedAt)) {
      throw new Error(`El código de categoría "${input.code}" ya existe`);
    }

    // Generate new ID (string-based)
    const newId = `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const timestamp = new Date();
    const newCategory: LevelCategory = {
      id: newId,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId || null,
      isActive: input.isActive !== false,
      createdAt: timestamp,
      createdBy: 'USER',
      updatedAt: timestamp,
      updatedBy: 'USER',
      deletedAt: null,
      deletedBy: null,
    };

    categories.push(newCategory);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    console.log(`[CATEGORY] Categoría creada: ${newCategory.name} (${newCategory.code})`);
    return newCategory;
  }

  // Update category
  updateCategory(
    id: string,
    input: {
      name: string;
      code: string;
      description: string;
      categoryId?: string;
      isActive: boolean;
    }
  ): LevelCategory {
    const categories = this.loadCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error(`Categoría con ID ${id} no encontrada`);
    }

    const category = categories[index];

    // Check if new code already exists (and is different from current)
    if (
      input.code !== category.code &&
      categories.some((c) => c.code === input.code && !c.deletedAt)
    ) {
      throw new Error(`El código de categoría "${input.code}" ya existe`);
    }

    const timestamp = new Date();
    const updatedCategory: LevelCategory = {
      ...category,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId !== undefined ? input.categoryId : category.categoryId,
      isActive: input.isActive,
      updatedAt: timestamp,
      updatedBy: 'USER',
    };

    categories[index] = updatedCategory;
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    console.log(`[CATEGORY] Categoría actualizada: ${updatedCategory.name} (${updatedCategory.code})`);
    return updatedCategory;
  }

  // Delete category (soft delete)
  deleteCategory(id: string): void {
    const categories = this.loadCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error(`Categoría con ID ${id} no encontrada`);
    }

    const timestamp = new Date();
    categories[index] = {
      ...categories[index],
      deletedAt: timestamp,
      deletedBy: 'USER',
    };

    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    console.log(`[CATEGORY] Categoría eliminada: ${categories[index].name}`);
  }

  // Refresh categories from Data-Connect
  refreshFromDataConnect(categories: Array<{
    categoryId: string;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: string;
  }>): void {
    if (typeof window === 'undefined') return;

    try {
      // Convert Data-Connect format to LevelCategory format
      const convertedCategories: LevelCategory[] = categories.map((cat) => ({
        id: cat.categoryId,
        categoryId: null, // Data-Connect doesn't support hierarchical categories yet
        code: cat.code,
        name: cat.name,
        description: cat.description || '',
        isActive: cat.active !== false,
        createdAt: new Date(cat.createdAt),
        createdBy: 'SYSTEM',
        updatedAt: new Date(cat.createdAt),
        updatedBy: 'SYSTEM',
        deletedAt: null,
        deletedBy: null,
      }));

      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(convertedCategories));
      console.log(`[CATEGORY] Refreshed ${convertedCategories.length} categories from Data-Connect`);
    } catch (error) {
      console.error('[CATEGORY] Error refreshing from Data-Connect:', error);
      throw error;
    }
  }
}

// ============================================================================
// EDUCATIONAL LEVELS STORE
// ============================================================================

class EducationalLevelStore {
  // Initialize with default levels if empty
  private initializeDefaultLevels(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(LEVELS_STORAGE_KEY);
    if (stored) return; // Already initialized

    // DESHABILITADO: No cargar automáticamente
    // Los datos deben cargarse desde Data-Connect o mediante carga manual desde JSON
    // Use fallback seed data
    // localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(FALLBACK_LEVELS));
    // console.log(`[LEVEL] ${FALLBACK_LEVELS.length} niveles de base inicializados`);
  }

  // Load levels from localStorage
  private loadLevels(): EducationalLevel[] {
    if (typeof window === 'undefined') return [];

    // DESHABILITADO: this.initializeDefaultLevels();

    const stored = localStorage.getItem(LEVELS_STORAGE_KEY);
    if (!stored) return [];

    const levels = JSON.parse(stored);
    return levels.map((l: EducationalLevel) => ({
      ...l,
      createdAt: new Date(l.createdAt),
      updatedAt: new Date(l.updatedAt),
      deletedAt: l.deletedAt ? new Date(l.deletedAt) : null,
    }));
  }

  // Get all active levels
  getAllLevels(): EducationalLevel[] {
    return this.loadLevels().filter((l) => !l.deletedAt);
  }

  // Get all levels including inactive
  getAllLevelsIncludeInactive(): EducationalLevel[] {
    return this.loadLevels();
  }

  // Get level by ID
  getLevelById(id: string): EducationalLevel | null {
    const levels = this.loadLevels();
    return levels.find((l) => l.id === id) || null;
  }

  // Get levels by category ID
  getLevelsByCategory(categoryId: string): EducationalLevel[] {
    const levels = this.loadLevels();
    return levels.filter((l) => !l.deletedAt && l.categoryId === categoryId);
  }

  // Get level by code
  getLevelByCode(code: string): EducationalLevel | null {
    const levels = this.loadLevels();
    return levels.find((l) => !l.deletedAt && l.code === code) || null;
  }

  // Get level by name
  getLevelByName(name: string): EducationalLevel | null {
    const levels = this.loadLevels();
    return levels.find((l) => !l.deletedAt && l.name === name) || null;
  }

  // Get paginated levels
  getPaginatedLevels(
    page: number = 1,
    pageSize: number = 10,
    options?: { includeInactive?: boolean; searchText?: string; categoryId?: string }
  ): { levels: EducationalLevel[]; total: number; totalPages: number } {
    let allLevels = options?.includeInactive
      ? this.getAllLevelsIncludeInactive()
      : this.getAllLevels();

    // Filter by category if provided
    if (options?.categoryId) {
      allLevels = allLevels.filter((level) => level.categoryId === options.categoryId);
    }

    // Apply search filter if provided
    if (options?.searchText) {
      const searchTerm = options.searchText.toLowerCase().trim();
      allLevels = allLevels.filter(
        (level) =>
          level.name.toLowerCase().includes(searchTerm) ||
          level.code.toLowerCase().includes(searchTerm) ||
          level.description.toLowerCase().includes(searchTerm)
      );
    }

    const total = allLevels.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const levels = allLevels.slice(startIndex, startIndex + pageSize);

    return {
      levels,
      total,
      totalPages,
    };
  }

  // Create new level
  createLevel(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
  }): EducationalLevel {
    const levels = this.loadLevels();

    // Check if code already exists
    if (levels.some((l) => l.code === input.code && !l.deletedAt)) {
      throw new Error(`El código "${input.code}" ya existe`);
    }

    // Generate new ID (string-based)
    const newId = `level-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const timestamp = new Date();
    const newLevel: EducationalLevel = {
      id: newId,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId || 'cat-basic-001', // Default to first category
      isActive: input.isActive !== false,
      createdAt: timestamp,
      createdBy: 'USER',
      updatedAt: timestamp,
      updatedBy: 'USER',
      deletedAt: null,
      deletedBy: null,
    };

    levels.push(newLevel);
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

    console.log(`[LEVEL] Nivel creado: ${newLevel.name} (${newLevel.code})`);
    return newLevel;
  }

  // Update level
  updateLevel(
    id: string,
    input: {
      name: string;
      code: string;
      description: string;
      categoryId?: string;
      isActive: boolean;
    }
  ): EducationalLevel {
    const levels = this.loadLevels();
    const index = levels.findIndex((l) => l.id === id);

    if (index === -1) {
      throw new Error(`Nivel con ID ${id} no encontrado`);
    }

    const level = levels[index];

    // Check if new code already exists (and is different from current)
    if (input.code !== level.code && levels.some((l) => l.code === input.code && !l.deletedAt)) {
      throw new Error(`El código "${input.code}" ya existe`);
    }

    const timestamp = new Date();
    const updatedLevel: EducationalLevel = {
      ...level,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId !== undefined ? input.categoryId : level.categoryId,
      isActive: input.isActive,
      updatedAt: timestamp,
      updatedBy: 'USER',
    };

    levels[index] = updatedLevel;
    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

    console.log(`[LEVEL] Nivel actualizado: ${updatedLevel.name} (${updatedLevel.code})`);
    return updatedLevel;
  }

  // Delete level (soft delete)
  deleteLevel(id: string): void {
    const levels = this.loadLevels();
    const index = levels.findIndex((l) => l.id === id);

    if (index === -1) {
      throw new Error(`Nivel con ID ${id} no encontrado`);
    }

    const timestamp = new Date();
    levels[index] = {
      ...levels[index],
      deletedAt: timestamp,
      deletedBy: 'USER',
    };

    localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
    console.log(`[LEVEL] Nivel eliminado: ${levels[index].name}`);
  }

  // Refresh levels from Data-Connect
  refreshFromDataConnect(levels: Array<{
    levelId: string;
    categoryId: string;
    code: string;
    name: string;
    description?: string | null;
    active: boolean;
    createdAt: string;
  }>): void {
    if (typeof window === 'undefined') return;

    try {
      // Convert Data-Connect format to EducationalLevel format
      const convertedLevels: EducationalLevel[] = levels.map((lvl) => ({
        id: lvl.levelId,
        categoryId: lvl.categoryId,
        code: lvl.code,
        name: lvl.name,
        description: lvl.description || '',
        isActive: lvl.active !== false,
        createdAt: new Date(lvl.createdAt),
        createdBy: 'SYSTEM',
        updatedAt: new Date(lvl.createdAt),
        updatedBy: 'SYSTEM',
        deletedAt: null,
        deletedBy: null,
      }));

      localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(convertedLevels));
      console.log(`[LEVEL] Refreshed ${convertedLevels.length} levels from Data-Connect`);
    } catch (error) {
      console.error('[LEVEL] Error refreshing from Data-Connect:', error);
      throw error;
    }
  }
}

// ============================================================================
// COMBINED LEVEL STORE (Backwards Compatible)
// ============================================================================

class LevelStore {
  private categoryStore: LevelCategoryStore;
  private levelStore: EducationalLevelStore;

  constructor() {
    this.categoryStore = new LevelCategoryStore();
    this.levelStore = new EducationalLevelStore();
  }

  // ---- Category Methods ----
  getAllCategories(): LevelCategory[] {
    return this.categoryStore.getAllCategories();
  }

  getCategoryById(id: string): LevelCategory | null {
    return this.categoryStore.getCategoryById(id);
  }

  getCategoryByCode(code: string): LevelCategory | null {
    return this.categoryStore.getCategoryByCode(code);
  }

  createCategory(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
  }): LevelCategory {
    return this.categoryStore.createCategory(input);
  }

  updateCategory(
    id: string,
    input: {
      name: string;
      code: string;
      description: string;
      categoryId?: string;
      isActive: boolean;
    }
  ): LevelCategory {
    return this.categoryStore.updateCategory(id, input);
  }

  deleteCategory(id: string): void {
    return this.categoryStore.deleteCategory(id);
  }

  // ---- Level Methods ----
  getAllLevels(): EducationalLevel[] {
    return this.levelStore.getAllLevels();
  }

  getLevelById(id: string): EducationalLevel | null {
    return this.levelStore.getLevelById(id);
  }

  getLevelByCode(code: string): EducationalLevel | null {
    return this.levelStore.getLevelByCode(code);
  }

  getLevelByName(name: string): EducationalLevel | null {
    return this.levelStore.getLevelByName(name);
  }

  getLevelsByCategory(categoryId: string): EducationalLevel[] {
    return this.levelStore.getLevelsByCategory(categoryId);
  }

  getPaginatedLevels(
    page: number = 1,
    pageSize: number = 10,
    options?: { includeInactive?: boolean; searchText?: string; categoryId?: string }
  ): { levels: EducationalLevel[]; total: number; totalPages: number } {
    return this.levelStore.getPaginatedLevels(page, pageSize, options);
  }

  // Backwards compatible method
  createLevel(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
  }): EducationalLevel {
    return this.levelStore.createLevel(input);
  }

  // Backwards compatible method
  updateLevel(
    id: string,
    input: {
      name: string;
      code: string;
      description: string;
      categoryId?: string;
      isActive: boolean;
    }
  ): EducationalLevel {
    return this.levelStore.updateLevel(id, input);
  }

  // Backwards compatible method
  deleteLevel(id: string): void {
    return this.levelStore.deleteLevel(id);
  }
}

// ===================================================================
// DATA CONNECT WRAPPERS (Funciones con cache sincronizado)
// ===================================================================

interface CacheState {
  categories: LevelCategory[] | null;
  levels: EducationalLevel[] | null;
  lastFetch: Record<string, number>;
  loading: Record<string, boolean>;
}

const cache: CacheState = {
  categories: null,
  levels: null,
  lastFetch: {},
  loading: {
    categories: false,
    levels: false,
  }
};

/**
 * Crear categoría de nivel (con sincronización de caché)
 */
export const createLevelCategory = async (
  code: string,
  name: string,
  description: string | undefined,
  createdBy: string
): Promise<void> => {
  try {
    // Call Data Connect mutation
    await createNewLevelCategory(code, name, description || '', createdBy);
    
    // Sync to cache with generated UUID as string ID
    const categoryId = generateUUID();
    const newCategory: LevelCategory = {
      id: categoryId,
      code,
      name,
      description: description || '',
      categoryId: null,
      isActive: true,
      createdAt: new Date(),
      createdBy,
      updatedAt: new Date(),
      updatedBy: createdBy,
      deletedAt: null,
      deletedBy: null,
    };
    
    if (cache.categories && Array.isArray(cache.categories)) {
      cache.categories.push(newCategory);
    } else {
      cache.categories = null;
    }
  } catch (error) {
    console.error('Error creating level category:', error);
    throw error;
  }
};

/**
 * Crear nivel educacional (con sincronización de caché)
 */
export const createEducationalLevel = async (
  code: string,
  name: string,
  categoryId: string,
  description: string | undefined,
  createdBy: string
): Promise<void> => {
  try {
    // Call Data Connect mutation
    await createNewEducationalLevel(code, name, categoryId, description || '', createdBy);
    
    // Sync to cache with generated UUID as string ID
    const levelId = generateUUID();
    const newLevel: EducationalLevel = {
      id: levelId,
      code,
      name,
      description: description || '',
      categoryId,
      isActive: true,
      createdAt: new Date(),
      createdBy,
      updatedAt: new Date(),
      updatedBy: createdBy,
      deletedAt: null,
      deletedBy: null,
    };
    
    if (cache.levels && Array.isArray(cache.levels)) {
      cache.levels.push(newLevel);
    } else {
      cache.levels = null;
    }
  } catch (error) {
    console.error('Error creating educational level:', error);
    throw error;
  }
};

// Export singletons
export const levelCategoryStore = new LevelCategoryStore();
export const educationalLevelStore = new EducationalLevelStore();
export const levelStore = new LevelStore();

export { LevelCategoryStore, EducationalLevelStore, LevelStore };
