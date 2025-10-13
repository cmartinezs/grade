# CU-BP-03: Clonar Ítem - Implementación

**Fecha de implementación:** 13 de octubre de 2025  
**Estado:** ✅ Completado

## Resumen

Se implementó la funcionalidad completa para clonar ítems en el Banco de Preguntas, permitiendo a los usuarios crear copias independientes de preguntas existentes con posibilidad de modificarlas antes de guardar.

## Archivos Modificados/Creados

### 1. `/src/lib/questionStore.ts`
**Cambios realizados:**
- ✅ Agregada función `cloneQuestion()` que implementa la lógica de clonación
- ✅ Crea nuevo ítem con ID único y versión 1
- ✅ No establece referencia al original (`original_version_fk = NULL`)
- ✅ Copia todo el contenido: enunciado, tipo, metadatos, alternativas
- ✅ Permite modificaciones antes de guardar
- ✅ Registra al usuario actual como autor del clon
- ✅ Valida todos los campos obligatorios y reglas de negocio

**Código implementado:**
```typescript
async cloneQuestion(
  questionId: string,
  currentUser: string,
  modifications?: Partial<CreateQuestionInput>
): Promise<Question>
```

### 2. `/src/components/CloneQuestionModal.tsx`
**Nuevo componente creado:**
- ✅ Modal completo para clonar preguntas
- ✅ Carga datos de la pregunta original
- ✅ Presenta formulario de edición con todos los campos
- ✅ Permite modificar: enunciado, tipo, tema, dificultad, alternativas
- ✅ Validación en tiempo real con feedback visual
- ✅ Mensajes informativos sobre el proceso de clonación
- ✅ Confirmación visual del éxito con el nuevo ID

**Características principales:**
- Carga automática de datos de la pregunta fuente
- Interfaz similar a crear/editar pregunta para consistencia
- Información clara de que se creará un ítem independiente
- Edición completa de todos los campos antes de guardar
- Validación completa según reglas de negocio

### 3. `/src/app/questions-bank/page.tsx`
**Cambios realizados:**
- ✅ Importado componente `CloneQuestionModal`
- ✅ Agregado estado para controlar modal de clonación
- ✅ Implementado handler `handleCloneQuestion()`
- ✅ Implementado handler `handleCloneSuccess()`
- ✅ Agregada opción "📋 Clonar Pregunta" en menú dropdown
- ✅ Integrado modal en la página

## Cumplimiento de Reglas de Negocio

### ✅ RN-1: Ítem independiente
- El clon es un ítem completamente independiente
- No se considera una versión del original
- Marcado como activo por defecto

### ✅ RN-2: ID único
- Se genera un nuevo ID único mediante `generateId('question')`
- Completamente distinto del original y cualquier otra pregunta
- No hay colisión de IDs

### ✅ RN-3: Versión 1
- El clon siempre comienza con versión 1
- Puede generar su propio historial de versiones posteriormente
- No hereda el número de versión del original

### ✅ RN-4: Sin referencia al original
- `original_version_fk = null`
- No existe vínculo formal en la base de datos
- El clon puede modificarse sin restricción, incluyendo cambio de tipo

### ✅ RN-5: Trazabilidad
- Autor del clon: usuario actual que ejecuta la acción
- No es el autor original
- Timestamp de creación registrado (`created_at`)
- Usuario que crea registrado (`author_fk`)

### ✅ RN-6: Sin vínculo formal
- No existe relación de versionado
- El sistema no mantiene referencia entre original y clon
- Opcionalmente podría registrarse en auditoría (comentado en código)

## Flujo de Usuario Implementado

### 1. **Seleccionar ítem a clonar**
   - Usuario navega al Banco de Preguntas
   - Busca y selecciona una pregunta existente
   - Click en menú dropdown → "📋 Clonar Pregunta"

### 2. **Modal de clonación se abre**
   - Carga automática de datos de la pregunta original
   - Muestra información del ítem fuente (ID, versión)
   - Alerta informativa explicando que se creará un ítem independiente
   - Presenta formulario pre-llenado con datos del original

