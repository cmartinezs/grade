/**
 * Utilidad de Retry con Backoff Exponencial
 * Función reutilizable para reintentar operaciones async con backoff exponencial
 */

/**
 * Reintenta una función async con backoff exponencial
 * @param fn - Función async a ejecutar
 * @param maxRetries - Número máximo de reintentos (default: 3)
 * @param initialDelay - Delay inicial en ms (default: 500ms)
 * @param context - Contexto para logging (opcional)
 * @returns El resultado de la función si tiene éxito
 * @throws El último error si todos los reintentos fallan
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 500,
  context = 'operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fn();
      // Si hubo errores previos pero ahora funcionó, loguearlo
      if (i > 0) {
        console.log(`✅ [${context}] Success after ${i} retry(ies)`);
      }
      return result;
    } catch (err) {
      lastError = err as Error;
      
      // Si es el último intento, lanzar el error
      if (i >= maxRetries - 1) {
        console.error(`❌ [${context}] All ${maxRetries} attempts failed:`, err);
        break;
      }

      // Calcular delay con backoff exponencial
      const delay = initialDelay * Math.pow(2, i);
      
      console.warn(
        `⚠️ [${context}] Attempt ${i + 1}/${maxRetries} failed, retrying in ${delay}ms...`,
        err instanceof Error ? err.message : err
      );

      // Esperar antes del siguiente intento
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // Si llegamos aquí, todos los reintentos fallaron
  throw lastError;
}
