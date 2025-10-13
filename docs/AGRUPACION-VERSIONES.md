# Agrupación de Preguntas por Versiones

## Descripción General

Las preguntas ahora se muestran **agrupadas por sus familias de versiones**, mostrando solo la **versión más reciente** de cada pregunta. Esto evita la duplicación visual y mantiene la lista limpia y organizada.

## Comportamiento

### Vista de Lista

- **Solo se muestra la última versión** de cada pregunta
- Cada pregunta muestra un **badge con el número de versiones**:
  - `v1` (gris) si solo tiene una versión
  - `🔄 v3 (3 versiones)` (azul) si tiene múltiples versiones

### Identificación

- **ID mostrado**: Se muestra el ID de la versión raíz (no el ID específico de la versión)
- **Versión actual**: Se indica la versión más reciente (ej: "Última versión: v3")
- **Fecha**: Se muestra la fecha de actualización de la última versión

### Filtros y Búsqueda

- Los filtros se aplican a **todas las versiones**
- Si alguna versión de una pregunta cumple con los criterios, se muestra la **última versión**
- Ejemplo: Si buscas "ecuación" y la v1 contiene esa palabra pero la v3 no, se mostrará la v3 (última versión)

## Implementación Técnica

### Nuevos Métodos en QuestionStore

#### `getQuestionsGroupedByVersion()`

Retorna todas las preguntas agrupadas por familias de versiones, mostrando solo la última versión de cada una.

```typescript
const latestQuestions = questionStore.getQuestionsGroupedByVersion();
// Retorna: QuestionWithDetails[] (solo últimas versiones)
```

**Lógica**:
1. Identifica todas las raíces de versiones (version roots)
2. Para cada raíz, encuentra la versión con el número más alto
3. Retorna solo esas versiones

#### `searchQuestionsGrouped(searchTerm, filters)`

Búsqueda que retorna preguntas agrupadas por versión.

```typescript
const results = questionStore.searchQuestionsGrouped('ecuación', {
  type: 'seleccion_unica',
  difficulty_fk: 'medio',
  subject_fk: 'math-1'
});
// Retorna: QuestionWithDetails[] (solo últimas versiones que cumplen criterios)
```

**Lógica**:
1. Busca en **todas las versiones** con los filtros aplicados
2. Agrupa los resultados por familia de versión
3. Retorna solo la última versión de cada familia que cumplió criterios

### Cambios en la Página

**Archivo**: `/src/app/questions-bank/page.tsx`

```typescript
// Antes
const results = questionStore.searchQuestions(searchText, filters);

// Ahora
const results = questionStore.searchQuestionsGrouped(searchText, filters);
```

## Visualización en la UI

### Badge de Versiones

```typescript
{(() => {
  const versionCount = questionStore.getQuestionVersionHistory(question.question_id).length;
  if (versionCount > 1) {
    return (
      <Badge bg="info" className="me-2">
        🔄 v{question.version} ({versionCount} versiones)
      </Badge>
    );
  } else {
    return (
      <Badge bg="secondary" className="me-2">
        v{question.version}
      </Badge>
    );
  }
})()}
```

**Resultado**:
- Una versión: `v1` (badge gris)
- Múltiples versiones: `🔄 v3 (3 versiones)` (badge azul con ícono)

### Información de Metadatos

```typescript
<div className="mt-2 small text-muted">
  <span>ID: {question.original_version_fk || question.question_id}</span>
  <span className="ms-3">Última versión: v{question.version}</span>
  <span className="ms-3">Autor: {question.author_fk}</span>
  <span className="ms-3">
    Actualizado: {new Date(question.updated_at).toLocaleDateString()}
  </span>
</div>
```

**Explicación**:
- **ID**: Muestra el ID raíz (original_version_fk si existe, sino question_id)
- **Última versión**: Indica explícitamente que es la versión más reciente
- **Actualizado**: Usa `updated_at` en lugar de `created_at` para mostrar la fecha más relevante

## Flujo de Usuario

### Escenario 1: Pregunta sin versiones

1. Usuario ve pregunta con badge `v1`
2. ID: `q-123`, Última versión: v1
3. No se muestra contador de versiones

### Escenario 2: Pregunta con múltiples versiones

1. Usuario ve pregunta con badge `🔄 v3 (3 versiones)`
2. ID: `q-123` (ID raíz, común a todas las versiones)
3. Última versión: v3
4. Fecha: Cuando se creó la v3

### Escenario 3: Ver historial completo

1. Usuario hace clic en "👁️ Ver Detalle"
2. Se abre el modal `ViewQuestionModal`
3. En la sección "Historial de Versiones" puede ver todas las versiones
4. Puede navegar entre versiones o crear una nueva

