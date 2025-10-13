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
  UpdateSubjectInput,
  UpdateUnitInput,
  UpdateTopicInput,
  DeleteImpactAnalysis,
  ValidationError,
} from '@/types/taxonomy';

// LocalStorage keys
const STORAGE_KEYS = {
  SUBJECTS: 'taxonomy_subjects',
  UNITS: 'taxonomy_units',
  TOPICS: 'taxonomy_topics',
  COUNTERS: 'taxonomy_counters',
};

// Default data for initial load
const DEFAULT_SUBJECTS: Subject[] = [
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

const DEFAULT_UNITS: Unit[] = [
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

const DEFAULT_TOPICS: Topic[] = [
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

// Helper to parse dates when loading from localStorage
function reviveDates<T extends { created_at: Date; updated_at: Date; deleted_at: Date | null }>(obj: Record<string, unknown>): T {
  return {
    ...obj,
    created_at: new Date(obj.created_at as string),
    updated_at: new Date(obj.updated_at as string),
    deleted_at: obj.deleted_at ? new Date(obj.deleted_at as string) : null,
  } as T;
}

// Load data from localStorage or use defaults
function loadFromStorage<T>(key: string, defaults: T[]): T[] {
  if (typeof window === 'undefined') return defaults; // SSR guard
  
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map(reviveDates);
    }
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
  }
  return defaults;
}

// Save data to localStorage
function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return; // SSR guard
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}

// Load counters from localStorage
function loadCounters(): { subject: number; unit: number; topic: number } {
  if (typeof window === 'undefined') return { subject: 3, unit: 3, topic: 3 };
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COUNTERS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading counters from localStorage:', error);
  }
  return { subject: 3, unit: 3, topic: 3 };
}

// Save counters to localStorage
function saveCounters(counters: { subject: number; unit: number; topic: number }): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.COUNTERS, JSON.stringify(counters));
  } catch (error) {
    console.error('Error saving counters to localStorage:', error);
  }
}

// Initialize data from localStorage
const subjects: Subject[] = loadFromStorage(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
const units: Unit[] = loadFromStorage(STORAGE_KEYS.UNITS, DEFAULT_UNITS);
const topics: Topic[] = loadFromStorage(STORAGE_KEYS.TOPICS, DEFAULT_TOPICS);

// Initialize counters
const counters = loadCounters();
let subjectCounter = counters.subject;
let unitCounter = counters.unit;
let topicCounter = counters.topic;

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

/**
 * CU-BP-12: Get individual elements by ID
 */
export function getSubjectById(subjectId: string): Subject | undefined {
  return subjects.find((s) => s.subject_id === subjectId && s.active && !s.deleted_at);
}

export function getUnitById(unitId: string): Unit | undefined {
  return units.find((u) => u.unit_id === unitId && u.active && !u.deleted_at);
}

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((t) => t.topic_id === topicId && t.active && !t.deleted_at);
}

/**
 * Search taxonomy elements by term (searches in subjects, units, and topics)
 * Returns filtered subjects with their matching units and topics
 */
export function searchTaxonomy(searchTerm: string): Subject[] {
  if (!searchTerm || searchTerm.trim() === '') {
    return getAllSubjects();
  }

  const term = searchTerm.toLowerCase().trim();
  const matchedSubjects = new Set<string>();
  const matchedUnits = new Set<string>();
  const matchedTopics = new Set<string>();

  // Search in subjects (name and code)
  subjects.forEach((subject) => {
    if (subject.active && !subject.deleted_at) {
      if (
        subject.name.toLowerCase().includes(term) ||
        subject.code.toLowerCase().includes(term)
      ) {
        matchedSubjects.add(subject.subject_id);
      }
    }
  });

  // Search in units (name)
  units.forEach((unit) => {
    if (unit.active && !unit.deleted_at) {
      if (unit.name.toLowerCase().includes(term)) {
        matchedUnits.add(unit.unit_id);
        matchedSubjects.add(unit.subject_fk); // Include parent subject
      }
    }
  });

  // Search in topics (name)
  topics.forEach((topic) => {
    if (topic.active && !topic.deleted_at) {
      if (topic.name.toLowerCase().includes(term)) {
        matchedTopics.add(topic.topic_id);
        const parentUnit = units.find((u) => u.unit_id === topic.unit_fk);
        if (parentUnit) {
          matchedUnits.add(parentUnit.unit_id);
          matchedSubjects.add(parentUnit.subject_fk); // Include parent subject
        }
      }
    }
  });

  // Return only matched subjects
  return subjects.filter((s) => matchedSubjects.has(s.subject_id) && s.active && !s.deleted_at);
}

