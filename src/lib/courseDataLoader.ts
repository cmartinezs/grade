/**
 * Course Data Loader - Bulk Creation
 * Generación masiva de cursos para una institución específica
 * Genera cursos para todas las combinaciones de:
 * - Niveles educacionales (o seleccionados)
 * - Letras (A, B, C, D, etc.)
 */

import { generateUUID } from './uuid';
import { courseStore } from './courseStore';

export interface CourseLoadOptions {
  institution: string;
  numberOfLetters: number; // A, B, C, D, etc.
  levelIds: string[]; // IDs of levels to create courses for
  levelNames: Record<string, string>; // Mapping of levelId to level name
}

export interface CourseLoadResult {
  coursesCreated: number;
  errors: string[];
}

/**
 * Carga masivamente cursos para una institución
 * @param options Opciones de carga (institución, letras, niveles)
 * @returns Resultado con cantidad de cursos creados y errores
 */
export async function loadCoursesInBulk(options: CourseLoadOptions): Promise<CourseLoadResult> {
  const result: CourseLoadResult = {
    coursesCreated: 0,
    errors: [],
  };

  try {
    console.log('[CourseDataLoader] Starting bulk course creation...');
    console.log(`[CourseDataLoader] Institution: ${options.institution}`);
    console.log(`[CourseDataLoader] Letters: ${options.numberOfLetters}`);
    console.log(`[CourseDataLoader] Levels: ${options.levelIds.length}`);

    // UUID para el usuario del sistema
    const systemUUID = generateUUID();

    // Generar todas las combinaciones de nivel + letra
    const coursesToCreate: Array<{
      name: string;
      code: string;
      levelId: string;
    }> = [];

    for (const levelId of options.levelIds) {
      const levelName = options.levelNames[levelId] || 'Unknown';

      // Generar letras: A, B, C, D, etc.
      for (let i = 0; i < options.numberOfLetters; i++) {
        const letter = String.fromCharCode(65 + i); // 65 = 'A'
        const courseName = `${levelName} ${letter}`;
        const courseCode = `${levelName.replace(/°/g, '').replace(/ /g, '_')}_${letter}`;

        coursesToCreate.push({
          name: courseName,
          code: courseCode,
          levelId,
        });
      }
    }

    console.log(`[CourseDataLoader] Will create ${coursesToCreate.length} courses`);

    // Crear cursos
    for (const course of coursesToCreate) {
      try {
        const courseId = await courseStore.createCourse(
          {
            name: course.name,
            code: course.code,
            levelId: course.levelId,
            institution: options.institution,
            active: true,
          },
          systemUUID
        );
        result.coursesCreated++;
        console.log(`[CourseDataLoader] Created course: ${course.name} (${courseId})`);
      } catch (error) {
        const errorMsg = `Failed to create course ${course.name}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        // Continue with next course
      }
    }

    console.log('[CourseDataLoader] Bulk creation completed:', result);
    return result;
  } catch (error) {
    const errorMsg = `Unexpected error in course data loader: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
