# Vista Previa de Cursos - Generación Masiva

## Descripción General

Se ha implementado un flujo mejorado para la generación masiva de cursos que incluye:

1. **Generación en memoria**: Primero se generan los cursos EN MEMORIA sin guardarlos
2. **Vista previa modal**: Se muestra un modal con tabla paginada de los cursos a generar
3. **Selección selectiva**: El usuario puede seleccionar/deseleccionar cursos antes de guardar
4. **Confirmación**: Solo se guardan los cursos confirmados

## Componentes Modificados

### 1. `courseDataLoader.ts`
**Cambios:**
- Nuevo export: `CourseToCreate` interface para representar cursos sin guardar
- Nueva función: `generateCoursesInMemory(options)` - Genera cursos EN MEMORIA
- Función actualizada: `generateCoursesInBulk()` ahora acepta array opcional de cursos

**Interfaces:**
```typescript
export interface CourseToCreate {
  name: string;
  code: string;
  levelId: string;
  section?: string;
  institution: string;
}

// La función genera cursos SIN acceder a la BD
export function generateCoursesInMemory(options: CourseGenerationOptions): CourseToCreate[]
```

### 2. `useCourseDataLoader.ts`
**Cambios:**
- Nueva función exportada: `previewCourses(options)`
- Función actualizada: `generateCourses()` ahora acepta array de cursos pre-generados
- Firma actualizada: `generateCourses(options, coursesToCreate?, onProgress?)`

**Uso:**
```typescript
const { generateCourses, previewCourses } = useCourseDataLoader();

// Generar en memoria
const courses = previewCourses(options);

// Guardar solo los seleccionados
await generateCourses(options, selectedCourses, onProgress);
```

### 3. `CoursePreviewModal.tsx` (NUEVO)
**Propósito:** Modal que muestra vista previa paginada de cursos

**Props:**
```typescript
interface CoursePreviewModalProps {
  show: boolean;                                    // Mostrar/ocultar modal
  courses: CourseToCreate[];                        // Cursos a mostrar
  isLoading?: boolean;                              // Estado de carga
  onConfirm: (coursesToSave: CourseToCreate[]) => void;  // Guardar seleccionados
  onCancel: () => void;                             // Cancelar
  title?: string;                                   // Título del modal
  institution?: string;                             // Institución (para info)
}
```

**Características:**
- Tabla usando `DataTableContent`
- Paginación usando `PaginationControl` (10 items por página)
- Checkbox "Seleccionar todos"
- Botones de inclusión/exclusión por fila
- Badge de conteo de seleccionados
- Información de institución y total

### 4. `CourseBulkGeneratorForm.tsx`
**Cambios principales:**
- Nueva lógica en `handleSubmit`: Genera preview en lugar de guardar directamente
- Nuevo manejador: `handleConfirmPreview()` - Ejecuta guardado después de confirmación
- Nuevo estado: `showPreview`, `previewCoursesList`, `generationOptions`

**Flujo:**
```
Usuario completa formulario
           ↓
handleSubmit (validación)
           ↓
Generar cursos en memoria
           ↓
Mostrar CoursePreviewModal
           ↓
Usuario selecciona/deselecciona cursos
           ↓
handleConfirmPreview (guardar seleccionados)
           ↓
Mostrar progreso
           ↓
Éxito o error
```

## Flujo de Uso

### Paso 1: Usuario completa el formulario
```
- Institución: "Colegio San Miguel"
- Tipo: Letras (A, B, C)
- Cantidad: 2
- Niveles: Sala Cuna Menor, Sala Cuna Mayor
```

### Paso 2: Usuario hace clic en "Generar Cursos"
```
- Se valida el formulario
- Se generan cursos EN MEMORIA (NO se guardan)
- Se abre el modal de preview
```

### Paso 3: Usuario ve preview
```
Tabla paginada mostrando:
- Nombre: "Sala Cuna Menor A"
- Código: "CSM-SC-a1b2c3d4-A"
- Paralelo: "A"

Puedo: ✓ Incluir / ⊘ Excluir
Total: 4 cursos
Seleccionados: 3 / 4
```

