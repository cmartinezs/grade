/**
 * Chile Education Data Loader
 * Carga los datos educativos chilenos desde JSON a Data-Connect
 */

import { EducationalLevel, LevelCategory } from '@/types/level';
import {
  createNewLevelCategory,
  createNewEducationalLevel,
} from './levelDataConnect';
import { generateUUID } from './uuid';

const CHILE_DATA_LOADED_KEY = 'chile_education_data_loaded';

interface ChileDataLoadResult {
  categoriesCreated: number;
  levelsCreated: number;
  errors: string[];
}

interface ProgressUpdate {
  currentStep: 'categories' | 'levels';
  currentIndex: number;
  total: number;
  itemName: string;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

/**
 * Carga los datos educativos chilenos desde JSON a Data-Connect
 * 
 * Nota: Los IDs en el JSON no son UUIDs válidos, así que generamos UUIDs
 * y mapeamos los IDs del JSON a los UUIDs generados.
 * 
 * @param onProgress - Callback opcional para recibir actualizaciones de progreso
 * @returns Resultado con cantidad de registros cargados y errores
 */
export async function loadChileEducationData(onProgress?: ProgressCallback): Promise<ChileDataLoadResult> {
  const result: ChileDataLoadResult = {
    categoriesCreated: 0,
    levelsCreated: 0,
    errors: [],
  };

  try {
    console.log('[ChileDataLoader] Starting Chile education data load...');

    // 1. Cargar categorías desde JSON
    let categories: LevelCategory[] = [];
    try {
      const categoriesResponse = await fetch('/data/level-categories.json');
      if (!categoriesResponse.ok) {
        throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
      }
      categories = await categoriesResponse.json();
      console.log(`[ChileDataLoader] Loaded ${categories.length} categories from JSON`);
    } catch (error) {
      const errorMsg = `Failed to load categories JSON: ${error instanceof Error ? error.message : String(error)}`;
      console.error(errorMsg);
      result.errors.push(errorMsg);
      return result;
    }

    // 2. Cargar niveles desde JSON
    let levels: EducationalLevel[] = [];
    try {
      const levelsResponse = await fetch('/data/education-levels.json');
      if (!levelsResponse.ok) {
        throw new Error(`Failed to fetch levels: ${levelsResponse.statusText}`);
      }
      levels = await levelsResponse.json();
      console.log(`[ChileDataLoader] Loaded ${levels.length} levels from JSON`);
    } catch (error) {
      const errorMsg = `Failed to load levels JSON: ${error instanceof Error ? error.message : String(error)}`;
      console.error(errorMsg);
      result.errors.push(errorMsg);
      return result;
    }

    // 3. Crear categorías en Data-Connect y mapear IDs
    console.log('[ChileDataLoader] Creating categories in Data-Connect...');
    
    // Mapeo: JSON ID -> UUID generado
    const categoryIdMap = new Map<string, string>();
    
    // UUID para el usuario del sistema
    const systemUUID = generateUUID();
    
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      try {
        // Emitir progreso
        if (onProgress) {
          onProgress({
            currentStep: 'categories',
            currentIndex: i + 1,
            total: categories.length,
            itemName: category.name,
          });
        }

        // Generar UUID para esta categoría
        const generatedUUID = generateUUID();
        
        // Pasar el UUID generado a la función
        const returnedId = await createNewLevelCategory(
          category.code,
          category.name,
          category.description,
          systemUUID,
          generatedUUID // Pasar el UUID específico
        );
        
        // Guardar el mapeo para usar después en los niveles
        categoryIdMap.set(category.id, returnedId);
        result.categoriesCreated++;
        console.log(`[ChileDataLoader] Created category: ${category.name} (mapped ${category.id} -> ${returnedId})`);
      } catch (error) {
        const errorMsg = `Failed to create category ${category.name}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        // Continuar con las siguientes categorías
      }
    }

    // 4. Crear niveles en Data-Connect usando el mapeo de IDs
    console.log('[ChileDataLoader] Creating levels in Data-Connect...');
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      try {
        // Emitir progreso
        if (onProgress) {
          onProgress({
            currentStep: 'levels',
            currentIndex: i + 1,
            total: levels.length,
            itemName: level.name,
          });
        }

        // Usar el UUID mapeado para la categoría
        const mappedCategoryId = categoryIdMap.get(level.categoryId) || level.categoryId;
        
        // Generar UUID para el nivel
        const levelUUID = generateUUID();
        
        const returnedId = await createNewEducationalLevel(
          level.code,
          level.name,
          mappedCategoryId,
          level.description,
          systemUUID,
          levelUUID // Pasar el UUID específico
        );
        result.levelsCreated++;
        console.log(`[ChileDataLoader] Created level: ${level.name} (categoryId: ${mappedCategoryId}, levelId: ${returnedId})`);
      } catch (error) {
        const errorMsg = `Failed to create level ${level.name}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        // Continuar con los siguientes niveles
      }
    }

    // 5. Marcar como cargado
    if (typeof window !== 'undefined') {
      localStorage.setItem(CHILE_DATA_LOADED_KEY, 'true');
    }

    console.log('[ChileDataLoader] Data load completed:', result);
    return result;
  } catch (error) {
    const errorMsg = `Unexpected error in Chile data loader: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}

/**
 * Verifica si los datos chilenos ya han sido cargados
 */
export function hasChileDataBeenLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CHILE_DATA_LOADED_KEY) === 'true';
}

/**
 * Limpia el flag de datos cargados (útil para testing)
 */
export function resetChileDataLoadedFlag(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CHILE_DATA_LOADED_KEY);
  }
}
