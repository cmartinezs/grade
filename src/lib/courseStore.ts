/**
 * CU-GE-01: Crear curso
 * CU-GE-02: Editar curso
 * Course management store
 */

import { Course, CreateCourseInput, EditCourseInput, CourseValidationError } from '@/types/course';

const COURSES_STORAGE_KEY = 'evaluation_management_courses';
const COURSE_COUNTER_KEY = 'evaluation_management_course_counter';

// Default courses for initialization
const DEFAULT_COURSES: Omit<Course, 'course_id' | 'created_at' | 'created_by' | 'updated_at' | 'updated_by' | 'deleted_at' | 'deleted_by'>[] = [
  // Enseñanza Básica
  { name: '1° Básico A', code: '1B-A', levelId: 'level-1b-001', institution: 'Colegio Ejemplo', active: true },
  { name: '1° Básico B', code: '1B-B', levelId: 'level-1b-001', institution: 'Colegio Ejemplo', active: true },
  { name: '2° Básico A', code: '2B-A', levelId: 'level-2b-002', institution: 'Colegio Ejemplo', active: true },
  { name: '3° Básico A', code: '3B-A', levelId: 'level-3b-003', institution: 'Colegio Ejemplo', active: true },
  { name: '4° Básico A', code: '4B-A', levelId: 'level-4b-004', institution: 'Colegio Ejemplo', active: true },
  { name: '5° Básico A', code: '5B-A', levelId: 'level-5b-005', institution: 'Colegio Ejemplo', active: true },
  { name: '5° Básico B', code: '5B-B', levelId: 'level-5b-005', institution: 'Colegio Ejemplo', active: true },
  { name: '6° Básico A', code: '6B-A', levelId: 'level-6b-006', institution: 'Colegio Ejemplo', active: true },
  { name: '7° Básico A', code: '7B-A', levelId: 'level-7b-007', institution: 'Colegio Ejemplo', active: true },
  { name: '8° Básico A', code: '8B-A', levelId: 'level-8b-008', institution: 'Colegio Ejemplo', active: true },
  
  // Enseñanza Media
  { name: '1° Medio A', code: '1M-A', levelId: 'level-1m-009', institution: 'Colegio Ejemplo', active: true },
  { name: '1° Medio B', code: '1M-B', levelId: 'level-1m-009', institution: 'Colegio Ejemplo', active: true },
  { name: '2° Medio A', code: '2M-A', levelId: 'level-2m-010', institution: 'Colegio Ejemplo', active: true },
  { name: '3° Medio A', code: '3M-A', levelId: 'level-3m-011', institution: 'Colegio Ejemplo', active: true },
  { name: '4° Medio A', code: '4M-A', levelId: 'level-4m-012', institution: 'Colegio Ejemplo', active: true },
];

class CourseStore {
  // Initialize with default courses if empty
  private initializeDefaultCourses(): void {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(COURSES_STORAGE_KEY);
    if (stored) return; // Already initialized
    
    // DESHABILITADO: No cargar automáticamente
    // Los datos deben cargarse desde Data-Connect o mediante carga manual desde JSON
    // const currentDate = new Date();
    // const systemUser = 'system';
    // 
    // const courses: Course[] = DEFAULT_COURSES.map((course, index) => ({
    //   ...course,
    //   course_id: `c-${index + 1}`,
    //   created_at: currentDate,
    //   created_by: systemUser,
    //   updated_at: currentDate,
    //   updated_by: systemUser,
    //   deleted_at: null,
    //   deleted_by: null,
    // }));
    // 
    // localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    // localStorage.setItem(COURSE_COUNTER_KEY, DEFAULT_COURSES.length.toString());
    // 
    // console.log(`[CURSO] ${DEFAULT_COURSES.length} cursos de base inicializados`);
  }

  // Load courses from localStorage
  private loadCourses(): Course[] {
    if (typeof window === 'undefined') return [];
    
    // DESHABILITADO: Initialize default courses if needed
    // this.initializeDefaultCourses();
    
    const stored = localStorage.getItem(COURSES_STORAGE_KEY);
    if (!stored) return [];
    
    const courses = JSON.parse(stored);
    return courses.map((c: Course) => ({
      ...c,
      created_at: c.created_at ? new Date(c.created_at) : new Date(),
      updated_at: c.updated_at ? new Date(c.updated_at) : new Date(),
      deleted_at: c.deleted_at ? new Date(c.deleted_at) : null,
    }));
  }

