# 📍 Funcionalidad de Carga de Configuración de Chile

## Descripción

Se ha implementado una funcionalidad que permite a los usuarios cargar automáticamente la configuración de niveles educacionales y categorías del sistema educativo chileno desde archivos JSON cuando no hay datos en el sistema.

## ¿Cómo Funciona?

### Detección Automática
Cuando un usuario accede a las páginas de **Categorías** o **Niveles** sin datos previos:

1. ✅ El sistema detecta que no hay categorías/niveles
2. 📱 Se muestra un modal informativo
3. 🤔 Se ofrece al usuario cargar la configuración de Chile

### Datos que se Cargan

**2 Categorías:**
- `cat-basic-001` - Enseñanza Básica (1° a 8° año)
- `cat-media-002` - Enseñanza Media (1° a 4° año medio)

**12 Niveles:**
- 1° Básico a 8° Básico
- 1° Medio a 4° Medio

Todos con:
- Códigos únicos (`LEVEL_1B`, `LEVEL_1M`, etc.)
- Descripciones completas
- Estado activo
- Asignación correcta a categorías

## Archivos Modificados

### Nuevos Archivos
1. **`src/hooks/useChileDataLoader.ts`**
   - Hook personalizado para cargar datos desde JSON
   - Funciones para cargar categorías y niveles
   - Manejo de errores

2. **`src/components/ChileDataLoaderModal.tsx`**
   - Componente modal reutilizable
   - UI informativa con detalles de carga
   - Feedback visual durante la operación

### Archivos Actualizados
1. **`src/app/evaluation-management/categories/page.tsx`**
   - Detección de categorías vacías
   - Muestra modal si no hay datos
   - Handler para recargar después de la carga

2. **`src/app/evaluation-management/levels/page.tsx`**
   - Detección de niveles vacíos
   - Muestra modal si no hay datos
   - Handler para recargar después de la carga

## Flujo de Uso

### Página de Categorías
```
1. Usuario accede a /evaluation-management/categories
2. Sistema verifica: ¿Hay categorías?
   ├─ SÍ → Mostrar tabla con categorías
   └─ NO → Mostrar modal de carga
3. Usuario decide: ¿Cargar configuración?
   ├─ SÍ → Cargar 2 categorías → Recargar página
   └─ NO → Cerrar modal → Opción de crear manual
```

### Página de Niveles
```
1. Usuario accede a /evaluation-management/levels
2. Sistema verifica: ¿Hay niveles?
   ├─ SÍ → Mostrar tabla con niveles
   └─ NO → Mostrar modal de carga
3. Usuario decide: ¿Cargar configuración?
   ├─ SÍ → Cargar 12 niveles → Recargar página
   └─ NO → Cerrar modal → Opción de crear manual
```

## API del Hook

### `useChileDataLoader()`

```typescript
const { loadChileConfiguration, loadCategoriesFromJSON, loadLevelsFromJSON } = useChileDataLoader();

// Cargar toda la configuración
const result = await loadChileConfiguration();
// Retorna: { success, message, categoriesLoaded, levelsLoaded }

// Cargar solo categorías
const categories = await loadCategoriesFromJSON();

// Cargar solo niveles
const levels = await loadLevelsFromJSON();
```

## Propiedades del Modal

```typescript
<ChileDataLoaderModal
  show={boolean}                    // Mostrar/ocultar
  onHide={() => void}              // Callback al cerrar
  onSuccess={() => void}           // Callback al cargar exitosamente
  title={string}                   // Título personalizable
  description={string}             // Descripción personalizable
/>
```

## Características Principales

✅ **Smart Loading**
- Solo carga si no hay datos
- Evita duplicaciones
- Manejo de errores graceful

✅ **User Experience**
- Modal informativo y amigable
- Feedback visual durante carga
- Auto-cierre tras éxito
- Opción de reintentar en caso de error

✅ **Reutilizable**
- Hook independiente
- Componente modal genérico
- Fácil de usar en otras páginas

✅ **Data Integrity**
- No duplica datos existentes
- Validación de entrada
- Logs de advertencia para errores

## Mensajes y Feedback

### Estado de Carga
```
Cargando... [Spinner]
```

### Éxito
```
✅ Configuración de Chile cargada: 2 categorías y 12 niveles
Categorías cargadas: 2
Niveles cargados: 12
```

### Error
```
❌ Error al cargar configuración: [mensaje de error]
[Botón Reintentar]
```

## Integración con LocalStorage

- Los datos se guardan en localStorage de forma segura
- Persistencia entre sesiones
- Puede borrarse manualmente si es necesario

## Próximas Extensiones Posibles

1. 🌍 Agregar más configuraciones por país
2. 📋 Importar desde CSV/Excel
3. ⚙️ Configuración manual de datos
4. 🔄 Sincronización con base de datos remota
5. 📊 Validación y reporte de integridad de datos

## Testing

### Casos de Uso

1. **Primer acceso sin datos**
   - ✅ Mostrar modal automáticamente
   - ✅ Cargar datos exitosamente
   - ✅ Mostrar tabla con datos

2. **Con datos existentes**
   - ✅ No mostrar modal
   - ✅ Mostrar tabla normalmente

3. **Error de carga**
   - ✅ Mostrar mensaje de error
   - ✅ Opción de reintentar

4. **Cierre del modal**
   - ✅ Cerrar sin cargar datos
   - ✅ Mantener estado de la página

---

**Versión**: 1.0  
**Fecha**: 2025-11-03  
**Estado**: ✅ Completado
