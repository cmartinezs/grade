/**
 * Utilidades para procesamiento de archivos CSV de jerarquía curricular
 */

// ============================================================================
// TIPOS
// ============================================================================

export type EntityType = 'asignatura' | 'unidad' | 'tema';

export interface ParsedCSVRow {
  tipo: string;
  nombre: string;
  codigo: string;
  nivelEducativo: string;
  asignaturaPadre: string;
  unidadPadre: string;
  descripcion: string;
  raw: string[];
}

export interface ValidationRule {
  requiredFields: (keyof ParsedCSVRow)[];
  forbiddenFields: (keyof ParsedCSVRow)[];
  fieldLabels: Record<string, string>;
}

export interface EntityMaps {
  subjectIdMap: Map<string, string>;        // nombre -> id
  subjectByCodeMap: Map<string, string>;    // código (uppercase) -> id
  subjectIdToName: Map<string, string>;     // id -> nombre
  unitIdMap: Map<string, string>;           // "asignatura|unidad" -> id
  unitByCodeMap: Map<string, string>;       // código (uppercase) -> id
  levelByCodeMap: Map<string, string>;      // código (lowercase) -> id
  levelByNameMap: Map<string, string>;      // nombre (lowercase) -> id
}

// ============================================================================
// CONSTANTES
// ============================================================================

export const EXPECTED_HEADERS = [
  'tipo', 'nombre', 'codigo', 'nivel_educativo', 
  'asignatura_padre', 'unidad_padre', 'descripcion'
];

export const VALID_TYPES: EntityType[] = ['asignatura', 'unidad', 'tema'];

export const VALIDATION_RULES: Record<EntityType, ValidationRule> = {
  asignatura: {
    requiredFields: ['nombre', 'codigo', 'nivelEducativo'],
    forbiddenFields: ['asignaturaPadre', 'unidadPadre'],
    fieldLabels: {
      nombre: 'nombre',
      codigo: 'codigo',
      nivelEducativo: 'nivel_educativo',
      asignaturaPadre: 'asignatura_padre',
      unidadPadre: 'unidad_padre'
    }
  },
  unidad: {
    requiredFields: ['nombre', 'codigo', 'asignaturaPadre'],
    forbiddenFields: ['nivelEducativo', 'unidadPadre'],
    fieldLabels: {
      nombre: 'nombre',
      codigo: 'codigo',
      nivelEducativo: 'nivel_educativo',
      asignaturaPadre: 'asignatura_padre',
      unidadPadre: 'unidad_padre'
    }
  },
  tema: {
    requiredFields: ['nombre', 'codigo', 'asignaturaPadre', 'unidadPadre'],
    forbiddenFields: ['nivelEducativo'],
    fieldLabels: {
      nombre: 'nombre',
      codigo: 'codigo',
      nivelEducativo: 'nivel_educativo',
      asignaturaPadre: 'asignatura_padre',
      unidadPadre: 'unidad_padre'
    }
  }
};

// Porcentajes de progreso para validación
export const PROGRESS = {
  PREP_PERCENT: 5,
  VALIDATION_PERCENT: 90,
  DB_CHECK_PERCENT: 5
};

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
 * Parsea una línea CSV a un objeto estructurado
 */
export const parseCSVRowToObject = (line: string): ParsedCSVRow => {
  const values = parseCSVLine(line);
  return {
    tipo: values[0] || '',
    nombre: values[1] || '',
    codigo: values[2] || '',
    nivelEducativo: values[3] || '',
    asignaturaPadre: values[4] || '',
    unidadPadre: values[5] || '',
    descripcion: values[6] || '',
    raw: values
  };
};

/**
 * Obtiene el tipo de entidad normalizado
 */
export const getEntityType = (tipo: string): EntityType | null => {
  const normalized = tipo.toLowerCase() as EntityType;
  return VALID_TYPES.includes(normalized) ? normalized : null;
};