/**
 * Get filtered units by subject and search term
 */
export function searchUnitsBySubject(subjectId: string, searchTerm: string): Unit[] {
  const allUnits = getUnitsBySubject(subjectId);
  
  if (!searchTerm || searchTerm.trim() === '') {
    return allUnits;
  }

  const term = searchTerm.toLowerCase().trim();
  const matchedUnits = new Set<string>();

  // Include units that match directly
  allUnits.forEach((unit) => {
    if (unit.name.toLowerCase().includes(term)) {
      matchedUnits.add(unit.unit_id);
    }
  });

  // Include units that have matching topics
  topics.forEach((topic) => {
    if (topic.active && !topic.deleted_at) {
      if (topic.name.toLowerCase().includes(term)) {
        const parentUnit = allUnits.find((u) => u.unit_id === topic.unit_fk);
        if (parentUnit) {
          matchedUnits.add(parentUnit.unit_id);
        }
      }
    }
  });

  return allUnits.filter((u) => matchedUnits.has(u.unit_id));
}

/**
 * Get filtered topics by unit and search term
 */
export function searchTopicsByUnit(unitId: string, searchTerm: string): Topic[] {
  const allTopics = getTopicsByUnit(unitId);
  
  if (!searchTerm || searchTerm.trim() === '') {
    return allTopics;
  }

  const term = searchTerm.toLowerCase().trim();
  return allTopics.filter((topic) => topic.name.toLowerCase().includes(term));
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

/**
 * CU-BP-12: Validation for updating Subject
 * RN-1: Asignaturas deben tener nombres únicos globalmente y códigos únicos.
 * A5: Elemento inactivo no se puede editar
 */
function validateUpdateSubject(subjectId: string, input: UpdateSubjectInput): ValidationError[] {
  const errors: ValidationError[] = [];

  // A5: Elemento inactivo
  const existingSubject = subjects.find((s) => s.subject_id === subjectId);
  if (!existingSubject) {
    errors.push({ field: 'general', message: 'La asignatura no existe.' });
    return errors;
  }
  if (!existingSubject.active || existingSubject.deleted_at) {
    errors.push({ field: 'general', message: 'No se pueden editar elementos inactivos.' });
    return errors;
  }

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.code.trim()) {
    errors.push({ field: 'code', message: 'El código es obligatorio.' });
  }

  // A1: Nombre duplicado (excepto la misma asignatura)
  const nameDuplicate = subjects.find(
    (s) =>
      s.subject_id !== subjectId &&
      s.name.toLowerCase() === input.name.trim().toLowerCase() &&
      s.active &&
      !s.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe otra asignatura con este nombre.' });
  }

  // A2: Código duplicado (excepto la misma asignatura)
  const codeDuplicate = subjects.find(
    (s) =>
      s.subject_id !== subjectId &&
      s.code.toLowerCase() === input.code.trim().toLowerCase() &&
      s.active &&
      !s.deleted_at
  );
  if (codeDuplicate) {
    errors.push({ field: 'code', message: 'Ya existe otra asignatura con este código.' });
  }

  return errors;
}

/**
 * CU-BP-12: Validation for updating Unit
 * RN-2: Unidades deben tener nombres únicos dentro de cada asignatura.
 */
function validateUpdateUnit(unitId: string, input: UpdateUnitInput): ValidationError[] {
  const errors: ValidationError[] = [];

  // A5: Elemento inactivo
  const existingUnit = units.find((u) => u.unit_id === unitId);
  if (!existingUnit) {
    errors.push({ field: 'general', message: 'La unidad no existe.' });
    return errors;
  }
  if (!existingUnit.active || existingUnit.deleted_at) {
    errors.push({ field: 'general', message: 'No se pueden editar elementos inactivos.' });
    return errors;
  }

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.subject_fk.trim()) {
    errors.push({ field: 'subject_fk', message: 'Debe seleccionar una asignatura.' });
  }

  // A3: Elemento padre inexistente o inactivo
  const parentSubject = subjects.find(
    (s) => s.subject_id === input.subject_fk && s.active && !s.deleted_at
  );
  if (!parentSubject) {
    errors.push({ field: 'subject_fk', message: 'La asignatura seleccionada no existe o no está activa.' });
  }

  // A1: Nombre duplicado dentro de la asignatura (excepto la misma unidad)
  const nameDuplicate = units.find(
    (u) =>
      u.unit_id !== unitId &&
      u.subject_fk === input.subject_fk &&
      u.name.toLowerCase() === input.name.trim().toLowerCase() &&
      u.active &&
      !u.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe otra unidad con este nombre en la asignatura seleccionada.' });
  }

  return errors;
}

