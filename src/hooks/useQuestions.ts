/**
 * useQuestions Hook
 * Carga la lista de preguntas desde Firebase Data Connect
 */

import { useEffect, useState, useCallback } from 'react';
import { QuestionWithDetails, QuestionType, DifficultyLevel } from '@/types/question';
import { fetchQuestionsByUser, mapQuestionTypeIdToCode } from '@/lib/questionConnect';
import { useAuth } from '@/contexts/AuthContext';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
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
  const [allQuestions, setAllQuestions] = useState<QuestionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { questionTypes } = useQuestionTypes();
  const { topics, units } = useCurriculumHierarchy();

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
        setAllQuestions(loadedQuestions);
      } catch (err) {
        console.error('Error loading questions:', err);
        setError(err instanceof Error ? err.message : 'Error cargando preguntas');
        setAllQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [user?.firebaseUid, user?.email, questionTypes]);

  // Aplicar filtros localmente
  const questions = allQuestions.filter(q => {
    // Filtro de búsqueda por texto
    if (filters?.searchText && filters.searchText.trim() !== '') {
      const searchLower = filters.searchText.toLowerCase();
      if (!q.enunciado.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Filtro por tipo
    if (filters?.type && filters.type.length > 0) {
      if (q.type !== filters.type) {
        return false;
      }
    }

    // Filtro por dificultad
    if (filters?.difficulty_fk && filters.difficulty_fk.length > 0) {
      if (q.difficulty_fk !== filters.difficulty_fk) {
        return false;
      }
    }

    // Filtro por asignatura (necesita buscar en la jerarquía)
    if (filters?.subject_fk && filters.subject_fk !== '') {
      // Buscar el tema de la pregunta
      const topic = topics.find(t => t.topic_id === q.topic_fk);
      if (!topic) return false;
      
      // Buscar la unidad del tema
      const unit = units.find(u => u.unit_id === topic.unit_fk);
      if (!unit) return false;
      
      // Verificar si la asignatura coincide
      if (unit.subject_fk !== filters.subject_fk) {
        return false;
      }
    }

    // Filtro de activo/inactivo
    if (filters?.includeInactive === false && !q.active) {
      return false;
    }

    return true;
  });

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

      setAllQuestions(loadedQuestions);
    } catch (err) {
      console.error('Error refetching questions:', err);
      setError(err instanceof Error ? err.message : 'Error cargando preguntas');
      setAllQuestions([]);
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