// ============================================================================
// FUNCIONES DE BÚSQUEDA DE ENTIDADES
// ============================================================================

/**
 * Busca una entidad por código (prioritario) o nombre en los mapas proporcionados
 */
export const findEntityByCodeOrName = (
  value: string,
  codeMap: Map<string, string>,
  nameMap: Map<string, string>,
  entityType: string
): string => {
  // Primero buscar por código (normalizado a mayúsculas)
  let id = codeMap.get(normalizeCode(value));
  
  // Si no se encuentra, buscar por nombre
  if (!id) {
    id = nameMap.get(value);
  }
  
  if (!id) {
    throw new Error(`${entityType} "${value}" no encontrada`);
  }
  
  return id;
};

/**
 * Busca un nivel educativo por código o nombre
 */
export const findLevelByCodeOrName = (
  value: string,
  levelByCodeMap: Map<string, string>,
  levelByNameMap: Map<string, string>
): string | null => {
  const normalizedLower = value.toLowerCase();
  return levelByCodeMap.get(normalizedLower) || levelByNameMap.get(normalizedLower) || null;
};

/**
 * Busca el ID de una asignatura por código o nombre
 */
export const findSubjectId = (
  value: string,
  maps: Pick<EntityMaps, 'subjectByCodeMap' | 'subjectIdMap'>
): string => {
  return findEntityByCodeOrName(
    value,
    maps.subjectByCodeMap,
    maps.subjectIdMap,
    'Asignatura'
  );
};

/**
 * Busca el ID de una unidad por código o nombre (requiere nombre de asignatura para el nombre)
 */
export const findUnitId = (
  value: string,
  subjectName: string,
  maps: Pick<EntityMaps, 'unitByCodeMap' | 'unitIdMap'>
): string => {
  // Primero buscar por código
  let id = maps.unitByCodeMap.get(normalizeCode(value));
  
  // Si no, buscar por nombre compuesto
  if (!id) {
    id = maps.unitIdMap.get(`${subjectName}|${value}`);
  }
  
  if (!id) {
    throw new Error(`Unidad "${value}" en asignatura "${subjectName}" no encontrada`);
  }
  
  return id;
};

// ============================================================================
// FUNCIONES PARA CONSTRUIR MAPAS
// ============================================================================

interface BaseEntity {
  active: boolean;
  code: string;
}

interface SubjectEntity extends BaseEntity {
  subjectId: string;
  name: string;
}

interface UnitEntity extends BaseEntity {
  unitId: string;
  name: string;
  subjectId: string;
}

interface LevelEntity {
  code: string;
  name: string;
  levelId: string;
}

/**
 * Construye los mapas de asignaturas a partir de datos existentes
 */
export const buildSubjectMaps = (
  subjects: SubjectEntity[]
): Pick<EntityMaps, 'subjectIdMap' | 'subjectByCodeMap' | 'subjectIdToName'> => {
  const subjectIdMap = new Map<string, string>();
  const subjectByCodeMap = new Map<string, string>();
  const subjectIdToName = new Map<string, string>();
  
  subjects.forEach(subject => {
    if (subject.active) {
      subjectIdMap.set(subject.name, subject.subjectId);
      subjectByCodeMap.set(normalizeCode(subject.code), subject.subjectId);
      subjectIdToName.set(subject.subjectId, subject.name);
    }
  });
  
  return { subjectIdMap, subjectByCodeMap, subjectIdToName };
};

/**
 * Construye los mapas de unidades a partir de datos existentes
 */
export const buildUnitMaps = (
  units: UnitEntity[],
  subjectIdToName: Map<string, string>
): Pick<EntityMaps, 'unitIdMap' | 'unitByCodeMap'> => {
  const unitIdMap = new Map<string, string>();
  const unitByCodeMap = new Map<string, string>();
  
  units.forEach(unit => {
    if (unit.active) {
      const subjectName = subjectIdToName.get(unit.subjectId);
      if (subjectName) {
        unitIdMap.set(`${subjectName}|${unit.name}`, unit.unitId);
      }
      unitByCodeMap.set(normalizeCode(unit.code), unit.unitId);
    }
  });
  
  return { unitIdMap, unitByCodeMap };
};

