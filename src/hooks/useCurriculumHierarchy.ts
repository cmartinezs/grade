/**
 * useCurriculumHierarchy Hook
 * Carga la taxonomía (Asignaturas, Unidades, Temas) desde Firebase Data Connect
 * Asegura datos frescos cada vez que se monta el componente
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Subject, Unit, Topic } from '@/types/curriculumHierarchy';
import {
  fetchAllSubjects,
  fetchAllUnits,
  fetchAllTopics,
} from '@/lib/curriculumHierarchyDataConnect';
import { retryWithBackoff } from '@/lib/retryWithBackoff';

interface UseCurriculumHierarchyResult {
  subjects: Subject[];
  units: Unit[];
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

export const useCurriculumHierarchy = (): UseCurriculumHierarchyResult => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurriculumHierarchy = async () => {
      // Esperar hasta que el usuario esté autenticado
      if (!user?.firebaseUid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Cargar todas las taxonomías en paralelo con retry
        const [subjectsData, unitsData, topicsData] = await Promise.all([
          retryWithBackoff(() => fetchAllSubjects(), 3, 500, 'useCurriculumHierarchy.subjects'),
          retryWithBackoff(() => fetchAllUnits(), 3, 500, 'useCurriculumHierarchy.units'),
          retryWithBackoff(() => fetchAllTopics(), 3, 500, 'useCurriculumHierarchy.topics'),
        ]);

        // Transformar datos de Data Connect a nuestro formato interno
        const transformedSubjects = (subjectsData.subjects || []).map((s: any) => ({
          subject_id: s.subjectId,
          name: s.name,
          code: s.code,
          level_fk: s.levelId,
          active: s.active,
          created_at: s.createdAt,
          created_by: s.createdBy,
          updated_at: s.updatedAt,
          updated_by: s.updatedBy,
          deleted_at: s.deletedAt,
          deleted_by: s.deletedBy,
        }));

        const transformedUnits = (unitsData.units || []).map((u: any) => ({
          unit_id: u.unitId,
          subject_fk: u.subjectId,
          name: u.name,
          description: u.description,
          active: u.active,
          created_at: u.createdAt,
          created_by: u.createdBy,
          updated_at: u.updatedAt,
          updated_by: u.updatedBy,
          deleted_at: u.deletedAt,
          deleted_by: u.deletedBy,
        }));

        const transformedTopics = (topicsData.topics || []).map((t: any) => ({
          topic_id: t.topicId,
          unit_fk: t.unitId,
          name: t.name,
          description: t.description,
          active: t.active,
          created_at: t.createdAt,
          created_by: t.createdBy,
          updated_at: t.updatedAt,
          updated_by: t.updatedBy,
          deleted_at: t.deletedAt,
          deleted_by: t.deletedBy,
        }));

        setSubjects(transformedSubjects);
        setUnits(transformedUnits);
        setTopics(transformedTopics);
      } catch (err) {
        console.error('Error loading CurriculumHierarchy:', err);
        setError(err instanceof Error ? err.message : 'Error cargando taxonomía');
        setSubjects([]);
        setUnits([]);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    loadCurriculumHierarchy();
  }, [user?.firebaseUid]);

  return {
    subjects,
    units,
    topics,
    loading,
    error,
  };
};
