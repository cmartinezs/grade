/**
 * useQuestions Hook
 * Carga la lista de preguntas desde Firebase Data Connect
 */

import { useEffect, useState, useCallback } from 'react';
import { QuestionWithDetails, QuestionType, DifficultyLevel } from '@/types/question';
import { fetchQuestionsByUser, mapQuestionTypeIdToCode } from '@/lib/questionConnect';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
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
  const { questionTypes } = useQuestionTypes();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Esperar hasta que el usuario esté disponible
        if (!user?.firebaseUid || !user?.email) {
          setLoading(false);
          return;
        }

        // Obtener userId desde Data Connect
        const userResult = await getUserByEmail({ email: user.email });
        const userData = userResult.data?.users?.[0];
        
        if (!userData?.userId) {
          throw new Error('Usuario no encontrado en Data Connect');
        }

        const dcQuestions = await fetchQuestionsByUser(userData.userId, user.firebaseUid);
        
        // Transformar formato de Data Connect a formato local
        const loadedQuestions: QuestionWithDetails[] = dcQuestions.map(q => ({
          question_id: q.questionId,
          type: mapQuestionTypeIdToCode(q.questionTypeId, questionTypes) as QuestionType,
          enunciado: q.text,
          version: q.version,
          active: q.active,
          original_version_fk: q.originalQuestionId || null,
          topic_fk: q.topicId,
          difficulty_fk: q.difficultyId as DifficultyLevel, // UUID de dificultad
          learning_outcome_fk: q.taxonomyId,
          author_fk: q.userId,
          created_at: new Date(),
          updated_at: new Date(),
          updated_by: q.userId,
          deleted_at: null,
          deleted_by: null,
          options: (q.options || []).map(opt => ({
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
    questionTypes,
  ]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.firebaseUid || !user?.email) {
        throw new Error('Usuario no autenticado');
      }

      const userResult = await getUserByEmail({ email: user.email });
      const userData = userResult.data?.users?.[0];
      
      if (!userData?.userId) {
        throw new Error('Usuario no encontrado en Data Connect');
      }

      const dcQuestions = await fetchQuestionsByUser(userData.userId, user.firebaseUid);
      
      const loadedQuestions: QuestionWithDetails[] = dcQuestions.map(q => ({
        question_id: q.questionId,
        type: mapQuestionTypeIdToCode(q.questionTypeId, questionTypes) as QuestionType,
        enunciado: q.text,
        version: q.version,
        active: q.active,
        original_version_fk: q.originalQuestionId || null,
        topic_fk: q.topicId,
        difficulty_fk: q.difficultyId as DifficultyLevel, // UUID de dificultad
        learning_outcome_fk: q.taxonomyId,
        author_fk: q.userId,
        created_at: new Date(),
        updated_at: new Date(),
        updated_by: q.userId,
        deleted_at: null,
        deleted_by: null,
        options: (q.options || []).map(opt => ({
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

      setQuestions(loadedQuestions);
    } catch (err) {
      console.error('Error refetching questions:', err);
      setError(err instanceof Error ? err.message : 'Error cargando preguntas');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [user, questionTypes]);

  return {
    questions,
    loading,
    error,
    refetch,
  };
};
