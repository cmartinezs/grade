# CU-BP-02: Versionar Ítem - Documentación Técnica

## 📋 Descripción General

Este documento describe la implementación técnica del caso de uso **CU-BP-02 — Versionar Ítem**, que permite crear nuevas versiones de preguntas existentes manteniendo la trazabilidad histórica completa.

## 🎯 Objetivos Implementados

- ✅ Crear nuevas versiones de preguntas sin modificar versiones existentes (RN-1)
- ✅ Mantener historial completo de versiones (RN-2)
- ✅ Todas las versiones permanecen activas para trazabilidad (RN-3)
- ✅ Heredar y permitir modificar metadatos (RN-4)
- ✅ Incrementar automáticamente número de versión (RN-5)
- ✅ Preservar referencias en evaluaciones (RN-6)

## 🏗️ Arquitectura

### Componentes Implementados

```
src/
├── lib/
│   └── questionStore.ts              # Store con lógica de versionado
├── components/
│   ├── ViewQuestionModal.tsx         # Modal para ver detalles y acceder a versionado
│   └── EditQuestionModal.tsx         # Modal para crear versiones (y editar)
└── app/
    └── questions-bank/
        └── page.tsx                  # Integración de funcionalidad
```

## 📦 Implementación del Store

### Función `createQuestionVersion()`

**Ubicación:** `/src/lib/questionStore.ts`

```typescript
async createQuestionVersion(
  questionId: string,
  currentUser: string,
  modifications?: Partial<CreateQuestionInput>
): Promise<Question>
```

**Características:**
- **RN-1:** Genera nuevo ID único para la nueva versión
- **RN-2:** Mantiene referencia a `original_version_fk`
- **RN-3:** Nueva versión se marca como `active: true`
- **RN-4:** Clona todos los metadatos y permite modificaciones
- **RN-5:** Calcula automáticamente `version = maxVersion + 1`
- **RN-6:** Versiones anteriores mantienen sus IDs originales

**Algoritmo de Versionado:**

1. **Identificar la raíz de la versión:**
   - Si la pregunta tiene `original_version_fk`, usar ese valor
   - Si no, la pregunta actual ES la raíz, usar su `question_id`

2. **Calcular nueva versión:**
   - Buscar todas las preguntas con el mismo linaje
   - Encontrar el `max(version)` del linaje
   - Nueva versión = `max + 1`

3. **Clonar contenido:**
   - Enunciado, tipo, metadatos, opciones
   - Aplicar modificaciones si se proporcionan
   - Generar nuevos IDs para pregunta y opciones

4. **Validar:**
   - Ejecutar todas las validaciones de negocio
   - Verificar integridad de opciones según tipo

5. **Persistir:**
   - Guardar nueva versión con trazabilidad completa
   - Registrar autor y timestamp

### Funciones Auxiliares

```typescript
// Obtener historial completo de versiones
getQuestionVersionHistory(questionId: string): QuestionWithDetails[]

// Verificar si pregunta tiene múltiples versiones
hasMultipleVersions(questionId: string): boolean

// Obtener la versión más reciente
getLatestVersion(questionId: string): QuestionWithDetails | null
```

## 🎨 Componentes UI

### ViewQuestionModal

**Props:**
```typescript
interface ViewQuestionModalProps {
  show: boolean;
  onHide: () => void;
  questionId: string | null;
  onCreateVersion?: (questionId: string) => void;
  onEdit?: (questionId: string) => void;
}
```

**Funcionalidades:**
- ✅ Muestra detalles completos de la pregunta
- ✅ Indica versión actual con badge
- ✅ Alerta si no es la versión más reciente
- ✅ Historial de versiones colapsable
- ✅ Navegación entre versiones
- ✅ Botón "🔄 Crear Nueva Versión"
- ✅ Metadata: tipo, dificultad, taxonomía completa
- ✅ Opciones con indicadores ✅/❌
- ✅ Trazabilidad: autor, fechas

**Estados Visuales:**
- Badge `v{N}` indica versión actual
- Badge "⚠️ Versión Antigua" si no es la más reciente
- Badge "Actual" en historial para última versión
- Link para ir a versión más reciente

### EditQuestionModal

**Props:**
```typescript
interface EditQuestionModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  questionId: string | null;
  mode: 'edit' | 'version';
}
```

**Modos de Operación:**
1. **`mode: 'version'`** (CU-BP-02)
   - Carga datos de pregunta existente
   - Permite modificar cualquier campo
   - Al guardar, llama a `createQuestionVersion()`
   - Muestra alerta informativa sobre versionado

2. **`mode: 'edit'`** (futuro)
   - Placeholder para edición directa
   - No implementado en este CU

**Características:**
- ✅ Formulario completo de edición
- ✅ Validaciones en tiempo real
- ✅ Selector jerárquico de taxonomía
- ✅ Advertencias de taxonomía incompleta
- ✅ Gestión dinámica de opciones según tipo
- ✅ Confirmación visual de éxito con badges v{N} → v{N+1}

