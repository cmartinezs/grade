/**
 * Utilidades para procesamiento de archivos CSV de importación de preguntas
 */

// ============================================================================
// TIPOS
// ============================================================================

export interface ParsedQuestionRow {
  tipoPregunta: string;
  enunciado: string;
  asignatura: string;
  unidad: string;
  tema: string;
  dificultad: string;
  taxonomia: string;
  opciones: Array<{ texto: string; correcta: boolean }>;
  raw: string[];
}

export interface QuestionEntityMaps {
  // Topics
  topicByCodeMap: Map<string, string>;      // código (uppercase) -> id
  topicByNameMap: Map<string, string>;      // nombre (lowercase) -> id
  // Difficulties
  difficultyByCodeMap: Map<string, string>; // código (uppercase) -> id
  difficultyByLevelMap: Map<string, string>;// level (lowercase) -> id
  // Taxonomies
  taxonomyByCodeMap: Map<string, string>;   // código (uppercase) -> id
  taxonomyByNameMap: Map<string, string>;   // nombre (lowercase) -> id
  // Question Types
  questionTypeByCodeMap: Map<string, string>; // código (uppercase) -> id
  questionTypeByNameMap: Map<string, string>; // nombre (lowercase) -> id
  // Question Type details
  questionTypeDetailsMap: Map<string, { minOptions: number; maxOptions: number; correctOptions: number }>;
}

export interface QuestionValidationResult {
  isValid: boolean;
  errors: string[];
  resolvedIds?: {
    topicId: string;
    difficultyId: string;
    taxonomyId: string;
    questionTypeId: string;
  };
}

// ============================================================================
// CONSTANTES
// ============================================================================

export const QUESTION_EXPECTED_HEADERS = [
  'tipo_pregunta',
  'enunciado',
  'asignatura',
  'unidad',
  'tema',
  'dificultad',
  'taxonomia',
  'opcion_1',
  'opcion_1_correcta',
  'opcion_2',
  'opcion_2_correcta',
  'opcion_3',
  'opcion_3_correcta',
  'opcion_4',
  'opcion_4_correcta',
  'opcion_5',
  'opcion_5_correcta'
];

// Porcentajes de progreso para validación
export const QUESTION_PROGRESS = {
  PREP_PERCENT: 5,
  VALIDATION_PERCENT: 85,
  DB_CHECK_PERCENT: 10
};

// Valores permitidos para "correcta"
const TRUE_VALUES = ['si', 'sí', 'yes', 'true', '1', 'verdadero', 'v'];
const FALSE_VALUES = ['no', 'false', '0', 'falso', 'f'];

// ============================================================================
// FUNCIONES UTILITARIAS BÁSICAS
// ============================================================================

/**
 * Parsea una línea CSV separada por punto y coma
 */
export const parseCSVLine = (line: string): string[] => {
  return line.split(';').map(v => v.trim().replace(/^"|"$/g, ''));
};

/**
 * Normaliza un código a mayúsculas para comparación case-insensitive
 */
export const normalizeCode = (code: string): string => {
  return code?.toUpperCase() || '';
};

/**
 * Normaliza un nombre a minúsculas para comparación case-insensitive
 */
export const normalizeName = (name: string): string => {
  return name?.toLowerCase().trim() || '';
};

/**
 * Parsea un valor booleano desde el CSV
 */
export const parseBoolean = (value: string): boolean | null => {
  const normalized = value.toLowerCase().trim();
  if (TRUE_VALUES.includes(normalized)) return true;
  if (FALSE_VALUES.includes(normalized)) return false;
  return null;
};

/**
 * Parsea una línea CSV a un objeto de pregunta estructurado
 */
