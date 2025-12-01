/**
 * Student Data Connect Integration
 * Wrapper for Firebase Data Connect operations for students and enrollments
 */

import { generateUUID } from './uuid';
import { Student, StudentEnrollment, CreateStudentInput } from '@/types/student';
import { 
  createStudent, 
  enrollStudentInCourse, 
  getCourseStudentsWithDetails,
  getAllStudentsByUser,
  unenrollStudentFromCourse 
} from '@/dataconnect-generated';

// Import Data Connect generated functions when available
// For now, we'll use placeholder implementations

/**
 * Fetch students from Data-Connect
 */
export async function fetchStudentsFromDataConnect(
  userId: string,
  firebaseUid: string
): Promise<Student[]> {
  try {
    const result = await getAllStudentsByUser({ userId, firebaseId: firebaseUid });
    
    return result.data.students.map(s => ({
      studentId: s.studentId,
      firstName: s.firstName,
      lastName: s.lastName,
      identifier: s.identifier,
      email: s.email,
      createdAt: new Date(s.createdAt),
      createdBy: s.createdBy,
      updatedAt: s.updatedAt ? new Date(s.updatedAt) : new Date(s.createdAt),
      updatedBy: s.updatedBy || s.createdBy,
      deletedAt: null,
      deletedBy: null,
    }));
  } catch (error) {
    console.error('[STUDENT DATA-CONNECT] Error fetching students:', error);
    throw new Error('Error al cargar estudiantes desde Data-Connect');
  }
}

/**
 * Fetch student enrollments for a course from Data-Connect
 */
export async function fetchCourseEnrollmentsFromDataConnect(
  courseId: string,
  firebaseUid: string
): Promise<StudentEnrollment[]> {
  try {
    const result = await getCourseStudentsWithDetails({ courseId, firebaseId: firebaseUid });
    
    return result.data.courseStudents.map(cs => ({
      studentId: cs.student.studentId,
      firstName: cs.student.firstName,
      lastName: cs.student.lastName,
      identifier: cs.student.identifier,
      email: cs.student.email,
      enrollmentId: cs.courseStudentId,
      enrolledOn: new Date(cs.enrolledOn),
      createdAt: new Date(cs.student.createdAt),
      createdBy: cs.student.createdBy,
      updatedAt: cs.student.updatedAt ? new Date(cs.student.updatedAt) : new Date(cs.student.createdAt),
      updatedBy: cs.student.updatedBy || cs.student.createdBy,
      deletedAt: null,
      deletedBy: null,
    }));
  } catch (error) {
    console.error('[STUDENT DATA-CONNECT] Error fetching enrollments:', error);
    throw new Error('Error al cargar inscripciones desde Data-Connect');
  }
}

/**
 * Create a new student in Data-Connect
 */
export async function createStudentInDataConnect(
  input: CreateStudentInput,
  userId: string,
  firebaseUid: string
): Promise<Student> {
  try {
    const studentId = generateUUID();
    const now = new Date();

    await createStudent({
      studentId,
      firstName: input.firstName,
      lastName: input.lastName,
      identifier: input.identifier,
      email: input.email,
      createdBy: userId,
      firebaseId: firebaseUid,
    });

    const newStudent: Student = {
      studentId,
      firstName: input.firstName,
      lastName: input.lastName,
      identifier: input.identifier,
      email: input.email,
      createdAt: now,
      createdBy: userId,
      updatedAt: now,
      updatedBy: userId,
      deletedAt: null,
      deletedBy: null,
    };

    console.log('[STUDENT DATA-CONNECT] Created student:', newStudent);
    return newStudent;
  } catch (error) {
    console.error('[STUDENT DATA-CONNECT] Error creating student:', error);
    throw new Error('Error al crear estudiante en Data-Connect');
  }
}

/**
 * Enroll student in course in Data-Connect
 */
export async function enrollStudentInCourseInDataConnect(
  courseId: string,
  studentId: string,
  userId: string,
  firebaseUid: string
): Promise<{ courseStudentId: string }> {
  try {
    const courseStudentId = generateUUID();
    const enrolledOn = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    await enrollStudentInCourse({
      courseStudentId,
      courseId,
      studentId,
      enrolledOn,
      createdBy: userId,
      firebaseId: firebaseUid,
    });

    console.log('[STUDENT DATA-CONNECT] Enrolled student in course:', {
      courseStudentId,
      courseId,
      studentId,
    });

    return { courseStudentId };
  } catch (error) {
    console.error('[STUDENT DATA-CONNECT] Error enrolling student:', error);
    throw new Error('Error al inscribir estudiante en Data-Connect');
  }
}

/**
 * Unenroll student from course in Data-Connect (soft delete)
 */
export async function unenrollStudentFromCourseInDataConnect(
  courseStudentId: string,
  userId: string,
  firebaseUid: string
): Promise<void> {
  try {
    const deletedAt = new Date().toISOString();

    await unenrollStudentFromCourse({
      courseStudentId,
      deletedAt,
      deletedBy: userId,
      firebaseId: firebaseUid,
    });

    console.log('[STUDENT DATA-CONNECT] Unenrolled student from course:', courseStudentId);
  } catch (error) {
    console.error('[STUDENT DATA-CONNECT] Error unenrolling student:', error);
    throw new Error('Error al desinscribir estudiante en Data-Connect');
  }
}
