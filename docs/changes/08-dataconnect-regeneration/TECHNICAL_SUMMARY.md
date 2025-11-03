# Ajustes por Regeneración de Data Connect

**Fecha:** Noviembre 2, 2025

## Resumen de Cambios

Se regeneraron los archivos de Data Connect (`schema.gql`, `mutations.gql`, `queries.gql`) e incluyen cambios significativos en los tipos y parámetros. Todos los archivos dependientes han sido actualizados para mantener compatibilidad.

## Cambios en el Schema

### Nuevos campos en tipos:
- **Unit**: Agregado campo opcional `description: String`
- **Topic**: Agregado campo opcional `description: String`

### Cambios en mutaciones:
- **CreateUser**: Ahora requiere `userId` y `createdBy`
- **CreateSubject**: Ahora requiere `subjectId` y `createdBy`
- **CreateUnit**: Ahora requiere `unitId`, `createdBy`, y acepta `description`
- **CreateTopic**: Ahora requiere `topicId` y `createdBy`
- **UpdateUnit**: Ahora requiere `subjectId` como parámetro y acepta `description`
- **UpdateTopic**: Ahora requiere `unitId` como parámetro

## Archivos Modificados

### 1. `src/lib/taxonomyDataConnect.ts`
**Cambios:**
- `createNewSubject()`: Agrega parámetro `createdBy`, genera UUID para `subjectId`
- `createNewUnit()`: Agrega parámetros `createdBy` y `description`, genera UUID para `unitId`
- `createNewTopic()`: Agrega parámetro `createdBy`, genera UUID para `topicId`
- `updateUnitInfo()`: Agrega parámetro `subjectId` y `description`
- `updateTopicInfo()`: Agrega parámetro `unitId`

**Generación de UUIDs:**
```typescript
const unitId = crypto.randomUUID?.() || `uuid-${Date.now()}`;
```

### 2. `src/lib/taxonomyStore.ts`
**Cambios:**
- `createSubject()`: Requiere parámetro `createdBy`
- `createUnit()`: Requiere parámetros `createdBy` y acepta `description`
- `createTopic()`: Requiere parámetro `createdBy`
- `updateUnit()`: Acepta `description`, requiere `subjectId`
- `updateTopic()`: Requiere `unitId`
- `getAllUnits()`: Transforma `unitId` → `unit_id`, `subjectId` → `subject_fk`, mapea `description`
- `getAllTopics()`: Transforma `topicId` → `topic_id`, `unitId` → `unit_fk`, mapea `description`
- `deleteSubject()`, `deleteUnit()`, `deleteTopic()`: Requieren parámetro `userId`
- `reactivateSubject()`, `reactivateUnit()`, `reactivateTopic()`: Requieren parámetro `userId`

### 3. `src/types/taxonomy.ts`
**Cambios:**
- `Unit`: Agregado campo `description?: string`
- `Topic`: Agregado campo `description?: string`
- Todos los campos de fecha cambian a `Date | string` para compatibilidad con ISO strings de Data Connect

### 4. `src/components/CreateTaxonomyModal.tsx`
**Cambios:**
- Importa `useAuth()` de `@/contexts/AuthContext`
- `formData` incluye campo `description`
- `createSubject()` recibe `userId`
- `createUnit()` recibe `userId` y `description`
- `createTopic()` recibe `userId`
- Agrega campo textarea para `description` en formulario de Unit

### 5. `src/components/EditTaxonomyModal.tsx`
**Cambios:**
- Importa `useAuth()` de `@/contexts/AuthContext`
- `formData` incluye campo `description`
- Carga `description` del Unit al editar
- `updateUnit()` pasa `subjectId` y `description`
- `updateTopic()` pasa `unitId`
- Agrega campo textarea para `description` en formulario de Unit

### 6. `src/components/DeleteTaxonomyModal.tsx`
**Cambios:**
- Ya incluía `useAuth()` en la versión anterior del diff
- `deleteSubject()`, `deleteUnit()`, `deleteTopic()` reciben `userId`

## Flujo de Transformación de Tipos

### De Data Connect (camelCase) → Tipos Internos (snake_case)

```
Data Connect Response:
{
  units: [{
    unitId: "uuid-123",
    name: "Algebra",
    subjectId: "uuid-456",
    description: "Basic algebra concepts",
    createdAt: "2025-11-02T...",
    ...
  }]
}

↓

Tipo Interno (Unit):
{
  unit_id: "uuid-123",
  name: "Algebra",
  subject_fk: "uuid-456",
  description: "Basic algebra concepts",
  created_at: "2025-11-02T...",
  ...
}
```

## Validaciones Realizadas

✅ No hay errores de compilación TypeScript
✅ Todos los tipos se mapean correctamente
✅ IDs se generan con UUID
✅ userId se obtiene del contexto de autenticación
✅ Manejo de errores mantiene consistencia
✅ Campos opcionales (description) se manejan correctamente

## Próximos Pasos (si aplica)

1. **Tests**: Crear tests unitarios para las nuevas firmas de funciones
2. **Validación**: Verificar flujo end-to-end en ambiente de development
3. **Documentation**: Actualizar documentación de API si está disponible
4. **Backend**: Asegurar que el servidor de Data Connect responde correctamente con `description`

## Notas Importantes

- **UUIDs**: Se generan automáticamente en el cliente usando `crypto.randomUUID()`
- **Timestamps**: Se mantiene formato ISO 8601
- **Soft Delete**: Sistema de eliminación lógica se mantiene intacto
- **Autenticación**: Requiere contexto `AuthContext` disponible
- **Description**: Campo opcional - si no se proporciona, se envía como `undefined`

## Compatibilidad

- ✅ React 18+
- ✅ TypeScript 5+
- ✅ Firebase Data Connect
- ✅ Bootstrap 5

---

**Completado por:** Sistema de Ajustes Automáticos
**Estado:** ✅ Todos los archivos sin errores de compilación