  // Clear all courses (for cleanup/migration)
  public clearAllCourses(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(COURSES_STORAGE_KEY);
    localStorage.removeItem(COURSE_COUNTER_KEY);
  }
  // Save courses to localStorage
  private saveCourses(courses: Course[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  }

  // Get next course ID
  private getNextCourseId(): string {
    if (typeof window === 'undefined') return 'c-1';
    
    const counter = parseInt(localStorage.getItem(COURSE_COUNTER_KEY) || '0', 10);
    const nextCounter = counter + 1;
    localStorage.setItem(COURSE_COUNTER_KEY, nextCounter.toString());
    return `c-${nextCounter}`;
  }

  // Validate course input (CU-GE-01: A2 - Datos incompletos)
  private validateCourseInput(input: CreateCourseInput, existingCourses: Course[]): CourseValidationError[] {
    const errors: CourseValidationError[] = [];

    // Validate required fields
    if (!input.name || input.name.trim() === '') {
      errors.push({
        field: 'name',
        message: 'El nombre del curso es obligatorio'
      });
    }

    if (!input.code || input.code.trim() === '') {
      errors.push({
        field: 'code',
        message: 'El código del curso es obligatorio'
      });
    }

    if (!input.levelId || input.levelId.trim() === '') {
      errors.push({
        field: 'levelId',
        message: 'El nivel del curso es obligatorio'
      });
    }

    if (!input.institution || input.institution.trim() === '') {
      errors.push({
        field: 'institution',
        message: 'La institución es obligatoria'
      });
    }

    // RN-1: Validate unique code (CU-GE-01: A1 - Curso duplicado)
    if (input.code) {
      const normalizedCode = input.code.trim().toUpperCase();
      const duplicate = existingCourses.find(
        c => !c.deleted_at && c.code.toUpperCase() === normalizedCode
      );
      
      if (duplicate) {
        errors.push({
          field: 'code',
          message: `Ya existe un curso con el código "${input.code}"`
        });
      }
    }

    return errors;
  }

  // Create a new course (CU-GE-01)
  async createCourse(input: CreateCourseInput, currentUser: string): Promise<Course> {
    const courses = this.loadCourses();

    // Validate input
    const validationErrors = this.validateCourseInput(input, courses);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(e => `${e.field}: ${e.message}`).join(', ');
      throw new Error(`Validation errors: ${errorMessages}`);
    }

    // RN-2: Default active state is true
    const active = input.active !== undefined ? input.active : true;

    // Create course
    const newCourse: Course = {
      course_id: this.getNextCourseId(),
      name: input.name.trim(),
      code: input.code.trim().toUpperCase(),
      levelId: input.levelId,
      institution: input.institution.trim(),
      active,
      created_at: new Date(),
      created_by: currentUser,
      updated_at: new Date(),
      updated_by: currentUser,
      deleted_at: null,
      deleted_by: null,
    };

    courses.push(newCourse);
    this.saveCourses(courses);

    console.log(`[CURSO] Curso ${newCourse.course_id} creado por ${currentUser}`);

    return newCourse;
  }

  // Get all courses
  getCourses(includeInactive = true, includeDeleted = false): Course[] {
    const courses = this.loadCourses();
    
    return courses.filter(c => {
      if (!includeDeleted && c.deleted_at) return false;
      if (!includeInactive && !c.active) return false;
      return true;
    });
  }

  // Get course by ID
  getCourse(courseId: string): Course | null {
    const courses = this.loadCourses();
    return courses.find(c => c.course_id === courseId && !c.deleted_at) || null;
  }

  // Check if code exists (for validation)
  codeExists(code: string, excludeCourseId?: string): boolean {
    const courses = this.loadCourses();
    const normalizedCode = code.trim().toUpperCase();
    
    return courses.some(c => 
      !c.deleted_at && 
      c.code.toUpperCase() === normalizedCode &&
      c.course_id !== excludeCourseId
    );
  }

  // Update course (CU-GE-02)
  async updateCourse(
    courseId: string,
    input: EditCourseInput,
    currentUser: string
  ): Promise<Course> {
    const courses = this.loadCourses();
    const courseIndex = courses.findIndex(c => c.course_id === courseId && !c.deleted_at);

    // A1: Curso inexistente
    if (courseIndex === -1) {
      throw new Error('El curso no existe o ha sido eliminado');
    }

    const existingCourse = courses[courseIndex];

    // Validate input (A2: Datos inválidos)
    const validationErrors = this.validateEditCourseInput(input, courses, courseId);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(e => `${e.field}: ${e.message}`).join(', ');
      throw new Error(`Validation errors: ${errorMessages}`);
    }

