/**
 * Student Store
 * Manages student data with in-memory caching and Data-Connect integration
 */

import { Student, StudentEnrollment } from '@/types/student';

class StudentStore {
  private students: Map<string, Student> = new Map();
  private enrollmentsByStudent: Map<string, StudentEnrollment[]> = new Map();
  private enrollmentsByCourse: Map<string, StudentEnrollment[]> = new Map();
  private lastLoadTime: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Check if cache is still valid
   */
  private isCacheValid(): boolean {
    if (!this.lastLoadTime) return false;
    return Date.now() - this.lastLoadTime < this.CACHE_DURATION;
  }

  /**
   * Invalidate the cache
   */
  invalidateCache(): void {
    this.students.clear();
    this.enrollmentsByStudent.clear();
    this.enrollmentsByCourse.clear();
    this.lastLoadTime = null;
  }

  /**
   * Get student by ID
   */
  getStudent(studentId: string): Student | undefined {
    return this.students.get(studentId);
  }

  /**
   * Get all students
   */
  getAllStudents(): Student[] {
    return Array.from(this.students.values());
  }

  /**
   * Add or update student in cache
   */
  setStudent(student: Student): void {
    this.students.set(student.studentId, student);
  }

  /**
   * Get enrollments for a specific course
   */
  getEnrollmentsByCourse(courseId: string): StudentEnrollment[] {
    return this.enrollmentsByCourse.get(courseId) || [];
  }

  /**
   * Set enrollments for a course
   */
  setEnrollmentsByCourse(courseId: string, enrollments: StudentEnrollment[]): void {
    this.enrollmentsByCourse.set(courseId, enrollments);
  }

  /**
   * Add enrollment to course cache
   */
  addEnrollmentToCourse(courseId: string, enrollment: StudentEnrollment): void {
    const existing = this.enrollmentsByCourse.get(courseId) || [];
    this.enrollmentsByCourse.set(courseId, [...existing, enrollment]);
  }

  /**
   * Remove enrollment from course cache
   */
  removeEnrollmentFromCourse(courseId: string, enrollmentId: string): void {
    const existing = this.enrollmentsByCourse.get(courseId) || [];
    this.enrollmentsByCourse.set(
      courseId,
      existing.filter(e => e.enrollmentId !== enrollmentId)
    );
  }

  /**
   * Search students by name or identifier
   */
  searchStudents(query: string): Student[] {
    if (!query.trim()) return this.getAllStudents();

    const lowerQuery = query.toLowerCase();
    return this.getAllStudents().filter(student =>
      student.firstName.toLowerCase().includes(lowerQuery) ||
      student.lastName.toLowerCase().includes(lowerQuery) ||
      student.identifier.toLowerCase().includes(lowerQuery)
    );
  }
}

export const studentStore = new StudentStore();
