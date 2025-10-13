# CU-BP-01: Crear ítem nuevo en el Banco de Preguntas

## Implementación Completa

### Resumen
Este caso de uso permite a los docentes crear nuevas preguntas en el Banco de Preguntas con validación completa, detección de duplicados y trazabilidad.

### Archivos Creados/Modificados

#### 1. **Tipos** (`src/types/question.ts`)
Define las interfaces y tipos para el sistema de preguntas:

- `Question`: Entidad principal de pregunta
  - `question_id`: ID único
  - `type`: Tipo de pregunta (verdadero_falso, seleccion_unica, seleccion_multiple, desarrollo)
  - `enunciado`: Texto de la pregunta
  - `version`: Control de versiones
  - `active`: Estado de vigencia
  - `topic_fk`: Referencia al tema de taxonomía
  - `difficulty_fk`: Nivel de dificultad
  - Trazabilidad: `author_fk`, `created_at`, `updated_at`

- `QuestionOption`: Alternativas de respuesta
  - `question_option_id`: ID único
  - `question_fk`: Referencia a la pregunta
  - `text`: Texto de la opción
  - `is_correct`: Marca de correcta
  - `position`: Orden de presentación
  - `partial_score`: Puntaje parcial (opcional)

- `CreateQuestionInput`: DTO para crear preguntas
- `QuestionWithDetails`: Pregunta con opciones y metadatos de taxonomía
- `DuplicateDetectionResult`: Resultado de detección de duplicados

#### 2. **Store** (`src/lib/questionStore.ts`)
Implementa la lógica de negocio y almacenamiento en localStorage:

##### Características Principales:

**Reglas de Negocio (RN)**:
- **RN-1**: Validación de campos obligatorios (enunciado, tipo, tema, dificultad)
- **RN-2**: Validación de opciones según tipo:
  - Verdadero/Falso: exactamente 2 opciones, 1 correcta
  - Selección Única: mínimo 2 opciones, exactamente 1 correcta
  - Selección Múltiple: mínimo 2 opciones, al menos 1 correcta
- **RN-3**: Validación de metadatos contra catálogos vigentes
- **RN-4**: Creación en estado activo
- **RN-5**: Trazabilidad (autor, fecha de creación, versión 1)
- **RN-6**: Posiciones únicas y consecutivas de alternativas
- **RN-7**: Indexación para búsqueda (inmediata en localStorage)

**Métodos Principales**:
```typescript
// Validar pregunta según reglas de negocio
validateQuestion(input: CreateQuestionInput): QuestionValidationError[]

// Crear nueva pregunta
createQuestion(input: CreateQuestionInput, currentUser: string): Promise<Question>

// Obtener pregunta con detalles completos
getQuestionWithDetails(questionId: string): QuestionWithDetails | null

// Buscar preguntas con filtros
searchQuestions(
  searchText: string, 
  filters?: {
    type?: QuestionType;
    topic_fk?: string;
    difficulty_fk?: DifficultyLevel;
    subject_fk?: string;
    unit_fk?: string;
  }
): QuestionWithDetails[]

// Detectar duplicados potenciales
detectDuplicates(
  enunciado: string, 
  topicFk: string, 
  type: QuestionType
): DuplicateDetectionResult

// Actualizar pregunta
updateQuestion(
  questionId: string,
  input: UpdateQuestionInput,
  currentUser: string
): Promise<Question>

// Eliminar pregunta (soft delete)
deleteQuestion(questionId: string, currentUser: string): Promise<void>
```

**Catálogos**:
```typescript
// Metadatos de tipos de preguntas
QUESTION_TYPE_RULES: Record<QuestionType, QuestionTypeMetadata>

// Niveles de dificultad
DIFFICULTY_LEVELS: Difficulty[] = [
  { difficulty_id: 'bajo', name: 'Bajo', ... },
  { difficulty_id: 'medio', name: 'Medio', ... },
  { difficulty_id: 'alto', name: 'Alto', ... }
]
```

**Almacenamiento localStorage**:
- `questions_bank_questions`: Array de preguntas
- `questions_bank_options`: Array de opciones
- `questions_bank_counters`: Contadores para IDs

#### 3. **Componente Modal** (`src/components/CreateQuestionModal.tsx`)
Modal de React para crear preguntas con validación en tiempo real:

##### Flujo Principal:
1. Selección de tipo de pregunta (auto-ajusta opciones)
2. Ingreso de enunciado
3. Selección jerárquica de taxonomía (Asignatura → Unidad → Tema)
4. Selección de dificultad
5. Ingreso de alternativas (según tipo)
6. Detección automática de duplicados
7. Validación y guardado

