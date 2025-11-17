# PaginationControl - Componente de Paginación Reutilizable

## Descripción

`PaginationControl` es un componente de paginación genérico extraído de `MasterDataTable` que puede reutilizarse en diferentes contextos. Maneja la presentación de controles de navegación y muestra información del conteo de items.

## Ubicación

`/src/components/shared/PaginationControl.tsx`

## Props

```typescript
interface PaginationControlProps {
  currentPage: number;                    // Página actual (base 1)
  totalPages: number;                     // Total de páginas
  pageSize: number;                       // Items por página
  totalItems: number;                     // Total de items
  isLoading?: boolean;                    // Estado de carga
  onPageChange: (page: number) => void;   // Callback al cambiar de página
}
```

## Uso Básico

```tsx
import PaginationControl from '@/components/shared/PaginationControl';

function MyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 20;
  const totalItems = 150;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      {/* Tu tabla aquí */}
      
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        isLoading={false}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

## Características

✅ **Navegación completa**
- Botón Primera página (|<)
- Botón Página anterior (<)
- Selector de números de página directo
- Botón Página siguiente (>)
- Botón Última página (>|)

✅ **Información de conteo**
- Muestra rango de items visibles (ej: "Mostrando 1-20 de 150")
- Actualiza dinámicamente según página actual y pageSize

✅ **Estados inteligentes**
- Deshabilita botones Primer/Anterior en primera página
- Deshabilita botones Siguiente/Último en última página
- Deshabilita todo durante carga

✅ **Loading state**
- Spinner cuando está cargando
- Buttons deshabilitados durante carga

✅ **Responsive**
- Utiliza Bootstrap Pagination
- Se adapta a diferentes tamaños de pantalla

## Ejemplos de Uso

### Con tabla de datos

```tsx
function ProductList() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 20;
  const allProducts = [...]; // Tus productos
  
  const totalItems = allProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedItems = allProducts.slice(start, start + pageSize);

  return (
    <Card>
      <Card.Body>
        <Table>
          <tbody>
            {paginatedItems.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </Card.Footer>
    </Card>
  );
}
```

### Con carga asíncrona

```tsx
function CoursesPage() {
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const pageSize = 25;

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetchCourses(page, pageSize);
        setCourses(response.data);
        setTotalItems(response.total);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourses();
  }, [page]);

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <DataTableContent<Course>
        items={courses}
        columns={courseColumns}
        currentPage={page}
        pageSize={pageSize}
        isLoading={isLoading}
      />
      
      <div className="mt-3">
        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
```

### Con filtros y búsqueda

```tsx
function SearchableList() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 15;

  // Hacer búsqueda y recargar datos
  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setSearchText(searchQuery);
      setPage(1); // Volver a página 1 al buscar
      
      setIsLoading(true);
      try {
        const response = await searchItems(searchQuery, 1, pageSize);
        setItems(response.data);
        setTotalItems(response.total);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  // Cambiar de página
  const handlePageChange = useCallback(
    async (newPage: number) => {
      setPage(newPage);
      
      setIsLoading(true);
      try {
        const response = await searchItems(searchText, newPage, pageSize);
        setItems(response.data);
        setTotalItems(response.total);
      } finally {
        setIsLoading(false);
      }
    },
    [searchText, pageSize]
  );

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Card>
      <Card.Header>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={isLoading}
          />
        </InputGroup>
      </Card.Header>

      <Card.Body>
        <DataTableContent<Item>
          items={items}
          columns={itemColumns}
          currentPage={page}
          pageSize={pageSize}
          isLoading={isLoading}
        />
      </Card.Body>

      <Card.Footer>
        <PaginationControl
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </Card.Footer>
    </Card>
  );
}
```

## Cálculo de Páginas

Para usar este componente correctamente, necesitas calcular el número de páginas:

```typescript
const pageSize = 20;
const totalItems = 150;
const totalPages = Math.ceil(totalItems / pageSize); // 8 páginas

// Luego extraer items de la página actual:
const start = (currentPage - 1) * pageSize;
const end = start + pageSize;
const paginatedItems = allItems.slice(start, end);
```

## Integración con MasterDataTable

`MasterDataTable` ahora usa `PaginationControl` internamente:

```tsx
<Card.Footer className="bg-light text-center">
  {totalPages >= 1 && (
    <PaginationControl
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      totalItems={totalItems}
      isLoading={isLoading}
      onPageChange={onPageChange}
    />
  )}
</Card.Footer>
```

## Estilo y Apariencia

El componente utiliza Bootstrap Pagination (`react-bootstrap`), por lo que hereda todos los estilos de Bootstrap:

- **Botones deshabilitados**: Color gris con cursor no permitido
- **Página activa**: Resaltada en azul
- **Números de página**: Clickeables y navegables
- **Texto de información**: Pequeño, color gris (muted)
- **Spinner de carga**: Centrado a la derecha

## Notas Importantes

- **Página base 1**: Las páginas comienzan en 1, no en 0
- **Cálculo de rango**: El rango mostrado se calcula como `(currentPage - 1) * pageSize + 1` a `min(currentPage * pageSize, totalItems)`
- **Deshabilitación inteligente**: Los botones se deshabilitan automáticamente según el estado
- **Props requeridos**: Todos los props son requeridos para asegurar comportamiento consistente

## Comparativa de Componentes

| Característica | MasterDataTable | DataTableContent | PaginationControl |
|---|---|---|---|
| Tabla | ✅ | ✅ | ❌ |
| Paginación | ✅ | ❌ | ✅ |
| Búsqueda | ✅ | ❌ | ❌ |
| Header | ✅ | ❌ | ❌ |
| Reutilizable | ⚠️ | ✅ | ✅ |

