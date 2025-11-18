/**
 * Course Bulk Generator - Generación Masiva de Cursos
 * Genera cursos para todas las combinaciones de:
 * - Niveles educacionales (o seleccionados)
 * - Letras (A, B, C, D, etc.)
 */

import { courseStore } from './courseStore';
import { educationalLevelStore } from './levelStore';

/**
 * Valida si una cadena es un UUID válido
 * Acepta UUIDs con y sin guiones:
 * - Con guiones: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (RFC4122)
 * - Sin guiones: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (32 caracteres hex)
 */
function isValidUUID(str: string): boolean {
  // Con guiones (RFC4122)
  const uuidWithDashes = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  // Sin guiones (32 caracteres hexadecimales)
  const uuidWithoutDashes = /^[0-9a-f]{32}$/i;
  
  return uuidWithDashes.test(str) || uuidWithoutDashes.test(str);
}

/**
 * Genera las iniciales de una cadena (primera letra de cada palabra)
 * Solo considera caracteres alfanuméricos
 * ej: "Colegio San Miguel" -> "CSM"
 * ej: "Colegio "San" Miguel" -> "CSM" (las comillas se ignoran)
 */
function getInitials(text: string): string {
  // Remove non-alphanumeric characters except spaces
  const cleanText = text.replace(/[^a-zA-Z0-9\s]/g, '');
  
  return cleanText
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');
}

/**
 * Genera el código de curso según el formato:
 * INSTIT-CATEG-NIVEL-LETRA (siempre en mayúsculas)
 * Usa los primeros 8 caracteres del UUID del nivel para garantizar unicidad
 * ej: CSM-EGB-a1b2c3d4-A (Colegio San Miguel - Educación General Básica - nivel UUID - A)
 */
function generateCourseCode(
  institutionInitials: string,
  categoryCode: string,
  levelUuidPrefix: string,
  letter: string
): string {
  return `${institutionInitials}-${categoryCode}-${levelUuidPrefix}-${letter}`.toUpperCase();
}

export interface CourseGenerationOptions {
  institution: string;
  sections: string[]; // Array de identificadores de paralelos: [], ['A', 'B', 'C'], ['1', '2', '3'], ['Ositos', 'Delfines'], etc.
  levelIds: string[]; // IDs of levels to create courses for
  levelNames: Record<string, string>; // Mapping of levelId to level name
  levelCategories?: Record<string, string>; // Mapping of levelId to categoryId
  categoryNames?: Record<string, string>; // Mapping of categoryId to category name
  levelCodes?: Record<string, string>; // Mapping of levelId to level code
  categoryCodes?: Record<string, string>; // Mapping of categoryId to category code
  userId?: string; // UUID del usuario logueado
}

export interface CourseToCreate {
  name: string;
  code: string;
  levelId: string;
  section?: string;
  institution: string;
}

export interface CourseGenerationResult {
  coursesCreated: number;
  errors: string[];
  failedCourses?: Array<{
    courseCode: string;
    courseName: string;
    error: string;
  }>;
}

/**
 * Genera cursos EN MEMORIA sin guardarlos
 * Útil para mostrar una vista previa antes de confirmar
 * @param options Opciones de generación
 * @returns Array de cursos que se crearían
 */
