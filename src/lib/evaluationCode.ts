/**
 * Utilidad para generar y decodificar códigos de acceso a evaluaciones.
 * 
 * Este sistema permite crear códigos alfanuméricos CORTOS que codifican
 * la información de courseId y evaluationId, sirviendo como fallback
 * cuando el estudiante no puede escanear el código QR.
 * 
 * El algoritmo usa:
 * 1. Extracción de segmentos clave de los UUIDs
 * 2. Codificación Base32 (caracteres sin ambigüedad: sin 0,O,1,I,L)
 * 3. XOR simple para ofuscación
 */

// Clave secreta corta para XOR
const SECRET = [71, 82, 65, 68, 69]; // "GRADE" en ASCII

// Alfabeto Base32 sin caracteres ambiguos (sin 0,O,1,I,L)
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Extrae 8 caracteres significativos de un UUID
 * Toma los primeros 4 y últimos 4 del UUID limpio
 */
function extractUUIDKey(uuid: string): string {
  const clean = uuid.replace(/-/g, '').toUpperCase();
  return clean.slice(0, 4) + clean.slice(-4);
}

/**
 * Convierte hex a número
 */
function hexToNum(hex: string): number {
  return parseInt(hex, 16);
}

/**
 * Convierte número a Base32
 */
function numToBase32(num: number, length: number): string {
  let result = '';
  while (num > 0) {
    result = ALPHABET[num % 32] + result;
    num = Math.floor(num / 32);
  }
  return result.padStart(length, ALPHABET[0]);
}

/**
 * Convierte Base32 a número
 */
function base32ToNum(str: string): number {
  let result = 0;
  for (const char of str) {
    const index = ALPHABET.indexOf(char.toUpperCase());
    if (index === -1) return -1;
    result = result * 32 + index;
  }
  return result;
}

/**
 * Aplica XOR simple para ofuscar
 */
function xorBytes(bytes: number[]): number[] {
  return bytes.map((b, i) => b ^ SECRET[i % SECRET.length]);
}

/**
 * Calcula checksum simple (suma mod 32)
 */
function checksum(bytes: number[]): number {
  return bytes.reduce((sum, b) => (sum + b) % 32, 0);
}

export interface EvaluationAccessPayload {
  courseId: string;
  evaluationId: string;
}

/**
 * Genera un código de acceso CORTO (12 caracteres)
 * Formato: XXXX-XXXX-XX (10 chars de datos + 2 de checksum)
 */
export function generateAccessCode(payload: EvaluationAccessPayload): string {
  // Extraer 8 hex de cada UUID (4 bytes cada uno)
  const courseKey = extractUUIDKey(payload.courseId);
  const evalKey = extractUUIDKey(payload.evaluationId);
  
  // Convertir hex a bytes (4 bytes de course + 4 bytes de eval = 8 bytes)
  const bytes = [
    hexToNum(courseKey.slice(0, 2)),
    hexToNum(courseKey.slice(2, 4)),
    hexToNum(courseKey.slice(4, 6)),
    hexToNum(courseKey.slice(6, 8)),
    hexToNum(evalKey.slice(0, 2)),
    hexToNum(evalKey.slice(2, 4)),
    hexToNum(evalKey.slice(4, 6)),
    hexToNum(evalKey.slice(6, 8)),
  ];
  
  // Ofuscar con XOR
  const obfuscated = xorBytes(bytes);
  
  // Convertir cada byte a Base32 (2 chars por byte = 16 chars)
  // Pero comprimimos: cada par de bytes (16 bits) = 4 chars Base32
  const part1 = numToBase32((obfuscated[0] << 8) | obfuscated[1], 4);
  const part2 = numToBase32((obfuscated[2] << 8) | obfuscated[3], 4);
  const part3 = numToBase32((obfuscated[4] << 8) | obfuscated[5], 4);
  const part4 = numToBase32((obfuscated[6] << 8) | obfuscated[7], 4);
  
  // Checksum (1 char)
  const check = ALPHABET[checksum(obfuscated)];
  
  // Formato: XXXX-XXXX-XXXX-XXXX-X (17 chars con guiones, 13 sin guiones)
  return `${part1}-${part2}-${part3}-${part4}-${check}`;
}

/**
 * Decodifica un código de acceso
 * Retorna null si el código es inválido
 * 
 * NOTA: Este decode retorna las "keys" parciales, no los UUIDs completos.
 * La app móvil deberá buscar en su caché local o hacer una llamada al servidor
 * para encontrar los IDs completos que coincidan con estas keys.
 */
export function decodeAccessCode(code: string): { courseKey: string; evalKey: string } | null {
  try {
    // Limpiar código
    const clean = code.replace(/[-\s]/g, '').toUpperCase();
    
    if (clean.length !== 17) return null;
    
    // Separar partes y checksum
    const part1 = clean.slice(0, 4);
    const part2 = clean.slice(4, 8);
    const part3 = clean.slice(8, 12);
    const part4 = clean.slice(12, 16);
    const checkChar = clean.slice(16, 17);
    
    // Convertir Base32 a números
    const num1 = base32ToNum(part1);
    const num2 = base32ToNum(part2);
    const num3 = base32ToNum(part3);
    const num4 = base32ToNum(part4);
    
    if (num1 < 0 || num2 < 0 || num3 < 0 || num4 < 0) return null;
    
    // Extraer bytes
    const obfuscated = [
      (num1 >> 8) & 0xFF, num1 & 0xFF,
      (num2 >> 8) & 0xFF, num2 & 0xFF,
      (num3 >> 8) & 0xFF, num3 & 0xFF,
      (num4 >> 8) & 0xFF, num4 & 0xFF,
    ];
    
    // Verificar checksum
    const expectedCheck = ALPHABET[checksum(obfuscated)];
    if (checkChar !== expectedCheck) return null;
    
    // Desofuscar
    const bytes = xorBytes(obfuscated);
    
    // Reconstruir keys hex
    const courseKey = bytes.slice(0, 4).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const evalKey = bytes.slice(4, 8).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    
    return { courseKey, evalKey };
  } catch {
    return null;
  }
}

/**
 * Valida si un código tiene el formato correcto
 */
export function isValidCodeFormat(code: string): boolean {
  const clean = code.replace(/[-\s]/g, '').toUpperCase();
  if (clean.length !== 17) return false;
  return [...clean].every(c => ALPHABET.includes(c));
}

/**
 * Verifica si un par de IDs coincide con un código
 * Útil para validar en el servidor
 */
export function verifyAccessCode(code: string, courseId: string, evaluationId: string): boolean {
  const decoded = decodeAccessCode(code);
  if (!decoded) return false;
  
  const expectedCourseKey = extractUUIDKey(courseId);
  const expectedEvalKey = extractUUIDKey(evaluationId);
  
  return decoded.courseKey === expectedCourseKey && decoded.evalKey === expectedEvalKey;
}
