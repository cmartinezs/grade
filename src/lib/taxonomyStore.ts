/**
 * CU-BP-11: Mock data store for curriculum taxonomy
 * Dummy implementation with in-memory storage and validation
 */

import {
  Subject,
  Unit,
  Topic,
  CreateSubjectInput,
  CreateUnitInput,
  CreateTopicInput,
  ValidationError,
} from '@/types/taxonomy';

// Mock data storage (in-memory)
const subjects: Subject[] = [
  {
    subject_id: 'sub-1',
    name: 'Matemáticas',
    code: 'MAT-101',
    active: true,
    created_at: new Date('2025-01-15'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-15'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
  {
    subject_id: 'sub-2',
    name: 'Lenguaje y Comunicación',
    code: 'LEN-101',
    active: true,
    created_at: new Date('2025-01-16'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-16'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
];

const units: Unit[] = [
  {
    unit_id: 'unit-1',
    name: 'Álgebra Básica',
    subject_fk: 'sub-1',
    active: true,
    created_at: new Date('2025-01-17'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-17'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
  {
    unit_id: 'unit-2',
    name: 'Geometría',
    subject_fk: 'sub-1',
    active: true,
    created_at: new Date('2025-01-18'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-18'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
];

const topics: Topic[] = [
  {
    topic_id: 'topic-1',
    name: 'Ecuaciones lineales',
    unit_fk: 'unit-1',
    active: true,
    created_at: new Date('2025-01-19'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-19'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
  {
    topic_id: 'topic-2',
    name: 'Sistemas de ecuaciones',
    unit_fk: 'unit-1',
    active: true,
    created_at: new Date('2025-01-20'),
    created_by: 'admin@example.com',
    updated_at: new Date('2025-01-20'),
    updated_by: 'admin@example.com',
    deleted_at: null,
    deleted_by: null,
  },
];

// ID generators
let subjectCounter = 3;
let unitCounter = 3;
let topicCounter = 3;

// ===== GETTERS =====

export function getAllSubjects(): Subject[] {
  return subjects.filter((s) => s.active && !s.deleted_at);
}

export function getAllUnits(): Unit[] {
  return units.filter((u) => u.active && !u.deleted_at);
}

export function getAllTopics(): Topic[] {
  return topics.filter((t) => t.active && !t.deleted_at);
}

export function getUnitsBySubject(subjectId: string): Unit[] {
  return units.filter((u) => u.subject_fk === subjectId && u.active && !u.deleted_at);
}

export function getTopicsByUnit(unitId: string): Topic[] {
  return topics.filter((t) => t.unit_fk === unitId && t.active && !t.deleted_at);
}

// ===== VALIDATIONS (Business Rules) =====

/**
 * RN-1: Asignaturas deben tener nombres únicos globalmente y códigos únicos.
 */
function validateSubject(input: CreateSubjectInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.code.trim()) {
    errors.push({ field: 'code', message: 'El código es obligatorio.' });
  }

  // A1: Nombre duplicado
  const nameDuplicate = subjects.find(
    (s) => s.name.toLowerCase() === input.name.trim().toLowerCase() && s.active && !s.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe una asignatura con este nombre.' });
  }

  // A2: Código duplicado
  const codeDuplicate = subjects.find(
    (s) => s.code.toLowerCase() === input.code.trim().toLowerCase() && s.active && !s.deleted_at
  );
  if (codeDuplicate) {
    errors.push({ field: 'code', message: 'Ya existe una asignatura con este código.' });
  }

  return errors;
}

/**
 * RN-2: Unidades deben tener nombres únicos dentro de cada asignatura.
 */
function validateUnit(input: CreateUnitInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.subject_fk.trim()) {
    errors.push({ field: 'subject_fk', message: 'Debe seleccionar una asignatura.' });
  }

  // A3: Elemento padre inexistente
  const parentSubject = subjects.find(
    (s) => s.subject_id === input.subject_fk && s.active && !s.deleted_at
  );
  if (!parentSubject) {
    errors.push({ field: 'subject_fk', message: 'La asignatura seleccionada no existe o no está activa.' });
  }

  // A1: Nombre duplicado dentro de la asignatura
  const nameDuplicate = units.find(
    (u) =>
      u.subject_fk === input.subject_fk &&
      u.name.toLowerCase() === input.name.trim().toLowerCase() &&
      u.active &&
      !u.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe una unidad con este nombre en la asignatura seleccionada.' });
  }

  return errors;
}

/**
 * RN-3: Temas deben tener nombres únicos dentro de cada unidad.
 */
function validateTopic(input: CreateTopicInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.unit_fk.trim()) {
    errors.push({ field: 'unit_fk', message: 'Debe seleccionar una unidad.' });
  }

  // A3: Elemento padre inexistente
  const parentUnit = units.find((u) => u.unit_id === input.unit_fk && u.active && !u.deleted_at);
  if (!parentUnit) {
    errors.push({ field: 'unit_fk', message: 'La unidad seleccionada no existe o no está activa.' });
  }

  // A1: Nombre duplicado dentro de la unidad
  const nameDuplicate = topics.find(
    (t) =>
      t.unit_fk === input.unit_fk &&
      t.name.toLowerCase() === input.name.trim().toLowerCase() &&
      t.active &&
      !t.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe un tema con este nombre en la unidad seleccionada.' });
  }

  return errors;
}

// ===== CRUD OPERATIONS =====

/**
 * Create new Subject (Asignatura)
 */
export function createSubject(input: CreateSubjectInput, userId: string): { success: boolean; data?: Subject; errors?: ValidationError[] } {
  const errors = validateSubject(input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const now = new Date();
  const newSubject: Subject = {
    subject_id: `sub-${subjectCounter++}`,
    name: input.name.trim(),
    code: input.code.trim().toUpperCase(),
    active: true, // RN-4
    created_at: now,
    created_by: userId,
    updated_at: now,
    updated_by: userId,
    deleted_at: null,
    deleted_by: null,
  };

  subjects.push(newSubject);
  return { success: true, data: newSubject };
}

/**
 * Create new Unit (Unidad)
 */
export function createUnit(input: CreateUnitInput, userId: string): { success: boolean; data?: Unit; errors?: ValidationError[] } {
  const errors = validateUnit(input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const now = new Date();
  const newUnit: Unit = {
    unit_id: `unit-${unitCounter++}`,
    name: input.name.trim(),
    subject_fk: input.subject_fk,
    active: true, // RN-4
    created_at: now,
    created_by: userId,
    updated_at: now,
    updated_by: userId,
    deleted_at: null,
    deleted_by: null,
  };

  units.push(newUnit);
  return { success: true, data: newUnit };
}

/**
 * Create new Topic (Tema)
 */
export function createTopic(input: CreateTopicInput, userId: string): { success: boolean; data?: Topic; errors?: ValidationError[] } {
  const errors = validateTopic(input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const now = new Date();
  const newTopic: Topic = {
    topic_id: `topic-${topicCounter++}`,
    name: input.name.trim(),
    unit_fk: input.unit_fk,
    active: true, // RN-4
    created_at: now,
    created_by: userId,
    updated_at: now,
    updated_by: userId,
    deleted_at: null,
    deleted_by: null,
  };

  topics.push(newTopic);
  return { success: true, data: newTopic };
}
