/**
 * CU-GE-01: Crear curso
 * CU-GE-02: Editar curso
 * Course management store
 */

import { Course, CreateCourseInput, EditCourseInput, CourseValidationError } from '@/types/course';
import { createNewCourse, updateCourseInfo, fetchCoursesFromDataConnect } from './courseDataConnect';

const COURSES_STORAGE_KEY = 'evaluation_management_courses';
const COURSE_COUNTER_KEY = 'evaluation_management_course_counter';

// ============================================================================
// IN-MEMORY CACHE (single source of truth - loaded from Data-Connect)
// ============================================================================

interface MemoryCache {
  courses: Course[] | null;
  coursesLoaded: boolean;
}

const memoryCache: MemoryCache = {
  courses: null,
  coursesLoaded: false,
};

class CourseStore {
  // ---- Initialization (Load from Data-Connect) ----
  /**
   * Load courses from Data-Connect and cache in memory
   * @param userId - The system User UUID (for course queries)
   * @param firebaseUid - The Firebase UID (auth.uid from token) for authentication
   */
  async loadCourses(userId: string, firebaseUid: string): Promise<Course[]> {
    return this.loadCoursesAsync(userId, firebaseUid);
  }

  // Load courses from in-memory cache (synchronous - returns cached data)
  private loadCoursesSync(): Course[] {
    // Return from cache if already loaded
    if (memoryCache.coursesLoaded && memoryCache.courses !== null) {
      return memoryCache.courses;
    }

    // If courses not loaded yet, return empty array
    // (async loading should be done via loadCourses)
    return [];
  }

  // Async load courses from Data-Connect (private method)
  private async loadCoursesAsync(userId: string, firebaseUid: string): Promise<Course[]> {
    // Return from cache if already loaded
    if (memoryCache.coursesLoaded && memoryCache.courses !== null) {
      return memoryCache.courses;
    }

    try {
      console.log('[COURSE STORE] Calling fetchCoursesFromDataConnect with:', {
        userId,
        firebaseUid
      });
      
      const data = await fetchCoursesFromDataConnect(userId, firebaseUid);
      
      console.log('[COURSE STORE] Data received from Data-Connect:', {
        count: data.length,
        data: data
      });
      
      // Convert from Data-Connect format to Course format
      const courses: Course[] = data.map((course: {
        courseId: string;
        name: string;
        code: string;
        institutionName: string;
        levelId: string;
        userId: string;
        active: boolean;
        createdAt: string;
        createdBy?: string;
        updatedAt?: string;
        updatedBy?: string;
        deletedAt?: string;
        deletedBy?: string;
      }) => ({
        course_id: course.courseId,
        name: course.name,
        code: course.code,
        levelId: course.levelId,
        institution: course.institutionName,
        active: course.active !== false,
        created_at: new Date(course.createdAt),
        created_by: course.createdBy || 'SYSTEM',
        updated_at: course.updatedAt ? new Date(course.updatedAt) : new Date(course.createdAt),
        updated_by: course.updatedBy || course.createdBy || 'SYSTEM',
        deleted_at: course.deletedAt ? new Date(course.deletedAt) : null,
        deleted_by: course.deletedBy || null,
      }));

      // Store in memory cache
      memoryCache.courses = courses;
      memoryCache.coursesLoaded = true;

      console.log(`[COURSE] Loaded ${courses.length} courses from Data-Connect`);
      return courses;
    } catch (error) {
      console.error('[COURSE] Error loading courses from Data-Connect:', error);
      // Return empty array on error
      memoryCache.courses = [];
      memoryCache.coursesLoaded = true;
      return [];
    }
  }

  // Clear all courses (for cleanup/migration)
  public clearAllCourses(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(COURSES_STORAGE_KEY);
    localStorage.removeItem(COURSE_COUNTER_KEY);
  }
  // Save courses to localStorage
  private saveCourses(): void {
    if (typeof window === 'undefined') return;
    // localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  }

  // Get next course ID
  private getNextCourseId(): string {
    if (typeof window === 'undefined') return 'c-1';
    
    const counter = parseInt(localStorage.getItem(COURSE_COUNTER_KEY) || '0', 10);
    const nextCounter = counter + 1;
    // localStorage.setItem(COURSE_COUNTER_KEY, nextCounter.toString());
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
    const courses = this.loadCoursesSync();

    // Validate input
    const validationErrors = this.validateCourseInput(input, courses);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors.map(e => `${e.field}: ${e.message}`).join(', ');
      throw new Error(`Validation errors: ${errorMessages}`);
    }

    // RN-2: Default active state is true
    const active = input.active !== undefined ? input.active : true;

    // Create course - Generate UUID
    const courseId = await createNewCourse(
      input.name.trim(),
      input.code.trim().toUpperCase(),
      input.institution.trim(),
      input.levelId,
      currentUser,
      currentUser
    );

    // Create local course object
    const newCourse: Course = {
      course_id: courseId,
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
    this.saveCourses();

    console.log(`[CURSO] Curso ${newCourse.course_id} creado por ${currentUser}`);

    return newCourse;
  }

  // Get all courses
  getCourses(includeInactive = true, includeDeleted = false): Course[] {
    const courses = this.loadCoursesSync();
    
    return courses.filter(c => {
      if (!includeDeleted && c.deleted_at) return false;
      if (!includeInactive && !c.active) return false;
      return true;
    });
  }

  // Get course by ID
  getCourse(courseId: string): Course | null {
    const courses = this.loadCoursesSync();
    return courses.find(c => c.course_id === courseId && !c.deleted_at) || null;
  }

  // Check if code exists (for validation)
  codeExists(code: string, excludeCourseId?: string): boolean {
    const courses = this.loadCoursesSync();
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
    currentUser: string,
    firebaseId?: string
  ): Promise<Course> {
    const courses = this.loadCoursesSync();
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

    // Update in Data-Connect
    await updateCourseInfo(
      courseId,
      {
        name: input.name.trim(),
        code: input.code.trim().toUpperCase(),
        institutionName: input.institution.trim(),
        levelId: input.levelId,
      },
      currentUser,
      firebaseId
    );

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
    this.saveCourses();

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
    let courses = this.loadCoursesSync();

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
    const courses = this.loadCoursesSync().filter(c => !c.deleted_at);
    return Array.from(new Set(courses.map(c => c.institution))).sort();
  }

  // Refresh courses from Data-Connect
  refreshFromDataConnect(courses: Array<{
    courseId: string;
    name: string;
    code: string;
    levelId: string;
    userId: string;
    active: boolean;
    createdAt: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
  }>): void {
    if (typeof window === 'undefined') return;

    try {
      // Convert Data-Connect format to Course format
      const convertedCourses: Course[] = courses.map((course) => ({
        course_id: course.courseId,
        name: course.name,
        code: course.code,
        levelId: course.levelId,
        institution: '', // No institution field in Data-Connect Course
        active: course.active !== false,
        created_at: new Date(course.createdAt),
        created_by: course.createdBy || 'SYSTEM',
        updated_at: course.updatedAt ? new Date(course.updatedAt) : new Date(course.createdAt),
        updated_by: course.updatedBy || 'SYSTEM',
        deleted_at: course.deletedAt ? new Date(course.deletedAt) : null,
        deleted_by: course.deletedBy || null,
      }));

      // localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(convertedCourses));
      console.log(`[COURSE] Refreshed ${convertedCourses.length} courses from Data-Connect`);
    } catch (error) {
      console.error('[COURSE] Error refreshing courses from Data-Connect:', error);
    }
  }
}

export const courseStore = new CourseStore();