/**
 * Construye un set de códigos existentes para validación de duplicados
 */
export const buildExistingCodesSet = <T extends BaseEntity>(
  entities: T[],
): Set<string> => {
  const codesSet = new Set<string>();
  entities.forEach(entity => {
    if (entity.active && entity.code) {
      codesSet.add(normalizeCode(entity.code));
    }
  });
  return codesSet;
};

/**
 * Construye los mapas de niveles educativos
 */
export const buildLevelMaps = (
  levels: LevelEntity[]
): Pick<EntityMaps, 'levelByCodeMap' | 'levelByNameMap'> => {
  const levelByCodeMap = new Map<string, string>();
  const levelByNameMap = new Map<string, string>();
  
  levels.forEach(level => {
    levelByCodeMap.set(level.code.toLowerCase(), level.levelId);
    levelByNameMap.set(level.name.toLowerCase(), level.levelId);
  });
  
  return { levelByCodeMap, levelByNameMap };
};

// ============================================================================
// FUNCIONES DE VALIDACIÓN
// ============================================================================

/**
 * Valida los encabezados del CSV
 */
export const validateHeaders = (headerLine: string): string[] => {
  const headers = parseCSVLine(headerLine);
  const errors: string[] = [];
  
  if (headers.length !== EXPECTED_HEADERS.length) {
    errors.push(`Se esperan ${EXPECTED_HEADERS.length} columnas, pero se encontraron ${headers.length}`);
  }
  
  EXPECTED_HEADERS.forEach((expected, idx) => {
    if (headers[idx] !== expected) {
      errors.push(`Columna ${idx + 1}: se esperaba "${expected}" pero se encontró "${headers[idx] || '(vacío)'}"`);
    }
  });
  
  if (headers.length > EXPECTED_HEADERS.length) {
    const extraHeaders = headers.slice(EXPECTED_HEADERS.length);
    errors.push(`Columnas extra no permitidas: ${extraHeaders.join(', ')}`);
  }
  
  return errors;
};

/**
 * Valida una fila según las reglas del tipo de entidad
 */
export const validateRowByType = (
  row: ParsedCSVRow,
  rowNumber: number
): string[] => {
  const errors: string[] = [];
  const entityType = getEntityType(row.tipo);
  
  // Validar número de columnas
  if (row.raw.length !== EXPECTED_HEADERS.length) {
    errors.push(`Fila ${rowNumber}: número incorrecto de columnas (${row.raw.length} en lugar de ${EXPECTED_HEADERS.length})`);
    return errors;
  }
  
  // Validar tipo
  if (!entityType) {
    errors.push(`Fila ${rowNumber}: tipo "${row.tipo}" no válido. Debe ser: asignatura, unidad o tema`);
    return errors;
  }
  
  const rules = VALIDATION_RULES[entityType];
  
  // Validar campos obligatorios
  for (const field of rules.requiredFields) {
    if (!row[field]) {
      const fieldLabel = rules.fieldLabels[field] || field;
      errors.push(`Fila ${rowNumber}: el campo "${fieldLabel}" es obligatorio para ${entityType}s`);
    }
  }
  
  // Validar campos prohibidos
  for (const field of rules.forbiddenFields) {
    if (row[field]) {
      const fieldLabel = rules.fieldLabels[field] || field;
      errors.push(`Fila ${rowNumber}: ${getArticle(entityType)} ${entityType}s no deben tener "${fieldLabel}"`);
    }
  }
  
  return errors;
};

/**
 * Obtiene el artículo correcto para el tipo de entidad
 */
const getArticle = (tipo: EntityType): string => {
  return tipo === 'asignatura' ? 'las' : tipo === 'unidad' ? 'las' : 'los';
};

