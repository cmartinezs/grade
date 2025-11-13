/**
 * useTaxonomies Hook
 * Hook para gestionar taxonomías desde Data Connect
 * Sigue el patrón: componente -> hooks -> lib (masterDataConnect) -> dataconnect-generated
 */

import { useState, useCallback, useEffect } from 'react';
import {
  fetchAllTaxonomies,
  createNewTaxonomy,
  Taxonomy,
} from '@/lib/masterDataConnect';

interface UseTaxonomiesResult {
  taxonomies: Taxonomy[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  create: (code: string, name: string, level: number, createdBy: string, description?: string) => Promise<Taxonomy>;
  refetch: () => Promise<void>;
}

export const useTaxonomies = (): UseTaxonomiesResult => {
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // Cargar taxonomías
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllTaxonomies();
        setTaxonomies(data);
      } catch (err) {
        console.error('Error loading taxonomies:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar las taxonomías');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Crear nueva taxonomía
  const create = useCallback(
    async (code: string, name: string, level: number, createdBy: string, description?: string): Promise<Taxonomy> => {
      try {
        setCreating(true);
        setError(null);
        const newTaxonomy = await createNewTaxonomy(code, name, level, createdBy, description);
        setTaxonomies((prev) => [...prev, newTaxonomy]);
        return newTaxonomy;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al crear la taxonomía';
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
      const data = await fetchAllTaxonomies();
      setTaxonomies(data);
    } catch (err) {
      console.error('Error refetching taxonomies:', err);
      setError(err instanceof Error ? err.message : 'Error al recargar las taxonomías');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    taxonomies,
    loading,
    error,
    creating,
    create,
    refetch,
  };
};
