/**
 * Question Data Connect Layer
 * Funciones para gestionar Preguntas mediante Firebase Data Connect
 * Usa las funciones generadas automáticamente por el SDK de Data Connect
 */

import {
  listQuestionsByUser as dcListQuestionsByUser,
  getQuestion as dcGetQuestion,
  createQuestion as dcCreateQuestion,
  createQuestionVersion as dcCreateQuestionVersion,
  createQuestionOption as dcCreateQuestionOption,
  updateQuestion as dcUpdateQuestion,
  deactivateQuestion as dcDeactivateQuestion,
  reactivateQuestion as dcReactivateQuestion,
  ListQuestionsByUserVariables,
  GetQuestionVariables,
  CreateQuestionVariables,
  CreateQuestionVersionVariables,
  CreateQuestionOptionVariables,
  UpdateQuestionVariables,
  DeactivateQuestionVariables,
  ReactivateQuestionVariables,
} from '@/dataconnect-generated';
import { generateUUID } from './uuid';
import type { CreateQuestionInput } from '@/types/question';
import type { QuestionType, Difficulty } from './masterDataConnect';

/**
 * Mapear código de tipo de pregunta a UUID
 */
export function mapQuestionTypeCodeToId(code: string, questionTypes: QuestionType[]): string | null {
  const type = questionTypes.find(qt => qt.code === code);
  return type?.questionTypeId || null;
}

/**
 * Mapear UUID de tipo de pregunta a código
 */
export function mapQuestionTypeIdToCode(questionTypeId: string, questionTypes: QuestionType[]): string {
  const type = questionTypes.find(qt => qt.questionTypeId === questionTypeId);
  return type?.code || questionTypeId;
}

/**
 * Mapear nivel de dificultad a UUID
 */
export function mapDifficultyLevelToId(level: string, difficulties: Difficulty[]): string | null {
  const diff = difficulties.find(d => d.level === level);
  return diff?.difficultyId || null;
}

export interface QuestionWithOptions {
  questionId: string;
  text: string;
  topicId: string;
  difficultyId: string;
  questionTypeId: string;
  taxonomyId: string;
  userId: string;
  isPublic: boolean;
  allowPartialScore: boolean;
  active: boolean;
  version: number;
  originalQuestionId?: string;
  options: Array<{
    questionOptionId: string;
    text: string;
    isCorrect: boolean;
    position: number;
    score: number | null;
    questionId: string;
  }>;
}

/**
 * Listar todas las preguntas del usuario
 */
export async function fetchQuestionsByUser(
  userId: string,
  firebaseId: string
): Promise<QuestionWithOptions[]> {
  try {
    const variables: ListQuestionsByUserVariables = { userId, firebaseId };
    const result = await dcListQuestionsByUser(variables);
    return (result.data?.questions || []) as unknown as QuestionWithOptions[];
  } catch (error) {
    console.error('Error fetching questions by user:', error);
    throw error;
  }
}

/**
 * Obtener una pregunta por ID con sus opciones
 */
