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
import { loadChileEducationData } from '@/lib/chileDataLoader';
import { levelCategoryStore, educationalLevelStore } from '@/lib/levelStore';
import {
  fetchLevelCategoriesFromDataConnect,
  fetchEducationalLevelsFromDataConnect,
} from '@/lib/levelDataConnect';

interface LoadChileDataResult {
  categoriesLoaded: number;
  levelsLoaded: number;
  success: boolean;
  message: string;
}

interface ProgressUpdate {
  currentStep: 'categories' | 'levels' | 'completed';
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

export function useChileDataLoader() {
  /**
   * Carga toda la configuración de Chile (categorías y niveles) a Data-Connect
   * y refresca los stores locales con los datos desde la base de datos
   * 
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadChileConfiguration = useCallback(
    async (onProgress?: ProgressCallback): Promise<LoadChileDataResult> => {
      try {
        console.log('[useChileDataLoader] Starting Chile configuration load...');
        
        // 1. Cargar datos a Data-Connect
        const result = await loadChileEducationData(onProgress);
        
        // Si hubo errores, reportar
        if (result.errors.length > 0) {
          console.error('[useChileDataLoader] Errors during load:', result.errors);
        }
        
        // 2. Recargar datos desde Data-Connect para los stores locales
        try {
          console.log('[useChileDataLoader] Refreshing local stores from Data-Connect...');
          
          const categoriesFromDb = await fetchLevelCategoriesFromDataConnect();
          const levelsFromDb = await fetchEducationalLevelsFromDataConnect();
          
          // Update local stores
          levelCategoryStore.refreshFromDataConnect(categoriesFromDb);
          educationalLevelStore.refreshFromDataConnect(levelsFromDb);
          
          console.log('[useChileDataLoader] Stores refreshed successfully');
        } catch (refreshError) {
          console.warn('[useChileDataLoader] Could not refresh stores, but data loaded to DB:', refreshError);
          // Don't fail the entire operation if refresh fails - data is still in DB
        }
        
        const success = result.errors.length === 0;
        const message = success 
          ? '✅ Configuración de Chile cargada exitosamente'
          : '⚠️ Se cargaron datos pero con algunos errores';
        
        return {
          categoriesLoaded: result.categoriesCreated,
          levelsLoaded: result.levelsCreated,
          success,
          message,
        };
      } catch (error) {
        console.error('[useChileDataLoader] Unexpected error:', error);
        return {
          categoriesLoaded: 0,
          levelsLoaded: 0,
          success: false,
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
      }
    },
    []
  );

  return {
    loadChileConfiguration,
  };
}
