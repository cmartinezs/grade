/**
 * Hook para cargar tipos de preguntas desde JSON
 * Patrón similar a useChileDataLoader
 * Emite actualizaciones de progreso durante la carga
 */

import { useCallback } from 'react';
import { createMultipleQuestionTypes, fetchAllQuestionTypes, QuestionType } from '@/lib/masterDataConnect';

interface LoadQuestionTypesResult {
  success: boolean;
  message: string;
  typesLoaded: number;
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

export function useQuestionTypesLoader() {
  /**
   * Cargar tipos de preguntas desde JSON
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadQuestionTypesFromJSON = useCallback(
    async (onProgress?: ProgressCallback): Promise<LoadQuestionTypesResult> => {
      try {
        console.log('[useQuestionTypesLoader] Loading question types from JSON...');
        console.log('[useQuestionTypesLoader] onProgress received:', typeof onProgress, !!onProgress);

        // 1. Fetch JSON
        const response = await fetch('/data/question-types.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch question types JSON: ${response.statusText}`);
        }

        const typesFromJSON = await response.json();
        console.log(
          `[useQuestionTypesLoader] Loaded ${typesFromJSON.length} question types from JSON`
        );

        if (!Array.isArray(typesFromJSON)) {
          throw new Error('Question types data is not an array');
        }

        // 2. Get existing types to avoid duplicates
        let existingTypes: QuestionType[] = [];
        try {
          existingTypes = await fetchAllQuestionTypes();
          console.log(
            `[useQuestionTypesLoader] Found ${existingTypes.length} existing question types`
          );
        } catch (error) {
          console.warn('Could not fetch existing types, will create all:', error);
        }

        const existingCodes = new Set(existingTypes.map((t) => t.code));

        // 3. Filter out duplicates
        const newTypes = typesFromJSON.filter((t) => !existingCodes.has(t.code));
        console.log(
          `[useQuestionTypesLoader] Will create ${newTypes.length} new question types`
        );

        if (newTypes.length === 0) {
          return {
            success: true,
            message: 'ℹ️ Todos los tipos de preguntas ya están cargados',
            typesLoaded: 0,
          };
        }

        // 4. Create new types
        const result = await createMultipleQuestionTypes(newTypes, onProgress);

        if (result.errors.length > 0) {
          console.error('[useQuestionTypesLoader] Errors occurred:', result.errors);
          return {
            success: false,
            message: `❌ Error cargando tipos de preguntas: ${result.errors.join(', ')}`,
            typesLoaded: result.created.length,
          };
        }

        console.log(
          `[useQuestionTypesLoader] Successfully created ${result.created.length} question types`
        );

        return {
          success: true,
          message: `✅ Se cargaron ${result.created.length} tipos de preguntas exitosamente`,
          typesLoaded: result.created.length,
        };
      } catch (error) {
        const errorMsg = `Failed to load question types: ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error('[useQuestionTypesLoader]', errorMsg);
        return {
          success: false,
          message: `❌ ${errorMsg}`,
          typesLoaded: 0,
        };
      }
    },
    []
  );

  return { loadQuestionTypesFromJSON };
}