##### Características UI:
- Validación en tiempo real con mensajes de error
- Detección de duplicados con advertencia
- Auto-configuración de opciones según tipo
- Selector jerárquico de taxonomía
- Confirmación de éxito con acceso rápido
- Manejo de errores claro

##### Validaciones Cliente:
- Campos obligatorios marcados
- Opciones mínimas/máximas según tipo
- Radio buttons para respuesta única
- Checkboxes para respuesta múltiple
- Deshabilitación de campos según contexto

#### 4. **Página Banco de Preguntas** (`src/app/questions-bank/page.tsx`)
Página principal actualizada con:

##### Funcionalidades:
- Listado de preguntas con detalles
- Filtros múltiples:
  - Búsqueda de texto (enunciados y opciones)
  - Tipo de pregunta
  - Dificultad
  - Asignatura (con filtrado jerárquico)
- Badges informativos:
  - Tipo de pregunta (coloreado)
  - Dificultad (coloreado)
  - Taxonomía (asignatura, unidad, tema)
- Visualización de opciones con indicador de correctas
- Metadatos: ID, versión, autor, fecha
- Integración con modal de creación
- Estado vacío con llamado a acción

##### Filtrado Inteligente:
- Búsqueda textual en enunciados y opciones
- Filtros combinables
- Filtrado jerárquico por taxonomía
- Actualización en tiempo real

### Flujo de Uso

#### Crear Nueva Pregunta:
1. Usuario hace clic en "➕ Nueva Pregunta"
2. Se abre el modal `CreateQuestionModal`
3. Usuario selecciona tipo de pregunta
4. Ingresa enunciado
5. Selecciona taxonomía (jerárquico):
   - Primero asignatura
   - Luego unidad (filtrada por asignatura)
   - Finalmente tema (filtrado por unidad)
6. Selecciona dificultad
7. Ingresa alternativas (según tipo):
   - Para Verdadero/Falso: opciones predefinidas, marca una
   - Para Selección Única: agrega opciones, marca una con radio
   - Para Selección Múltiple: agrega opciones, marca una o más con checkbox
   - Para Desarrollo: sin opciones
8. Sistema valida en cliente
9. Sistema detecta duplicados potenciales
10. Si hay duplicado: muestra advertencia, permite continuar o cancelar
11. Usuario confirma guardar
12. Sistema valida en store (RN-1 a RN-6)
13. Sistema crea pregunta con:
    - ID único autogenerado
    - Versión 1
    - Estado activo (RN-4)
    - Trazabilidad completa (RN-5)
14. Sistema guarda opciones con posiciones consecutivas (RN-6)
15. Pregunta indexada inmediatamente (RN-7)
16. Muestra confirmación con ID y opciones de siguiente acción

#### Flujos Alternativos:

**A1 — Datos incompletos**:
- Sistema marca campos con error
- Permanece en formulario
- Usuario corrige y reintenta

**A2 — Metadato inválido**:
- Sistema bloquea guardado
- Mensaje de error específico
- Sugerencia de verificar catálogos

**A3 — Duplicado potencial**:
- Sistema muestra preguntas similares
- Usuario puede:
  - Continuar y forzar creación
  - Cancelar y revisar existentes
  - Ver pregunta existente

**A4 — Tipo desarrollo**:
- Omite sección de alternativas
- Muestra nota informativa sobre criterios futuros

### Validaciones Implementadas

#### Validaciones de Negocio (Store):
```typescript
// RN-1: Campos obligatorios
- enunciado no vacío
- type válido
- topic_fk válido
- difficulty_fk válido

// RN-2: Opciones según tipo
verdadero_falso:
  - exactamente 2 opciones
  - exactamente 1 correcta
  
seleccion_unica:
  - mínimo 2 opciones
  - exactamente 1 correcta
  
seleccion_multiple:
  - mínimo 2 opciones
  - al menos 1 correcta

// RN-3: Metadatos vigentes
- topic_fk existe en taxonomía y no está eliminado
- difficulty_fk existe en catálogo activo

// RN-6: Posiciones
- Únicas y consecutivas (1, 2, 3, ...)
- Sin saltos
- Cada opción con posición válida
```

#### Validaciones UI (Modal):
- Campos requeridos marcados con *
- Feedback visual inmediato
- Mensajes de error contextuales
- Bloqueo de guardado si hay errores
- Auto-ajuste de opciones según tipo
- Cascada de selectores de taxonomía

### Detección de Duplicados

Algoritmo de similitud implementado:
```typescript
Score = 0

Si mismo tema: +30 puntos
Si mismo tipo: +20 puntos
Similitud textual: hasta +50 puntos
  (palabras coincidentes / total palabras) * 50

Umbral de duplicado: ≥60 puntos
```

### Almacenamiento localStorage

#### Estructura de Datos:

