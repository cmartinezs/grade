# DataTableContent - Componente de Tabla Reutilizable

## Descripción

`DataTableContent` es un componente de tabla genérico extraído de `MasterDataTable` que puede reutilizarse en diferentes contextos. Maneja la presentación de datos tabulares con características como:

- Numeración de filas con paginación
- Columnas sortables con indicadores visuales
- Botones de acción personalizables por fila
- Rendimiento custom de celdas
- Estados de carga y vacío
- Tipado genérico con TypeScript

## Ubicación

`/src/components/shared/DataTableContent.tsx`

## Props

```typescript
interface DataTableContentProps<T> {
  // Datos
  items: T[];                              // Array de elementos a mostrar
  columns: ColumnConfig<T>[];              // Configuración de columnas
  
  // Acciones
  actions?: ActionButton<T>[];             // Botones de acción por fila
  
  // Estados
  isLoading?: boolean;                     // Estado de carga
  
  // Paginación
  currentPage: number;                     // Página actual (base 1)
  pageSize: number;                        // Elementos por página
  
  // Ordenamiento
  sortColumn?: keyof T;                    // Columna actualmente ordenada
  sortDirection?: 'asc' | 'desc';          // Dirección del ordenamiento
  onSortChange?: (column: keyof T, direction: 'asc' | 'desc') => void;
  
  // Mensajes vacíos
  emptyMessage?: string;                   // Mensaje cuando no hay datos
  emptyIcon?: string;                      // Icono cuando no hay datos
}
```

## Tipos Requeridos

Los tipos `ColumnConfig` y `ActionButton` se importan desde `MasterDataTable`:

```typescript
import { ColumnConfig, ActionButton } from './MasterDataTable';

// ColumnConfig: Configuración de columna
interface ColumnConfig<T> {
  key: keyof T;                                          // Clave del campo
  label: string;                                         // Etiqueta de columna
  render?: (value: T[keyof T], item: T) => React.ReactNode;  // Renderizado custom
  width?: string;                                        // Ancho CSS (ej: '200px')
  sortable?: boolean;                                    // ¿Es sortable?
}

// ActionButton: Configuración de botón de acción
interface ActionButton<T> {
  label: string | ((item: T) => string);                 // Etiqueta del botón
  icon: string | ((item: T) => string);                  // Ícono (emoji o similar)
  onClick: (item: T) => void;                            // Función al hacer click
  variant?: string | ((item: T) => string);              // Variante Bootstrap
  title?: string | ((item: T) => string);                // Tooltip del botón
  show?: (item: T) => boolean;                           // ¿Mostrar este botón?
}
```

## Uso Básico

```tsx
import DataTableContent from '@/components/shared/DataTableContent';
import { ColumnConfig, ActionButton } from '@/components/shared/MasterDataTable';

// Definir la interfaz de tus datos
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Configurar columnas
const columns: ColumnConfig<Product>[] = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'price', label: 'Precio', sortable: true, width: '100px' },
  {
    key: 'stock',
    label: 'Stock',
    render: (value) => `${value} unidades`,
    width: '120px',
  },
];

// Configurar acciones
const actions: ActionButton<Product>[] = [
  {
    label: 'Editar',
    icon: '✏️',
    onClick: (product) => console.log('Editar:', product),
    variant: 'outline-primary',
  },
  {
    label: 'Eliminar',
    icon: '🗑️',
    onClick: (product) => console.log('Eliminar:', product),
    variant: 'outline-danger',
  },
];

// Usar el componente
function ProductList() {
  const [sortColumn, setSortColumn] = useState<keyof Product | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Product, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <DataTableContent<Product>
      items={products}
      columns={columns}
      actions={actions}
      isLoading={false}
      currentPage={1}
      pageSize={20}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSortChange={handleSort}
      emptyMessage="No hay productos"
      emptyIcon="📦"
    />
  );
}
```

## Uso Avanzado

### Renderizado Custom de Celdas

```tsx
const columns: ColumnConfig<Product>[] = [
  {
    key: 'price',
    label: 'Precio',
    render: (value, item) => (
      <span style={{ fontWeight: 'bold', color: 'green' }}>
        ${(value as number).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Estado',
    render: (value) => {
      const status = value as string;
      const colors: Record<string, string> = {
        active: 'success',
        inactive: 'danger',
        pending: 'warning',
      };
      return <Badge bg={colors[status]}>{status}</Badge>;
    },
  },
];
```

