/**
 * useQuestions Hook
 * Carga la lista de preguntas desde Firebase Data Connect
 * Con fallback a questionStore local mientras se implementa Data Connect
 */

import { useEffect, useState, useCallback } from 'react';
import { QuestionWithDetails, QuestionType, DifficultyLevel } from '@/types/question';
import { questionStore } from '@/lib/questionStore';

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

  const loadQuestions = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Una vez que Data Connect esté completamente integrado,
      // aquí haremos llamadas a fetchAllQuestions() o similar
      
      // Por ahora, usamos el questionStore como fallback
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
      const results = questionStore.searchQuestionsGrouped(
        filters?.searchText || '',
        queryFilters
      );

      setQuestions(results);
    } catch (err) {
      console.error('Error loading questions:', err);
      setError(err instanceof Error ? err.message : 'Error cargando preguntas');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    loading,
    error,
    refetch: loadQuestions,
  };
};