export const parseQuestionRowToObject = (line: string): ParsedQuestionRow => {
  const values = parseCSVLine(line);
  
  // Parsear las opciones (hasta 5)
  const opciones: Array<{ texto: string; correcta: boolean }> = [];
  for (let i = 0; i < 5; i++) {
    const textoIdx = 7 + (i * 2);  // 7, 9, 11, 13, 15
    const correctaIdx = 8 + (i * 2); // 8, 10, 12, 14, 16
    
    const texto = values[textoIdx] || '';
    const correctaRaw = values[correctaIdx] || '';
    
    if (texto.trim()) {
      const correcta = parseBoolean(correctaRaw);
      opciones.push({
        texto: texto.trim(),
        correcta: correcta === true
      });
    }
  }
  
  return {
    tipoPregunta: values[0] || '',
    enunciado: values[1] || '',
    asignatura: values[2] || '',
    unidad: values[3] || '',
    tema: values[4] || '',
    dificultad: values[5] || '',
    taxonomia: values[6] || '',
    opciones,
    raw: values
  };
};

// ============================================================================
// FUNCIONES DE VALIDACIÓN DE ENCABEZADOS
// ============================================================================

/**
 * Valida los encabezados del CSV de preguntas
 */
export const validateQuestionHeaders = (headerLine: string): string[] => {
  const headers = parseCSVLine(headerLine);
  const errors: string[] = [];
  
  if (headers.length < QUESTION_EXPECTED_HEADERS.length) {
    errors.push(`Se esperan al menos ${QUESTION_EXPECTED_HEADERS.length} columnas, pero se encontraron ${headers.length}`);
  }
  
  // Validar los primeros 7 headers obligatorios más estrictos
  const requiredHeaders = QUESTION_EXPECTED_HEADERS.slice(0, 7);
  requiredHeaders.forEach((expected, idx) => {
    if (headers[idx] !== expected) {
      errors.push(`Columna ${idx + 1}: se esperaba "${expected}" pero se encontró "${headers[idx] || '(vacío)'}"`);
    }
  });
  
  // Validar estructura de opciones (menos estricto, solo verificar patrón)
  for (let i = 1; i <= 5; i++) {
    const opcionIdx = 7 + ((i - 1) * 2);
    const correctaIdx = opcionIdx + 1;
    
    if (headers[opcionIdx] && headers[opcionIdx] !== `opcion_${i}`) {
      errors.push(`Columna ${opcionIdx + 1}: se esperaba "opcion_${i}" pero se encontró "${headers[opcionIdx]}"`);
    }
    if (headers[correctaIdx] && headers[correctaIdx] !== `opcion_${i}_correcta`) {
      errors.push(`Columna ${correctaIdx + 1}: se esperaba "opcion_${i}_correcta" pero se encontró "${headers[correctaIdx]}"`);
    }
  }
  
  return errors;
};

// ============================================================================
// FUNCIONES PARA CONSTRUIR MAPAS
// ============================================================================

interface TopicEntity {
  topicId: string;
  code: string;
  name: string;
  active: boolean;
}

interface DifficultyEntity {
  difficultyId: string;
  code: string;
  level: string;
  active: boolean;
}

interface TaxonomyEntity {
  taxonomyId: string;
  code: string;
  name: string;
  active: boolean;
}

interface QuestionTypeEntity {
  questionTypeId: string;
  code: string;
  name: string;
  minOptions: number;
  maxOptions: number;
  correctOptions: number;
  active: boolean;
}

/**
 * Construye los mapas de topics
 */
export const buildTopicMaps = (
  topics: TopicEntity[]
): Pick<QuestionEntityMaps, 'topicByCodeMap' | 'topicByNameMap'> => {
  const topicByCodeMap = new Map<string, string>();
  const topicByNameMap = new Map<string, string>();
  
  topics.forEach(topic => {
    if (topic.active) {
      topicByCodeMap.set(normalizeCode(topic.code), topic.topicId);
      topicByNameMap.set(normalizeName(topic.name), topic.topicId);
    }
  });
  
  return { topicByCodeMap, topicByNameMap };
};

/**
 * Construye los mapas de difficulties
 */
