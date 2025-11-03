/**
 * Level Data Connect Service
 * Wrapper para operaciones de Level Categories y Educational Levels usando Firebase Data Connect
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateUUID } from './uuid';
import {
  createLevelCategory as dcCreateLevelCategory,
  updateLevelCategory as dcUpdateLevelCategory,
  deactivateLevelCategory as dcDeactivateLevelCategory,
  reactivateLevelCategory as dcReactivateLevelCategory,
  createEducationalLevel as dcCreateEducationalLevel,
  updateEducationalLevel as dcUpdateEducationalLevel,
  deactivateEducationalLevel as dcDeactivateEducationalLevel,
  reactivateEducationalLevel as dcReactivateEducationalLevel,
  listLevelCategories as dcListLevelCategories,
  listEducationalLevels as dcListEducationalLevels,
} from '../dataconnect-generated';

// ===================================================================
// LEVEL CATEGORIES
// ===================================================================

export const createNewLevelCategory = async (
  code: string,
  name: string,
  description: string | undefined,
  createdBy: string,
  categoryId?: string
): Promise<string> => {
  try {
    const id = categoryId || generateUUID();
    await (dcCreateLevelCategory as any)({
      categoryId: id,
      code,
      name,
      description,
      createdBy,
    });
    return id;
  } catch (error) {
    console.error('Error creating level category:', error);
    throw error;
  }
};

export const updateLevelCategoryInfo = async (
  categoryId: string,
  updates: { name?: string; code?: string; description?: string },
  updatedBy: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    await (dcUpdateLevelCategory as any)({
      categoryId,
      name: updates.name,
      code: updates.code,
      description: updates.description,
      updatedBy,
      updatedAt,
    });
  } catch (error) {
    console.error(`Error updating level category ${categoryId}:`, error);
    throw error;
  }
};

export const deactivateLevelCategoryInfo = async (
  categoryId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateLevelCategory as any)({
      categoryId,
      deletedAt: now,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error deactivating level category ${categoryId}:`, error);
    throw error;
  }
};

export const reactivateLevelCategoryInfo = async (
  categoryId: string,
  deletedBy: string
): Promise<void> => {
  try {
    await (dcReactivateLevelCategory as any)({
      categoryId,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error reactivating level category ${categoryId}:`, error);
    throw error;
  }
};

// ===================================================================
// EDUCATIONAL LEVELS
// ===================================================================

export const createNewEducationalLevel = async (
  code: string,
  name: string,
  categoryId: string,
  description: string | undefined,
  createdBy: string,
  levelId?: string
): Promise<string> => {
  try {
    const id = levelId || generateUUID();
    await (dcCreateEducationalLevel as any)({
      levelId: id,
      code,
      name,
      categoryId,
      description,
      createdBy,
    });
    return id;
  } catch (error) {
    console.error('Error creating educational level:', error);
    throw error;
  }
};

export const updateEducationalLevelInfo = async (
  levelId: string,
  updates: { name?: string; code?: string; description?: string; categoryId?: string },
  updatedBy: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    await (dcUpdateEducationalLevel as any)({
      levelId,
      name: updates.name,
      code: updates.code,
      description: updates.description,
      categoryId: updates.categoryId,
      updatedBy,
      updatedAt,
    });
  } catch (error) {
    console.error(`Error updating educational level ${levelId}:`, error);
    throw error;
  }
};

export const deactivateEducationalLevelInfo = async (
  levelId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateEducationalLevel as any)({
      levelId,
      deletedAt: now,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error deactivating educational level ${levelId}:`, error);
    throw error;
  }
};

export const reactivateEducationalLevelInfo = async (
  levelId: string,
  deletedBy: string
): Promise<void> => {
  try {
    await (dcReactivateEducationalLevel as any)({
      levelId,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error reactivating educational level ${levelId}:`, error);
    throw error;
  }
};

// ===================================================================
// FETCH FROM DATA-CONNECT (For Refresh/Sync)
// ===================================================================

/**
 * Fetch all level categories from Data-Connect
 */
export const fetchLevelCategoriesFromDataConnect = async () => {
  try {
    console.log('[levelDataConnect] Fetching level categories from Data-Connect...');
    const result = await (dcListLevelCategories as any)();
    console.log(`[levelDataConnect] Found ${result.data.levelCategories.length} categories`);
    return result.data.levelCategories;
  } catch (error) {
    console.error('[levelDataConnect] Error fetching level categories:', error);
    throw error;
  }
};

/**
 * Fetch all educational levels from Data-Connect
 */
export const fetchEducationalLevelsFromDataConnect = async () => {
  try {
    console.log('[levelDataConnect] Fetching educational levels from Data-Connect...');
    const result = await (dcListEducationalLevels as any)();
    console.log(`[levelDataConnect] Found ${result.data.educationalLevels.length} levels`);
    return result.data.educationalLevels;
  } catch (error) {
    console.error('[levelDataConnect] Error fetching educational levels:', error);
    throw error;
  }
};
