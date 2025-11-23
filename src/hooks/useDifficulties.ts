/**
 * useDifficulties Hook
 * Hook para gestionar niveles de dificultad desde Data Connect
 * Sigue el patrón: componente -> hooks -> lib (masterDataConnect) -> dataconnect-generated
 */

import { useState, useCallback, useEffect } from 'react';
import {
  fetchAllDifficulties,
  createNewDifficulty,
  Difficulty,
} from '@/lib/masterDataConnect';
import { retryWithBackoff } from '@/lib/retryWithBackoff';

interface UseDifficultiesResult {
  difficulties: Difficulty[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  create: (level: string, weight: number, description?: string) => Promise<Difficulty>;
  refetch: () => Promise<void>;
}

export const useDifficulties = (): UseDifficultiesResult => {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Cargar dificultades
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await retryWithBackoff(() => fetchAllDifficulties(), 3, 500, 'useDifficulties');
        setDifficulties(data);
      } catch (err) {
        console.error('Error loading difficulties:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los niveles de dificultad');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Crear nueva dificultad
  const create = useCallback(
    async (level: string, weight: number, description?: string): Promise<Difficulty> => {
      try {
        setCreating(true);
        setError(null);
        const newDifficulty = await createNewDifficulty(level, weight, description);
        setDifficulties((prev) => [...prev, newDifficulty]);
        return newDifficulty;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al crear el nivel de dificultad';
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
      const data = await retryWithBackoff(() => fetchAllDifficulties(), 3, 500, 'useDifficulties.refetch');
      setDifficulties(data);
    } catch (err) {
      console.error('Error refetching difficulties:', err);
      setError(err instanceof Error ? err.message : 'Error al recargar los niveles de dificultad');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    difficulties,
    loading,
    error,
    creating,
    create,
    refetch,
  };
};
