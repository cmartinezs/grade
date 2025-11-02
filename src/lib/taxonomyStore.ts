/**
 * Taxonomy Store
 * Gestión centralizada de datos de taxonomías (Asignaturas, Unidades, Temas)
 * Wrapper sobre taxonomyDataConnect.ts con caching en memoria
 * 
 * IMPORTANTE: Los componentes esperan funciones sincrónicas que devuelven objetos,
 * no promesas. Este store proporciona interfaces compatibles.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  fetchAllSubjects,
  createNewSubject,
  updateSubjectInfo,
  deactivateSubjectInfo,
  reactivateSubjectInfo,
  fetchAllUnits,
  createNewUnit,
  updateUnitInfo,
  deactivateUnitInfo,
  reactivateUnitInfo,
  fetchAllTopics,
  createNewTopic,
  updateTopicInfo,
  deactivateTopicInfo,
  reactivateTopicInfo,
} from './taxonomyDataConnect';

import { Subject, Unit, Topic, DeleteImpactAnalysis, ValidationError } from '@/types/taxonomy';

// ===================================================================
// CACHE IN-MEMORY
// ===================================================================

const cache: Record<string, any> = {
  subjects: null,
  units: null,
  topics: null,
  lastFetch: {},
  loading: {
    subjects: false,
    units: false,
    topics: false,
  }
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// ===================================================================
// SUBJECTS (Asignaturas)
// ===================================================================

/**
 * Obtener todas las asignaturas (sincrónico desde cache)
 * Inicia carga asincrónica si no hay cache válido
 */
export const getAllSubjects = (): Subject[] => {
  if (cache.subjects && Date.now() - (cache.lastFetch.subjects || 0) < CACHE_DURATION) {
    return cache.subjects as Subject[];
  }

  // Si no hay cache válido, iniciar carga en background
  if (!cache.loading.subjects) {
    cache.loading.subjects = true;
    fetchAllSubjects()
      .then((data: any) => {
        cache.subjects = data;
        cache.lastFetch.subjects = Date.now();
      })
      .catch((e: any) => console.error('Background fetch failed:', e))
      .finally(() => {
        cache.loading.subjects = false;
      });
  }

  // Retornar cache actual (puede estar vacío)
  return cache.subjects || [];
};

/**
 * Obtener asignatura por ID (sincrónico desde cache)
 */
export const getSubjectById = (subjectId: string): Subject | undefined => {
  const subjects = cache.subjects || [];
  return subjects.find((s: Subject) => s.subject_id === subjectId);
};

/**
 * Crear nueva asignatura
 */
