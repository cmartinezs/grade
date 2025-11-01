/**
 * Educational Levels Management
 * Types for managing educational levels (Niveles Educacionales)
 */

export interface EducationalLevel {
  id: string;
  name: string; // e.g., "1° Básico", "2° Medio", etc.
  code: string; // e.g., "LEVEL_1B", "LEVEL_1M", etc.
  description: string;
  courseCount?: number; // Number of courses at this level
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLevelInput {
  name: string;
  code: string;
  description: string;
  isActive?: boolean;
}

export interface EditLevelInput {
  name: string;
  code: string;
  description: string;
  isActive: boolean;
}

// Predefined educational levels in Chile
export const CHILEAN_EDUCATION_LEVELS = [
  // Enseñanza Básica
  { name: '1° Básico', code: 'LEVEL_1B', category: 'Enseñanza Básica' },
  { name: '2° Básico', code: 'LEVEL_2B', category: 'Enseñanza Básica' },
  { name: '3° Básico', code: 'LEVEL_3B', category: 'Enseñanza Básica' },
  { name: '4° Básico', code: 'LEVEL_4B', category: 'Enseñanza Básica' },
  { name: '5° Básico', code: 'LEVEL_5B', category: 'Enseñanza Básica' },
  { name: '6° Básico', code: 'LEVEL_6B', category: 'Enseñanza Básica' },
  { name: '7° Básico', code: 'LEVEL_7B', category: 'Enseñanza Básica' },
  { name: '8° Básico', code: 'LEVEL_8B', category: 'Enseñanza Básica' },

  // Enseñanza Media
  { name: '1° Medio', code: 'LEVEL_1M', category: 'Enseñanza Media' },
  { name: '2° Medio', code: 'LEVEL_2M', category: 'Enseñanza Media' },
  { name: '3° Medio', code: 'LEVEL_3M', category: 'Enseñanza Media' },
  { name: '4° Medio', code: 'LEVEL_4M', category: 'Enseñanza Media' },
];