// ============================================================================
// DETECCIÓN DE DUPLICADOS
// ============================================================================

interface DuplicateInfo {
  code: string;
  tipo: EntityType;
  rows: number[];
}

interface CodeCollectionResult {
  subjectCodes: Map<string, number>;
  unitCodes: Map<string, number>;
  topicCodes: Map<string, number>;
  duplicates: DuplicateInfo[];
}

/**
 * Recolecta códigos por tipo y detecta duplicados dentro del archivo
 */
export const collectCodesAndFindDuplicates = (lines: string[]): CodeCollectionResult => {
  const subjectCodes = new Map<string, number>();
  const unitCodes = new Map<string, number>();
  const topicCodes = new Map<string, number>();
  const duplicates: DuplicateInfo[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRowToObject(lines[i]);
    const entityType = getEntityType(row.tipo);
    
    if (!row.codigo || !entityType) continue;
    
    const normalizedCode = normalizeCode(row.codigo);
    let targetMap: Map<string, number>;
    
    switch (entityType) {
      case 'asignatura':
        targetMap = subjectCodes;
        break;
      case 'unidad':
        targetMap = unitCodes;
        break;
      case 'tema':
        targetMap = topicCodes;
        break;
    }
    
    if (targetMap.has(normalizedCode)) {
      // Encontrado duplicado del mismo tipo
      const existingEntry = duplicates.find(d => d.code === normalizedCode && d.tipo === entityType);
      if (existingEntry) {
        existingEntry.rows.push(i + 1);
      } else {
        duplicates.push({
          code: normalizedCode,
          tipo: entityType,
          rows: [targetMap.get(normalizedCode)!, i + 1]
        });
      }
    } else {
      targetMap.set(normalizedCode, i + 1);
    }
  }
  
  return { subjectCodes, unitCodes, topicCodes, duplicates };
};

/**
 * Genera errores a partir de duplicados encontrados
 */
export const generateDuplicateErrors = (duplicates: DuplicateInfo[]): string[] => {
  return duplicates.map(dup => 
    `Código "${dup.code}" duplicado para ${dup.tipo}s en el archivo (filas: ${dup.rows.join(', ')}). Cada código de ${dup.tipo} debe ser único.`
  );
};

// ============================================================================
// VALIDACIÓN DE INTEGRIDAD REFERENCIAL
// ============================================================================

interface ReferenceToValidate {
  row: number;
  tipo: EntityType;
  field: 'asignatura_padre' | 'unidad_padre';
  code: string;
}

/**
 * Recolecta referencias padre para validar integridad referencial
 */
export const collectReferencesToValidate = (lines: string[]): ReferenceToValidate[] => {
  const references: ReferenceToValidate[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRowToObject(lines[i]);
    const entityType = getEntityType(row.tipo);
    
    if (entityType === 'unidad' && row.asignaturaPadre) {
      references.push({
        row: i + 1,
        tipo: 'unidad',
        field: 'asignatura_padre',
        code: normalizeCode(row.asignaturaPadre)
      });
    }
    
    if (entityType === 'tema') {
      if (row.asignaturaPadre) {
        references.push({
          row: i + 1,
          tipo: 'tema',
          field: 'asignatura_padre',
          code: normalizeCode(row.asignaturaPadre)
        });
      }
      if (row.unidadPadre) {
        references.push({
          row: i + 1,
          tipo: 'tema',
          field: 'unidad_padre',
          code: normalizeCode(row.unidadPadre)
        });
      }
    }
  }
  
  return references;
};

/**
 * Valida integridad referencial de las referencias recolectadas
 */
