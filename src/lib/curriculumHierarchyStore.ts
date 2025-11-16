/**
 * CurriculumHierarchy Store
 * Gestión centralizada de datos de taxonomías (Asignaturas, Unidades, Temas)
 * Wrapper sobre CurriculumHierarchyDataConnect.ts con caching en memoria
 * 
 * IMPORTANTE: Los componentes esperan funciones sincrónicas que devuelven objetos,
 * no promesas. Este store proporciona interfaces compatibles.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateUUID } from './uuid';
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
} from './curriculumHierarchyDataConnect';

import { Subject, Unit, Topic, DeleteImpactAnalysis, ValidationError } from '@/types/curriculumHierarchy';

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

/**
 * Invalidar el caché completamente
 */
const invalidateCache = (keys: ('subjects' | 'units' | 'topics')[] = ['subjects', 'units', 'topics']) => {
  keys.forEach(key => {
    cache[key] = null;
    cache.lastFetch[key] = 0; // Reset timestamp para forzar recarga
    cache.loading[key] = false; // Reset loading flag para permitir nueva carga
  });
};

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
        // data es { subjects: [...], ... }, necesitamos extraer y transformar el array
        // Data Connect devuelve subjectId, pero nuestro tipo espera subject_id
        // CRITICAL: ListSubjects query returns: subjectId, name, code, levelId, active, createdAt
        // Se mapean los campos disponibles y se asignan valores por defecto para los que no existen
        const subjects = (data.subjects || []).map((s: any) => ({
          subject_id: s.subjectId,
          name: s.name,
          code: s.code,
          level_fk: s.levelId || '', // CRITICAL FIX: levelId must be mapped to level_fk
          active: s.active,
          created_at: s.createdAt,
          created_by: '', // Not provided by ListSubjects query
          updated_at: s.createdAt, // Default to createdAt when not available
          updated_by: '', // Not provided by ListSubjects query
          deleted_at: null,
          deleted_by: null,
        }));
        cache.subjects = subjects;
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
 * Obtener todas las asignaturas (asincrónico - espera a que se carguen)
 */