export const buildDifficultyMaps = (
  difficulties: DifficultyEntity[]
): Pick<QuestionEntityMaps, 'difficultyByCodeMap' | 'difficultyByLevelMap'> => {
  const difficultyByCodeMap = new Map<string, string>();
  const difficultyByLevelMap = new Map<string, string>();
  
  difficulties.forEach(diff => {
    if (diff.active) {
      difficultyByCodeMap.set(normalizeCode(diff.code), diff.difficultyId);
      difficultyByLevelMap.set(normalizeName(diff.level), diff.difficultyId);
    }
  });
  
  return { difficultyByCodeMap, difficultyByLevelMap };
};

/**
 * Construye los mapas de taxonomies
 */
export const buildTaxonomyMaps = (
  taxonomies: TaxonomyEntity[]
): Pick<QuestionEntityMaps, 'taxonomyByCodeMap' | 'taxonomyByNameMap'> => {
  const taxonomyByCodeMap = new Map<string, string>();
  const taxonomyByNameMap = new Map<string, string>();
  
  taxonomies.forEach(tax => {
    if (tax.active) {
      taxonomyByCodeMap.set(normalizeCode(tax.code), tax.taxonomyId);
      taxonomyByNameMap.set(normalizeName(tax.name), tax.taxonomyId);
    }
  });
  
  return { taxonomyByCodeMap, taxonomyByNameMap };
};

/**
 * Construye los mapas de question types
 */
export const buildQuestionTypeMaps = (
  questionTypes: QuestionTypeEntity[]
): Pick<QuestionEntityMaps, 'questionTypeByCodeMap' | 'questionTypeByNameMap' | 'questionTypeDetailsMap'> => {
  const questionTypeByCodeMap = new Map<string, string>();
  const questionTypeByNameMap = new Map<string, string>();
  const questionTypeDetailsMap = new Map<string, { minOptions: number; maxOptions: number; correctOptions: number }>();
  
  questionTypes.forEach(qt => {
    if (qt.active) {
      questionTypeByCodeMap.set(normalizeCode(qt.code), qt.questionTypeId);
      questionTypeByNameMap.set(normalizeName(qt.name), qt.questionTypeId);
      questionTypeDetailsMap.set(qt.questionTypeId, {
        minOptions: qt.minOptions,
        maxOptions: qt.maxOptions,
        correctOptions: qt.correctOptions
      });
    }
  });
  
  return { questionTypeByCodeMap, questionTypeByNameMap, questionTypeDetailsMap };
};

// ============================================================================
// FUNCIONES DE BÚSQUEDA DE ENTIDADES
// ============================================================================

/**
 * Busca un topic por código o nombre
 */
export const findTopicId = (
  value: string,
  maps: Pick<QuestionEntityMaps, 'topicByCodeMap' | 'topicByNameMap'>
): string | null => {
  // Primero por código
  let id = maps.topicByCodeMap.get(normalizeCode(value));
  if (id) return id;
  
  // Luego por nombre
  id = maps.topicByNameMap.get(normalizeName(value));
  return id || null;
};

/**
 * Busca un difficulty por código o level
 */
export const findDifficultyId = (
  value: string,
  maps: Pick<QuestionEntityMaps, 'difficultyByCodeMap' | 'difficultyByLevelMap'>
): string | null => {
  let id = maps.difficultyByCodeMap.get(normalizeCode(value));
  if (id) return id;
  
  id = maps.difficultyByLevelMap.get(normalizeName(value));
  return id || null;
};

/**
 * Busca una taxonomy por código o nombre
 */
export const findTaxonomyId = (
  value: string,
  maps: Pick<QuestionEntityMaps, 'taxonomyByCodeMap' | 'taxonomyByNameMap'>
): string | null => {
  let id = maps.taxonomyByCodeMap.get(normalizeCode(value));
  if (id) return id;
  
  id = maps.taxonomyByNameMap.get(normalizeName(value));
  return id || null;
};

/**
 * Busca un question type por código o nombre
 */
export const findQuestionTypeId = (
  value: string,
  maps: Pick<QuestionEntityMaps, 'questionTypeByCodeMap' | 'questionTypeByNameMap'>
): string | null => {
  let id = maps.questionTypeByCodeMap.get(normalizeCode(value));
  if (id) return id;
  
  id = maps.questionTypeByNameMap.get(normalizeName(value));
  return id || null;
};