export const validateReferences = (
  references: ReferenceToValidate[],
  subjectCodesInFile: Map<string, number>,
  unitCodesInFile: Map<string, number>,
  existingSubjectCodes: Set<string>,
  existingUnitCodes: Set<string>
): string[] => {
  const errors: string[] = [];
  
  for (const ref of references) {
    if (ref.field === 'asignatura_padre') {
      const existsInFile = subjectCodesInFile.has(ref.code);
      const existsInDB = existingSubjectCodes.has(ref.code);
      if (!existsInFile && !existsInDB) {
        errors.push(`Fila ${ref.row}: el ${ref.tipo} referencia a asignatura_padre "${ref.code}" que no existe ni en el archivo ni en el sistema.`);
      }
    } else if (ref.field === 'unidad_padre') {
      const existsInFile = unitCodesInFile.has(ref.code);
      const existsInDB = existingUnitCodes.has(ref.code);
      if (!existsInFile && !existsInDB) {
        errors.push(`Fila ${ref.row}: el tema referencia a unidad_padre "${ref.code}" que no existe ni en el archivo ni en el sistema.`);
      }
    }
  }
  
  return errors;
};

// ============================================================================
// VALIDACIÓN CONTRA BASE DE DATOS
// ============================================================================

interface ExistingCodeSets {
  subjects: Set<string>;
  units: Set<string>;
  topics: Set<string>;
}

/**
 * Valida códigos del archivo contra códigos existentes en la BD
 */
export const validateAgainstExistingCodes = (
  row: ParsedCSVRow,
  rowNumber: number,
  existingCodes: ExistingCodeSets
): string | null => {
  const entityType = getEntityType(row.tipo);
  if (!entityType || !row.codigo) return null;
  
  const normalizedCode = normalizeCode(row.codigo);
  
  switch (entityType) {
    case 'asignatura':
      if (existingCodes.subjects.has(normalizedCode)) {
        return `Fila ${rowNumber}: El código "${row.codigo}" ya existe en el sistema como asignatura. Usa un código diferente o elimina esta fila si no deseas duplicar.`;
      }
      break;
    case 'unidad':
      if (existingCodes.units.has(normalizedCode)) {
        return `Fila ${rowNumber}: El código "${row.codigo}" ya existe en el sistema como unidad. Usa un código diferente o elimina esta fila si no deseas duplicar.`;
      }
      break;
    case 'tema':
      if (existingCodes.topics.has(normalizedCode)) {
        return `Fila ${rowNumber}: El código "${row.codigo}" ya existe en el sistema como tema. Usa un código diferente o elimina esta fila si no deseas duplicar.`;
      }
      break;
  }
  
  return null;
};

/**
 * Valida nivel educativo contra niveles existentes
 */
export const validateLevelExists = (
  row: ParsedCSVRow,
  rowNumber: number,
  levelByCodeMap: Map<string, string>,
  levelByNameMap: Map<string, string>
): string | null => {
  const entityType = getEntityType(row.tipo);
  
  if (entityType === 'asignatura' && row.nivelEducativo) {
    const normalizedLevel = row.nivelEducativo.toUpperCase();
    const levelExists = levelByCodeMap.has(normalizedLevel.toLowerCase()) || 
                       levelByNameMap.has(normalizedLevel.toLowerCase());
    
    if (!levelExists) {
      return `Fila ${rowNumber}: El nivel educativo "${row.nivelEducativo}" no existe en el sistema. Revisa los niveles disponibles en el módulo de configuración.`;
    }
  }
  
  return null;
};

// ============================================================================
// CONTADORES
// ============================================================================

export interface EntityCounts {
  subjects: number;
  units: number;
  topics: number;
}

/**
 * Cuenta entidades por tipo en las líneas del CSV
 */
export const countEntitiesByType = (lines: string[]): EntityCounts => {
  const counts: EntityCounts = { subjects: 0, units: 0, topics: 0 };
  
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRowToObject(lines[i]);
    const entityType = getEntityType(row.tipo);
    
    switch (entityType) {
      case 'asignatura':
        counts.subjects++;
        break;
      case 'unidad':
        counts.units++;
        break;
      case 'tema':
        counts.topics++;
        break;
    }
  }
  
  return counts;
};
