/**
 * Question Data Connect Store
 * Gestión de Preguntas mediante Firebase Data Connect
 * 
 * NOTA: Las queries de preguntas en Data Connect aún no están implementadas.
 * Este módulo proporciona fallback a questionStore local hasta que estén disponibles.
 */

import type {
  Question,
  DifficultyLevel,
  QuestionType,
} from '@/types/question';
import { questionStore } from './questionStore';

/**
 * Obtener todas las preguntas del usuario actual desde Data Connect
 * 
 * IMPLEMENTACIÓN ACTUAL: Usa questionStore como fallback
 * TODO: Implementar con Data Connect query quando esté disponible
 * 
 * @returns Promise<Question[]> - Array de preguntas
 */
export const fetchAllQuestions = async (): Promise<Question[]> => {
  try {
    // TODO: Una vez que la query ListQuestions esté disponible en Data Connect,
    // implementar así:
    // const result = await listQuestions();
    // return transformDataConnectQuestions(result.questions || []);
    
    console.log('fetchAllQuestions: Cargando desde questionStore local');
    
    // Fallback: usar questionStore local
    return questionStore.getAllQuestionsWithDetails(true) as unknown as Question[];
  } catch (error) {
    console.error('Error fetching questions from Data Connect:', error);
    throw error;
  }
};

/**
 * Obtener preguntas filtradas por criterios
 * 
 * IMPLEMENTACIÓN ACTUAL: Usa questionStore como fallback
 * TODO: Implementar con Data Connect query cuando esté disponible
 */
export const fetchQuestionsByFilters = async (filters: {
  type?: QuestionType;
  difficulty_fk?: DifficultyLevel;
  subject_fk?: string;
  includeInactive?: boolean;
}): Promise<Question[]> => {
  try {
    // TODO: Una vez que esté disponible, usar:
    // const result = await listQuestionsFiltered(filters);
    // return transformDataConnectQuestions(result.questions || []);
    
    console.log('fetchQuestionsByFilters: Cargando desde questionStore local');
    
    // Fallback: usar questionStore local
    return questionStore.searchQuestions('', filters) as unknown as Question[];
  } catch (error) {
    console.error('Error fetching filtered questions from Data Connect:', error);
    throw error;
  }
};

/**
 * Obtener pregunta por ID
 * 
 * IMPLEMENTACIÓN ACTUAL: Usa questionStore como fallback
 * TODO: Implementar con Data Connect query cuando esté disponible
 */
export const fetchQuestionById = async (questionId: string): Promise<Question | null> => {
  try {
    // TODO: Una vez que esté disponible, usar:
    // const result = await getQuestion({ questionId });
    // return transformDataConnectQuestion(result.question);
    
    console.log(`fetchQuestionById: Buscando ${questionId} en questionStore local`);
    
    // Fallback: usar questionStore local
    const question = questionStore.getQuestionWithDetails(questionId);
    return (question || null) as unknown as Question;
  } catch (error) {
    console.error(`Error fetching question ${questionId} from Data Connect:`, error);
    throw error;
  }
};

/**
 * Buscar preguntas por texto
 * 
 * IMPLEMENTACIÓN ACTUAL: Usa questionStore como fallback
 * TODO: Implementar con Data Connect query cuando esté disponible
 */
export const searchQuestions = async (
  searchText: string,
  filters?: {
    type?: QuestionType;
    difficulty_fk?: DifficultyLevel;
    subject_fk?: string;
    includeInactive?: boolean;
  }
): Promise<Question[]> => {
  try {
    // TODO: Una vez que esté disponible, usar:
    // const result = await searchQuestionsQuery({ searchText, ...filters });
    // return transformDataConnectQuestions(result.questions || []);
    
    console.log(`searchQuestions: Buscando "${searchText}" en questionStore local`);
    
    // Fallback: usar questionStore local
    const queryFilters: {
      type?: QuestionType;
      difficulty_fk?: DifficultyLevel;
      subject_fk?: string;
      includeInactive?: boolean;
    } = filters || {};
    
    return questionStore.searchQuestionsGrouped(searchText, queryFilters);
  } catch (error) {
    console.error('Error searching questions in Data Connect:', error);
    throw error;
  }
};