### Paso 4: Usuario confirma
```
- Click en "Guardar (3)"
- Modal se cierra
- Se muestra barra de progreso
- Los 3 cursos seleccionados se guardan en DB
- Mensaje de éxito
```

## Ventajas

✅ **Validación visual**: El usuario ve exactamente qué se guardará
✅ **Control total**: Puede deseleccionar cursos específicos sin regenerar
✅ **Prevención de duplicados**: Genera todo en memoria primero
✅ **Mejor UX**: No hay espera hasta después de generar
✅ **Escalable**: Funciona con cientos de cursos (paginación)
✅ **Reutilizable**: CoursePreviewModal puede usarse en otros contextos

## Cambios de Contrato de API

### `generateCoursesInBulk()`
**Antes:**
```typescript
async function generateCoursesInBulk(options: CourseGenerationOptions)
```

**Después:**
```typescript
async function generateCoursesInBulk(
  options: CourseGenerationOptions,
  coursesToCreate?: CourseToCreate[]  // Nuevo parámetro opcional
)
```

### `useCourseDataLoader.generateCourses()`
**Antes:**
```typescript
async generateCourses(options, onProgress?)
```

**Después:**
```typescript
async generateCourses(
  options,
  coursesToCreate?,  // Nuevo parámetro opcional
  onProgress?
)
```

## Compatibilidad Hacia Atrás

✅ **Completamente compatible**: Ambas funciones funcionan sin los nuevos parámetros
- Si no se proporciona `coursesToCreate`, se generan internamente
- El parámetro `coursesToCreate` es opcional
- Código existente sigue funcionando sin cambios

## Ejemplo de Integración

```tsx
import CourseBulkGeneratorForm from './CourseBulkGeneratorForm';

export default function BulkGeneratePage() {
  return (
    <CourseBulkGeneratorForm
      onSuccess={(count) => {
        console.log(`${count} cursos creados`);
        // Navegar a lista de cursos
      }}
      onError={(error) => {
        console.error(error);
      }}
      showSummary={true}
      compact={false}
    />
  );
}
```

## Testing

### Caso 1: Generar y aceptar todos
1. Completar formulario con 2 niveles, 3 letras
2. Sistema genera 6 cursos en preview
3. Usuario ve 6 cursos (todos seleccionados por defecto)
4. Click "Guardar (6)"
5. Se guardan 6 cursos

### Caso 2: Generar y deseleccionar algunos
1. Completar formulario con 2 niveles, 3 números
2. Sistema genera 6 cursos en preview
3. Usuario deselecciona "Nivel A - 1"
4. Click "Guardar (5)"
5. Se guardan 5 cursos

### Caso 3: Deseleccionar todos
1. Completar formulario
2. Sistema genera preview
3. Usuario deselecciona todos (unchecks "Seleccionar todos")
4. Botón "Guardar" está deshabilitado (disabled)
5. Usuario debe seleccionar al menos 1 para guardar

### Caso 4: Paginación
1. Completar formulario con muchos niveles y secciones (>10)
2. Modal muestra máximo 10 por página
3. Usuario navega entre páginas
4. Conteo de seleccionados se mantiene entre páginas
5. "Seleccionar todos" selecciona TODOS (todas las páginas)

## Archivos Modificados

| Archivo | Tipo | Cambios |
|---------|------|---------|
| `src/lib/courseDataLoader.ts` | Modificado | +Función de memoria, +Interface, actualización de firma |
| `src/hooks/useCourseDataLoader.ts` | Modificado | +Función preview, actualización de firma |
| `src/app/evaluation-management/courses/bulk-generate/CoursePreviewModal.tsx` | NUEVO | Componente modal completo |
| `src/app/evaluation-management/courses/bulk-generate/CourseBulkGeneratorForm.tsx` | Modificado | Flujo a 2 pasos, nuevo manejador |

## Notas Técnicas

- Los cursos generados en memoria mantienen la misma lógica de código único
- El modal usa `DataTableContent` y `PaginationControl` (componentes reutilizables)
- El estado de selección se mantiene entre cambios de página
- La paginación comienza en página 1 al abrir el modal
- Los cursos se generan instantáneamente (en memoria es rápido)

