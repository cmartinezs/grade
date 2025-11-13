/**
 * CurriculumHierarchy Data Connect Store
 * Gestión de Asignaturas, Unidades y Temas mediante Firebase Data Connect
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateUUID } from './uuid';
import {
  listSubjects as dcListSubjects,
  listUnits as dcListUnits,
  listTopics as dcListTopics,
  getSubject as dcGetSubject,
  getUnit as dcGetUnit,
  getTopic as dcGetTopic,
  createSubject as dcCreateSubject,
  updateSubject as dcUpdateSubject,
  deactivateSubject as dcDeactivateSubject,
  reactivateSubject as dcReactivateSubject,
  createUnit as dcCreateUnit,
  updateUnit as dcUpdateUnit,
  deactivateUnit as dcDeactivateUnit,
  reactivateUnit as dcReactivateUnit,
  createTopic as dcCreateTopic,
  updateTopic as dcUpdateTopic,
  deactivateTopic as dcDeactivateTopic,
  reactivateTopic as dcReactivateTopic,
  ListSubjectsData,
  ListUnitsData,
  ListTopicsData,
  GetSubjectData,
  GetUnitData,
  GetTopicData,
} from '@dataconnect/generated';

// ===================================================================
// SUBJECTS (Asignaturas)
// ===================================================================

export const fetchAllSubjects = async (): Promise<ListSubjectsData> => {
  try {
    const result = await dcListSubjects();
    return result.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

export const fetchSubjectById = async (subjectId: string): Promise<GetSubjectData> => {
  try {
    const result = await dcGetSubject({ subjectId });
    return result.data;
  } catch (error) {
    console.error(`Error fetching subject ${subjectId}:`, error);
    throw error;
  }
};

export const createNewSubject = async (
  name: string,
  code: string,
  levelId: string,
  createdBy: string
): Promise<void> => {
  try {
    // Generate UUID for subjectId
    const subjectId = generateUUID();
    await dcCreateSubject({ subjectId, name, code, levelId, createdBy });
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
};

export const updateSubjectInfo = async (
  subjectId: string,
  updates: { name?: string; code?: string },
  updatedBy: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    await (dcUpdateSubject as any)({
      subjectId,
      name: updates.name,
      code: updates.code,
      updatedBy,
      updatedAt,
    });
  } catch (error) {
    console.error(`Error updating subject ${subjectId}:`, error);
    throw error;
  }
};

export const deactivateSubjectInfo = async (
  subjectId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateSubject as any)({
      subjectId,
      deletedAt: now,
      deletedBy
    });
  } catch (error) {
    console.error(`Error deactivating subject ${subjectId}:`, error);
    throw error;
  }
};

export const reactivateSubjectInfo = async (subjectId: string, deletedBy: string): Promise<void> => {
  try {
    await (dcReactivateSubject as any)({ 
      subjectId,
      deletedBy
    });
  } catch (error) {
    console.error(`Error reactivating subject ${subjectId}:`, error);
    throw error;
  }
};

// ===================================================================
// UNITS (Unidades)
// ===================================================================

export const fetchAllUnits = async (): Promise<ListUnitsData> => {
  try {
    const result = await dcListUnits();
    return result.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};

export const fetchUnitById = async (unitId: string): Promise<GetUnitData> => {
  try {
    const result = await dcGetUnit({ unitId });
    return result.data;
  } catch (error) {
    console.error(`Error fetching unit ${unitId}:`, error);
    throw error;
  }
};

export const fetchUnitsBySubject = async (subjectId: string): Promise<ListUnitsData> => {
  try {
    const allUnits = await fetchAllUnits();
    return {
      units: allUnits.units.filter((unit) => unit.subjectId === subjectId),
    };
  } catch (error) {
    console.error(`Error fetching units for subject ${subjectId}:`, error);
    throw error;
  }
};

export const createNewUnit = async (
  name: string,
  subjectId: string,
  createdBy: string,
  description?: string
): Promise<void> => {
  try {
    // Generate UUID for unitId
    const unitId = generateUUID();
    await dcCreateUnit({ unitId, name, description, subjectId, createdBy });
  } catch (error) {
    console.error('Error creating unit:', error);
    throw error;
  }
};

export const updateUnitInfo = async (
  unitId: string,
  updates: { name?: string; subject_fk?: string; description?: string },
  updatedBy: string,
  subjectId?: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    const subject_fk = updates.subject_fk || subjectId;
    await (dcUpdateUnit as any)({ 
      unitId, 
      name: updates.name, 
      description: updates.description,
      subjectId: subject_fk,
      updatedBy, 
      updatedAt 
    });
  } catch (error) {
    console.error(`Error updating unit ${unitId}:`, error);
    throw error;
  }
};

export const deactivateUnitInfo = async (
  unitId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateUnit as any)({ 
      unitId,
      deletedAt: now,
      deletedBy
    });
  } catch (error) {
    console.error(`Error deactivating unit ${unitId}:`, error);
    throw error;
  }
};

export const reactivateUnitInfo = async (unitId: string, deletedBy: string): Promise<void> => {
  try {
    await (dcReactivateUnit as any)({ 
      unitId,
      deletedBy
    });
  } catch (error) {
    console.error(`Error reactivating unit ${unitId}:`, error);
    throw error;
  }
};

// ===================================================================
// TOPICS (Temas)
// ===================================================================

export const fetchAllTopics = async (): Promise<ListTopicsData> => {
  try {
    const result = await dcListTopics();
    return result.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const fetchTopicById = async (topicId: string): Promise<GetTopicData> => {
  try {
    const result = await dcGetTopic({ topicId });
    return result.data;
  } catch (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    throw error;
  }
};

export const fetchTopicsByUnit = async (unitId: string): Promise<ListTopicsData> => {
  try {
    const allTopics = await fetchAllTopics();
    return {
      topics: allTopics.topics.filter((topic) => topic.unitId === unitId),
    };
  } catch (error) {
    console.error(`Error fetching topics for unit ${unitId}:`, error);
    throw error;
  }
};

export const createNewTopic = async (
  name: string,
  unitId: string,
  createdBy: string
): Promise<void> => {
  try {
    // Generate UUID for topicId
    const topicId = generateUUID();
    await dcCreateTopic({ topicId, name, unitId, createdBy });
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};

export const updateTopicInfo = async (
  topicId: string,
  updates: { name?: string; unit_fk?: string },
  updatedBy: string,
  unitId?: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    const unit_fk = updates.unit_fk || unitId;
    await (dcUpdateTopic as any)({ 
      topicId, 
      unitId: unit_fk,
      name: updates.name, 
      updatedBy, 
      updatedAt 
    });
  } catch (error) {
    console.error(`Error updating topic ${topicId}:`, error);
    throw error;
  }
};

export const deactivateTopicInfo = async (
  topicId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateTopic as any)({ 
      topicId,
      deletedAt: now,
      deletedBy
    });
  } catch (error) {
    console.error(`Error deactivating topic ${topicId}:`, error);
    throw error;
  }
};

export const reactivateTopicInfo = async (topicId: string, deletedBy: string): Promise<void> => {
  try {
    await (dcReactivateTopic as any)({ 
      topicId,
      deletedBy
    });
  } catch (error) {
    console.error(`Error reactivating topic ${topicId}:`, error);
    throw error;
  }
};

// ===================================================================
// HIERARCHICAL QUERIES
// ===================================================================

export const fetchCurriculumHierarchyHierarchy = async (subjectId: string) => {
  try {
    const subject = await fetchSubjectById(subjectId);
    const units = await fetchUnitsBySubject(subjectId);

    const hierarchyData = {
      subject: subject.subject,
      units: await Promise.all(
        units.units.map(async (unit) => {
          const topics = await fetchTopicsByUnit(unit.unitId);
          return { ...unit, topics: topics.topics };
        })
      ),
    };

    return hierarchyData;
  } catch (error) {
    console.error(`Error fetching CurriculumHierarchy hierarchy for subject ${subjectId}:`, error);
    throw error;
  }
};

export const fetchCompleteCurriculumHierarchy = async () => {
  try {
    const subjects = await fetchAllSubjects();

    const completeCurriculumHierarchy = await Promise.all(
      subjects.subjects.map(async (subject) => {
        const hierarchy = await fetchCurriculumHierarchyHierarchy(subject.subjectId);
        return hierarchy;
      })
    );

    return completeCurriculumHierarchy;
  } catch (error) {
    console.error('Error fetching complete CurriculumHierarchy:', error);
    throw error;
  }
};