export const createSubject = async (name: string, code: string): Promise<void> => {
  try {
    await createNewSubject(name, code);
    cache.subjects = null;
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
};

/**
 * Actualizar asignatura
 */
export const updateSubject = async (
  subjectId: string,
  updates: { name?: string; code?: string },
  updatedBy: string
): Promise<void> => {
  try {
    await updateSubjectInfo(subjectId, updates, updatedBy);
    cache.subjects = null;
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
};

/**
 * Desactivar asignatura
 */
export const deactivateSubject = async (subjectId: string): Promise<void> => {
  try {
    await deactivateSubjectInfo(subjectId);
    cache.subjects = null;
  } catch (error) {
    console.error('Error deactivating subject:', error);
    throw error;
  }
};

/**
 * Eliminar asignatura (alias para deactivateSubject)
 * Usa soft delete pattern - marca como inactiva
 */
export const deleteSubject = async (
  subjectId: string
): Promise<{ success: boolean; errors?: ValidationError[] }> => {
  try {
    const impact = analyzeSubjectDeleteImpact(subjectId);

    if (!impact.canDelete) {
      return {
        success: false,
        errors: [
          {
            field: 'subject',
            message: impact.warnings.join('; ')
          }
        ]
      };
    }

    // También deactivar todas las unidades relacionadas
    const units = (cache.units || []) as Unit[];
    const relatedUnits = units.filter((u: Unit) => u.subject_fk === subjectId && u.active);

    for (const unit of relatedUnits) {
      await deactivateUnitInfo(unit.unit_id);
    }

    // También deactivar todos los temas relacionados
    const topics = (cache.topics || []) as Topic[];
    for (const unit of relatedUnits) {
      const relatedTopics = topics.filter((t: Topic) => t.unit_fk === unit.unit_id && t.active);
      for (const topic of relatedTopics) {
        await deactivateTopicInfo(topic.topic_id);
      }
    }

    // Deactivar la asignatura
    await deactivateSubjectInfo(subjectId);

    // Limpiar caches
    cache.subjects = null;
    cache.units = null;
    cache.topics = null;

    return { success: true };
  } catch (error) {
    console.error('Error deleting subject:', error);
    return {
      success: false,
      errors: [
        {
          field: 'subject',
          message: error instanceof Error ? error.message : 'Error desconocido'
        }
      ]
    };
  }
};

/**
 * Reactivar asignatura
 */
export const reactivateSubject = async (subjectId: string): Promise<void> => {
  try {
    await reactivateSubjectInfo(subjectId);
    cache.subjects = null;
  } catch (error) {
    console.error('Error reactivating subject:', error);
    throw error;
  }
};

/**
 * Analizar impacto de eliminar una asignatura
 */
export const analyzeSubjectDeleteImpact = (subjectId: string): DeleteImpactAnalysis => {
  const units = (cache.units || []) as Unit[];
  const topics = (cache.topics || []) as Topic[];

  const affectedUnits = units.filter((u: Unit) => u.subject_fk === subjectId && u.active).length;
  const affectedTopics = topics.filter((t: Topic) => {
    const unit = units.find((u: Unit) => u.unit_id === t.unit_fk && u.subject_fk === subjectId);
    return unit && t.active;
  }).length;

  const warnings: string[] = [];

  if (affectedUnits > 0) {
    warnings.push(`Se desactivarán ${affectedUnits} unidad(es) relacionada(s)`);
  }
  if (affectedTopics > 0) {
    warnings.push(`Se desactivarán ${affectedTopics} tema(s) relacionado(s)`);
  }

  return {
    canDelete: true,
    affectedUnits,
    affectedTopics,
    affectedQuestions: 0,
    warnings
  };
};

// ===================================================================
// UNITS (Unidades)
// ===================================================================

/**
 * Obtener todas las unidades (sincrónico)
 */
export const getAllUnits = (): Unit[] => {
  if (cache.units && Date.now() - (cache.lastFetch.units || 0) < CACHE_DURATION) {
    return cache.units as Unit[];
  }

  // Si no hay cache válido, iniciar carga en background
  if (!cache.loading.units) {
    cache.loading.units = true;
    fetchAllUnits()
      .then((data: any) => {
        cache.units = data;
        cache.lastFetch.units = Date.now();
      })
      .catch((e: any) => console.error('Background fetch failed:', e))
      .finally(() => {
        cache.loading.units = false;
      });
  }

  return cache.units || [];
};

/**
 * Obtener unidad por ID (sincrónico)
 */
export const getUnitById = (unitId: string): Unit | undefined => {
  const units = (cache.units || []) as Unit[];
  return units.find((u: Unit) => u.unit_id === unitId);
};

/**
 * Obtener unidades por asignatura
 */
export const getUnitsBySubject = (subjectId: string): Unit[] => {
  const units = (cache.units || []) as Unit[];
  return units.filter((u: Unit) => u.subject_fk === subjectId && u.active);
};

/**
 * Buscar unidades por asignatura (con búsqueda de texto)
 */
export const searchUnitsBySubject = (subjectId: string, searchTerm?: string): Unit[] => {
  let units = getUnitsBySubject(subjectId);
  
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    units = units.filter((u: Unit) => u.name.toLowerCase().includes(searchLower));
  }
  
  return units;
};

/**
 * Crear nueva unidad
 */
export const createUnit = async (name: string, subjectId: string): Promise<void> => {
  try {
    await createNewUnit(name, subjectId);
    cache.units = null;
  } catch (error) {
    console.error('Error creating unit:', error);
    throw error;
  }
};

/**
 * Actualizar unidad
 */
export const updateUnit = async (
  unitId: string,
  updates: { name?: string; subject_fk?: string },
  updatedBy: string
): Promise<void> => {
  try {
    await updateUnitInfo(unitId, updates, updatedBy);
    cache.units = null;
  } catch (error) {
    console.error('Error updating unit:', error);
    throw error;
  }
};

/**
 * Desactivar unidad
 */
export const deactivateUnit = async (unitId: string): Promise<void> => {
  try {
    await deactivateUnitInfo(unitId);
    cache.units = null;
  } catch (error) {
    console.error('Error deactivating unit:', error);
    throw error;
  }
};

/**
 * Eliminar unidad (alias para deactivateUnit)
 */
export const deleteUnit = async (
  unitId: string
): Promise<{ success: boolean; errors?: ValidationError[] }> => {
  try {
    const impact = analyzeUnitDeleteImpact(unitId);

    if (!impact.canDelete) {
      return {
        success: false,
        errors: [
          {
            field: 'unit',
            message: impact.warnings.join('; ')
          }
        ]
      };
    }

    // Deactivar todos los temas relacionados
    const topics = (cache.topics || []) as Topic[];
    const relatedTopics = topics.filter((t: Topic) => t.unit_fk === unitId && t.active);

    for (const topic of relatedTopics) {
      await deactivateTopicInfo(topic.topic_id);
    }

    // Deactivar la unidad
    await deactivateUnitInfo(unitId);

    cache.units = null;
    cache.topics = null;

    return { success: true };
  } catch (error) {
    console.error('Error deleting unit:', error);
    return {
      success: false,
      errors: [
        {
          field: 'unit',
          message: error instanceof Error ? error.message : 'Error desconocido'
        }
      ]
    };
  }
};

/**
 * Reactivar unidad
 */
export const reactivateUnit = async (unitId: string): Promise<void> => {
  try {
    await reactivateUnitInfo(unitId);
    cache.units = null;
  } catch (error) {
    console.error('Error reactivating unit:', error);
    throw error;
  }
};

/**
 * Analizar impacto de eliminar una unidad
 */
export const analyzeUnitDeleteImpact = (unitId: string): DeleteImpactAnalysis => {
  const topics = (cache.topics || []) as Topic[];

  const affectedTopics = topics.filter((t: Topic) => t.unit_fk === unitId && t.active).length;

  const warnings: string[] = [];
  if (affectedTopics > 0) {
    warnings.push(`Se desactivarán ${affectedTopics} tema(s) relacionado(s)`);
  }

  return {
    canDelete: true,
    affectedUnits: 0,
    affectedTopics,
    affectedQuestions: 0,
    warnings
  };
};

// ===================================================================
// TOPICS (Temas)
// ===================================================================

/**
 * Obtener todos los temas (sincrónico)
 */
export const getAllTopics = (): Topic[] => {
  if (cache.topics && Date.now() - (cache.lastFetch.topics || 0) < CACHE_DURATION) {
    return cache.topics as Topic[];
  }

  // Si no hay cache válido, iniciar carga en background
  if (!cache.loading.topics) {
    cache.loading.topics = true;
    fetchAllTopics()
      .then((data: any) => {
        cache.topics = data;
        cache.lastFetch.topics = Date.now();
      })
      .catch((e: any) => console.error('Background fetch failed:', e))
      .finally(() => {
        cache.loading.topics = false;
      });
  }

  return cache.topics || [];
};

/**
 * Obtener tema por ID (sincrónico)
 */
export const getTopicById = (topicId: string): Topic | undefined => {
  const topics = (cache.topics || []) as Topic[];
  return topics.find((t: Topic) => t.topic_id === topicId);
};

/**
 * Obtener temas por unidad
 */
export const getTopicsByUnit = (unitId: string): Topic[] => {
  const topics = (cache.topics || []) as Topic[];
  return topics.filter((t: Topic) => t.unit_fk === unitId && t.active);
};

/**
 * Buscar temas por unidad (con búsqueda de texto)
 */
export const searchTopicsByUnit = (unitId: string, searchTerm?: string): Topic[] => {
  let topics = getTopicsByUnit(unitId);
  
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    topics = topics.filter((t: Topic) => t.name.toLowerCase().includes(searchLower));
  }
  
  return topics;
};

