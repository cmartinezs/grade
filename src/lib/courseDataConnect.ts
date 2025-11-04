/**
 * Course Data Connect Service
 * Wrapper para operaciones de Courses usando Firebase Data Connect
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { generateUUID } from './uuid';
import {
  createCourse as dcCreateCourse,
  updateCourse as dcUpdateCourse,
  deactivateCourse as dcDeactivateCourse,
  reactivateCourse as dcReactivateCourse,
} from '../dataconnect-generated';

// ===================================================================
// COURSES
// ===================================================================

export const createNewCourse = async (
  name: string,
  code: string,
  levelId: string,
  userId: string,
  createdBy: string,
  courseId?: string
): Promise<string> => {
  try {
    const id = courseId || generateUUID();
    await (dcCreateCourse as any)({
      courseId: id,
      name,
      code,
      levelId,
      userId,
      createdBy,
    });
    return id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourseInfo = async (
  courseId: string,
  updates: { name?: string; code?: string; levelId?: string; userId?: string },
  updatedBy: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    await (dcUpdateCourse as any)({
      courseId,
      name: updates.name,
      code: updates.code,
      levelId: updates.levelId,
      userId: updates.userId,
      updatedBy,
      updatedAt,
    });
  } catch (error) {
    console.error(`Error updating course ${courseId}:`, error);
    throw error;
  }
};

export const deactivateCourseInfo = async (
  courseId: string,
  deletedBy: string
): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await (dcDeactivateCourse as any)({
      courseId,
      deletedAt: now,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error deactivating course ${courseId}:`, error);
    throw error;
  }
};

export const reactivateCourseInfo = async (
  courseId: string,
  deletedBy: string
): Promise<void> => {
  try {
    await (dcReactivateCourse as any)({
      courseId,
      deletedBy,
    });
  } catch (error) {
    console.error(`Error reactivating course ${courseId}:`, error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchCoursesFromDataConnect = async (_userId: string, _firebaseId: string): Promise<
  Array<{
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
  }>
> => {
  try {
    // TODO: Implement course listing once Data-Connect query parsing issues are resolved
    // For now, return empty array - courses will be loaded individually as needed
    console.warn('Course listing from Data-Connect not yet available. Using empty list.');
    return [];
  } catch (error) {
    console.error('Error fetching courses from Data Connect:', error);
    return [];
  }
};
