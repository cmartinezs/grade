/**
 * Question Types Data Loader
 * Carga tipos de preguntas desde JSON a Data-Connect
 * Patrón idéntico a ChileDataLoader pero genérico
 */

import { QuestionType } from '@/lib/masterDataConnect';
import { createNewQuestionType, fetchAllQuestionTypes } from '@/lib/masterDataConnect';

interface QuestionTypeDataLoadResult {
  typesCreated: number;
  errors: string[];
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

/**
 * Carga tipos de preguntas desde JSON a Data-Connect
 * @param onProgress - Callback opcional para recibir actualizaciones de progreso
 * @returns Resultado con cantidad de registros cargados y errores
 */
export async function loadQuestionTypesData(onProgress?: ProgressCallback): Promise<QuestionTypeDataLoadResult> {
  const result: QuestionTypeDataLoadResult = {
    typesCreated: 0,
    errors: [],
  };

  try {
    console.log('[QuestionTypesDataLoader] Starting question types load...');

    // 1. Cargar tipos desde JSON
    let typesFromJSON: Array<{
      code: string;
      name: string;
      description?: string;
      active?: boolean;
    }> = [];
    try {
      const response = await fetch('/data/question-types.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch question types: ${response.statusText}`);
      }
      typesFromJSON = await response.json();
      console.log(`[QuestionTypesDataLoader] Loaded ${typesFromJSON.length} question types from JSON`);
    } catch (error) {
      const errorMsg = `Failed to load question types JSON: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMsg);
      result.errors.push(errorMsg);
      return result;
    }

    // 2. Obtener tipos existentes para evitar duplicados
    let existingTypes: QuestionType[] = [];
    try {
      existingTypes = await fetchAllQuestionTypes();
      console.log(`[QuestionTypesDataLoader] Found ${existingTypes.length} existing question types`);
    } catch (error) {
      console.warn('[QuestionTypesDataLoader] Could not fetch existing types:', error);
    }

    const existingCodes = new Set(existingTypes.map((t) => t.code));

    // 3. Filtrar duplicados
    const newTypes = typesFromJSON.filter((t) => !existingCodes.has(t.code));
    console.log(`[QuestionTypesDataLoader] Will create ${newTypes.length} new question types`);

    if (newTypes.length === 0) {
      console.log('[QuestionTypesDataLoader] No new types to create');
      return result;
    }

    // 4. Crear tipos en Data-Connect
    console.log('[QuestionTypesDataLoader] Creating question types in Data-Connect...');

    for (let i = 0; i < newTypes.length; i++) {
      const typeData = newTypes[i];
      try {
        // Emitir progreso
        if (onProgress) {
          onProgress({
            currentIndex: i + 1,
            total: newTypes.length,
            itemName: typeData.name,
          });
        }

        await createNewQuestionType(typeData.code, typeData.name, typeData.description);

        result.typesCreated++;
        console.log(`[QuestionTypesDataLoader] Created question type: ${typeData.name}`);
      } catch (error) {
        const errorMsg = `Failed to create question type "${typeData.name}": ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        // Continuar con el siguiente tipo
      }
    }

    console.log(`[QuestionTypesDataLoader] Successfully created ${result.typesCreated} question types`);
    return result;
  } catch (error) {
    const errorMsg = `Unexpected error loading question types: ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error('[QuestionTypesDataLoader]', errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
