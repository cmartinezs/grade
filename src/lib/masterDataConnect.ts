/**
 * Master Data Connect Layer
 * Funciones para acceder a QuestionTypes y Difficulties desde Firebase Data Connect
 * Usa las funciones generadas automáticamente por el SDK de Data Connect
 */

import {
  listDifficulties as dcListDifficulties,
  getDifficulty as dcGetDifficulty,
  listQuestionTypes as dcListQuestionTypes,
  getQuestionType as dcGetQuestionType,
  createDifficulty as dcCreateDifficulty,
  createQuestionType as dcCreateQuestionType,
  listTaxonomies as dcListTaxonomies,
  getTaxonomy as dcGetTaxonomy,
  createTaxonomy as dcCreateTaxonomy,
  // TODO: Descomentar cuando se implemente actualización y eliminación
  // deactivateQuestionType as dcDeactivateQuestionType,
  // deactivateDifficulty as dcDeactivateDifficulty,
  // reactivateQuestionType as dcReactivateQuestionType,
  // reactivateDifficulty as dcReactivateDifficulty,
  GetDifficultyVariables,
  GetQuestionTypeVariables,
  CreateDifficultyVariables,
  CreateQuestionTypeVariables,
  GetTaxonomyVariables,
  CreateTaxonomyVariables,
  // TODO: Descomentar cuando se implemente actualización y eliminación
  // DeactivateQuestionTypeVariables,
  // DeactivateDifficultyVariables,
  // ReactivateQuestionTypeVariables,
  // ReactivateDifficultyVariables,
} from '@/dataconnect-generated';
import { generateUUID } from './uuid';

export interface QuestionType {
  questionTypeId: string;
  code: string;
  name: string;
  description?: string;
  minOptions: number;
  maxOptions: number;
  correctOptions: number;
  active?: boolean;
}

export interface Difficulty {
  difficultyId: string;
  code: string;
  level: string;
  weight: number;
  description?: string;
  active?: boolean;
}

export interface Taxonomy {
  taxonomyId: string;
  code: string;
  name: string;
  description?: string;
  level: number;
  active?: boolean;
}

/**
 * Listar todos los tipos de pregunta
 */
export async function fetchAllQuestionTypes(): Promise<QuestionType[]> {
  try {
    const result = await dcListQuestionTypes();
    return (result.data?.questionTypes || []) as QuestionType[];
  } catch (error) {
    console.error('Error fetching question types:', error);
    throw error;
  }
}

/**
 * Obtener un tipo de pregunta por ID
 */
export async function fetchQuestionTypeById(
  questionTypeId: string
): Promise<QuestionType | null> {
  try {
    const variables: GetQuestionTypeVariables = { questionTypeId };
    const result = await dcGetQuestionType(variables);
    return (result.data?.questionType || null) as QuestionType | null;
  } catch (error) {
    console.error('Error fetching question type:', error);
    throw error;
  }
}

/**
 * Listar todas las dificultades
 */
export async function fetchAllDifficulties(): Promise<Difficulty[]> {
  try {
    const result = await dcListDifficulties();
    return (result.data?.difficulties || []) as unknown as Difficulty[];
  } catch (error) {
    console.error('Error fetching difficulties:', error);
    throw error;
  }
}

/**
 * Obtener una dificultad por ID
 */
export async function fetchDifficultyById(
  difficultyId: string
): Promise<Difficulty | null> {
  try {
    const variables: GetDifficultyVariables = { difficultyId };
    const result = await dcGetDifficulty(variables);
    return (result.data?.difficulty || null) as unknown as Difficulty | null;
  } catch (error) {
    console.error('Error fetching difficulty:', error);
    throw error;
  }
}

/**
 * Crear un nuevo tipo de pregunta
 */
export async function createNewQuestionType(
  code: string,
  name: string,
  description?: string,
  minOptions?: number,
  maxOptions?: number,
  correctOptions?: number
): Promise<QuestionType> {
  try {
    const variables: CreateQuestionTypeVariables = {
      questionTypeId: generateUUID(),
      code,
      name,
      description: description || null,
      minOptions: minOptions ?? 2,
      maxOptions: maxOptions ?? 10,
      correctOptions: correctOptions ?? 1,
      active: true,
    };
    const result = await dcCreateQuestionType(variables);
    
    if (!result.data?.questionType_insert) {
      throw new Error('Failed to create question type');
    }
    
    return {
      questionTypeId: result.data.questionType_insert.questionTypeId,
      code,
      name,
      description,
      minOptions: minOptions ?? 2,
      maxOptions: maxOptions ?? 10,
      correctOptions: correctOptions ?? 1,
      active: true,
    };
  } catch (error) {
    console.error('Error creating question type:', error);
    throw error;
  }
}

/**
 * Crear una nueva dificultad
 */
export async function createNewDifficulty(
  code: string,
  level: string,
  weight: number,
  description?: string
): Promise<Difficulty> {
  try {
    const variables: CreateDifficultyVariables = {
      difficultyId: generateUUID(),
      code,
      level,
      weight,
      description: description || null,
    };
    const result = await dcCreateDifficulty(variables);
    
    if (!result.data?.difficulty_insert) {
      throw new Error('Failed to create difficulty');
    }
    
    
    return {
      difficultyId: result.data.difficulty_insert.difficultyId,
      code,
      level,
      weight,
      description,
      active: true,
    };
  } catch (error) {
    console.error('Error creating difficulty:', error);
    throw error;
  }
}

