/**
 * CU-GE-01: Crear curso
 * Types for course management
 */

// Course entity
export interface Course {
  course_id: string;
  name: string;
  code: string; // RN-1: Must be unique
  level: string; // e.g., "1° Básico", "2° Medio", etc.
  institution: string; // Educational institution
  active: boolean; // RN-2: Default true
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}

// Input types for creating course
export interface CreateCourseInput {
  name: string;
  code: string;
  level: string;
  institution: string;
  active?: boolean; // Optional, defaults to true per RN-2
}

// Input types for editing course (CU-GE-02)
export interface EditCourseInput {
  name: string;
  code: string;
  level: string;
  institution: string;
  active: boolean;
}

// Validation error type
export interface CourseValidationError {
  field: string;
  message: string;
}
