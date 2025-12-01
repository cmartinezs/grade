/**
 * Student Management Types
 * Types for managing students and course enrollments
 */

// Student entity
export interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  identifier: string; // RUT, ID, etc. - Unique
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}

// Course-Student relationship (enrollment)
export interface CourseStudent {
  courseStudentId: string;
  courseId: string;
  studentId: string;
  enrolledOn: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
}

// Combined view for displaying student enrollment information
export interface StudentEnrollment extends Student {
  enrollmentId: string; // courseStudentId
  enrolledOn: Date;
}

// Input for creating a student
export interface CreateStudentInput {
  firstName: string;
  lastName: string;
  identifier: string;
}

// Input for editing a student
export interface EditStudentInput {
  firstName: string;
  lastName: string;
  identifier: string;
}

// Input for enrolling a student in a course
export interface EnrollStudentInput {
  courseId: string;
  studentId: string;
  enrolledOn: Date;
}