/**
 * Crear múltiples tipos de preguntas de una vez
 * Usado para carga masiva desde JSON
 */
export async function createMultipleQuestionTypes(
  questionTypesData: Array<{
    code: string;
    name: string;
    description?: string;
    minOptions?: number;
    maxOptions?: number;
    correctOptions?: number;
    active?: boolean;
  }>,
  onProgress?: (progress: { currentIndex: number; total: number; itemName: string }) => void
): Promise<{ created: QuestionType[]; errors: string[] }> {
  const created: QuestionType[] = [];
  const errors: string[] = [];

  for (let i = 0; i < questionTypesData.length; i++) {
    const typeData = questionTypesData[i];
    try {
      const newType = await createNewQuestionType(
        typeData.code,
        typeData.name,
        typeData.description,
        typeData.minOptions,
        typeData.maxOptions,
        typeData.correctOptions
      );
      created.push(newType);

      // Emitir progreso DURANTE la creación
      if (onProgress && typeof onProgress === 'function') {
        onProgress({
          currentIndex: i + 1,
          total: questionTypesData.length,
          itemName: typeData.name,
        });
      }
    } catch (error) {
      const errorMsg = `Error creating question type "${typeData.name}": ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  return { created, errors };
}

/**
 * Crear múltiples dificultades de una vez
 * Usado para carga masiva desde JSON
 */
export async function createMultipleDifficulties(
  difficultiesData: Array<{
    code: string;
    level: string;
    weight: number;
    description?: string;
    active?: boolean;
  }>,
  onProgress?: (progress: { currentIndex: number; total: number; itemName: string }) => void
): Promise<{ created: Difficulty[]; errors: string[] }> {
  const created: Difficulty[] = [];
  const errors: string[] = [];

  for (let i = 0; i < difficultiesData.length; i++) {
    const diffData = difficultiesData[i];
    try {
      const newDiff = await createNewDifficulty(
        diffData.code,
        diffData.level,
        diffData.weight,
        diffData.description
      );
      created.push(newDiff);

      // Emitir progreso DURANTE la creación
      if (onProgress && typeof onProgress === 'function') {
        onProgress({
          currentIndex: i + 1,
          total: difficultiesData.length,
          itemName: `${diffData.code} (${diffData.level})`,
        });
      }
    } catch (error) {
      const errorMsg = `Error creating difficulty "${diffData.code}": ${
        error instanceof Error ? error.message : String(error)
      }`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }

  return { created, errors };
}

/**
 * TODO: Actualizar un tipo de pregunta
 * Descomentar las imports de updateQuestionType cuando se implemente
 */
// export async function updateQuestionType(
//   questionTypeId: string,
//   code?: string,
//   name?: string,
//   description?: string
// ): Promise<QuestionType> { ... }

/**
 * TODO: Actualizar una dificultad
 * Descomentar las imports de updateDifficulty cuando se implemente
 */
// export async function updateDifficulty(
//   difficultyId: string,
//   level?: string,
//   weight?: number,
//   description?: string
// ): Promise<Difficulty> { ... }

/**
 * TODO: Desactivar un tipo de pregunta (soft delete)
 * Descomentar las imports de deactivateQuestionType cuando se implemente
 */
// export async function deleteQuestionType(
//   questionTypeId: string
// ): Promise<void> { ... }

/**
 * TODO: Desactivar una dificultad (soft delete)
 * Descomentar las imports de deactivateDifficulty cuando se implemente
 */
// export async function deleteDifficulty(
//   difficultyId: string
// ): Promise<void> { ... }

/**
 * Listar todas las taxonomías
 */
export async function fetchAllTaxonomies(): Promise<Taxonomy[]> {
  try {
    const result = await dcListTaxonomies();
    return (result.data?.taxonomies || []) as unknown as Taxonomy[];
  } catch (error) {
    console.error('Error fetching taxonomies:', error);
    throw error;
  }
}

/**
 * Obtener una taxonomía por ID
 */
export async function fetchTaxonomyById(
  taxonomyId: string
): Promise<Taxonomy | null> {
  try {
    const variables: GetTaxonomyVariables = { taxonomyId };
    const result = await dcGetTaxonomy(variables);
    return (result.data?.taxonomy || null) as unknown as Taxonomy | null;
  } catch (error) {
    console.error('Error fetching taxonomy:', error);
    throw error;
  }
}

/**
 * Crear una nueva taxonomía
 */
export async function createNewTaxonomy(
  code: string,
  name: string,
  level: number,
  createdBy: string,
  description?: string
): Promise<Taxonomy> {
  try {
    const variables = {
      taxonomyId: generateUUID(),
      code,
      name,
      level,
      description: description || null,
      createdBy,
    } as CreateTaxonomyVariables;
    
    const result = await dcCreateTaxonomy(variables);
    
    if (!result.data?.taxonomy_insert) {
      throw new Error('Failed to create taxonomy');
    }
    
    return {
      taxonomyId: result.data.taxonomy_insert.taxonomyId,
      code,
      name,
      level,
      description,
      active: true,
    };
  } catch (error) {
    console.error('Error creating taxonomy:', error);
    throw error;
  }
}
