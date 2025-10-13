/**
 * CU-BP-11: Crear elemento de taxonomía curricular
 * Types for curriculum taxonomy hierarchy: Subject → Unit → Topic
 */

export interface Subject {
  subject_id: string;
  name: string;
  code: string; // Unique code
  active: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}

export interface Unit {
  unit_id: string;
  name: string;
  subject_fk: string; // References subject_id
  active: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}

export interface Topic {
  topic_id: string;
  name: string;
  unit_fk: string; // References unit_id
  active: boolean;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}

export type TaxonomyType = 'subject' | 'unit' | 'topic';

export interface CreateSubjectInput {
  name: string;
  code: string;
}

export interface CreateUnitInput {
  name: string;
  subject_fk: string;
}

export interface CreateTopicInput {
  name: string;
  unit_fk: string;
}

export type CreateTaxonomyInput = CreateSubjectInput | CreateUnitInput | CreateTopicInput;

/**
 * CU-BP-12: Editar elemento de taxonomía curricular
 */
export interface UpdateSubjectInput {
  name: string;
  code: string;
}

export interface UpdateUnitInput {
  name: string;
  subject_fk: string; // Permite reasignar a otra asignatura
}

export interface UpdateTopicInput {
  name: string;
  unit_fk: string; // Permite reasignar a otra unidad
}

export type UpdateTaxonomyInput = UpdateSubjectInput | UpdateUnitInput | UpdateTopicInput;

export interface ValidationError {
  field: string;
  message: string;
}
