/**
 * CU-BP-11: Crear elemento de taxonomía curricular
 * Types for curriculum hierarchy: Subject → Unit → Topic
 */

export interface Subject {
  subject_id: string; // UUID
  name: string;
  code: string; // Unique code
  level_fk: string; // References educational level (UUID)
  active: boolean;
  created_at: Date | string;
  created_by: string;
  updated_at: Date | string;
  updated_by: string;
  deleted_at: Date | string | null;
  deleted_by: string | null;
}

export interface Unit {
  unit_id: string; // UUID
  name: string;
  subject_fk: string; // References subject_id (UUID)
  description?: string; // Optional description
  active: boolean;
  created_at: Date | string;
  created_by: string;
  updated_at: Date | string;
  updated_by: string;
  deleted_at: Date | string | null;
  deleted_by: string | null;
}

export interface Topic {
  topic_id: string; // UUID
  name: string;
  unit_fk: string; // References unit_id (UUID)
  description?: string; // Optional description
  active: boolean;
  created_at: Date | string;
  created_by: string;
  updated_at: Date | string;
  updated_by: string;
  deleted_at: Date | string | null;
  deleted_by: string | null;
}

export type CurriculumHierarchyType = 'subject' | 'unit' | 'topic';

export interface CreateSubjectInput {
  name: string;
  code: string;
  levelId: string; // References EducationalLevel
}

export interface CreateUnitInput {
  name: string;
  subject_fk: string;
}

export interface CreateTopicInput {
  name: string;
  unit_fk: string;
}

export type CreateCurriculumHierarchyInput = CreateSubjectInput | CreateUnitInput | CreateTopicInput;

/**
 * CU-BP-12: Editar elemento de taxonomía curricular
 */
export interface UpdateSubjectInput {
  name: string;
  code: string;
  levelId: string; // References EducationalLevel
}

export interface UpdateUnitInput {
  name: string;
  subject_fk: string; // Permite reasignar a otra asignatura
}

export interface UpdateTopicInput {
  name: string;
  unit_fk: string; // Permite reasignar a otra unidad
}

export type UpdateCurriculumHierarchyInput = UpdateSubjectInput | UpdateUnitInput | UpdateTopicInput;

/**
 * CU-BP-13: Eliminar elemento de taxonomía curricular
 */
export interface DeleteImpactAnalysis {
  canDelete: boolean;
  affectedUnits: number;
  affectedTopics: number;
  affectedQuestions: number; // Preparado para futuro
  warnings: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}
