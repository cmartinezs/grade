/**
 * Hook para generar masivamente cursos para una institución
 * Proporciona funcionalidad para generar cursos con combinaciones de niveles y letras
 * 
 * Los datos se guardan directamente a Data-Connect y se sincronizan con el store local
 */

import { useCallback } from 'react';
import { generateCoursesInBulk, CourseGenerationOptions } from '@/lib/courseDataLoader';
import { useAuth } from '@/contexts/AuthContext';

interface GenerateCoursesResult {
  coursesCreated: number;
  errors: string[];
  success: boolean;
  message: string;
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

  /**
   * Genera masivamente cursos a Data-Connect y actualiza el store local
   * 
   * @param options - Opciones de generación (institución, letras, niveles)
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const generateCourses = useCallback(
    async (
      options: CourseGenerationOptions,
      onProgress?: ProgressCallback
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
        const totalCourses = options.levelIds.length * Math.max(1, options.sections.length);
        
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
        const result = await generateCoursesInBulk({
          ...options,
          userId: user.id,
        });

        // 2. Los cursos ya están en el store (courseStore.createCourse)
        // No es necesario recargar desde Data-Connect
        
        console.log('[useCourseGenerator] Bulk generation completed successfully');

        if (onProgress) {
          onProgress({
            currentStep: '✅ Generación completada',
            currentIndex: totalCourses,
            total: totalCourses,
            itemName: `${result.coursesCreated} cursos creados`,
            percentage: 100,
          });
        }

        const success = result.errors.length === 0;
        const message = success
          ? `✅ ${result.coursesCreated} cursos creados exitosamente`
          : `⚠️ ${result.coursesCreated} cursos creados con ${result.errors.length} errores`;

        return {
          coursesCreated: result.coursesCreated,
          errors: result.errors,
          success,
          message,
        };
      } catch (error) {
        const errorMsg = `Error generating courses: ${error instanceof Error ? error.message : String(error)}`;
        console.error('[useCourseGenerator]', errorMsg);
        return {
          coursesCreated: 0,
          errors: [errorMsg],
          success: false,
          message: '❌ Error al generar cursos',
        };
      }
    },
    [user?.id]
  );

  return {
    generateCourses,
  };
}