export async function fetchQuestionById(
  questionId: string,
  userId: string,
  firebaseId: string
): Promise<QuestionWithOptions | null> {
  try {
    const variables: GetQuestionVariables = { questionId, userId, firebaseId };
    const result = await dcGetQuestion(variables);
    
    // GetQuestion retorna 'questions' y 'questionOptions' como arrays separados
    const questions = result.data?.questions || [];
    const options = result.data?.questionOptions || [];
    
    if (questions.length === 0) {
      return null;
    }
    
    // Combinar la pregunta con sus opciones
    const question = questions[0];
    return {
      ...question,
      options
    } as unknown as QuestionWithOptions;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
}

/**
 * Crear una nueva pregunta con sus opciones
 */
export async function createNewQuestion(
  input: CreateQuestionInput,
  questionTypeId: string,
  difficultyId: string,
  taxonomyId: string,
  userId: string,
  firebaseId: string
): Promise<QuestionWithOptions> {
  try {
    const questionId = generateUUID();
    
    // Crear la pregunta
    const questionVariables: CreateQuestionVariables = {
      questionId,
      text: input.enunciado,
      topicId: input.topic_fk,
      difficultyId,
      questionTypeId,
      taxonomyId,
      userId,
      isPublic: input.isPublic ?? false,
      allowPartialScore: input.allowPartialScore ?? false,
      firebaseId,
    };
    
    const result = await dcCreateQuestion(questionVariables);
    
    if (!result.data?.question_insert) {
      throw new Error('Failed to create question');
    }
    
    // Crear las opciones si existen
    const createdOptions: Array<{
      questionOptionId: string;
      text: string;
      isCorrect: boolean;
      position: number;
      score: number | null;
      questionId: string;
    }> = [];
    
    if (input.options && input.options.length > 0) {
      for (const optInput of input.options) {
        const optionId = generateUUID();
        const optionVariables: CreateQuestionOptionVariables = {
          questionOptionId: optionId,
          questionId,
          text: optInput.text,
          isCorrect: optInput.is_correct,
          position: optInput.position,
          score: optInput.partial_score || null,
        };
        
        const optResult = await dcCreateQuestionOption(optionVariables);
        
        if (optResult.data?.questionOption_insert) {
          createdOptions.push({
            questionOptionId: optionId,
            text: optInput.text,
            isCorrect: optInput.is_correct,
            position: optInput.position,
            score: optInput.partial_score || null,
            questionId,
          });
        }
      }
    }
    
    return {
      questionId,
      text: input.enunciado,
      topicId: input.topic_fk,
      difficultyId,
      questionTypeId,
      taxonomyId,
      userId,
      isPublic: input.isPublic ?? false,
      allowPartialScore: input.allowPartialScore ?? false,
      active: true,
      version: 1,
      options: createdOptions,
    };
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

/**
 * Actualizar una pregunta existente
 */
export async function updateExistingQuestion(
  questionId: string,
  text: string,
  topicId: string,
  difficultyId: string,
  questionTypeId: string,
  userId: string,
  firebaseId: string
): Promise<void> {
  try {
    const variables: UpdateQuestionVariables = {
      questionId,
      text,
      topicId,
      difficultyId,
      questionTypeId,
      updatedBy: userId,
      updatedAt: new Date().toISOString(),
      firebaseId,
    };
    
    await dcUpdateQuestion(variables);
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
}

/**
 * Crear una nueva versión de una pregunta
 */
export async function createQuestionVersion(
  originalQuestionId: string,
  text: string,
  topicId: string,
  difficultyId: string,
  questionTypeId: string,
  taxonomyId: string,
  userId: string,
  firebaseId: string,
  version: number
): Promise<QuestionWithOptions> {
  try {
    const newQuestionId = generateUUID();
    
    const variables: CreateQuestionVersionVariables = {
      questionId: newQuestionId,
      text,
      topicId,
      difficultyId,
      questionTypeId,
      taxonomyId,
      userId,
      isPublic: false,
      allowPartialScore: false,
      version,
      originalQuestionId,
      firebaseId,
    };
    
    const result = await dcCreateQuestionVersion(variables);
    
    if (!result.data?.question_insert) {
      throw new Error('Failed to create question version');
    }
    
    return {
      questionId: newQuestionId,
      text,
      topicId,
      difficultyId,
      questionTypeId,
      taxonomyId,
      userId,
      isPublic: false,
      allowPartialScore: false,
      active: true,
      version,
      originalQuestionId,
      options: [],
    };
  } catch (error) {
    console.error('Error creating question version:', error);
    throw error;
  }
}

/**
 * Desactivar una pregunta (soft delete)
 */
export async function deactivateExistingQuestion(
  questionId: string,
  userId: string,
  firebaseId: string
): Promise<void> {
  try {
    const variables: DeactivateQuestionVariables = {
      questionId,
      deletedAt: new Date().toISOString(),
      deletedBy: userId,
      userId,
      firebaseId,
    };
    
    await dcDeactivateQuestion(variables);
  } catch (error) {
    console.error('Error deactivating question:', error);
    throw error;
  }
}

/**
 * Reactivar una pregunta desactivada
 */
export async function reactivateExistingQuestion(
  questionId: string,
  userId: string,
  firebaseId: string
): Promise<void> {
  try {
    const variables: ReactivateQuestionVariables = {
      questionId,
      userId,
      firebaseId,
    };
    
    await dcReactivateQuestion(variables);
  } catch (error) {
    console.error('Error reactivating question:', error);
    throw error;
  }
}
