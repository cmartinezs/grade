# Migración de Preguntas a Data Connect

## Estado Actual

Las preguntas actualmente se guardan en **localStorage** mediante `questionStore.ts`, que es una implementación mock para desarrollo.

## Queries y Mutations Disponibles en Data Connect

### Queries ✅
- `ListQuestionsByUser` - Listar preguntas del usuario
- `GetQuestion` - Obtener pregunta por ID con opciones
- `ListPublicQuestions` - Listar preguntas públicas
- `ListPublicQuestionsByDifficulty` - Filtrar por dificultad
- `ListPublicQuestionsByType` - Filtrar por tipo
- `GetQuestionOptions` - Obtener opciones de una pregunta

### Mutations ✅
- `CreateQuestion` - Crear nueva pregunta
- `CreateQuestionVersion` - Crear nueva versión
- `CreateQuestionOption` - Crear opción de pregunta
- `UpdateQuestion` - Actualizar pregunta
- `UpdateQuestionOption` - Actualizar opción
- `DeactivateQuestion` - Desactivar pregunta (soft delete)
- `ReactivateQuestion` - Reactivar pregunta
- `DeleteQuestion` - Eliminar permanentemente

## Archivos Creados

### ✅ `/src/lib/questionConnect.ts`
Capa de integración con Data Connect siguiendo el patrón de `masterDataConnect.ts`:
- `fetchQuestionsByUser(userId, firebaseId)` 
- `fetchQuestionById(questionId, userId, firebaseId)`
- `createNewQuestion(input, userId, firebaseId)` ⭐
- `updateExistingQuestion(...)` 
- `createQuestionVersion(...)` 
- `deactivateExistingQuestion(...)` 
- `reactivateExistingQuestion(...)` 
- `deleteExistingQuestion(...)` 

## Problemas de Integración

### 1. **Mapeo de Tipos de Pregunta** ⚠️

**Problema**: El código actual usa códigos string literales:
```typescript
type QuestionType = 'seleccion_unica' | 'seleccion_multiple' | 'verdadero_falso' | 'desarrollo';
```

Pero Data Connect requiere UUIDs:
```graphql
mutation CreateQuestion(
  $questionTypeId: UUID!  # ← Necesita UUID, no código
  ...
)
```

**Solución Necesaria**:
1. Cuando el usuario selecciona un tipo en el formulario (código), debe buscarse el UUID correspondiente:
   ```typescript
   const questionTypes = await fetchAllQuestionTypes();
   const selectedType = questionTypes.find(qt => qt.code === 'seleccion_unica');
   const questionTypeId = selectedType?.questionTypeId; // UUID
   ```

2. Actualizar `CreateQuestionModal` para:
   - Obtener `questionTypes` con `useQuestionTypes()` ✅ (ya lo hace)
   - Mapear el código seleccionado → UUID antes de crear
   - Pasar el UUID a `createNewQuestion()`

### 2. **Mapeo de Dificultades** ⚠️

Similar al problema anterior:
- Código actual: `difficulty_fk` es un string como `'easy' | 'medium' | 'hard'`
- Data Connect: Requiere UUID de la dificultad

**Solución**: 
```typescript
const difficulties = await fetchAllDifficulties();
const selectedDiff = difficulties.find(d => d.level === 'Fácil');
const difficultyId = selectedDiff?.difficultyId; // UUID
```

### 3. **Mapeo de Taxonomías (Learning Outcomes)** ⚠️

El campo `learning_outcome_fk` es opcional en el formulario actual, pero Data Connect requiere `taxonomyId: UUID!` (obligatorio).

**Soluciones Posibles**:
1. Hacer que el campo taxonomía sea obligatorio en el formulario
2. Crear una taxonomía por defecto "Sin clasificar" y usarla cuando no se seleccione
3. Modificar la mutation en Data Connect para hacerlo opcional

### 4. **Autenticación Firebase** ⚠️

