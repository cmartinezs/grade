# MasterDataTable - Guía de Uso

## ¿Qué es MasterDataTable?

`MasterDataTable` es un componente genérico y reutilizable que proporciona una solución completa para listar, filtrar y paginar cualquier tipo de dato en tu aplicación. Elimina la necesidad de duplicar código de listas en cada página.

## Características

✅ **Genérico**: Funciona con cualquier tipo de dato  
✅ **Búsqueda integrada**: Filtro de texto genérico en todas las columnas  
✅ **Paginación**: Controles de navegación automáticos  
✅ **Acciones personalizables**: Botones con lógica condicionaldinámica  
✅ **Estadísticas**: Cards informativos opcionales en el header  
✅ **Responsive**: Bootstrap integrado  
✅ **Cargando**: Estados de loading  
✅ **Vacío**: Mensajes personalizables cuando no hay datos  

## Props

```typescript
interface MasterDataTableProps<T> {
  // Datos requeridos
  items: T[];                          // Elementos a mostrar
  totalItems: number;                  // Total de elementos (sin paginar)
  totalPages: number;                  // Total de páginas
  currentPage: number;                 // Página actual
  pageSize: number;                    // Elementos por página
  
  // Configuración de la tabla
  title: string;                       // Título principal
  description?: string;                // Descripción (opcional)
  icon?: string;                       // Emoji/icono del título
  columns: ColumnConfig<T>[];          // Definición de columnas
  actions?: ActionButton<T>[];         // Botones de acción
  
  // Estados
  isLoading?: boolean;                 // Mostrar spinner
  
  // Búsqueda
  searchText: string;                  // Texto de búsqueda actual
  onSearchChange: (text: string) => void;    // Callback cuando cambia búsqueda
  searchPlaceholder?: string;          // Placeholder del input
  hideSearch?: boolean;                // Ocultar campo de búsqueda
  
  // Paginación
  onPageChange: (page: number) => void;      // Callback cuando cambia página
  
  // Botón crear
  onCreateClick: () => void;           // Callback del botón crear
  createButtonLabel?: string;          // Texto del botón (default: "Crear")
  createButtonIcon?: string;           // Icono del botón (default: "➕")
  
  // Tarjetas estadísticas
  statCards?: StatCard[];              // Array de estadísticas
  
  // Estado vacío
  emptyMessage?: string;               // Mensaje cuando no hay datos
  emptyIcon?: string;                  // Icono del estado vacío
  emptyActionLabel?: string;           // Texto del botón en estado vacío
}
```

## Tipos de Configuración

### ColumnConfig<T>

Define cómo se renderiza cada columna:

```typescript
interface ColumnConfig<T> {
  key: keyof T;                                           // Propiedad del objeto
  label: string;                                          // Encabezado
  render?: (value: T[keyof T], item: T) => React.ReactNode;  // Custom render
  width?: string;                                         // Ancho CSS (ej: "100px")
  sortable?: boolean;                                     // Mostrar icono sortable
}
```

### ActionButton<T>

Define los botones de acción en cada fila:

```typescript
interface ActionButton<T> {
  label: string | ((item: T) => string);                 // Dinámico
  icon: string | ((item: T) => string);                  // Dinámico (emoji/iconos)
  onClick: (item: T) => void;                            // Manejador click
  variant?: string | ((item: T) => string);              // Bootstrap variant dinámico
  title?: string | ((item: T) => string);                // Tooltip
  show?: (item: T) => boolean;                           // Mostrar condicionalmente
}
```

### StatCard

Tarjetas informativas en el header:

```typescript
interface StatCard {
  label: string;                                          // Etiqueta
  value: number | string;                                // Valor a mostrar
  icon: string;                                          // Emoji/icono
  variant?: string;                                      // Color Bootstrap
}
```

## Ejemplos

### Ejemplo Básico: Niveles Educacionales

