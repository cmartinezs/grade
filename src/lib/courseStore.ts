/**
 * CU-GE-01: Crear curso
 * Course management store
 */

import { Course, CreateCourseInput, CourseValidationError } from '@/types/course';

const COURSES_STORAGE_KEY = 'evaluation_management_courses';
const COURSE_COUNTER_KEY = 'evaluation_management_course_counter';

class CourseStore {
  // Load courses from localStorage
  private loadCourses(): Course[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(COURSES_STORAGE_KEY);
    if (!stored) return [];
    
    const courses = JSON.parse(stored);
    return courses.map((c: Course) => ({
      ...c,
      created_at: new Date(c.created_at),
      updated_at: new Date(c.updated_at),
      deleted_at: c.deleted_at ? new Date(c.deleted_at) : null,
    }));
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

    if (!input.level || input.level.trim() === '') {
      errors.push({
        field: 'level',
        message: 'El nivel del curso es obligatorio'
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
      level: input.level.trim(),
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
}

export const courseStore = new CourseStore();