/**
 * CU-BP-12: Validation for updating Topic
 * RN-3: Temas deben tener nombres únicos dentro de cada unidad.
 */
function validateUpdateTopic(topicId: string, input: UpdateTopicInput): ValidationError[] {
  const errors: ValidationError[] = [];

  // A5: Elemento inactivo
  const existingTopic = topics.find((t) => t.topic_id === topicId);
  if (!existingTopic) {
    errors.push({ field: 'general', message: 'El tema no existe.' });
    return errors;
  }
  if (!existingTopic.active || existingTopic.deleted_at) {
    errors.push({ field: 'general', message: 'No se pueden editar elementos inactivos.' });
    return errors;
  }

  if (!input.name.trim()) {
    errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
  }

  if (!input.unit_fk.trim()) {
    errors.push({ field: 'unit_fk', message: 'Debe seleccionar una unidad.' });
  }

  // A3: Elemento padre inexistente o inactivo
  const parentUnit = units.find((u) => u.unit_id === input.unit_fk && u.active && !u.deleted_at);
  if (!parentUnit) {
    errors.push({ field: 'unit_fk', message: 'La unidad seleccionada no existe o no está activa.' });
  }

  // A1: Nombre duplicado dentro de la unidad (excepto el mismo tema)
  const nameDuplicate = topics.find(
    (t) =>
      t.topic_id !== topicId &&
      t.unit_fk === input.unit_fk &&
      t.name.toLowerCase() === input.name.trim().toLowerCase() &&
      t.active &&
      !t.deleted_at
  );
  if (nameDuplicate) {
    errors.push({ field: 'name', message: 'Ya existe otro tema con este nombre en la unidad seleccionada.' });
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
  saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
  saveCounters({ subject: subjectCounter, unit: unitCounter, topic: topicCounter });
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
  saveToStorage(STORAGE_KEYS.UNITS, units);
  saveCounters({ subject: subjectCounter, unit: unitCounter, topic: topicCounter });
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
  saveToStorage(STORAGE_KEYS.TOPICS, topics);
  saveCounters({ subject: subjectCounter, unit: unitCounter, topic: topicCounter });
  return { success: true, data: newTopic };
}

/**
 * CU-BP-12: Update existing Subject (Asignatura)
 * RN-4: Las modificaciones deben quedar registradas en auditoría
 */
export function updateSubject(
  subjectId: string,
  input: UpdateSubjectInput,
  userId: string
): { success: boolean; data?: Subject; errors?: ValidationError[] } {
  const errors = validateUpdateSubject(subjectId, input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const subjectIndex = subjects.findIndex((s) => s.subject_id === subjectId);
  if (subjectIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Asignatura no encontrada.' }] };
  }

  const now = new Date();
  const updatedSubject: Subject = {
    ...subjects[subjectIndex],
    name: input.name.trim(),
    code: input.code.trim().toUpperCase(),
    updated_at: now,
    updated_by: userId,
  };

  subjects[subjectIndex] = updatedSubject;
  saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
  return { success: true, data: updatedSubject };
}

/**
 * CU-BP-12: Update existing Unit (Unidad)
 * RN-4: Las modificaciones deben quedar registradas en auditoría
 * RN-5: Al reasignar jerárquicamente, todos los elementos hijos se mantienen asociados
 */
export function updateUnit(
  unitId: string,
  input: UpdateUnitInput,
  userId: string
): { success: boolean; data?: Unit; errors?: ValidationError[] } {
  const errors = validateUpdateUnit(unitId, input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const unitIndex = units.findIndex((u) => u.unit_id === unitId);
  if (unitIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Unidad no encontrada.' }] };
  }

  const now = new Date();
  const updatedUnit: Unit = {
    ...units[unitIndex],
    name: input.name.trim(),
    subject_fk: input.subject_fk,
    updated_at: now,
    updated_by: userId,
  };

  units[unitIndex] = updatedUnit;
  saveToStorage(STORAGE_KEYS.UNITS, units);
  
  // RN-5: Los temas (hijos) mantienen su relación con la unidad automáticamente
  return { success: true, data: updatedUnit };
}

/**
 * CU-BP-12: Update existing Topic (Tema)
 * RN-4: Las modificaciones deben quedar registradas en auditoría
 * RN-6: Las preguntas asociadas mantienen su clasificación actualizada automáticamente
 */
export function updateTopic(
  topicId: string,
  input: UpdateTopicInput,
  userId: string
): { success: boolean; data?: Topic; errors?: ValidationError[] } {
  const errors = validateUpdateTopic(topicId, input);
  if (errors.length > 0) {
    return { success: false, errors };
  }

  const topicIndex = topics.findIndex((t) => t.topic_id === topicId);
  if (topicIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Tema no encontrado.' }] };
  }

  const now = new Date();
  const updatedTopic: Topic = {
    ...topics[topicIndex],
    name: input.name.trim(),
    unit_fk: input.unit_fk,
    updated_at: now,
    updated_by: userId,
  };

  topics[topicIndex] = updatedTopic;
  saveToStorage(STORAGE_KEYS.TOPICS, topics);
  
  // RN-6: Las preguntas asociadas mantienen su clasificación actualizada
  // (Esto se implementará cuando tengamos el módulo de preguntas)
  return { success: true, data: updatedTopic };
}

/**
 * CU-BP-13: Analyze impact of deleting a Subject
 * Returns information about affected units, topics, and questions (future)
 */
export function analyzeSubjectDeleteImpact(subjectId: string): DeleteImpactAnalysis {
  const subject = subjects.find((s) => s.subject_id === subjectId);
  
  if (!subject) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['La asignatura no existe.'],
    };
  }

  if (!subject.active || subject.deleted_at) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['La asignatura ya está eliminada.'],
    };
  }

  // Count affected units (active ones)
  const affectedUnits = units.filter((u) => u.subject_fk === subjectId && u.active && !u.deleted_at);
  
  // Count affected topics (through affected units)
  const affectedUnitIds = affectedUnits.map((u) => u.unit_id);
  const affectedTopics = topics.filter(
    (t) => affectedUnitIds.includes(t.unit_fk) && t.active && !t.deleted_at
  );

  const warnings: string[] = [];
  if (affectedUnits.length > 0) {
    warnings.push(`Se inactivarán ${affectedUnits.length} unidad(es) asociada(s).`);
  }
  if (affectedTopics.length > 0) {
    warnings.push(`Se inactivarán ${affectedTopics.length} tema(s) asociado(s).`);
  }
  // RN-5: Future - questions will maintain reference but won't be accessible for new classifications
  warnings.push('Las preguntas asociadas mantendrán su clasificación histórica pero no podrán clasificarse nuevas preguntas.');

  return {
    canDelete: true, // RN-1: Always logical deletion
    affectedUnits: affectedUnits.length,
    affectedTopics: affectedTopics.length,
    affectedQuestions: 0, // Placeholder for future implementation
    warnings,
  };
}

