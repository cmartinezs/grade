/**
 * useQuestionTypes Hook
 * Hook para gestionar tipos de preguntas desde Data Connect
 * Sigue el patrón: componente -> hooks -> lib (masterDataConnect) -> dataconnect-generated
 */

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchAllQuestionTypes,
  createNewQuestionType,
  QuestionType,
} from '@/lib/masterDataConnect';
import { retryWithBackoff } from '@/lib/retryWithBackoff';

interface UseQuestionTypesResult {
  questionTypes: QuestionType[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  create: (code: string, name: string, description?: string, minOptions?: number, maxOptions?: number, correctOptions?: number) => Promise<QuestionType>;
  refetch: () => Promise<void>;
}

export const useQuestionTypes = (): UseQuestionTypesResult => {
  const { user } = useAuth();
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Cargar tipos de preguntas
  useEffect(() => {
    const loadData = async () => {
      // Esperar hasta que el usuario esté autenticado
      if (!user?.firebaseUid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await retryWithBackoff(() => fetchAllQuestionTypes(), 3, 500, 'useQuestionTypes');
        setQuestionTypes(data);
      } catch (err) {
        console.error('Error loading question types:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los tipos de preguntas');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?.firebaseUid]);

  // Crear nuevo tipo de pregunta
  const create = useCallback(
    async (code: string, name: string, description?: string, minOptions?: number, maxOptions?: number, correctOptions?: number): Promise<QuestionType> => {
      try {
        setCreating(true);
        setError(null);
        const newType = await createNewQuestionType(code, name, description, minOptions, maxOptions, correctOptions);
        setQuestionTypes((prev) => [...prev, newType]);
        return newType;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al crear el tipo de pregunta';
        setError(errorMsg);
        throw err;
      } finally {
        setCreating(false);
      }
    },
    []
  );

  // Recargar datos
  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await retryWithBackoff(() => fetchAllQuestionTypes(), 3, 500, 'useQuestionTypes.refetch');
      setQuestionTypes(data);
    } catch (err) {
      console.error('Error refetching question types:', err);
      setError(err instanceof Error ? err.message : 'Error al recargar los tipos de preguntas');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    questionTypes,
    loading,
    error,
    creating,
    create,
    refetch,
  };
};