// ============================================================================
// VALIDACIÓN DE FILAS
// ============================================================================

/**
 * Valida una fila de pregunta contra los mapas de entidades
 */
export const validateQuestionRow = (
  row: ParsedQuestionRow,
  rowNumber: number,
  maps: QuestionEntityMaps
): QuestionValidationResult => {
  const errors: string[] = [];
  
  // Validar campos obligatorios
  if (!row.enunciado.trim()) {
    errors.push(`Fila ${rowNumber}: el campo "enunciado" es obligatorio`);
  }
  
  if (!row.tema.trim()) {
    errors.push(`Fila ${rowNumber}: el campo "tema" es obligatorio`);
  }
  
  if (!row.dificultad.trim()) {
    errors.push(`Fila ${rowNumber}: el campo "dificultad" es obligatorio`);
  }
  
  if (!row.taxonomia.trim()) {
    errors.push(`Fila ${rowNumber}: el campo "taxonomia" es obligatorio`);
  }
  
  if (!row.tipoPregunta.trim()) {
    errors.push(`Fila ${rowNumber}: el campo "tipo_pregunta" es obligatorio`);
  }
  
  // Si hay errores de campos obligatorios, retornar temprano
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Buscar IDs de entidades
  const topicId = findTopicId(row.tema, maps);
  if (!topicId) {
    errors.push(`Fila ${rowNumber}: tema "${row.tema}" no encontrado en el sistema`);
  }
  
  const difficultyId = findDifficultyId(row.dificultad, maps);
  if (!difficultyId) {
    errors.push(`Fila ${rowNumber}: dificultad "${row.dificultad}" no encontrada en el sistema`);
  }
  
  const taxonomyId = findTaxonomyId(row.taxonomia, maps);
  if (!taxonomyId) {
    errors.push(`Fila ${rowNumber}: taxonomía "${row.taxonomia}" no encontrada en el sistema`);
  }
  
  const questionTypeId = findQuestionTypeId(row.tipoPregunta, maps);
  if (!questionTypeId) {
    errors.push(`Fila ${rowNumber}: tipo de pregunta "${row.tipoPregunta}" no encontrado en el sistema`);
  }
  
  // Validar opciones según el tipo de pregunta
  if (questionTypeId) {
    const typeDetails = maps.questionTypeDetailsMap.get(questionTypeId);
    if (typeDetails) {
      const numOpciones = row.opciones.length;
      const numCorrectas = row.opciones.filter(o => o.correcta).length;
      
      if (numOpciones < typeDetails.minOptions) {
        errors.push(`Fila ${rowNumber}: se requieren al menos ${typeDetails.minOptions} opciones para este tipo de pregunta, pero hay ${numOpciones}`);
      }
      
      if (numOpciones > typeDetails.maxOptions) {
        errors.push(`Fila ${rowNumber}: se permiten máximo ${typeDetails.maxOptions} opciones para este tipo de pregunta, pero hay ${numOpciones}`);
      }
      
      if (numCorrectas !== typeDetails.correctOptions) {
        errors.push(`Fila ${rowNumber}: este tipo de pregunta requiere exactamente ${typeDetails.correctOptions} opción(es) correcta(s), pero hay ${numCorrectas}`);
      }
    }
  }
  
  // Validar que todas las opciones tengan texto
  row.opciones.forEach((opcion, idx) => {
    if (!opcion.texto.trim()) {
      errors.push(`Fila ${rowNumber}: la opción ${idx + 1} no tiene texto`);
    }
  });
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    resolvedIds: {
      topicId: topicId!,
      difficultyId: difficultyId!,
      taxonomyId: taxonomyId!,
      questionTypeId: questionTypeId!
    }
  };
};

/**
 * Cuenta las preguntas en un archivo CSV
 */
export const countQuestions = (lines: string[]): number => {
  // Excluir header
  return lines.length - 1;
};