export function generateCoursesInMemory(options: CourseGenerationOptions): CourseToCreate[] {
  const coursesToCreate: CourseToCreate[] = [];

  try {
    // Calcular iniciales de la institución
    const institutionInitials = getInitials(options.institution);

    // Generar todas las combinaciones de nivel + sección
    for (const levelId of options.levelIds) {
      const levelName = options.levelNames[levelId] || 'Unknown';
      const categoryId = options.levelCategories?.[levelId];
      const categoryName = categoryId && options.categoryNames ? options.categoryNames[categoryId] : 'General';
      const categoryCode = (categoryId && options.categoryCodes?.[categoryId]) || getInitials(categoryName);
      
      // Use first 8 characters of levelId UUID for uniqueness guarantee
      const levelUuidPrefix = levelId.substring(0, 8);

      // Si no hay secciones, crear un solo curso por nivel
      if (options.sections.length === 0) {
        const courseName = levelName;
        const courseCode = generateCourseCode(institutionInitials, categoryCode, levelUuidPrefix, '');

        coursesToCreate.push({
          name: courseName,
          code: courseCode,
          levelId,
          section: undefined,
          institution: options.institution,
        });
      } else {
        // Crear un curso por cada sección
        for (const section of options.sections) {
          const courseName = `${levelName} ${section}`;
          const courseCode = generateCourseCode(institutionInitials, categoryCode, levelUuidPrefix, section);

          coursesToCreate.push({
            name: courseName,
            code: courseCode,
            levelId,
            section,
            institution: options.institution,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error generating courses in memory:', error);
  }

  return coursesToCreate;
}

/**
 * Genera masivamente cursos para una institución
 * @param options Opciones de generación (institución, letras, niveles)
 * @param coursesToCreate Array de cursos previamente generados en memoria (opcional)
 * @param onProgress Callback para reportar progreso durante la generación
 * @returns Resultado con cantidad de cursos creados y errores
 */
export async function generateCoursesInBulk(
  options: CourseGenerationOptions,
  coursesToCreate?: CourseToCreate[],
  onProgress?: (progress: { currentIndex: number; total: number; currentStep: string; itemName: string; percentage: number }) => void
): Promise<CourseGenerationResult> {
  const result: CourseGenerationResult = {
    coursesCreated: 0,
    errors: [],
    failedCourses: [],
  };

  try {
    console.log('[CourseBulkGenerator] Starting bulk course generation...');
    console.log(`[CourseBulkGenerator] Institution: ${options.institution}`);
    console.log(`[CourseBulkGenerator] Sections: ${options.sections.length > 0 ? options.sections.join(', ') : 'None'}`);
    console.log(`[CourseBulkGenerator] Levels: ${options.levelIds.length}`);
    console.log(`[CourseBulkGenerator] User ID: ${options.userId}`);

    // Usar el UUID del usuario logueado
    const userUUID = options.userId;
    
    if (!userUUID) {
      throw new Error('User ID is required to create courses');
    }

    // Si no se proporcionan cursos, generarlos
    let courses = coursesToCreate;
    if (!courses) {
      courses = generateCoursesInMemory(options);
    }

    // Validar que todos los levelIds sean válidos
    console.log('[CourseBulkGenerator] Validating levelIds...', options.levelIds);
    for (const levelId of options.levelIds) {
      if (!isValidUUID(levelId)) {
        const availableLevels = educationalLevelStore.getAllLevels();
        const levelNames = availableLevels.map(l => l.name).join(', ') || 'ninguno';
        throw new Error(
          `❌ El nivel '${levelId}' no tiene un UUID válido.\n\n` +
          `Esto ocurre porque los niveles deben ser cargados desde Data-Connect.\n\n` +
          `✅ Solución: Ve a "Gestión Académica > Categorías de Niveles" o "Gestión Académica > Niveles Educacionales"` +
          ` y carga la configuración de Chile primero.\n\n` +
          `Niveles disponibles actualmente: ${levelNames}`
        );
      }
      const level = educationalLevelStore.getLevelById(levelId);
      if (!level) {
        throw new Error(`Level not found in store: ${levelId}`);
      }
      console.log(`[CourseBulkGenerator] Level validated: ${level.name} (${levelId})`);
    }

    console.log(`[CourseBulkGenerator] Will create ${courses.length} courses`);

    // Crear cursos
    for (let idx = 0; idx < courses.length; idx++) {
      const course = courses[idx];
      
      try {
        const courseId = await courseStore.createCourse(
          {
            name: course.name,
            code: course.code,
            levelId: course.levelId,
            institution: course.institution,
            section: course.section,
            active: true,
          },
          userUUID
        );
        result.coursesCreated++;
        console.log(`[CourseBulkGenerator] Created course: ${course.name} (${courseId})`);
        
        // Reportar progreso después de cada curso creado
        if (onProgress) {
          const percentage = Math.round(((idx + 1) / courses.length) * 100);
          onProgress({
            currentIndex: idx + 1,
            total: courses.length,
            currentStep: '📚 Generando cursos',
            itemName: course.name,
            percentage,
          });
          
          // Pequeño delay para que se note la transición (50ms)
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      } catch (error) {
        const errorMsg = `Failed to create course ${course.name}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        result.errors.push(errorMsg);
        result.failedCourses?.push({
          courseCode: course.code,
          courseName: course.name,
          error: error instanceof Error ? error.message : String(error),
        });
        // Continue with next course
        
        // Reportar progreso incluso en caso de error
        if (onProgress) {
          const percentage = Math.round(((idx + 1) / courses.length) * 100);
          onProgress({
            currentIndex: idx + 1,
            total: courses.length,
            currentStep: '📚 Generando cursos',
            itemName: `${course.name} (❌ Error)`,
            percentage,
          });
          
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }
    }

    console.log('[CourseBulkGenerator] Bulk generation completed:', result);
    return result;
  } catch (error) {
    const errorMsg = `Unexpected error in course bulk generator: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
    return result;
  }
}