/**
 * Buscar taxonomía (general)
 */
export const searchTaxonomy = (query: string): { subjects: Subject[]; units: Unit[]; topics: Topic[] } => {
  const queryLower = query.toLowerCase();

  return {
    subjects: ((cache.subjects || []) as Subject[]).filter((s: Subject) =>
      s.name.toLowerCase().includes(queryLower) || s.code.toLowerCase().includes(queryLower)
    ),
    units: ((cache.units || []) as Unit[]).filter((u: Unit) =>
      u.name.toLowerCase().includes(queryLower)
    ),
    topics: ((cache.topics || []) as Topic[]).filter((t: Topic) =>
      t.name.toLowerCase().includes(queryLower)
    )
  };
};

/**
 * Crear nuevo tema
 */
export const createTopic = async (name: string, unitId: string): Promise<void> => {
  try {
    await createNewTopic(name, unitId);
    cache.topics = null;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};

/**
 * Actualizar tema
 */
export const updateTopic = async (
  topicId: string,
  updates: { name?: string; unit_fk?: string },
  updatedBy: string
): Promise<void> => {
  try {
    await updateTopicInfo(topicId, updates, updatedBy);
    cache.topics = null;
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
};

/**
 * Desactivar tema
 */
export const deactivateTopic = async (topicId: string): Promise<void> => {
  try {
    await deactivateTopicInfo(topicId);
    cache.topics = null;
  } catch (error) {
    console.error('Error deactivating topic:', error);
    throw error;
  }
};

/**
 * Eliminar tema (alias para deactivateTopic)
 */
export const deleteTopic = async (
  topicId: string
): Promise<{ success: boolean; errors?: ValidationError[] }> => {
  try {
    const impact = analyzeTopicDeleteImpact();

    if (!impact.canDelete) {
      return {
        success: false,
        errors: [
          {
            field: 'topic',
            message: impact.warnings.join('; ')
          }
        ]
      };
    }

    await deactivateTopicInfo(topicId);

    cache.topics = null;

    return { success: true };
  } catch (error) {
    console.error('Error deleting topic:', error);
    return {
      success: false,
      errors: [
        {
          field: 'topic',
          message: error instanceof Error ? error.message : 'Error desconocido'
        }
      ]
    };
  }
};

/**
 * Reactivar tema
 */
export const reactivateTopic = async (topicId: string): Promise<void> => {
  try {
    await reactivateTopicInfo(topicId);
    cache.topics = null;
  } catch (error) {
    console.error('Error reactivating topic:', error);
    throw error;
  }
};

/**
 * Analizar impacto de eliminar un tema
 */
export const analyzeTopicDeleteImpact = (): DeleteImpactAnalysis => {
  // Los temas no tienen dependencias (no pueden afectar otros elementos)
  return {
    canDelete: true,
    affectedUnits: 0,
    affectedTopics: 0,
    affectedQuestions: 0,
    warnings: []
  };
};

// ===================================================================
// CACHE MANAGEMENT
// ===================================================================

/**
 * Precarga todos los datos (llamar al iniciar la app)
 */
export const preloadAllTaxonomyData = async (): Promise<void> => {
  try {
    await Promise.all([
      getAllSubjects(),
      getAllUnits(),
      getAllTopics(),
    ]);
  } catch (error) {
    console.error('Error preloading taxonomy data:', error);
  }
};

/**
 * Limpiar todo el cache
 */
export const clearAllTaxonomyData = (): void => {
  cache.subjects = null;
  cache.units = null;
  cache.topics = null;
  cache.lastFetch = {};
};

/**
 * Invalidar cache específico
 */
export const invalidateTaxonomyCache = (key?: 'subjects' | 'units' | 'topics'): void => {
  if (key) {
    cache[key] = null;
    delete cache.lastFetch[key];
  } else {
    clearAllTaxonomyData();
  }
};

/**
 * Obtener estado del cache
 */
export const getCacheStatus = () => {
  return {
    hasSubjects: cache.subjects !== null,
    hasUnits: cache.units !== null,
    hasTopics: cache.topics !== null,
    lastFetch: cache.lastFetch,
    loading: cache.loading
  };
};