Data Connect requiere `firebaseId` para autorización:
```graphql
@auth(expr: "firebaseId == auth.uid")
```

**Solución**: 
```typescript
const { user } = useAuth();
const firebaseId = user?.uid; // Obtener del contexto de Auth
```

### 5. **userId vs email** ⚠️

- Código actual usa: `user?.email || 'anonymous'` como identificador
- Data Connect requiere: `userId: UUID!`

**Solución**: Necesita haber un UUID de usuario en la base de datos que corresponda al email/firebaseId del usuario autenticado.

## Plan de Migración

### Fase 1: Preparación ✅
- [x] Crear `questionConnect.ts` con funciones de Data Connect
- [x] Verificar que las queries/mutations estén generadas en el SDK
- [x] Documentar problemas de integración

### Fase 2: Actualizar Tipos y Mapeos 🔄
- [ ] Crear función `mapQuestionTypeCodeToId(code, questionTypes)` en `questionConnect.ts`
- [ ] Crear función `mapDifficultyLevelToId(level, difficulties)` en `questionConnect.ts`
- [ ] Decidir estrategia para taxonomía opcional/obligatoria
- [ ] Verificar que exista tabla `User` con UUID en Data Connect

### Fase 3: Actualizar CreateQuestionModal 🔄
- [ ] Obtener userId UUID del usuario autenticado
- [ ] Obtener firebaseId del contexto Auth
- [ ] Mapear questionType code → UUID
- [ ] Mapear difficulty level → UUID
- [ ] Manejar taxonomyId (obligatorio u opcional)
- [ ] Llamar a `createNewQuestion()` de `questionConnect.ts` en lugar de `questionStore`
- [ ] Mantener fallback a `questionStore` si Data Connect falla

### Fase 4: Actualizar useQuestions Hook 🔄
- [ ] Intentar cargar desde Data Connect con `fetchQuestionsByUser()`
- [ ] Fallback a `questionStore` si falla
- [ ] Transformar formato de Data Connect a formato esperado por UI

### Fase 5: Actualizar Otros Modales 📝
- [ ] EditQuestionModal → usar `updateExistingQuestion()`
- [ ] CloneQuestionModal → usar `createNewQuestion()` con datos clonados
- [ ] RetireQuestionModal → usar `deactivateExistingQuestion()`
- [ ] ReactivateQuestionModal → usar `reactivateExistingQuestion()`

### Fase 6: Testing 🧪
- [ ] Crear pregunta y verificar que aparezca en Data Connect
- [ ] Editar pregunta
- [ ] Crear versión de pregunta
- [ ] Desactivar/reactivar pregunta
- [ ] Verificar que localStorage siga funcionando como fallback

### Fase 7: Cleanup (Opcional) 🧹
- [ ] Eliminar `questionStore.ts` una vez que Data Connect esté completamente funcional
- [ ] O mantenerlo como fallback permanente para desarrollo offline

## Notas Adicionales

### Ventajas de Migrar a Data Connect
- ✅ Persistencia real en base de datos
- ✅ Sincronización entre dispositivos
- ✅ Autenticación y autorización integradas
- ✅ Queries optimizadas por Firebase
- ✅ No límites de almacenamiento como localStorage

### Desventajas Temporales
- ⚠️ Requiere conexión a internet
- ⚠️ Más complejo de configurar en desarrollo local
- ⚠️ Requiere mapeo de tipos (códigos → UUIDs)

## Próximos Pasos Inmediatos

1. **Resolver mapeo de tipos**: Crear funciones helper en `questionConnect.ts` para convertir códigos a UUIDs
2. **Verificar User UUID**: Asegurar que el usuario autenticado tenga un UUID en la tabla User de Data Connect
3. **Actualizar CreateQuestionModal**: Implementar creación con Data Connect + fallback a localStorage
4. **Testing**: Probar creación de pregunta end-to-end

---

**Fecha**: 2025-11-18
**Estado**: 🔄 En Progreso
**Prioridad**: Alta
