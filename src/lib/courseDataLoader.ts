/**
 * Course Data Loader - Bulk Creation
 * Generación masiva de cursos para una institución específica
 * Genera cursos para todas las combinaciones de:
 * - Niveles educacionales (o seleccionados)
 * - Letras (A, B, C, D, etc.)
 */

import { courseStore } from './courseStore';

/**
 * Genera las iniciales de una cadena (primera letra de cada palabra)
 * ej: "Colegio San Miguel" -> "CSM"
 */
function getInitials(text: string): string {
  return text
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');
}

/**
 * Genera el código de curso según el formato:
 * INSTIT-CATEG-NIVEL-LETRA (siempre en mayúsculas)
 * ej: CSM-EGB-7-A (Colegio San Miguel - Educación General Básica - 7mo - A)
 */
function generateCourseCode(
  institutionInitials: string,
  categoryCode: string,
  levelCode: string,
  letter: string
): string {
  return `${institutionInitials}-${categoryCode}-${levelCode}-${letter}`.toUpperCase();
}

/**
 * Obtiene el código de nivel (número o identificador)
 * Intenta extraer un número del nombre del nivel
 * ej: "7° Básico" -> "7", "Kinder" -> "KG"
 */
function getLevelCode(levelName: string): string {
  // Buscar números en el nombre
  const numberMatch = levelName.match(/\d+/);
  if (numberMatch) {
    return numberMatch[0];
  }
  
  // Si es Kinder, retornar "KG"
  if (levelName.toLowerCase().includes('kinder')) {
    return 'KG';
  }
  
  // Si es Preescolar, retornar "PRE"
  if (levelName.toLowerCase().includes('preescolar')) {
    return 'PRE';
  }
  
  // Por defecto, usar iniciales
  return getInitials(levelName);
}

export interface CourseLoadOptions {
  institution: string;
  numberOfLetters: number; // A, B, C, D, etc.
  levelIds: string[]; // IDs of levels to create courses for
  levelNames: Record<string, string>; // Mapping of levelId to level name
  levelCategories?: Record<string, string>; // Mapping of levelId to categoryId
  categoryNames?: Record<string, string>; // Mapping of categoryId to category name
  levelCodes?: Record<string, string>; // Mapping of levelId to level code
  categoryCodes?: Record<string, string>; // Mapping of categoryId to category code
  userId?: string; // UUID del usuario logueado
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
    console.log(`[CourseDataLoader] User ID: ${options.userId}`);

    // Usar el UUID del usuario logueado
    const userUUID = options.userId;
    
    if (!userUUID) {
      throw new Error('User ID is required to create courses');
    }

    // Calcular iniciales de la institución
    const institutionInitials = getInitials(options.institution);

    // Generar todas las combinaciones de nivel + letra
    const coursesToCreate: Array<{
      name: string;
      code: string;
      levelId: string;
    }> = [];

    for (const levelId of options.levelIds) {
      const levelName = options.levelNames[levelId] || 'Unknown';
      const categoryId = options.levelCategories?.[levelId];
      const categoryName = categoryId && options.categoryNames ? options.categoryNames[categoryId] : 'General';
      const categoryCode = (categoryId && options.categoryCodes?.[categoryId]) || getInitials(categoryName);
      const levelCode = options.levelCodes?.[levelId] || getLevelCode(levelName);

      // Generar letras: A, B, C, D, etc.
      for (let i = 0; i < options.numberOfLetters; i++) {
        const letter = String.fromCharCode(65 + i); // 65 = 'A'
        const courseName = `${levelName} ${letter}`;
        const courseCode = generateCourseCode(institutionInitials, categoryCode, levelCode, letter);

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
          userUUID
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
