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
  deactivateLevelCategoryInfo,
  createNewEducationalLevel,
  deactivateEducationalLevelInfo,
  fetchLevelCategoriesFromDataConnect,
  fetchEducationalLevelsFromDataConnect,
} from './levelDataConnect';

const CATEGORIES_STORAGE_KEY = 'parametric_level_categories';
const LEVELS_STORAGE_KEY = 'parametric_educational_levels';

// ============================================================================
// IN-MEMORY CACHE (single source of truth - loaded from Data-Connect)
// ============================================================================

interface MemoryCache {
  categories: LevelCategory[] | null;
  levels: EducationalLevel[] | null;
  categoriesLoaded: boolean;
  levelsLoaded: boolean;
}

const memoryCache: MemoryCache = {
  categories: null,
  levels: null,
  categoriesLoaded: false,
  levelsLoaded: false,
};

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

  // Load categories from in-memory cache or Data-Connect
  private loadCategories(): LevelCategory[] {
    // Return from cache if already loaded
    if (memoryCache.categoriesLoaded && memoryCache.categories !== null) {
      return memoryCache.categories;
    }

    // If categories not loaded yet, return empty array
    // (async loading should be done via loadCategoriesAsync)
    return [];
  }

  // Async load categories from Data-Connect
  async loadCategoriesAsync(): Promise<LevelCategory[]> {
    // Return from cache if already loaded
    if (memoryCache.categoriesLoaded && memoryCache.categories !== null) {
      return memoryCache.categories;
    }

    try {
      const data = await fetchLevelCategoriesFromDataConnect();
      
      // Convert from Data-Connect format to LevelCategory format
      const categories: LevelCategory[] = data.map((cat: {
        categoryId: string;
        parentCategoryId?: string | null;
        code: string;
        name: string;
        description?: string | null;
        active?: boolean;
        createdAt: string;
        createdBy: string;
        updatedAt?: string | null;
        updatedBy?: string | null;
        deletedAt?: string | null;
        deletedBy?: string | null;
      }) => ({
        id: cat.categoryId,
        categoryId: cat.parentCategoryId || null,
        code: cat.code,
        name: cat.name,
        description: cat.description || '',
        isActive: cat.active !== false,
        createdAt: new Date(cat.createdAt),
        createdBy: cat.createdBy,
        updatedAt: cat.updatedAt ? new Date(cat.updatedAt) : new Date(cat.createdAt),
        updatedBy: cat.updatedBy || cat.createdBy,
        deletedAt: cat.deletedAt ? new Date(cat.deletedAt) : null,
        deletedBy: cat.deletedBy || null,
      }));

      // Store in memory cache
      memoryCache.categories = categories;
      memoryCache.categoriesLoaded = true;

      console.log(`[CATEGORY] Loaded ${categories.length} categories from Data-Connect`);
      return categories;
    } catch (error) {
      console.error('[CATEGORY] Error loading categories from Data-Connect:', error);
      // Return empty array on error
      memoryCache.categories = [];
      memoryCache.categoriesLoaded = true;
      return [];
    }
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

  // Create new category - ASYNC to sync with Data-Connect
  async createCategory(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
    userId?: string;
  }): Promise<LevelCategory> {
    const categories = this.loadCategories();

    // Check if code already exists
    if (categories.some((c) => c.code === input.code && !c.deletedAt)) {
      throw new Error(`El código de categoría "${input.code}" ya existe`);
    }

    // Generate new ID using proper UUID
    const newId = generateUUID();

    // Sync to Data-Connect
    try {
      await createNewLevelCategory(
        input.code,
        input.name,
        input.description,
        input.userId || 'SYSTEM',
        newId
      );
      console.log(`[CATEGORY] Sincronizado a Data-Connect: ${input.name} (${input.code})`);
    } catch (error) {
      console.error(`[CATEGORY] Error sincronizando a Data-Connect:`, error);
      throw error;
    }

    const timestamp = new Date();
    const newCategory: LevelCategory = {
      id: newId,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId || null,
      isActive: input.isActive !== false,
      createdAt: timestamp,
      createdBy: input.userId || 'SYSTEM',
      updatedAt: timestamp,
      updatedBy: input.userId || 'SYSTEM',
      deletedAt: null,
      deletedBy: null,
    };

    categories.push(newCategory);
    // localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    console.log(`[CATEGORY] Categoría creada localmente: ${newCategory.name} (${newCategory.code})`);
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
      userId?: string;
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
      updatedBy: input.userId || 'SYSTEM',
    };

    categories[index] = updatedCategory;
    // localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));

    console.log(`[CATEGORY] Categoría actualizada: ${updatedCategory.name} (${updatedCategory.code})`);
    return updatedCategory;
  }

  // Delete category (soft delete) - ASYNC to sync with Data-Connect
  async deleteCategory(id: string, userId?: string): Promise<void> {
    const categories = this.loadCategories();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error(`Categoría con ID ${id} no encontrada`);
    }

    const categoryName = categories[index].name;

    // Sync to Data-Connect
    try {
      await deactivateLevelCategoryInfo(id, userId || 'SYSTEM');
      console.log(`[CATEGORY] Desactivada en Data-Connect: ${categoryName}`);
    } catch (error) {
      console.error(`[CATEGORY] Error desactivando en Data-Connect:`, error);
      throw error;
    }

    const timestamp = new Date();
    categories[index] = {
      ...categories[index],
      deletedAt: timestamp,
      deletedBy: userId || 'SYSTEM',
    };

    // localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    console.log(`[CATEGORY] Categoría eliminada localmente: ${categoryName}`);
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

      // Actualizar el memory cache
      memoryCache.categories = convertedCategories;
      memoryCache.categoriesLoaded = true;

      // localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(convertedCategories));
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

  // Load levels from in-memory cache or Data-Connect
  private loadLevels(): EducationalLevel[] {
    // Return from cache if already loaded
    if (memoryCache.levelsLoaded && memoryCache.levels !== null) {
      return memoryCache.levels;
    }

    // If levels not loaded yet, return empty array
    // (async loading should be done via loadLevelsAsync)
    return [];
  }

  // Async load levels from Data-Connect
  async loadLevelsAsync(): Promise<EducationalLevel[]> {
    // Return from cache if already loaded
    if (memoryCache.levelsLoaded && memoryCache.levels !== null) {
      return memoryCache.levels;
    }

    try {
      const data = await fetchEducationalLevelsFromDataConnect();
      
      // Convert from Data-Connect format to EducationalLevel format
      const levels: EducationalLevel[] = data.map((lvl: {
        levelId: string;
        categoryId: string;
        code: string;
        name: string;
        description?: string | null;
        active?: boolean;
        createdAt: string;
        createdBy: string;
        updatedAt?: string | null;
        updatedBy?: string | null;
        deletedAt?: string | null;
        deletedBy?: string | null;
      }) => ({
        id: lvl.levelId,
        categoryId: lvl.categoryId,
        code: lvl.code,
        name: lvl.name,
        description: lvl.description || '',
        isActive: lvl.active !== false,
        createdAt: new Date(lvl.createdAt),
        createdBy: lvl.createdBy,
        updatedAt: lvl.updatedAt ? new Date(lvl.updatedAt) : new Date(lvl.createdAt),
        updatedBy: lvl.updatedBy || lvl.createdBy,
        deletedAt: lvl.deletedAt ? new Date(lvl.deletedAt) : null,
        deletedBy: lvl.deletedBy || null,
      }));

      // Store in memory cache
      memoryCache.levels = levels;
      memoryCache.levelsLoaded = true;

      console.log(`[LEVEL] Loaded ${levels.length} levels from Data-Connect`);
      return levels;
    } catch (error) {
      console.error('[LEVEL] Error loading levels from Data-Connect:', error);
      // Return empty array on error
      memoryCache.levels = [];
      memoryCache.levelsLoaded = true;
      return [];
    }
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

  // Create new level - ASYNC to sync with Data-Connect
  async createLevel(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
    userId?: string;
  }): Promise<EducationalLevel> {
    const levels = this.loadLevels();

    // Check if code already exists
    if (levels.some((l) => l.code === input.code && !l.deletedAt)) {
      throw new Error(`El código "${input.code}" ya existe`);
    }

    // Generate new ID using proper UUID
    const newId = generateUUID();

    // Sync to Data-Connect
    try {
      await createNewEducationalLevel(
        input.code,
        input.name,
        input.categoryId || 'cat-basic-001',
        input.description,
        input.userId || 'SYSTEM',
        newId
      );
      console.log(`[LEVEL] Sincronizado a Data-Connect: ${input.name} (${input.code})`);
    } catch (error) {
      console.error(`[LEVEL] Error sincronizando a Data-Connect:`, error);
      throw error;
    }

    const timestamp = new Date();
    const newLevel: EducationalLevel = {
      id: newId,
      name: input.name,
      code: input.code,
      description: input.description,
      categoryId: input.categoryId || 'cat-basic-001', // Default to first category
      isActive: input.isActive !== false,
      createdAt: timestamp,
      createdBy: input.userId || 'SYSTEM',
      updatedAt: timestamp,
      updatedBy: input.userId || 'SYSTEM',
      deletedAt: null,
      deletedBy: null,
    };

    levels.push(newLevel);
    // localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

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
      userId?: string;
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
      updatedBy: input.userId || 'SYSTEM',
    };

    levels[index] = updatedLevel;
    // localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));

    console.log(`[LEVEL] Nivel actualizado: ${updatedLevel.name} (${updatedLevel.code})`);
    return updatedLevel;
  }

  // Delete level (soft delete) - ASYNC to sync with Data-Connect
  async deleteLevel(id: string, userId?: string): Promise<void> {
    const levels = this.loadLevels();
    const index = levels.findIndex((l) => l.id === id);

    if (index === -1) {
      throw new Error(`Nivel con ID ${id} no encontrado`);
    }

    const levelName = levels[index].name;

    // Sync to Data-Connect
    try {
      await deactivateEducationalLevelInfo(id, userId || 'SYSTEM');
      console.log(`[LEVEL] Desactivado en Data-Connect: ${levelName}`);
    } catch (error) {
      console.error(`[LEVEL] Error desactivando en Data-Connect:`, error);
      throw error;
    }

    const timestamp = new Date();
    levels[index] = {
      ...levels[index],
      deletedAt: timestamp,
      deletedBy: userId || 'SYSTEM',
    };

    // localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
    console.log(`[LEVEL] Nivel eliminado localmente: ${levelName}`);
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

      // Actualizar el memory cache
      memoryCache.levels = convertedLevels;
      memoryCache.levelsLoaded = true;

      // localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(convertedLevels));
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

  // ---- Initialization (Load from Data-Connect) ----
  /**
   * Load categories from Data-Connect and cache in memory
   */
  async loadCategories(): Promise<LevelCategory[]> {
    return this.categoryStore.loadCategoriesAsync();
  }

  /**
   * Load levels from Data-Connect and cache in memory
   */
  async loadLevels(): Promise<EducationalLevel[]> {
    return this.levelStore.loadLevelsAsync();
  }

  /**
   * Load both categories and levels from Data-Connect
   */
  async loadAll(): Promise<void> {
    await Promise.all([
      this.loadCategories(),
      this.loadLevels(),
    ]);
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

  async createCategory(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
    userId?: string;
  }): Promise<LevelCategory> {
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
      userId?: string;
    }
  ): LevelCategory {
    return this.categoryStore.updateCategory(id, input);
  }

  async deleteCategory(id: string, userId?: string): Promise<void> {
    return this.categoryStore.deleteCategory(id, userId);
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
  async createLevel(input: {
    name: string;
    code: string;
    description: string;
    categoryId?: string;
    isActive?: boolean;
    userId?: string;
  }): Promise<EducationalLevel> {
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
      userId?: string;
    }
  ): EducationalLevel {
    return this.levelStore.updateLevel(id, input);
  }
  // Backwards compatible method
  async deleteLevel(id: string, userId?: string): Promise<void> {
    return this.levelStore.deleteLevel(id, userId);
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