export const loadSubjectsAsync = async (): Promise<Subject[]> => {
  // Si hay cache válido, devolverlo inmediatamente
  if (cache.subjects && Date.now() - (cache.lastFetch.subjects || 0) < CACHE_DURATION) {
    return cache.subjects as Subject[];
  }

  // Si ya se están cargando, esperar a que terminen
  if (cache.loading.subjects) {
    // Esperar hasta que termine la carga
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!cache.loading.subjects && cache.subjects) {
          clearInterval(checkInterval);
          resolve(cache.subjects as Subject[]);
        }
      }, 100);
      // Timeout de 10 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(cache.subjects || []);
      }, 10000);
    });
  }

  // Si no hay carga en progreso, iniciar la carga
  cache.loading.subjects = true;
  try {
    const data: any = await fetchAllSubjects();
    const subjects = (data.subjects || []).map((s: any) => ({
      subject_id: s.subjectId,
      name: s.name,
      code: s.code,
      level_fk: s.levelId || '',
      active: s.active,
      created_at: s.createdAt,
      created_by: '',
      updated_at: s.createdAt,
      updated_by: '',
      deleted_at: null,
      deleted_by: null,
    }));
    cache.subjects = subjects;
    cache.lastFetch.subjects = Date.now();
    return subjects;
  } catch (error) {
    console.error('Error loading subjects:', error);
    return [];
  } finally {
    cache.loading.subjects = false;
  }
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
export const createSubject = async (name: string, code: string, levelId: string, createdBy: string): Promise<void> => {
  try {
    const subjectId = generateUUID();
    await createNewSubject(name, code, levelId, createdBy);
    
    // Agregar el nuevo elemento al caché local para reflejar cambios inmediatamente
    const newSubject: Subject = {
      subject_id: subjectId,
      name,
      code,
      level_fk: levelId,
      active: true,
      created_at: new Date().toISOString(),
      created_by: createdBy,
      updated_at: new Date().toISOString(),
      updated_by: createdBy,
      deleted_at: null,
      deleted_by: null,
    };
    
    // Agregar a caché si existe
    if (cache.subjects && Array.isArray(cache.subjects)) {
      cache.subjects.push(newSubject);
    } else {
      // Si no hay caché, limpiar para forzar recarga
      cache.subjects = null;
    }
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
  updatedBy: string,
  firebaseId: string
): Promise<void> => {
  try {
    await updateSubjectInfo(subjectId, updates, updatedBy, firebaseId);
    invalidateCache(['subjects']);
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
};

/**
 * Desactivar asignatura
 */
export const deactivateSubject = async (
  subjectId: string,
  userId: string
): Promise<void> => {
  try {
    await deactivateSubjectInfo(subjectId, userId);
    invalidateCache(['subjects']);
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
  subjectId: string,
  userId: string
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
      await deactivateUnitInfo(unit.unit_id, userId);
    }

    // También deactivar todos los temas relacionados
    const topics = (cache.topics || []) as Topic[];
    for (const unit of relatedUnits) {
      const relatedTopics = topics.filter((t: Topic) => t.unit_fk === unit.unit_id && t.active);
      for (const topic of relatedTopics) {
        await deactivateTopicInfo(topic.topic_id, userId);
      }
    }

    // Deactivar la asignatura
    await deactivateSubjectInfo(subjectId, userId);

    // Limpiar caches
    invalidateCache(['subjects', 'units', 'topics']);

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
export const reactivateSubject = async (
  subjectId: string,
  userId: string
): Promise<void> => {
  try {
    await reactivateSubjectInfo(subjectId, userId);
    invalidateCache(['subjects']);
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
        // data es { units: [...], ... }, necesitamos extraer y transformar el array
        // Data Connect devuelve unitId/subjectId, pero nuestro tipo espera unit_id/subject_fk
        // CRITICAL: ListUnits query returns: unitId, name, subjectId, active, createdAt
        // Se mapean los campos disponibles y se asignan valores por defecto para los que no existen
        const units = (data.units || []).map((u: any) => ({
          unit_id: u.unitId,
          name: u.name,
          subject_fk: u.subjectId,
          description: undefined, // Not provided by ListUnits query
          active: u.active,
          created_at: u.createdAt,
          created_by: '', // Not provided by ListUnits query
          updated_at: u.createdAt, // Default to createdAt when not available
          updated_by: '', // Not provided by ListUnits query
          deleted_at: null,
          deleted_by: null,
        }));
        cache.units = units;
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
 * Obtener todas las unidades (asincrónico - espera a que se carguen)
 */
export const loadUnitsAsync = async (): Promise<Unit[]> => {
  // Si hay cache válido, devolverlo inmediatamente
  if (cache.units && Date.now() - (cache.lastFetch.units || 0) < CACHE_DURATION) {
    return cache.units as Unit[];
  }

  // Si ya se están cargando, esperar a que terminen
  if (cache.loading.units) {
    // Esperar hasta que termine la carga
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!cache.loading.units && cache.units) {
          clearInterval(checkInterval);
          resolve(cache.units as Unit[]);
        }
      }, 100);
      // Timeout de 10 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(cache.units || []);
      }, 10000);
    });
  }

  // Si no hay carga en progreso, iniciar la carga
  cache.loading.units = true;
  try {
    const data: any = await fetchAllUnits();
    const units = (data.units || []).map((u: any) => ({
      unit_id: u.unitId,
      name: u.name,
      subject_fk: u.subjectId,
      description: undefined,
      active: u.active,
      created_at: u.createdAt,
      created_by: '',
      updated_at: u.createdAt,
      updated_by: '',
      deleted_at: null,
      deleted_by: null,
    }));
    cache.units = units;
    cache.lastFetch.units = Date.now();
    return units;
  } catch (error) {
    console.error('Error loading units:', error);
    return [];
  } finally {
    cache.loading.units = false;
  }
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
export const createUnit = async (
  name: string,
  subjectId: string,
  createdBy: string,
  description?: string
): Promise<void> => {
  try {
    const unitId = generateUUID();
    await createNewUnit(name, subjectId, createdBy, description);
    
    // Agregar el nuevo elemento al caché local
    const newUnit: Unit = {
      unit_id: unitId,
      name,
      subject_fk: subjectId,
      description: description || undefined,
      active: true,
      created_at: new Date().toISOString(),
      created_by: createdBy,
      updated_at: new Date().toISOString(),
      updated_by: createdBy,
      deleted_at: null,
      deleted_by: null,
    };
    
    // Agregar a caché si existe
    if (cache.units && Array.isArray(cache.units)) {
      cache.units.push(newUnit);
    } else {
      // Si no hay caché, limpiar para forzar recarga
      invalidateCache(['units']);
    }
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
  updates: { name?: string; subject_fk?: string; description?: string },
  updatedBy: string,
  subjectId?: string,
  firebaseId?: string
): Promise<void> => {
  try {
    await updateUnitInfo(unitId, updates, updatedBy, subjectId, firebaseId);
    invalidateCache(['units']);
  } catch (error) {
    console.error('Error updating unit:', error);
    throw error;
  }
};

/**
 * Desactivar unidad
 */
export const deactivateUnit = async (unitId: string, userId: string): Promise<void> => {
  try {
    await deactivateUnitInfo(unitId, userId);
    invalidateCache(['units']);
  } catch (error) {
    console.error('Error deactivating unit:', error);
    throw error;
  }
};

/**
 * Eliminar unidad (alias para deactivateUnit)
 */
export const deleteUnit = async (
  unitId: string,
  userId: string
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
      await deactivateTopicInfo(topic.topic_id, userId);
    }

    // Deactivar la unidad
    await deactivateUnitInfo(unitId, userId);

    invalidateCache(['units', 'topics']);

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
export const reactivateUnit = async (unitId: string, userId: string): Promise<void> => {
  try {
    await reactivateUnitInfo(unitId, userId);
    invalidateCache(['units']);
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
        // data es { topics: [...], ... }, necesitamos extraer y transformar el array
        // Data Connect devuelve topicId/unitId, pero nuestro tipo espera topic_id/unit_fk
        // CRITICAL: ListTopics query returns: topicId, name, unitId, active, createdAt
        // Se mapean los campos disponibles y se asignan valores por defecto para los que no existen
        const topics = (data.topics || []).map((t: any) => ({
          topic_id: t.topicId,
          name: t.name,
          unit_fk: t.unitId,
          description: undefined, // Not provided by ListTopics query
          active: t.active,
          created_at: t.createdAt,
          created_by: '', // Not provided by ListTopics query
          updated_at: t.createdAt, // Default to createdAt when not available
          updated_by: '', // Not provided by ListTopics query
          deleted_at: null,
          deleted_by: null,
        }));
        cache.topics = topics;
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
 * Obtener todos los temas (asincrónico - espera a que se carguen)
 */
export const loadTopicsAsync = async (): Promise<Topic[]> => {
  // Si hay cache válido, devolverlo inmediatamente
  if (cache.topics && Date.now() - (cache.lastFetch.topics || 0) < CACHE_DURATION) {
    return cache.topics as Topic[];
  }

  // Si ya se están cargando, esperar a que terminen
  if (cache.loading.topics) {
    // Esperar hasta que termine la carga
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!cache.loading.topics && cache.topics) {
          clearInterval(checkInterval);
          resolve(cache.topics as Topic[]);
        }
      }, 100);
      // Timeout de 10 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(cache.topics || []);
      }, 10000);
    });
  }

  // Si no hay carga en progreso, iniciar la carga
  cache.loading.topics = true;
  try {
    const data: any = await fetchAllTopics();
    const topics = (data.topics || []).map((t: any) => ({
      topic_id: t.topicId,
      name: t.name,
      unit_fk: t.unitId,
      description: undefined,
      active: t.active,
      created_at: t.createdAt,
      created_by: '',
      updated_at: t.createdAt,
      updated_by: '',
      deleted_at: null,
      deleted_by: null,
    }));
    cache.topics = topics;
    cache.lastFetch.topics = Date.now();
    return topics;
  } catch (error) {
    console.error('Error loading topics:', error);
    return [];
  } finally {
    cache.loading.topics = false;
  }
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
export const searchCurriculumHierarchy = (query: string): { subjects: Subject[]; units: Unit[]; topics: Topic[] } => {
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
export const createTopic = async (
  name: string,
  unitId: string,
  createdBy: string
): Promise<void> => {
  try {
    const topicId = generateUUID();
    await createNewTopic(name, unitId, createdBy);
    
    // Agregar el nuevo elemento al caché local
    const newTopic: Topic = {
      topic_id: topicId,
      name,
      unit_fk: unitId,
      active: true,
      created_at: new Date().toISOString(),
      created_by: createdBy,
      updated_at: new Date().toISOString(),
      updated_by: createdBy,
      deleted_at: null,
      deleted_by: null,
    };
    
    // Agregar a caché si existe
    if (cache.topics && Array.isArray(cache.topics)) {
      cache.topics.push(newTopic);
    } else {
      // Si no hay caché, limpiar para forzar recarga
      invalidateCache(['topics']);
    }
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
  updatedBy: string,
  unitId?: string,
  firebaseId?: string
): Promise<void> => {
  try {
    await updateTopicInfo(topicId, updates, updatedBy, unitId, firebaseId);
    invalidateCache(['topics']);
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
};

/**
 * Desactivar tema
 */
export const deactivateTopic = async (topicId: string, userId: string): Promise<void> => {
  try {
    await deactivateTopicInfo(topicId, userId);
    invalidateCache(['topics']);
  } catch (error) {
    console.error('Error deactivating topic:', error);
    throw error;
  }
};

/**
 * Eliminar tema (alias para deactivateTopic)
 */
export const deleteTopic = async (
  topicId: string,
  userId: string
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

    await deactivateTopicInfo(topicId, userId);

    invalidateCache(['topics']);

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
export const reactivateTopic = async (topicId: string, userId: string): Promise<void> => {
  try {
    await reactivateTopicInfo(topicId, userId);
    invalidateCache(['topics']);
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
export const preloadAllCurriculumHierarchyData = async (): Promise<void> => {
  try {
    await Promise.all([
      getAllSubjects(),
      getAllUnits(),
      getAllTopics(),
    ]);
  } catch (error) {
    console.error('Error preloading CurriculumHierarchy data:', error);
  }
};

/**
 * Limpiar todo el cache
 */
export const clearAllCurriculumHierarchyData = (): void => {
  invalidateCache(['subjects', 'units', 'topics']);
};

/**
 * Invalidar cache específico
 */
export const invalidateCurriculumHierarchyCache = (key?: 'subjects' | 'units' | 'topics'): void => {
  if (key) {
    cache[key] = null;
    delete cache.lastFetch[key];
  } else {
    clearAllCurriculumHierarchyData();
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

/**
 * DEBUG: Exportar caché completo para diagnóstico
 */
export const debugGetFullCache = () => {
  return {
    subjects: cache.subjects || [],
    units: cache.units || [],
    topics: cache.topics || [],
    unitsBySubject: ((cache.units || []) as Unit[]).reduce((acc, unit) => {
      if (!acc[unit.subject_fk]) acc[unit.subject_fk] = [];
      acc[unit.subject_fk].push(unit);
      return acc;
    }, {} as Record<string, Unit[]>),
    topicsByUnit: ((cache.topics || []) as Topic[]).reduce((acc, topic) => {
      if (!acc[topic.unit_fk]) acc[topic.unit_fk] = [];
      acc[topic.unit_fk].push(topic);
      return acc;
    }, {} as Record<string, Topic[]>),
  };
};