### Acciones Dinámicas

```tsx
const actions: ActionButton<Product>[] = [
  {
    label: (product) => product.stock > 0 ? 'Comprar' : 'Agotado',
    icon: (product) => product.stock > 0 ? '🛒' : '❌',
    onClick: (product) => handlePurchase(product),
    variant: (product) => product.stock > 0 ? 'primary' : 'secondary',
    show: (product) => product.active === true,
  },
];
```

### Con Paginación Completa

```tsx
function ProductTable() {
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Product>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const pageSize = 20;
  const allProducts = [...]; // Tus datos
  
  // Aplicar filtros y ordenamiento
  let filtered = applyFilters(allProducts);
  if (sortColumn) {
    filtered = applySorting(filtered, sortColumn, sortDirection);
  }
  
  // Paginar
  const start = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(start, start + pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <>
      <DataTableContent<Product>
        items={paginatedItems}
        columns={columns}
        actions={actions}
        currentPage={page}
        pageSize={pageSize}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={(col, dir) => {
          setSortColumn(col);
          setSortDirection(dir);
          setPage(1); // Volver a página 1
        }}
      />
      
      {/* Usar componente de paginación por separado */}
      <Pagination>
        {/* ... */}
      </Pagination>
    </>
  );
}
```

## Características

✅ **Generación automática de números de fila** - Calcula correctamente según `currentPage` y `pageSize`

✅ **Indicadores de ordenamiento** - Muestra ↑/↓ en columnas sortables

✅ **Estados visuales** - Cargando, vacío, con datos

✅ **Acciones condicionales** - Mostrar/ocultar botones según el item

✅ **Tipado completo** - TypeScript genérico para máxima seguridad

✅ **Renderizado flexible** - Custom render para cada celda

✅ **Responsive** - Usa Bootstrap y se adapta a pantallas

## Diferencias con MasterDataTable

| Característica | MasterDataTable | DataTableContent |
|---|---|---|
| Search/Filtro | ✅ Incluido | ❌ Externo |
| Paginación | ✅ Incluida | ❌ Externa |
| Header de página | ✅ Incluido | ❌ No |
| Footer con stats | ✅ Incluido | ❌ No |
| Solo tabla | ❌ No | ✅ Sí |
| Reutilizable | ⚠️ Parcial | ✅ Completo |

## Integración en MasterDataTable

`MasterDataTable` ahora usa `DataTableContent` internamente:

```tsx
<Card.Body className="p-0">
  <DataTableContent<T>
    items={items}
    columns={columns}
    actions={actions}
    isLoading={isLoading}
    currentPage={currentPage}
    pageSize={pageSize}
    sortColumn={sortColumn}
    sortDirection={sortDirection}
    onSortChange={onSortChange}
    emptyMessage={emptyMessage}
    emptyIcon={emptyIcon}
  />
</Card.Body>
```

Esto mantiene toda la lógica de búsqueda, paginación y botones en `MasterDataTable`, mientras que `DataTableContent` se encarga únicamente de la presentación.

## Ejemplos de Uso

### Tabla de Cursos

```tsx
<DataTableContent<Course>
  items={courses}
  columns={[
    { key: 'name', label: 'Nombre del Curso', sortable: true },
    { key: 'code', label: 'Código', sortable: true, width: '150px' },
    { key: 'section', label: 'Paralelo', width: '100px' },
  ]}
  actions={[
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (course) => editCourse(course),
    },
  ]}
  currentPage={currentPage}
  pageSize={20}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSortChange={onSortChange}
/>
```

### Tabla de Niveles

```tsx
<DataTableContent<EducationalLevel>
  items={levels}
  columns={[
    { key: 'name', label: 'Nivel', sortable: true },
    { key: 'code', label: 'Código', width: '100px' },
  ]}
  actions={[
    {
      icon: '🔓',
      label: 'Reactivar',
      onClick: (level) => reactivateLevel(level),
      show: (level) => level.deleted_at !== null,
    },
  ]}
  currentPage={1}
  pageSize={50}
/>
```

## Notas Importantes

- El componente es **presentación pura** - maneja solo la tabla
- La **paginación y búsqueda** se manejan en el componente padre
- El **ordenamiento** es delegado al padre vía `onSortChange`
- Los **números de fila** se calculan automáticamente basándose en `currentPage` y `pageSize`
- Los **estilos** son compatibles con Bootstrap 5