/**
 * CU-BP-13: Analyze impact of deleting a Unit
 */
export function analyzeUnitDeleteImpact(unitId: string): DeleteImpactAnalysis {
  const unit = units.find((u) => u.unit_id === unitId);
  
  if (!unit) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['La unidad no existe.'],
    };
  }

  if (!unit.active || unit.deleted_at) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['La unidad ya está eliminada.'],
    };
  }

  // Count affected topics
  const affectedTopics = topics.filter((t) => t.unit_fk === unitId && t.active && !t.deleted_at);

  const warnings: string[] = [];
  if (affectedTopics.length > 0) {
    warnings.push(`Se inactivarán ${affectedTopics.length} tema(s) asociado(s).`);
  }
  warnings.push('Las preguntas asociadas mantendrán su clasificación histórica pero no podrán clasificarse nuevas preguntas.');

  return {
    canDelete: true,
    affectedUnits: 0,
    affectedTopics: affectedTopics.length,
    affectedQuestions: 0, // Placeholder
    warnings,
  };
}

/**
 * CU-BP-13: Analyze impact of deleting a Topic
 */
export function analyzeTopicDeleteImpact(topicId: string): DeleteImpactAnalysis {
  const topic = topics.find((t) => t.topic_id === topicId);
  
  if (!topic) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['El tema no existe.'],
    };
  }

  if (!topic.active || topic.deleted_at) {
    return {
      canDelete: false,
      affectedUnits: 0,
      affectedTopics: 0,
      affectedQuestions: 0,
      warnings: ['El tema ya está eliminado.'],
    };
  }

  const warnings: string[] = [
    'Las preguntas asociadas mantendrán su clasificación histórica pero no podrán clasificarse nuevas preguntas con este tema.',
  ];

  return {
    canDelete: true,
    affectedUnits: 0,
    affectedTopics: 0,
    affectedQuestions: 0, // Placeholder
    warnings,
  };
}

/**
 * CU-BP-13: Delete Subject with cascade (logical deletion)
 * RN-2: Always logical deletion (active = FALSE, deleted_at, deleted_by)
 * RN-3: Cascade to units and topics
 * RN-6: Register audit with user
 */