### Escenario 4: Ver versión antigua

1. Usuario navega a v1 o v2 desde el historial
2. Aparece alerta amarilla: "⚠️ Esta no es la versión más reciente"
3. **Los botones "✏️ Editar" y "🔄 Crear Nueva Versión" están ocultos**
4. Solo está disponible el botón "❌ Cerrar"
5. Puede hacer clic en "📄 Ver Última Versión" para volver a la actual

### Escenario 5: Crear nueva versión

1. Usuario crea v4 desde v3 (última versión)
2. La lista se actualiza automáticamente
3. Ahora muestra `🔄 v4 (4 versiones)`
4. El ID raíz permanece igual: `q-123`

## Ventajas

### Para el Usuario

✅ **Lista más limpia**: No se duplican visualmente las preguntas
✅ **Fácil identificación**: El badge indica cuántas versiones existen
✅ **Información relevante**: Siempre ve la versión más actual
✅ **Acceso completo**: Puede ver el historial desde el detalle

### Para el Sistema

✅ **Consistencia**: La búsqueda funciona en todas las versiones
✅ **Trazabilidad**: El ID raíz permite agrupar versiones
✅ **Flexibilidad**: Los filtros se aplican correctamente
✅ **Performance**: No carga innecesariamente todas las versiones

## Casos de Uso

### CU-1: Ver listado de preguntas

**Given**: Existen preguntas con múltiples versiones
**When**: Usuario accede a "Banco de Preguntas"
**Then**: 
- Se muestran solo las últimas versiones
- Badges indican si hay múltiples versiones
- IDs corresponden a la raíz de versión

### CU-2: Buscar pregunta versionada

**Given**: Una pregunta tiene 3 versiones (v1, v2, v3)
**When**: Usuario busca un término que aparece en v1 y v2 pero no en v3
**Then**: 
- Se muestra la v3 (última versión)
- Badge indica "🔄 v3 (3 versiones)"
- Usuario puede ver v1 y v2 desde el detalle

### CU-3: Filtrar por taxonomía

**Given**: v1 está en "Matemáticas/Álgebra/Ecuaciones", v2 está en "Matemáticas/Geometría/Figuras"
**When**: Usuario filtra por "Álgebra"
**Then**:
- Se muestra la v2 (última versión del grupo)
- Aunque v2 está en Geometría, el filtro encontró v1
- Usuario ve la versión más actual del grupo encontrado

## Consideraciones Técnicas

### Performance

- La agrupación se hace en memoria (localStorage)
- Para bases de datos grandes, considerar paginación
- El cálculo del número de versiones se hace por demanda

### Integridad de Datos

- El campo `original_version_fk` vincula las versiones
- Si es `null`, la pregunta es la raíz
- Si tiene valor, apunta a la versión raíz

### Casos Especiales

**Pregunta huérfana**: Si una versión pierde su referencia a la raíz
- Se trata como pregunta independiente
- Se muestra en la lista normalmente

**Versiones inconsistentes**: Si los números de versión no son secuenciales
- Se toma el número más alto como última versión
- El historial se ordena por número de versión

## Ejemplo Visual

```
Antes (sin agrupación):
┌─────────────────────────────────────┐
│ [Selección Única] [Medio] v1        │
│ ¿Cuánto es 2+2?                     │
│ ID: q-123 | Versión: 1              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Selección Única] [Medio] v2        │
│ ¿Cuánto es 2+2?                     │
│ ID: q-124 | Versión: 2              │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ [Selección Única] [Medio] v3        │
│ ¿Cuánto es 2+2? (corregido)         │
│ ID: q-125 | Versión: 3              │
└─────────────────────────────────────┘

Ahora (con agrupación):
┌─────────────────────────────────────┐
│ [Selección Única] [Medio]           │
│ [🔄 v3 (3 versiones)]               │
│ ¿Cuánto es 2+2? (corregido)         │
│ ID: q-123 | Última versión: v3      │
│ Actualizado: 13/10/2025             │
└─────────────────────────────────────┘
```

## Mejoras Futuras

- [ ] Mostrar un tooltip con las versiones al pasar el mouse sobre el badge
- [ ] Agregar filtro para mostrar "Solo preguntas versionadas"
- [ ] Indicador visual de qué cambió entre versiones
- [ ] Comparación lado a lado de dos versiones
- [ ] Etiquetas personalizadas por versión (ej: "Revisado", "Aprobado")

## Referencias

- **CU-BP-02**: Versionar Ítem (caso de uso base)
- **RN-4**: Versiones ordenadas por número
- **RN-5**: Trazabilidad mediante original_version_fk
