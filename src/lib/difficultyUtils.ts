/**
 * Utilidades para el manejo de dificultad
 * Proporciona funciones para calcular colores basados en el peso (0-1)
 */

/**
 * Obtiene el color de dificultad como gradiente continuo RGB
 * @param weight - Valor entre 0 (fácil/verde) y 1 (difícil/rojo)
 * @returns Color en formato rgb()
 * 
 * Escala:
 * - 0.0 = Verde puro (#28a745)
 * - 0.5 = Amarillo puro (#ffc107)
 * - 1.0 = Rojo puro (#dc3545)
 */
export function getDifficultyColorRgb(weight: number | undefined): string {
  if (weight === undefined || weight === null) {
    return 'rgb(108, 117, 125)'; // secondary/gris
  }
  
  // Clamp weight entre 0 y 1
  const w = Math.max(0, Math.min(1, weight));
  
  // Colores base (Bootstrap)
  const green = { r: 40, g: 167, b: 69 };   // #28a745 - success
  const yellow = { r: 255, g: 193, b: 7 };  // #ffc107 - warning
  const red = { r: 220, g: 53, b: 69 };     // #dc3545 - danger
  
  let r: number, g: number, b: number;
  
  if (w <= 0.5) {
    // Interpolar de verde a amarillo (0 -> 0.5)
    const t = w / 0.5; // normalizar a 0-1
    r = Math.round(green.r + (yellow.r - green.r) * t);
    g = Math.round(green.g + (yellow.g - green.g) * t);
    b = Math.round(green.b + (yellow.b - green.b) * t);
  } else {
    // Interpolar de amarillo a rojo (0.5 -> 1)
    const t = (w - 0.5) / 0.5; // normalizar a 0-1
    r = Math.round(yellow.r + (red.r - yellow.r) * t);
    g = Math.round(yellow.g + (red.g - yellow.g) * t);
    b = Math.round(yellow.b + (red.b - yellow.b) * t);
  }
  
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Obtiene la variante de Bootstrap más cercana al peso
 * Útil para componentes que requieren variantes de Bootstrap (Badge, Button, etc.)
 * @param weight - Valor entre 0 (fácil) y 1 (difícil)
 * @returns Variante de Bootstrap: 'success' | 'warning' | 'danger' | 'secondary'
 */
export function getDifficultyVariant(weight: number | undefined): string {
  if (weight === undefined || weight === null) {
    return 'secondary';
  }
  
  const w = Math.max(0, Math.min(1, weight));
  
  if (w <= 0.33) return 'success';
  if (w <= 0.66) return 'warning';
  return 'danger';
}

/**
 * Obtiene el emoji correspondiente al peso de dificultad
 * @param weight - Valor entre 0 (fácil) y 1 (difícil)
 * @returns Emoji: '🟢' | '🟡' | '🟠' | '🔴'
 */
export function getDifficultyEmoji(weight: number | undefined): string {
  if (weight === undefined || weight === null) {
    return '⚪';
  }
  
  const w = Math.max(0, Math.min(1, weight));
  
  if (w <= 0.25) return '🟢';
  if (w <= 0.5) return '🟡';
  if (w <= 0.75) return '🟠';
  return '🔴';
}

/**
 * Formatea el peso como porcentaje
 * @param weight - Valor entre 0 y 1
 * @returns String formateado como porcentaje (ej: "50%")
 */
export function formatWeightAsPercent(weight: number | undefined): string {
  if (weight === undefined || weight === null) {
    return '—';
  }
  return `${Math.round(weight * 100)}%`;
}

/**
 * Valida que el peso esté en el rango válido [0, 1]
 * @param weight - Valor a validar
 * @returns true si es válido, false si no
 */
export function isValidWeight(weight: number): boolean {
  return typeof weight === 'number' && !isNaN(weight) && weight >= 0 && weight <= 1;
}
