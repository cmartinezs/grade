/**
 * Hook para cargar datos de configuración de Chile desde JSON a Data-Connect
 * Proporciona funcionalidad para inicializar categorías y niveles educacionales
 * 
 * IMPORTANTE: Los datos se cargan directamente a Data-Connect (no localStorage).
 * El usuario debe:
 * 1. Acceder a la página de Categorías o Niveles
 * 2. Ver el modal de carga (solo si no hay datos)
 * 3. Aceptar explícitamente la carga de configuración de Chile
 * 
 * Esto asegura que:
 * - Los datos estén en la base de datos (Data-Connect), no en localStorage
 * - El usuario tenga control sobre qué datos se cargan
 * - La aplicación sea flexible para futuros cambios de configuración
 */

import { useCallback } from 'react';
import { loadChileCategoriesOnly, loadChileLevelsOnly } from '@/lib/chileDataLoader';
import { useAuth } from '@/contexts/AuthContext';
import { levelCategoryStore, educationalLevelStore } from '@/lib/levelStore';
import {
  fetchLevelCategoriesFromDataConnect,
  fetchEducationalLevelsFromDataConnect,
} from '@/lib/levelDataConnect';

interface LoadSingleChileDataResult {
  itemsCreated: number;
  success: boolean;
  message: string;
  errors: string[];
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

export function useChileDataLoader() {
  const { user } = useAuth();

  /**
   * Carga solo las categorías de Chile a Data-Connect
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadChileCategories = useCallback(
    async (onProgress?: ProgressCallback): Promise<LoadSingleChileDataResult> => {
      try {
        console.log('[useChileDataLoader] Starting Chile categories load...');

        if (!user?.id) {
          return {
            itemsCreated: 0,
            success: false,
            message: '❌ Usuario no autenticado',
            errors: ['Usuario no autenticado'],
          };
        }
        
        // 1. Cargar datos a Data-Connect
        const result = await loadChileCategoriesOnly(user.id, onProgress);
        
        // 2. Recargar datos desde Data-Connect para los stores locales
        try {
          console.log('[useChileDataLoader] Refreshing categories store from Data-Connect...');
          
          const categoriesFromDb = await fetchLevelCategoriesFromDataConnect();
          levelCategoryStore.refreshFromDataConnect(categoriesFromDb);
          
          console.log('[useChileDataLoader] Categories store refreshed successfully');
        } catch (refreshError) {
          console.warn('[useChileDataLoader] Could not refresh stores, but data loaded to DB:', refreshError);
        }
        
        const success = result.errors.length === 0;
        const message = success 
          ? `✅ ${result.categoriesCreated} categorías cargadas exitosamente`
          : '⚠️ Se cargaron datos pero con algunos errores';
        
        return {
          itemsCreated: result.categoriesCreated,
          success,
          message,
          errors: result.errors,
        };
      } catch (error) {
        console.error('[useChileDataLoader] Unexpected error loading categories:', error);
        return {
          itemsCreated: 0,
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
        };
      }
    },
    [user?.id]
  );

  /**
   * Carga solo los niveles educacionales de Chile a Data-Connect
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadChileLevels = useCallback(
    async (onProgress?: ProgressCallback): Promise<LoadSingleChileDataResult> => {
      try {
        console.log('[useChileDataLoader] Starting Chile levels load...');

        if (!user?.id) {
          return {
            itemsCreated: 0,
            success: false,
            message: '❌ Usuario no autenticado',
            errors: ['Usuario no autenticado'],
          };
        }
        
        // 1. Cargar datos a Data-Connect
        const result = await loadChileLevelsOnly(user.id, onProgress);
        
        // 2. Recargar datos desde Data-Connect para los stores locales
        try {
          console.log('[useChileDataLoader] Refreshing levels store from Data-Connect...');
          
          const levelsFromDb = await fetchEducationalLevelsFromDataConnect();
          educationalLevelStore.refreshFromDataConnect(levelsFromDb);
          
          console.log('[useChileDataLoader] Levels store refreshed successfully');
        } catch (refreshError) {
          console.warn('[useChileDataLoader] Could not refresh stores, but data loaded to DB:', refreshError);
        }
        
        const success = result.errors.length === 0;
        const message = success 
          ? `✅ ${result.levelsCreated} niveles cargados exitosamente`
          : '⚠️ Se cargaron datos pero con algunos errores';
        
        return {
          itemsCreated: result.levelsCreated,
          success,
          message,
          errors: result.errors,
        };
      } catch (error) {
        console.error('[useChileDataLoader] Unexpected error loading levels:', error);
        return {
          itemsCreated: 0,
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
        };
      }
    },
    [user?.id]
  );

  return {
    loadChileCategories,
    loadChileLevels,
  };
}
