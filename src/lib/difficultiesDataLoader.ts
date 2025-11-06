/**
 * Difficulties Data Loader
 * Carga niveles de dificultad desde JSON a Data-Connect
 * Patrón idéntico a ChileDataLoader pero genérico
 */

import { Difficulty } from '@/lib/masterDataConnect';
import { createNewDifficulty, fetchAllDifficulties } from '@/lib/masterDataConnect';

interface DifficultyDataLoadResult {
  difficultiesCreated: number;
  errors: string[];
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

/**
 * Carga niveles de dificultad desde JSON a Data-Connect
 * @param onProgress - Callback opcional para recibir actualizaciones de progreso
 * @returns Resultado con cantidad de registros cargados y errores
 */
export async function loadDifficultiesData(onProgress?: ProgressCallback): Promise<DifficultyDataLoadResult> {
  const result: DifficultyDataLoadResult = {
    difficultiesCreated: 0,
    errors: [],
  };

  try {
    console.log('[DifficultiesDataLoader] Starting difficulties load...');

    // 1. Cargar dificultades desde JSON
    let difficultiesFromJSON: Array<{
      level: string;
      weight: number;
      description?: string;
      active?: boolean;
    }> = [];
    try {
      const response = await fetch('/data/difficulties.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch difficulties: ${response.statusText}`);
      }
      difficultiesFromJSON = await response.json();
      console.log(`[DifficultiesDataLoader] Loaded ${difficultiesFromJSON.length} difficulties from JSON`);
    } catch (error) {
      const errorMsg = `Failed to load difficulties JSON: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMsg);
      result.errors.push(errorMsg);
      return result;
    }

    // 2. Obtener dificultades existentes para evitar duplicados
    let existingDifficulties: Difficulty[] = [];
    try {
      existingDifficulties = await fetchAllDifficulties();
      console.log(`[DifficultiesDataLoader] Found ${existingDifficulties.length} existing difficulties`);
    } catch (error) {
      console.warn('[DifficultiesDataLoader] Could not fetch existing difficulties:', error);
    }

    const existingLevels = new Set(existingDifficulties.map((d) => d.level));

    // 3. Filtrar duplicados
    const newDifficulties = difficultiesFromJSON.filter((d) => !existingLevels.has(d.level));
    console.log(`[DifficultiesDataLoader] Will create ${newDifficulties.length} new difficulties`);

    if (newDifficulties.length === 0) {
      console.log('[DifficultiesDataLoader] No new difficulties to create');
      return result;
    }

    // 4. Crear dificultades en Data-Connect
    console.log('[DifficultiesDataLoader] Creating difficulties in Data-Connect...');

    for (let i = 0; i < newDifficulties.length; i++) {
      const diffData = newDifficulties[i];
      try {
        // Emitir progreso
        if (onProgress) {
          onProgress({
            currentIndex: i + 1,
            total: newDifficulties.length,
            itemName: diffData.level,
          });
        }

        await createNewDifficulty(diffData.level, diffData.weight, diffData.description);

        result.difficultiesCreated++;
        console.log(`[DifficultiesDataLoader] Created difficulty: ${diffData.level}`);
      } catch (error) {
        const errorMsg = `Failed to create difficulty "${diffData.level}": ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        // Continuar con la siguiente dificultad
      }
    }

    console.log(`[DifficultiesDataLoader] Successfully created ${result.difficultiesCreated} difficulties`);
    return result;
  } catch (error) {
    const errorMsg = `Unexpected error loading difficulties: ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error('[DifficultiesDataLoader]', errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