### 3. **Editar contenido clonado**
   - Usuario puede modificar:
     - ✅ Tipo de pregunta
     - ✅ Enunciado
     - ✅ Taxonomía (Asignatura, Unidad, Tema)
     - ✅ Dificultad
     - ✅ Alternativas (agregar, modificar, eliminar, reordenar)
   - Validación en tiempo real
   - Mensajes de error claros si hay problemas

### 4. **Guardar clon**
   - Click en "📋 Clonar Pregunta"
   - Sistema valida todos los campos
   - Sistema crea nuevo ítem con ID único
   - Asigna versión 1
   - Marca como activo
   - No establece `original_version_fk`
   - Registra autor actual y timestamp

### 5. **Confirmación**
   - Modal muestra éxito
   - Muestra nuevo ID asignado
   - Explica que es un ítem independiente con versión 1
   - Lista se actualiza automáticamente
   - Modal se cierra después de 2 segundos

## Validaciones Implementadas

### ✅ Campos obligatorios
- Enunciado no puede estar vacío
- Tipo de pregunta debe ser válido
- Tema debe estar seleccionado
- Dificultad debe estar seleccionada

### ✅ Reglas de tipo de pregunta
- **Verdadero/Falso**: Exactamente 2 opciones, 1 correcta
- **Selección Única**: Mínimo 2 opciones, exactamente 1 correcta
- **Selección Múltiple**: Mínimo 2 opciones, al menos 1 correcta
- **Desarrollo**: Sin opciones

### ✅ Validación de metadatos
- Tema debe existir en catálogo vigente
- Dificultad debe ser válida (bajo/medio/alto)
- Taxonomía debe estar completa (asignatura → unidad → tema)

### ✅ Validación de alternativas
- Posiciones únicas y consecutivas (1, 2, 3, ...)
- Textos no vacíos
- Al menos una alternativa correcta (según tipo)
- Cardinalidad correcta según tipo de pregunta

## Diferencias con CU-BP-02 (Versionar)

| Aspecto | **Clonar (CU-BP-03)** | **Versionar (CU-BP-02)** |
|---------|----------------------|--------------------------|
| ID | Nuevo ID único | Nuevo ID único |
| Versión | Siempre 1 | Incrementa versión |
| `original_version_fk` | `NULL` (sin referencia) | ID de la versión raíz |
| Relación | Sin vínculo | Vínculo formal de versiones |
| Autor | Usuario actual | Usuario actual |
| Propósito | Duplicar para reutilizar | Evolucionar el mismo ítem |
| Historial | No comparte historial | Comparte historial de versiones |
| Independencia | Totalmente independiente | Parte de una familia de versiones |

## Casos de Uso Cubiertos

### ✅ A1 — Datos incompletos
- Sistema valida campos obligatorios
- Marca errores en campos específicos
- No permite guardar hasta corregir
- Mensajes de error claros y específicos

### ✅ A2 — Metadato inválido
- Valida que tema existe en catálogo vigente
- Valida que dificultad es válida
- Bloquea guardado con mensaje explicativo
- Deshabilita botón guardar si hay errores

### ✅ A3 — Cancelación
- Usuario puede cerrar modal en cualquier momento
- No se registra nada en base de datos
- Modal limpia estado al cerrarse
- No quedan datos residuales

### ✅ A4 — Error de red/servidor
- Try-catch maneja errores de ejecución
- Muestra mensaje de error al usuario
- Usuario puede reintentar
- Estado de UI se resetea correctamente

## Interfaz de Usuario

### Elementos visuales implementados:
- ✅ **Badge informativo**: Muestra ID original y versión
- ✅ **Alerta informativa**: Explica que se creará ítem independiente
- ✅ **Formulario completo**: Todos los campos editables
- ✅ **Validación visual**: Campos con borde rojo si hay error
- ✅ **Mensajes de error**: Específicos para cada campo
- ✅ **Loading states**: Spinner mientras carga/guarda
- ✅ **Confirmación de éxito**: Alert verde con nuevo ID
- ✅ **Botón deshabilitado**: Si datos incompletos o inválidos

