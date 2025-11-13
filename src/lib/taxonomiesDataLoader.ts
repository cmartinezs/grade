/**
 * Taxonomies Data Loader
 * Carga taxonomías de Bloom desde JSON a Data-Connect
 * Patrón idéntico a DifficultiesDataLoader pero para Taxonomías
 */

import { Taxonomy } from '@/lib/masterDataConnect';
import { createNewTaxonomy, fetchAllTaxonomies } from '@/lib/masterDataConnect';

interface TaxonomyDataLoadResult {
  taxonomiesCreated: number;
  errors: string[];
}

interface ProgressUpdate {
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

/**
 * Carga taxonomías de Bloom desde JSON a Data-Connect
 * @param userId - ID del usuario autenticado que crea los registros
 * @param onProgress - Callback opcional para recibir actualizaciones de progreso
 * @returns Resultado con cantidad de registros cargados y errores
 */
export async function loadTaxonomiesData(userId: string, onProgress?: ProgressCallback): Promise<TaxonomyDataLoadResult> {
  const result: TaxonomyDataLoadResult = {
    taxonomiesCreated: 0,
    errors: [],
  };

  try {
    console.log('[TaxonomiesDataLoader] Starting taxonomies load...');

    // 1. Cargar taxonomías desde JSON
    let taxonomiesFromJSON: Array<{
      code: string;
      name: string;
      level: number;
      description?: string;
      active?: boolean;
    }> = [];
    try {
      const response = await fetch('/data/taxonomies.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch taxonomies: ${response.statusText}`);
      }
      taxonomiesFromJSON = await response.json();
      console.log(`[TaxonomiesDataLoader] Loaded ${taxonomiesFromJSON.length} taxonomies from JSON`);
    } catch (error) {
      const errorMsg = `Failed to load taxonomies JSON: ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMsg);
      result.errors.push(errorMsg);
      return result;
    }

    // 2. Obtener taxonomías existentes para evitar duplicados
    let existingTaxonomies: Taxonomy[] = [];
    try {
      existingTaxonomies = await fetchAllTaxonomies();
      console.log(`[TaxonomiesDataLoader] Found ${existingTaxonomies.length} existing taxonomies`);
    } catch (error) {
      console.warn('[TaxonomiesDataLoader] Could not fetch existing taxonomies:', error);
    }

    const existingCodes = new Set(existingTaxonomies.map((t) => t.code));

    // 3. Filtrar duplicados
    const newTaxonomies = taxonomiesFromJSON.filter((t) => !existingCodes.has(t.code));
    console.log(`[TaxonomiesDataLoader] Will create ${newTaxonomies.length} new taxonomies`);

    if (newTaxonomies.length === 0) {
      console.log('[TaxonomiesDataLoader] No new taxonomies to create');
      return result;
    }

    // 4. Crear taxonomías en Data-Connect
    console.log('[TaxonomiesDataLoader] Creating taxonomies in Data-Connect...');

    for (let i = 0; i < newTaxonomies.length; i++) {
      const taxData = newTaxonomies[i];
      try {
        // Emitir progreso
        if (onProgress) {
          onProgress({
            currentIndex: i + 1,
            total: newTaxonomies.length,
            itemName: taxData.name,
          });
        }

        await createNewTaxonomy(taxData.code, taxData.name, taxData.level, userId, taxData.description);

        result.taxonomiesCreated++;
        console.log(`[TaxonomiesDataLoader] Created taxonomy: ${taxData.code} - ${taxData.name}`);
      } catch (error) {
        const errorMsg = `Failed to create taxonomy "${taxData.name}": ${
          error instanceof Error ? error.message : String(error)
        }`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
      }
    }

    console.log(
      `[TaxonomiesDataLoader] Successfully created ${result.taxonomiesCreated} taxonomies`
    );

    return result;
  } catch (error) {
    const errorMsg = `[TaxonomiesDataLoader] ${
      error instanceof Error ? error.message : String(error)
    }`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
