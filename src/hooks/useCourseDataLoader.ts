/**
 * Hook para generar masivamente cursos para una institución
 * Proporciona funcionalidad para generar cursos con combinaciones de niveles y letras
 * 
 * Los datos se cargan directamente a Data-Connect y se sincronizan con el store local
 */

import { useCallback } from 'react';
import { loadCoursesInBulk, CourseLoadOptions } from '@/lib/courseDataLoader';

interface LoadCoursesResult {
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
  /**
   * Carga masivamente cursos a Data-Connect y actualiza el store local
   * 
   * @param options - Opciones de carga (institución, letras, niveles)
   * @param onProgress - Callback para recibir actualizaciones de progreso
   */
  const loadCourses = useCallback(
    async (
      options: CourseLoadOptions,
      onProgress?: ProgressCallback
    ): Promise<LoadCoursesResult> => {
      try {
        console.log('[useCourseDataLoader] Starting bulk course load...');
        console.log(`[useCourseDataLoader] Institution: ${options.institution}`);
        console.log(`[useCourseDataLoader] Letters: ${options.numberOfLetters}`);
        console.log(`[useCourseDataLoader] Levels: ${options.levelIds.length}`);

        // Calcular total de cursos a crear
        const totalCourses = options.levelIds.length * options.numberOfLetters;
        
        if (onProgress) {
          onProgress({
            currentStep: '📚 Preparando generación masiva de cursos',
            currentIndex: 0,
            total: totalCourses,
            itemName: options.institution,
            percentage: 0,
          });
        }

        // 1. Crear cursos en Data-Connect
        const result = await loadCoursesInBulk(options);

        // 2. Los cursos ya están en el store (courseStore.createCourse)
        // No es necesario recargar desde Data-Connect
        
        console.log('[useCourseDataLoader] Bulk load completed successfully');

        if (onProgress) {
          onProgress({
            currentStep: '✅ Carga completada',
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
        const errorMsg = `Error loading courses: ${error instanceof Error ? error.message : String(error)}`;
        console.error('[useCourseDataLoader]', errorMsg);
        return {
          coursesCreated: 0,
          errors: [errorMsg],
          success: false,
          message: '❌ Error al cargar cursos',
        };
      }
    },
    []
  );

  return {
    loadCourses,
  };
}