    // RN-1: No se puede cambiar el código si tiene evaluaciones asociadas
    // TODO: Cuando se implemente el módulo de evaluaciones, validar aquí
    // Por ahora permitimos cambiar el código con advertencia en el log
    if (existingCourse.code !== input.code.trim().toUpperCase()) {
      console.warn(`[CURSO] Cambiando código del curso ${courseId}: ${existingCourse.code} -> ${input.code}`);
      // En el futuro: if (hasAssociatedEvaluations(courseId)) throw new Error(...)
    }

    // RN-2: Registrar en historial de auditoría
    const updatedCourse: Course = {
      ...existingCourse,
      name: input.name.trim(),
      code: input.code.trim().toUpperCase(),
      levelId: input.levelId,
      institution: input.institution.trim(),
      active: input.active,
      updated_at: new Date(),
      updated_by: currentUser,
    };

    courses[courseIndex] = updatedCourse;
    this.saveCourses(courses);

    console.log(`[CURSO] Curso ${courseId} editado por ${currentUser}`, {
      changes: {
        name: existingCourse.name !== updatedCourse.name ? `${existingCourse.name} -> ${updatedCourse.name}` : null,
        code: existingCourse.code !== updatedCourse.code ? `${existingCourse.code} -> ${updatedCourse.code}` : null,
        levelId: existingCourse.levelId !== updatedCourse.levelId ? `${existingCourse.levelId} -> ${updatedCourse.levelId}` : null,
        institution: existingCourse.institution !== updatedCourse.institution ? `${existingCourse.institution} -> ${updatedCourse.institution}` : null,
        active: existingCourse.active !== updatedCourse.active ? `${existingCourse.active} -> ${updatedCourse.active}` : null,
      }
    });

    return updatedCourse;
  }

  // Validate edit course input (CU-GE-02: A2 - Datos inválidos)
  private validateEditCourseInput(
    input: EditCourseInput,
    existingCourses: Course[],
    courseId: string
  ): CourseValidationError[] {
    const errors: CourseValidationError[] = [];

    // Validate required fields
    if (!input.name || input.name.trim() === '') {
      errors.push({
        field: 'name',
        message: 'El nombre del curso es obligatorio'
      });
    }

    if (!input.code || input.code.trim() === '') {
      errors.push({
        field: 'code',
        message: 'El código del curso es obligatorio'
      });
    }

    if (!input.levelId || input.levelId.trim() === '') {
      errors.push({
        field: 'levelId',
        message: 'El nivel del curso es obligatorio'
      });
    }

    if (!input.institution || input.institution.trim() === '') {
      errors.push({
        field: 'institution',
        message: 'La institución es obligatoria'
      });
    }

    // Validate unique code (excluding current course)
    if (input.code) {
      const normalizedCode = input.code.trim().toUpperCase();
      const duplicate = existingCourses.find(
        c => !c.deleted_at && 
        c.code.toUpperCase() === normalizedCode &&
        c.course_id !== courseId
      );
      
      if (duplicate) {
        errors.push({
          field: 'code',
          message: `Ya existe otro curso con el código "${input.code}"`
        });
      }
    }

    return errors;
  }

  // Get paginated courses with filters
  getPaginatedCourses(
    page: number,
    pageSize: number,
    filters: {
      searchText?: string;
      level?: string;
      institution?: string;
      includeInactive?: boolean;
    } = {}
  ): {
    courses: Course[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } {
    let courses = this.loadCourses();

    // Apply filters
    const { searchText, level, institution, includeInactive = true } = filters;

    // Filter by deleted
    courses = courses.filter(c => !c.deleted_at);

    // Filter by active/inactive
    if (!includeInactive) {
      courses = courses.filter(c => c.active);
    }

    // Filter by search text
    if (searchText && searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      courses = courses.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        c.code.toLowerCase().includes(searchLower) ||
        c.institution.toLowerCase().includes(searchLower)
      );
    }

    // Filter by level
    if (level) {
      courses = courses.filter(c => c.levelId === level);
    }

    // Filter by institution
    if (institution) {
      courses = courses.filter(c => c.institution === institution);
    }

    // Sort by level ID and name (lexicographic sort)
    courses.sort((a, b) => {
      if (a.levelId !== b.levelId) return a.levelId.localeCompare(b.levelId);
      return a.name.localeCompare(b.name);
    });

    // Get total before pagination
    const total = courses.length;
    const totalPages = Math.ceil(total / pageSize);

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCourses = courses.slice(startIndex, endIndex);

    return {
      courses: paginatedCourses,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  // Get unique institutions (for filter dropdown)
  getInstitutions(): string[] {
    const courses = this.loadCourses().filter(c => !c.deleted_at);
    return Array.from(new Set(courses.map(c => c.institution))).sort();
  }
}

export const courseStore = new CourseStore();
