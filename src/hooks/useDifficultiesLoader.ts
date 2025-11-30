/**
 * Hook para cargar dificultades desde JSON
 * Patrón similar a useQuestionTypesLoader
 * Emite actualizaciones de progreso durante la carga
 */

import { useCallback } from 'react';
import { createMultipleDifficulties, fetchAllDifficulties, Difficulty } from '@/lib/masterDataConnect';

interface LoadDifficultiesResult {
  success: boolean;
  message: string;
  difficultiesLoaded: number;
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

export function useDifficultiesLoader() {
  /**
   * Cargar dificultades desde JSON
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadDifficultiesFromJSON = useCallback(
    async (onProgress?: ProgressCallback): Promise<LoadDifficultiesResult> => {
      try {
        console.log('[useDifficultiesLoader] Loading difficulties from JSON...');
        console.log('[useDifficultiesLoader] onProgress received:', typeof onProgress, !!onProgress);

        // 1. Fetch JSON
        const response = await fetch('/data/difficulties.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch difficulties JSON: ${response.statusText}`);
        }

        const difficultiesFromJSON = await response.json();
        console.log(
          `[useDifficultiesLoader] Loaded ${difficultiesFromJSON.length} difficulties from JSON`
        );

        if (!Array.isArray(difficultiesFromJSON)) {
          throw new Error('Difficulties data is not an array');
        }

        // 2. Get existing difficulties to avoid duplicates
        let existingDifficulties: Difficulty[] = [];
        try {
          existingDifficulties = await fetchAllDifficulties();
          console.log(
            `[useDifficultiesLoader] Found ${existingDifficulties.length} existing difficulties`
          );
        } catch (error) {
          console.warn('Could not fetch existing difficulties, will create all:', error);
        }

        const existingCodes = new Set(existingDifficulties.map((d) => d.code));

        // 3. Filter out duplicates
        const newDifficulties = difficultiesFromJSON.filter((d: { code: string }) => !existingCodes.has(d.code));
        console.log(
          `[useDifficultiesLoader] Will create ${newDifficulties.length} new difficulties`
        );

        if (newDifficulties.length === 0) {
          return {
            success: true,
            message: 'ℹ️ Todos los niveles de dificultad ya están cargados',
            difficultiesLoaded: 0,
          };
        }

        // 4. Create new difficulties
        const result = await createMultipleDifficulties(newDifficulties, onProgress);

        if (result.errors.length > 0) {
          console.error('[useDifficultiesLoader] Errors occurred:', result.errors);
          return {
            success: false,
            message: `❌ Error cargando dificultades: ${result.errors.join(', ')}`,
            difficultiesLoaded: result.created.length,
          };
        }

        console.log(
          `[useDifficultiesLoader] Successfully created ${result.created.length} difficulties`
        );

        return {
          success: true,
          message: `✅ Se cargaron ${result.created.length} niveles de dificultad exitosamente`,
          difficultiesLoaded: result.created.length,
        };
      } catch (error) {
        const errorMsg = `Failed to load difficulties: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error('[useDifficultiesLoader]', errorMsg);
        return {
          success: false,
          message: `❌ ${errorMsg}`,
          difficultiesLoaded: 0,
        };
      }
    },
    []
  );

  return { loadDifficultiesFromJSON };
}