export function deleteSubject(
  subjectId: string,
  userId: string
): { success: boolean; errors?: ValidationError[] } {
  const analysis = analyzeSubjectDeleteImpact(subjectId);
  
  if (!analysis.canDelete) {
    return { success: false, errors: [{ field: 'general', message: analysis.warnings.join(' ') }] };
  }

  const subjectIndex = subjects.findIndex((s) => s.subject_id === subjectId);
  if (subjectIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Asignatura no encontrada.' }] };
  }

  const now = new Date();

  // Mark subject as inactive (logical deletion)
  subjects[subjectIndex] = {
    ...subjects[subjectIndex],
    active: false,
    deleted_at: now,
    deleted_by: userId,
    updated_at: now,
    updated_by: userId,
  };

  // RN-3: Cascade - mark all units of this subject as inactive
  units.forEach((unit, index) => {
    if (unit.subject_fk === subjectId && unit.active && !unit.deleted_at) {
      units[index] = {
        ...unit,
        active: false,
        deleted_at: now,
        deleted_by: userId,
        updated_at: now,
        updated_by: userId,
      };

      // RN-3: Cascade - mark all topics of this unit as inactive
      topics.forEach((topic, topicIndex) => {
        if (topic.unit_fk === unit.unit_id && topic.active && !topic.deleted_at) {
          topics[topicIndex] = {
            ...topic,
            active: false,
            deleted_at: now,
            deleted_by: userId,
            updated_at: now,
            updated_by: userId,
          };
        }
      });
    }
  });

  // Save changes
  saveToStorage(STORAGE_KEYS.SUBJECTS, subjects);
  saveToStorage(STORAGE_KEYS.UNITS, units);
  saveToStorage(STORAGE_KEYS.TOPICS, topics);

  return { success: true };
}

/**
 * CU-BP-13: Delete Unit with cascade (logical deletion)
 * RN-4: Cascade to topics
 */
export function deleteUnit(
  unitId: string,
  userId: string
): { success: boolean; errors?: ValidationError[] } {
  const analysis = analyzeUnitDeleteImpact(unitId);
  
  if (!analysis.canDelete) {
    return { success: false, errors: [{ field: 'general', message: analysis.warnings.join(' ') }] };
  }

  const unitIndex = units.findIndex((u) => u.unit_id === unitId);
  if (unitIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Unidad no encontrada.' }] };
  }

  const now = new Date();

  // Mark unit as inactive
  units[unitIndex] = {
    ...units[unitIndex],
    active: false,
    deleted_at: now,
    deleted_by: userId,
    updated_at: now,
    updated_by: userId,
  };

  // RN-4: Cascade - mark all topics of this unit as inactive
  topics.forEach((topic, index) => {
    if (topic.unit_fk === unitId && topic.active && !topic.deleted_at) {
      topics[index] = {
        ...topic,
        active: false,
        deleted_at: now,
        deleted_by: userId,
        updated_at: now,
        updated_by: userId,
      };
    }
  });

  // Save changes
  saveToStorage(STORAGE_KEYS.UNITS, units);
  saveToStorage(STORAGE_KEYS.TOPICS, topics);

  return { success: true };
}

/**
 * CU-BP-13: Delete Topic (logical deletion)
 * RN-5: Questions maintain reference but can't classify new questions
 */
export function deleteTopic(
  topicId: string,
  userId: string
): { success: boolean; errors?: ValidationError[] } {
  const analysis = analyzeTopicDeleteImpact(topicId);
  
  if (!analysis.canDelete) {
    return { success: false, errors: [{ field: 'general', message: analysis.warnings.join(' ') }] };
  }

  const topicIndex = topics.findIndex((t) => t.topic_id === topicId);
  if (topicIndex === -1) {
    return { success: false, errors: [{ field: 'general', message: 'Tema no encontrado.' }] };
  }

  const now = new Date();

  // Mark topic as inactive
  topics[topicIndex] = {
    ...topics[topicIndex],
    active: false,
    deleted_at: now,
    deleted_by: userId,
    updated_at: now,
    updated_by: userId,
  };

  // Save changes
  saveToStorage(STORAGE_KEYS.TOPICS, topics);

  return { success: true };
}

/**
 * Clear all taxonomy data from localStorage (for testing/reset)
 */
export function clearAllTaxonomyData(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
  localStorage.removeItem(STORAGE_KEYS.UNITS);
  localStorage.removeItem(STORAGE_KEYS.TOPICS);
  localStorage.removeItem(STORAGE_KEYS.COUNTERS);
  
  // Reload the page to reinitialize with defaults
  window.location.reload();
}