```typescript
// questions_bank_questions
[
  {
    question_id: "q-1",
    type: "seleccion_unica",
    enunciado: "¿Cuál es...?",
    version: 1,
    active: true,
    original_version_fk: null,
    topic_fk: "topic-1",
    difficulty_fk: "medio",
    learning_outcome_fk: null,
    author_fk: "user@example.com",
    created_at: "2025-10-13T...",
    updated_at: "2025-10-13T...",
    deleted_at: null,
    deleted_by: null
  }
]

// questions_bank_options
[
  {
    question_option_id: "opt-1",
    question_fk: "q-1",
    text: "Opción A",
    is_correct: true,
    position: 1,
    partial_score: null,
    created_at: "2025-10-13T...",
    created_by: "user@example.com",
    updated_at: "2025-10-13T...",
    updated_by: "user@example.com"
  }
]

// questions_bank_counters
{
  question: 5,
  option: 20
}
```

#### Inicialización:
- Primera carga: crea datos de ejemplo
- Cargas subsecuentes: lee de localStorage
- Conversión automática de fechas (strings ↔ Date)

### Integración con Taxonomías

El sistema se integra con el módulo de taxonomías existente:
- Lee catálogos de `taxonomyStore`
- Valida referencias (subject, unit, topic)
- Muestra jerarquía completa en listado
- Filtrado por cualquier nivel de taxonomía

### Testing Manual

#### Escenarios de Prueba:

1. **Crear pregunta Verdadero/Falso**
   - Verificar 2 opciones predefinidas
   - Verificar solo 1 correcta permitida
   - Verificar guardado exitoso

2. **Crear pregunta Selección Única**
   - Agregar 4 opciones
   - Marcar 1 como correcta
   - Verificar radio buttons
   - Verificar guardado

3. **Crear pregunta Selección Múltiple**
   - Agregar 5 opciones
   - Marcar 2 como correctas
   - Verificar checkboxes
   - Verificar guardado

4. **Crear pregunta Desarrollo**
   - Verificar sin opciones
   - Verificar nota informativa
   - Verificar guardado

5. **Validación campos obligatorios**
   - Intentar guardar sin enunciado
   - Intentar guardar sin tema
   - Verificar mensajes de error

6. **Detección de duplicados**
   - Crear pregunta similar
   - Verificar advertencia
   - Probar "Continuar" y "Cancelar"

7. **Búsqueda y filtros**
   - Buscar por texto
   - Filtrar por tipo
   - Filtrar por dificultad
   - Filtrar por asignatura
   - Verificar resultados correctos

8. **Persistencia localStorage**
   - Crear varias preguntas
   - Recargar página
   - Verificar preguntas persisten

### Próximas Mejoras

#### Funcionalidades Pendientes:
- [ ] Editar pregunta existente
- [ ] Duplicar pregunta
- [ ] Ver estadísticas de uso
- [ ] Exportar/importar preguntas
- [ ] Resultados de Aprendizaje (implementación futura)
- [ ] Criterios de corrección para desarrollo
- [ ] Rúbricas de evaluación
- [ ] Etiquetas/tags adicionales
- [ ] Comentarios y colaboración
- [ ] Historial de versiones completo
- [ ] Migración a base de datos real

#### Mejoras Técnicas:
- [ ] Tests unitarios para `questionStore`
- [ ] Tests de integración para modal
- [ ] Optimización de búsqueda con índices
- [ ] Paginación de resultados
- [ ] Lazy loading de opciones
- [ ] Service Worker para cache
- [ ] Sincronización con servidor
- [ ] Validación de esquema con Zod
- [ ] Mejor manejo de errores async
- [ ] Logs de auditoría

### Notas de Implementación

#### Decisiones de Diseño:
1. **localStorage**: Elegido por simplicidad, fácil migración futura a API
2. **Validación doble**: Cliente (UX) + Store (seguridad)
3. **Soft delete**: Mantiene integridad referencial
4. **Versiones**: Preparado para versionado futuro
5. **Posiciones**: 1-based para mejor UX
6. **Duplicados**: Heurística simple, mejorará con ML

#### Compatibilidad:
- Next.js 14+ (App Router)
- React 18+
- Bootstrap 5
- TypeScript 5+
- Navegadores modernos con localStorage

#### Seguridad:
- Validación exhaustiva en store
- Sanitización de inputs (trim)
- No permite inyección de código
- Soft delete previene pérdida de datos
- Trazabilidad completa de cambios

### Recursos Adicionales

#### Documentación Relacionada:
- [CU-BP-11: Taxonomías](./taxonomy-implementation.md)
- [MER Database](../database/mer-diagram.png)
- [Reglas de Negocio](./business-rules.md)

#### Referencias:
- Model-View-Controller pattern
- Repository pattern (store)
- Data Transfer Objects (DTOs)
- SOLID principles
- React best practices