## 🔄 Flujo de Usuario

### Flujo Principal: Crear Nueva Versión

```
1. Usuario navega a Banco de Preguntas
   ↓
2. Usuario hace clic en "👁️ Ver Detalle" de una pregunta
   ↓
3. Se abre ViewQuestionModal mostrando:
   - Detalles completos
   - Metadata y taxonomía
   - Opciones (si aplica)
   - Historial de versiones
   ↓
4. Usuario hace clic en "🔄 Crear Nueva Versión"
   ↓
5. Se abre EditQuestionModal con:
   - Datos pre-cargados de la versión original
   - Alerta informativa sobre versionado
   - Todos los campos editables
   ↓
6. Usuario modifica campos deseados:
   - Enunciado
   - Opciones (agregar/modificar/eliminar)
   - Taxonomía
   - Dificultad
   ↓
7. Sistema valida en tiempo real:
   - Campos obligatorios
   - Cardinalidad de opciones
   - Taxonomía válida
   ↓
8. Usuario hace clic en "💾 Crear Nueva Versión"
   ↓
9. Sistema ejecuta createQuestionVersion():
   - Clona contenido
   - Incrementa versión
   - Mantiene referencia original
   - Registra trazabilidad
   ↓
10. Modal muestra confirmación:
    - ID de nueva versión
    - Badge v{N} → v{N+1}
    ↓
11. Usuario cierra modal
    ↓
12. Lista de preguntas se actualiza automáticamente
```

### Flujos Alternativos

**A1: Acceso directo desde menú desplegable**
```
Card de pregunta → Dropdown → "🔄 Crear Nueva Versión"
   ↓
Abre directamente EditQuestionModal en modo 'version'
```

**A2: Navegación en historial de versiones**
```
ViewQuestionModal → Ver historial → Botón "👁️ Ver" de otra versión
   ↓
Cambia vista a versión seleccionada sin cerrar modal
   ↓
Puede crear nueva versión desde cualquier versión histórica
```

## 💾 Estructura de Datos

### Question con Versionado

```typescript
interface Question {
  question_id: string;           // ID único por versión
  type: QuestionType;
  enunciado: string;
  version: number;               // RN-5: Incrementa automáticamente
  active: boolean;               // RN-3: Siempre true
  original_version_fk: string | null;  // RN-2: Referencia a raíz
  topic_fk: string;
  difficulty_fk: DifficultyLevel;
  learning_outcome_fk: string | null;
  author_fk: string;             // RN-4: Autor de ESTA versión
  created_at: Date;              // RN-4: Fecha de ESTA versión
  updated_at: Date;
  updated_by: string;
  deleted_at: Date | null;
  deleted_by: string | null;
}
```

### Ejemplo de Linaje de Versiones

```
Pregunta Original (v1):
{
  question_id: "q-1",
  version: 1,
  original_version_fk: null,
  enunciado: "¿Cuánto es 2+2?",
  author_fk: "prof1@mail.com",
  created_at: "2025-01-15"
}

Primera Versión (v2):
{
  question_id: "q-5",
  version: 2,
  original_version_fk: "q-1",  // ← Referencia a original
  enunciado: "¿Cuál es el resultado de 2+2?",
  author_fk: "prof2@mail.com",
  created_at: "2025-03-20"
}

Segunda Versión (v3):
{
  question_id: "q-12",
  version: 3,
  original_version_fk: "q-1",  // ← Misma referencia a original
  enunciado: "Calcula: 2+2 = ?",
  author_fk: "prof1@mail.com",
  created_at: "2025-06-10"
}
```

**Consulta de historial:** Buscar todas las preguntas donde:
- `question_id = "q-1"` OR
- `original_version_fk = "q-1"`

Resultado: 3 versiones (v1, v2, v3)

## ✅ Reglas de Negocio

### RN-1: Inmutabilidad de Versiones

**Implementación:**
- ❌ NO existe función `updateQuestion()` que modifique campos principales
- ✅ `createQuestionVersion()` genera NUEVO `question_id`
- ✅ Versiones anteriores quedan intactas

**Verificación:**
```typescript
// ❌ PROHIBIDO
question.enunciado = "Nuevo texto";
await questionStore.updateQuestion(question.question_id, { enunciado: "..." });

// ✅ CORRECTO
await questionStore.createQuestionVersion(
  question.question_id,
  currentUser,
  { enunciado: "Nuevo texto" }
);
```

### RN-2: Historial de Versiones

**Implementación:**
- Campo `original_version_fk` apunta siempre a la raíz
- Función `getQuestionVersionHistory()` reconstruye linaje completo
- Todas las versiones mantienen el mismo `original_version_fk`

### RN-3: Versiones Activas

**Implementación:**
- Todas las versiones tienen `active: true`
- Solo soft-delete (`deleted_at`) oculta preguntas
- Permite usar cualquier versión en evaluaciones

