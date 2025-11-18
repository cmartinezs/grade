/**
 * useQuestions Hook
 * Carga la lista de preguntas desde Firebase Data Connect
 * Con fallback a questionStore local si Data Connect falla
 */

import { useEffect, useState, useCallback } from 'react';
import { QuestionWithDetails, QuestionType, DifficultyLevel } from '@/types/question';
import { questionStore } from '@/lib/questionStore';
import { fetchQuestionsByUser } from '@/lib/questionConnect';
import { useAuth } from '@/contexts/AuthContext';
import { getUserByEmail } from '@/dataconnect-generated';

interface UseQuestionsResult {
  questions: QuestionWithDetails[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseQuestionsFilters {
  searchText?: string;
  type?: QuestionType | '';
  difficulty_fk?: DifficultyLevel | '';
  subject_fk?: string;
  includeInactive?: boolean;
}

export const useQuestions = (filters?: UseQuestionsFilters): UseQuestionsResult => {
  const [questions, setQuestions] = useState<QuestionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        let loadedQuestions: QuestionWithDetails[] = [];

        // Intentar cargar desde Data Connect
        try {
          if (user?.firebaseUid && user?.email) {
            // Obtener userId desde Data Connect
            const userResult = await getUserByEmail({ email: user.email });
            const userData = userResult.data?.users?.[0];
            
            if (userData?.userId) {
              const dcQuestions = await fetchQuestionsByUser(userData.userId, user.firebaseUid);
              
              // Transformar formato de Data Connect a formato local
              loadedQuestions = dcQuestions.map(q => ({
                question_id: q.questionId,
                type: q.questionTypeId as any, // TODO: mapear de UUID a código
                enunciado: q.text,
                version: q.version,
                active: q.active,
                original_version_fk: q.originalQuestionId || null,
                topic_fk: q.topicId,
                difficulty_fk: q.difficultyId,
                learning_outcome_fk: q.taxonomyId,
                author_fk: q.userId,
                created_at: new Date(),
                updated_at: new Date(),
                updated_by: q.userId,
                deleted_at: null,
                deleted_by: null,
                options: q.options.map(opt => ({
                  question_option_id: opt.questionOptionId,
                  question_fk: opt.questionId,
                  text: opt.text,
                  is_correct: opt.isCorrect,
                  position: opt.position,
                  partial_score: opt.score,
                  created_at: new Date(),
                  created_by: q.userId,
                  updated_at: new Date(),
                  updated_by: q.userId,
                })),
              }));
              
              console.log(`✅ Cargadas ${loadedQuestions.length} preguntas desde Data Connect`);
            } else {
              throw new Error('Usuario no encontrado en Data Connect');
            }
          } else {
            throw new Error('Usuario no autenticado');
          }
        } catch (dcError) {
          // Fallback a localStorage
          console.warn('⚠️ Data Connect falló, usando localStorage:', dcError);
          
          const queryFilters: {
            type?: QuestionType;
            difficulty_fk?: DifficultyLevel;
            subject_fk?: string;
            includeInactive?: boolean;
          } = {
            includeInactive: filters?.includeInactive ?? true,
          };

          // Filtro por tipo (excluir string vacío)
          if (filters?.type && String(filters.type).length > 0) {
            queryFilters.type = filters.type as QuestionType;
          }

          // Filtro por dificultad (excluir string vacío)
          if (filters?.difficulty_fk && String(filters.difficulty_fk).length > 0) {
            queryFilters.difficulty_fk = filters.difficulty_fk as DifficultyLevel;
          }

          // Filtro por asignatura
          if (filters?.subject_fk) {
            queryFilters.subject_fk = filters.subject_fk;
          }

          // Usar questionStore para buscar
          loadedQuestions = questionStore.searchQuestionsGrouped(
            filters?.searchText || '',
            queryFilters
          );
          
          console.log(`💾 Cargadas ${loadedQuestions.length} preguntas desde localStorage`);
        }

        setQuestions(loadedQuestions);
      } catch (err) {
        console.error('Error loading questions:', err);
        setError(err instanceof Error ? err.message : 'Error cargando preguntas');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [
    filters?.searchText,
    filters?.type,
    filters?.difficulty_fk,
    filters?.subject_fk,
    filters?.includeInactive,
    user?.firebaseUid,
    user?.email,
  ]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let loadedQuestions: QuestionWithDetails[] = [];

      // Intentar cargar desde Data Connect
      try {
        if (user?.firebaseUid && user?.email) {
          const userResult = await getUserByEmail({ email: user.email });
          const userData = userResult.data?.users?.[0];
          
          if (userData?.userId) {
            const dcQuestions = await fetchQuestionsByUser(userData.userId, user.firebaseUid);
            
            loadedQuestions = dcQuestions.map(q => ({
              question_id: q.questionId,
              type: q.questionTypeId as any,
              enunciado: q.text,
              version: q.version,
              active: q.active,
              original_version_fk: q.originalQuestionId || null,
              topic_fk: q.topicId,
              difficulty_fk: q.difficultyId,
              learning_outcome_fk: q.taxonomyId,
              author_fk: q.userId,
              created_at: new Date(),
              updated_at: new Date(),
              updated_by: q.userId,
              deleted_at: null,
              deleted_by: null,
              options: q.options.map(opt => ({
                question_option_id: opt.questionOptionId,
                question_fk: opt.questionId,
                text: opt.text,
                is_correct: opt.isCorrect,
                position: opt.position,
                partial_score: opt.score,
                created_at: new Date(),
                created_by: q.userId,
                updated_at: new Date(),
                updated_by: q.userId,
              })),
            }));
          } else {
            throw new Error('Usuario no encontrado');
          }
        } else {
          throw new Error('Usuario no autenticado');
        }
      } catch {
        // Fallback a localStorage
        const queryFilters: {
          type?: QuestionType;
          difficulty_fk?: DifficultyLevel;
          subject_fk?: string;
          includeInactive?: boolean;
        } = {
          includeInactive: filters?.includeInactive ?? true,
        };

        if (filters?.type && String(filters.type).length > 0) {
          queryFilters.type = filters.type as QuestionType;
        }

        if (filters?.difficulty_fk && String(filters.difficulty_fk).length > 0) {
          queryFilters.difficulty_fk = filters.difficulty_fk as DifficultyLevel;
        }

        if (filters?.subject_fk) {
          queryFilters.subject_fk = filters.subject_fk;
        }

        loadedQuestions = questionStore.searchQuestionsGrouped(
          filters?.searchText || '',
          queryFilters
        );
      }

      setQuestions(loadedQuestions);
    } catch (err) {
      console.error('Error refetching questions:', err);
      setError(err instanceof Error ? err.message : 'Error cargando preguntas');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [filters, user]);

  return {
    questions,
    loading,
    error,
    refetch,
  };
};