```tsx
import MasterDataTable, { ColumnConfig, ActionButton, StatCard } from '@/components/MasterDataTable';
import { EducationalLevel } from '@/types/level';
import { levelStore } from '@/lib/levelStore';
import { Badge } from 'react-bootstrap';

export default function LevelsPage() {
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  
  // 1. Definir columnas
  const columns: ColumnConfig<EducationalLevel>[] = [
    { 
      key: 'name', 
      label: 'Nombre',
      render: (value) => <span className="fw-bold">{String(value)}</span>,
    },
    { 
      key: 'code', 
      label: 'Código',
      render: (value) => <code>{String(value)}</code>,
    },
    {
      key: 'description',
      label: 'Descripción',
    },
    {
      key: 'isActive',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
      width: '100px',
    },
  ];

  // 2. Definir acciones
  const actions: ActionButton<EducationalLevel>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (level) => router.push(`/levels/edit?id=${level.id}`),
      variant: 'outline-primary',
    },
    {
      icon: (level) => (level.isActive ? '🔒' : '🔓'),  // Dinámico!
      label: (level) => (level.isActive ? 'Desactivar' : 'Activar'),
      onClick: handleToggleStatus,
      variant: (level) => (level.isActive ? 'outline-warning' : 'outline-success'),
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: handleDeleteLevel,
      variant: 'outline-danger',
    },
  ];

  // 3. Definir tarjetas estadísticas
  const statCards: StatCard[] = [
    {
      label: 'Total Niveles',
      value: totalLevels,
      icon: '📊',
    },
    {
      label: 'Activos',
      value: levels.filter(l => l.isActive).length,
      icon: '✅',
    },
  ];

  // 4. Retornar el componente
  return (
    <MasterDataTable<EducationalLevel>
      items={levels}
      totalItems={totalLevels}
      totalPages={totalPages}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      title="Gestión de Niveles"
      description="Administra los niveles educacionales del sistema"
      icon="📊"
      columns={columns}
      actions={actions}
      searchText={searchText}
      onSearchChange={setSearchText}
      onPageChange={setCurrentPage}
      onCreateClick={() => router.push('/levels/create')}
      createButtonLabel="Nuevo Nivel"
      statCards={statCards}
      emptyMessage="No hay niveles creados"
    />
  );
}
```

### Ejemplo Avanzado: Cursos (con Modales)

```tsx
export default function CoursesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const columns: ColumnConfig<Course>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => <code className="text-primary">{String(value)}</code>,
      width: '100px',
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: 'level',
      label: 'Nivel',
      render: (value) => <Badge bg="info">{String(value)}</Badge>,
    },
    {
      key: 'institution',
      label: 'Institución',
    },
    {
      key: 'active',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
    },
  ];

  const actions: ActionButton<Course>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (course) => {
        setSelectedId(course.course_id);
        setShowEditModal(true);
      },
      variant: 'outline-primary',
    },
  ];

  return (
    <>
      <MasterDataTable<Course>
        items={courses}
        totalItems={totalCourses}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        title="Gestión de Cursos"
        icon="📚"
        columns={columns}
        actions={actions}
        searchText={searchText}
        onSearchChange={setSearchText}
        onPageChange={setCurrentPage}
        onCreateClick={() => setShowCreateModal(true)}
      />
      
      <CreateCourseModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
      <EditCourseModal show={showEditModal} onHide={() => setShowEditModal(false)} courseId={selectedId} />
    </>
  );
}
```

## Búsqueda en el Store

Para que la búsqueda funcione, el método `getPaginated*` del store debe soportar la opción `searchText`:

```typescript
// En tu store
getPaginatedItems(
  page: number,
  pageSize: number,
  options?: { searchText?: string; includeInactive?: boolean }
): { items: T[]; total: number; totalPages: number } {
  let allItems = this.getAllItems();

  // Aplicar filtro de búsqueda
  if (options?.searchText) {
    const term = options.searchText.toLowerCase().trim();
    allItems = allItems.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
  }

  // Paginar
  const total = allItems.length;
  const totalPages = Math.ceil(total / pageSize);
  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return { items, total, totalPages };
}
```

## Integración Paso a Paso

1. **Crear columnas**: Define `ColumnConfig<T>[]`
2. **Crear acciones**: Define `ActionButton<T>[]` (opcional)
3. **Crear tarjetas**: Define `StatCard[]` (opcional)
4. **Cargar datos**: Implementa búsqueda en store
5. **Renderizar componente**: Pasa todos los props

## Ventajas

- ✅ **DRY**: No repites código de listas
- ✅ **Consistencia**: Todas las listas lucen igual
- ✅ **Flexibilidad**: Totalmente personalizable con render functions
- ✅ **Type-safe**: TypeScript con genéricos
- ✅ **Performance**: Renderizado eficiente de tablas grandes
- ✅ **UX**: Estados de carga, búsqueda, paginación

## Próximos Pasos

Puedes aplicar `MasterDataTable` a:
- ✅ Gestión de Preguntas
- ✅ Gestión de Taxonomías
- ✅ Gestión de Evaluaciones
- Y cualquier otra lista CRUD