### RN-4: Herencia de Metadatos

**Implementación:**
- `EditQuestionModal` pre-carga todos los campos
- Usuario puede modificar cualquier campo
- Nuevos valores se aplican solo a nueva versión

### RN-5: Incremento Automático

**Implementación:**
```typescript
// Encuentra max versión en linaje
const sameLineage = questions.filter(q => 
  q.question_id === versionRoot || 
  q.original_version_fk === versionRoot
);
const maxVersion = Math.max(...sameLineage.map(q => q.version));
const newVersion = maxVersion + 1;
```

### RN-6: Referencias en Evaluaciones

**Implementación:**
- Cada versión tiene ID único
- Evaluaciones almacenan `question_id` específico
- Modificar pregunta NO afecta evaluaciones pasadas
- (Validación futura cuando se implemente módulo de evaluaciones)

## 🧪 Casos de Prueba

### Caso 1: Versionar desde Pregunta Original

**Pre-condiciones:**
- Existe pregunta q-1 (v1) sin `original_version_fk`

**Pasos:**
1. Abrir modal de versionar para q-1
2. Modificar enunciado
3. Guardar

**Resultado esperado:**
- Nueva pregunta q-X con version=2
- `original_version_fk = "q-1"`
- q-1 permanece sin cambios

### Caso 2: Versionar desde Versión Intermedia

**Pre-condiciones:**
- Existe q-1 (v1), q-2 (v2, original_fk=q-1), q-3 (v3, original_fk=q-1)

**Pasos:**
1. Versionar desde q-2 (v2)

**Resultado esperado:**
- Nueva pregunta q-4 con version=4 (no v3!)
- `original_version_fk = "q-1"` (raíz, no q-2)
- Historial completo: v1, v2, v3, v4

### Caso 3: Modificar Tipo de Pregunta

**Pre-condiciones:**
- Pregunta tipo "seleccion_unica" con 4 opciones

**Pasos:**
1. Cambiar a "seleccion_multiple"
2. Marcar 2 opciones como correctas
3. Guardar

**Resultado esperado:**
- Nueva versión con tipo "seleccion_multiple"
- 2 opciones correctas permitidas
- Validación exitosa

### Caso 4: Historial de Versiones

**Pre-condiciones:**
- 5 versiones de misma pregunta

**Pasos:**
1. Abrir ViewQuestionModal
2. Expandir historial

**Resultado esperado:**
- Listado de 5 versiones ordenadas v5→v1
- Badge "Actual" en v5
- Botón "👁️ Ver" en versiones anteriores
- Metadata de cada versión (autor, fecha)

## 🚀 Próximas Mejoras

### Funcionalidades Pendientes

1. **Comparación entre Versiones**
   - Vista diff mostrando cambios
   - Resaltado de campos modificados

2. **Restaurar Versión Anterior**
   - Crear nueva versión basada en versión antigua
   - "Versión 8 basada en versión 3"

3. **Comentarios de Versión**
   - Campo opcional para describir cambios
   - Historial con comentarios

4. **Notificaciones**
   - Alertar a usuarios cuando pregunta es versionada
   - Seguimiento de preguntas favoritas

5. **Validación en Evaluaciones**
   - Advertir si pregunta versionada está en evaluaciones activas
   - Sugerir actualizar evaluaciones

## 📊 Métricas de Uso

Para medir el éxito del versionado:

- **Tasa de versionado:** Preguntas versionadas / Total preguntas
- **Promedio de versiones:** Total versiones / Preguntas únicas
- **Tiempo hasta primera versión:** Días entre v1 y v2
- **Campos más modificados:** Enunciado, opciones, taxonomía

## 🔍 Debugging y Troubleshooting

### Problema: Versión duplicada

**Síntoma:** Dos preguntas con mismo version=3

**Causa:** Condición de carrera en localStorage

**Solución:** Implementar lock temporal o migrar a DB

### Problema: Historial incompleto

**Síntoma:** `getQuestionVersionHistory()` no encuentra todas las versiones

**Causa:** `original_version_fk` inconsistente

**Solución:** 
```typescript
// Validar en createQuestionVersion:
if (originalQuestion.original_version_fk) {
  // Usar la raíz correcta
  versionRoot = originalQuestion.original_version_fk;
} else {
  // La pregunta ES la raíz
  versionRoot = originalQuestion.question_id;
}
```

## 📚 Referencias

- **Especificación:** CU-BP-02 — Versionar Ítem
- **Código:** 
  - `/src/lib/questionStore.ts` (líneas 585-726)
  - `/src/components/ViewQuestionModal.tsx`
  - `/src/components/EditQuestionModal.tsx`
- **Tipo:** `/src/types/question.ts`
- **Documentación relacionada:** 
  - `CU-BP-01-IMPLEMENTATION.md` (creación de preguntas)

---

**Fecha de implementación:** 13 de octubre, 2025  
**Versión:** 1.0  
**Estado:** ✅ Completamente implementado y probado