### Accesibilidad:
- Labels descriptivos en todos los campos
- Feedback visual claro de errores
- Estados de botones semánticos
- Colores con significado (rojo=error, verde=éxito)

## Testing Manual Sugerido

### Caso 1: Clonar pregunta selección única
1. Buscar una pregunta de selección única
2. Abrir menú → Clonar Pregunta
3. Verificar que datos se cargan correctamente
4. Modificar enunciado
5. Agregar una opción adicional
6. Guardar
7. **Esperado**: Nueva pregunta con ID único, versión 1, sin vínculo

### Caso 2: Clonar y cambiar tipo de pregunta
1. Clonar una pregunta verdadero/falso
2. Cambiar tipo a "Selección Múltiple"
3. Agregar más opciones
4. Marcar varias como correctas
5. Guardar
6. **Esperado**: Nueva pregunta de tipo diferente funciona correctamente

### Caso 3: Clonar y cambiar taxonomía
1. Clonar pregunta de Matemáticas
2. Cambiar a Lenguaje
3. Seleccionar nueva unidad y tema
4. Guardar
5. **Esperado**: Pregunta se crea con nueva taxonomía

### Caso 4: Validación de campos obligatorios
1. Clonar pregunta
2. Borrar el enunciado
3. Intentar guardar
4. **Esperado**: Error visible, botón deshabilitado

### Caso 5: Cancelar clonación
1. Clonar pregunta
2. Modificar varios campos
3. Cerrar modal sin guardar
4. **Esperado**: Ningún registro creado, lista sin cambios

### Caso 6: Verificar independencia
1. Clonar pregunta original
2. Editar el clon (cambiar enunciado)
3. Verificar que original no cambia
4. Crear versión del clon
5. **Esperado**: Clon tiene su propio historial independiente

## Notas de Implementación

### LocalStorage
- IDs se generan mediante contador incremental
- Counters almacenados en `questions_bank_counters`
- Cada clon obtiene nuevo ID de `generateId('question')`
- Opciones clonadas también obtienen nuevos IDs

### Consistencia con otros CU
- Usa misma estructura de modal que `CreateQuestionModal`
- Reutiliza misma lógica de validación
- Mantiene consistencia visual con otros modales
- Mismos estilos y patrones de UI

### Extensibilidad
- Función `cloneQuestion` acepta `modifications` opcionales
- Puede extenderse para clonar en lote
- Puede agregarse opción de auditoría en futuro
- Base para funcionalidad "Duplicar a otra asignatura"

## Mejoras Futuras (Opcional)

1. **Auditoría de clonación**
   - Registrar en tabla de auditoría cuando se clona
   - Mantener referencia "informativa" (no funcional) al original
   - Útil para reportes y análisis

2. **Clonar en lote**
   - Permitir seleccionar múltiples preguntas
   - Clonar todas a la vez
   - Con opción de cambiar taxonomía en lote

3. **Vista previa lado a lado**
   - Mostrar original y clon lado a lado
   - Resaltar diferencias
   - Facilitar comparación

4. **Sugerencias de modificación**
   - IA sugiere cambios para diferenciarse del original
   - Evitar clones muy similares
   - Mejorar calidad del banco

5. **Clonar a otra asignatura**
   - Wizard para clonar a diferentes contextos
   - Adaptar automáticamente taxonomía
   - Útil para contenido transversal

## Conclusión

✅ **Implementación completa y funcional** del CU-BP-03 — Clonar Ítem

La funcionalidad cumple con todos los requisitos especificados:
- Crea ítems completamente independientes
- Nuevo ID único y versión 1
- Sin referencia al original
- Permite edición completa antes de guardar
- Validación exhaustiva
- Trazabilidad completa
- Interfaz intuitiva y consistente

El sistema ahora permite a los docentes:
1. Reutilizar preguntas existentes como punto de partida
2. Crear variaciones sin afectar el original
3. Construir banco de preguntas más rápidamente
4. Mantener independencia entre ítems clonados y originales

---

**Desarrollado por:** GitHub Copilot  
**Fecha:** 13 de octubre de 2025
