/**
 * Hook para generar masivamente cursos para una institución
 * Proporciona funcionalidad para generar cursos con combinaciones de niveles y letras
 * 
 * Los datos se guardan directamente a Data-Connect y se sincronizan con el store local
 */

import { useCallback } from 'react';
import {
  generateCoursesInBulk,
  generateCoursesInMemory,
  CourseGenerationOptions,
  CourseToCreate,
} from '@/lib/courseDataLoader';
import { useAuth } from '@/contexts/AuthContext';

interface GenerateCoursesResult {
  coursesCreated: number;
  errors: string[];
  success: boolean;
  message: string;
  failedCourses?: Array<{
    courseCode: string;
    courseName: string;
    error: string;
  }>;
}

interface ProgressUpdate {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

type ProgressCallback = (progress: ProgressUpdate) => void;

export function useCourseDataLoader() {
  const { user } = useAuth();

  const generateCourses = useCallback(
    async (
      options: CourseGenerationOptions,
      onProgress?: ProgressCallback,
      coursesToCreate?: CourseToCreate[]
    ): Promise<GenerateCoursesResult> => {
      try {
        console.log('[useCourseGenerator] Starting bulk course generation...');
        console.log(`[useCourseGenerator] Institution: ${options.institution}`);
        console.log(`[useCourseGenerator] Sections: ${options.sections.length}`);
        console.log(`[useCourseGenerator] Levels: ${options.levelIds.length}`);
        console.log(`[useCourseGenerator] User ID: ${user?.id}`);

        if (!user?.id) {
          return {
            coursesCreated: 0,
            errors: ['Usuario no autenticado'],
            success: false,
            message: '❌ Usuario no autenticado',
          };
        }

        // Calcular total de cursos a crear
        const totalCourses = coursesToCreate?.length || (options.levelIds.length * Math.max(1, options.sections.length));
        
        if (onProgress) {
          onProgress({
            currentStep: '📚 Preparando generación masiva de cursos',
            currentIndex: 0,
            total: totalCourses,
            itemName: options.institution,
            percentage: 0,
          });
        }

        // 1. Generar cursos en Data-Connect con el userId del usuario logueado
        const result = await generateCoursesInBulk(
          {
            ...options,
            userId: user.id,
          },
          coursesToCreate,
          onProgress  // Pasar callback de progreso
        );

        // 2. Los cursos ya están en el store (courseStore.createCourse)
        // No es necesario recargar desde Data-Connect
        
        console.log('[useCourseGenerator] Bulk generation completed successfully');

        const success = result.errors.length === 0;
        const coursesCreated = result.coursesCreated;
        const errorsCount = result.errors.length;
        
        let message: string;
        if (success) {
          message = `✅ ${coursesCreated} ${coursesCreated === 1 ? 'curso creado' : 'cursos creados'} exitosamente`;
        } else if (coursesCreated === 0) {
          message = `❌ No se pudo crear ningún curso. ${errorsCount} ${errorsCount === 1 ? 'error encontrado' : 'errores encontrados'}`;
        } else {
          message = `⚠️ ${coursesCreated} ${coursesCreated === 1 ? 'curso creado' : 'cursos creados'}, pero ${errorsCount} ${errorsCount === 1 ? 'falló' : 'fallaron'}`;
        }

        return {
          coursesCreated: result.coursesCreated,
          errors: result.errors,
          failedCourses: result.failedCourses,
          success,
          message,
        };
      } catch (error) {
        const errorMsg = `Error generating courses: ${error instanceof Error ? error.message : String(error)}`;
        console.error('[useCourseGenerator]', errorMsg);
        return {
          coursesCreated: 0,
          errors: [errorMsg],
          failedCourses: [],
          success: false,
          message: '❌ Error al generar cursos',
        };
      }
    },
    [user?.id]
  );

  /**
   * Genera cursos EN MEMORIA para mostrar en una vista previa
   * @param options - Opciones de generación
   */
  const previewCourses = useCallback(
    (options: CourseGenerationOptions): CourseToCreate[] => {
      return generateCoursesInMemory(options);
    },
    []
  );

  return {
    generateCourses,
    previewCourses,
  };
}
