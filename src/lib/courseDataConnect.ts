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
  listCourses as dcListCourses,
} from '../dataconnect-generated';

// ===================================================================
// COURSES
// ===================================================================

export const createNewCourse = async (
  name: string,
  code: string,
  institutionName: string,
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
      institutionName,
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
  updates: { name?: string; code?: string; institutionName?: string; levelId?: string; userId?: string },
  updatedBy: string,
  firebaseId?: string
): Promise<void> => {
  try {
    const updatedAt = new Date().toISOString();
    await (dcUpdateCourse as any)({
      courseId,
      name: updates.name,
      code: updates.code,
      institutionName: updates.institutionName,
      levelId: updates.levelId,
      userId: updates.userId,
      updatedBy,
      updatedAt,
      firebaseId: firebaseId || '',
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

export const fetchCoursesFromDataConnect = async (_userId: string, _firebaseId: string): Promise<
  Array<{
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
  }>
> => {
  try {
    console.log('[FETCH COURSES] Received parameters:', {
      userId: _userId,
      firebaseId: _firebaseId
    });
    
    const result = await (dcListCourses as any)({
      userId: _userId,
      firebaseId: _firebaseId,
    });

    console.log('[FETCH COURSES] Result from Data-Connect:', result);
    
    if (result?.data?.courses) {
      const courses = result.data.courses.map((course: any) => ({
        courseId: course.courseId,
        name: course.name,
        code: course.code,
        institutionName: course.institutionName,
        levelId: course.levelId,
        userId: course.userId,
        active: course.active,
        createdAt: course.createdAt,
        createdBy: course.createdBy,
        updatedAt: course.updatedAt,
        updatedBy: course.updatedBy,
        deletedAt: course.deletedAt,
        deletedBy: course.deletedBy,
      }));
      console.log(`[FETCH COURSES] Successfully fetched ${courses.length} courses`);
      return courses;
    }
    
    console.warn('[FETCH COURSES] No courses found or invalid response structure');
    return [];
  } catch (error) {
    console.error('[FETCH COURSES] Error fetching courses from Data Connect:', error);
    return [];
  }
};
