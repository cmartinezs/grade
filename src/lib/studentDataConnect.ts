/**
 * Student Data Connect Integration
 * Wrapper for Firebase Data Connect operations for students and enrollments
 */

import { generateUUID } from './uuid';
import { Student, StudentEnrollment, CreateStudentInput } from '@/types/student';
import { UserRole } from '@/types/role';
import { 
  createStudent, 
  enrollStudentInCourse, 
  getCourseStudentsWithDetails,
  getAllStudentsByUser,
  unenrollStudentFromCourse 
} from '@/dataconnect-generated';
import { getSecondaryAuth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createNewUser } from './userDataConnect';

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
 * Validate Firebase Authentication requirements
 */
function validateFirebaseAuthRequirements(email: string, password: string): { valid: boolean; error?: string } {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'El email no tiene un formato válido' };
  }

  // Firebase password requirements: at least 6 characters
  if (password.length < 6) {
    return { 
      valid: false, 
      error: 'La contraseña debe tener al menos 6 caracteres. El RUT/ID ingresado es muy corto.' 
    };
  }

  return { valid: true };
}

/**
 * Create a new student in Data-Connect
 * Also creates Firebase Auth user and User record in Data Connect
 * Uses secondary Firebase Auth instance to avoid logging out current user
 */
export async function createStudentInDataConnect(
  input: CreateStudentInput,
  userId: string,
  firebaseUid: string
): Promise<Student> {
  // VALIDAR REQUISITOS DE FIREBASE AUTHENTICATION ANTES DE CREAR NADA
  const validation = validateFirebaseAuthRequirements(input.email, input.identifier);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    const studentId = generateUUID();
    const now = new Date();

    // 1. Crear usuario en Firebase Authentication usando instancia SECUNDARIA
    // Esto NO afecta la sesión del usuario administrador actual
    const secondaryAuth = getSecondaryAuth();
    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      input.email,
      input.identifier // RUT como contraseña
    );

    const studentFirebaseUid = userCredential.user.uid;
    console.log('[STUDENT DATA-CONNECT] Created Firebase Auth user:', studentFirebaseUid);

    // 2. Cerrar la sesión en la instancia secundaria inmediatamente
    await secondaryAuth.signOut();

    // 3. Crear estudiante en Data Connect
    try {
      await createStudent({
        studentId,
        firstName: input.firstName,
        lastName: input.lastName,
        identifier: input.identifier,
        email: input.email,
        createdBy: userId,
        firebaseId: firebaseUid,
      });

      console.log('[STUDENT DATA-CONNECT] Created student:', studentId);
    } catch (studentError) {
      // Si falla la creación del estudiante, eliminar el usuario de Auth
      console.error('[STUDENT DATA-CONNECT] Error creating student, rolling back Auth user:', studentError);
      // No podemos usar userCredential.user.delete() porque ya hicimos signOut
      // El usuario quedará en Auth pero sin datos en Data Connect
      console.warn('[STUDENT DATA-CONNECT] User created in Auth but student creation failed. Manual cleanup may be needed.');
      throw new Error('Error al crear estudiante en Data-Connect');
    }

    // 4. Crear registro User en Data Connect con rol "ESTUDIANTE"
    try {
      const fullName = `${input.firstName} ${input.lastName}`;
      const userDataConnect = await createNewUser(
        {
          name: fullName,
          email: input.email,
          role: UserRole.ESTUDIANTE
        },
        studentFirebaseUid
      );

      if (!userDataConnect) {
        console.warn('[STUDENT DATA-CONNECT] Failed to create User record in Data Connect');
        throw new Error('Error al crear registro de usuario');
      }

      console.log('[STUDENT DATA-CONNECT] Created User record in Data Connect:', userDataConnect.userId);
    } catch (userError) {
      console.error('[STUDENT DATA-CONNECT] Error creating User record:', userError);
      throw new Error('Error al crear registro de usuario en Data-Connect');
    }

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

    return newStudent;
  } catch (error: any) {
    console.error('[STUDENT DATA-CONNECT] Error creating student:', error);
    
    // Proporcionar mensajes de error específicos de Firebase
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('El email ya está registrado en el sistema');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('El formato del email no es válido');
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('La contraseña debe tener al menos 6 caracteres. El RUT/ID ingresado es muy corto.');
    }
    
    // Si ya es un error personalizado, lanzarlo tal cual
    if (error.message && !error.code) {
      throw error;
    }
    
    throw new Error('Error al crear estudiante: ' + (error.message || 'Error desconocido'));
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
