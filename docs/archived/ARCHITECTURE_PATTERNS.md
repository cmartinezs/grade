# 🏗️ Patrones de Arquitectura

Documentación sobre los patrones de diseño utilizados en Grade Web App.

## Store Pattern

El patrón Store proporciona una capa de abstracción para el manejo de datos.

### Estructura Base

```typescript
class EntityStore {
  private storageKey = 'entity_storage';
  private countKey = 'entity_count';

  // Cargar datos del almacenamiento
  private loadItems(): Entity[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Obtener todos
  getAllItems(): Entity[] {
    return this.loadItems().filter(item => item.isActive);
  }

  // Obtener paginado (con búsqueda opcional)
  getPaginatedItems(
    page: number,
    pageSize: number,
    options?: { searchText?: string; includeInactive?: boolean }
  ): { items: Entity[]; total: number; totalPages: number } {
    let items = options?.includeInactive
      ? this.loadItems()
      : this.getAllItems();

    // Filtrar por búsqueda
    if (options?.searchText) {
      const term = options.searchText.toLowerCase().trim();
      items = items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term)
      );
    }

    // Paginar
    const total = items.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    return {
      items: items.slice(start, start + pageSize),
      total,
      totalPages,
    };
  }

  // Crear
  create(input: CreateInput): Entity {
    const items = this.loadItems();
    const newItem = { id: generateId(), ...input };
    items.push(newItem);
    this.save(items);
    return newItem;
  }

  // Actualizar
  update(id: string, input: UpdateInput): Entity {
    const items = this.loadItems();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Not found');
    
    items[index] = { ...items[index], ...input };
    this.save(items);
    return items[index];
  }

  // Eliminar
  delete(id: string): void {
    const items = this.loadItems();
    const filtered = items.filter(item => item.id !== id);
    this.save(filtered);
  }

  // Guardar
  private save(items: Entity[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}

// Export singleton
export const entityStore = new EntityStore();
```

### Método getPaginatedItems

**Responsabilidades:**
1. Cargar todos los items
2. Aplicar filtros (búsqueda, activos/inactivos)
3. Paginar resultados
4. Retornar metadatos (total, totalPages)

**Parámetros:**
```typescript
{
  page: number;           // Página actual (1-indexed)
  pageSize: number;       // Items por página
  options?: {
    searchText?: string;      // Filtro de búsqueda
    includeInactive?: boolean; // Incluir inactivos
  }
}
```

**Retorno:**
```typescript
{
  items: Entity[];        // Items de esta página
  total: number;          // Total sin paginar
  totalPages: number;     // Total de páginas
}
```

## Component Pattern: Mode-Based Design

### Qué es

Componentes que cambian su comportamiento según un prop `mode`.

### Ejemplo: CourseForm

```typescript
interface CourseFormProps {
  mode: 'create' | 'edit';
  course?: Course;
  onSubmit: (data: CourseData) => void;
}

export default function CourseForm({ mode, course, onSubmit }: CourseFormProps) {
  const isCreate = mode === 'create';
  
  return (
    <form>
      {/* Los mismos campos para ambos modos */}
      <input defaultValue={isCreate ? '' : course?.name} />
      
      <button type="submit">
        {isCreate ? 'Crear' : 'Guardar'}
      </button>
    </form>
  );
}
```

**Ventajas:**
- ✅ Una única fuente de verdad para el formulario
- ✅ Lógica de validación centralizada
- ✅ Fácil de mantener
- ✅ Reducir duplicación

**Uso:**
```tsx
// CreateCourseModal
<CourseForm mode="create" onSubmit={handleCreate} />

// EditCourseModal
<CourseForm mode="edit" course={course} onSubmit={handleEdit} />
```

## Generic Component Pattern

### Qué es

Componentes reutilizables con TypeScript genéricos que funcionan con cualquier tipo de dato.

### Ejemplo: MasterDataTable

```typescript
export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

export interface ActionButton<T> {
  label: string | ((item: T) => string);
  icon: string | ((item: T) => string);
  onClick: (item: T) => void;
}

export default function MasterDataTable<T>(props: {
  items: T[];
  columns: ColumnConfig<T>[];
  actions: ActionButton<T>[];
  // ...
}) {
  // ...
}
```

**Uso con Niveles:**
```tsx
<MasterDataTable<EducationalLevel>
  items={levels}
  columns={columnsConfig}
  actions={actionsConfig}
/>
```

**Uso con Cursos:**
```tsx
<MasterDataTable<Course>
  items={courses}
  columns={columnsConfig}
  actions={actionsConfig}
/>
```

**Ventajas:**
- ✅ Reutilizable en múltiples tipos
- ✅ Type-safe (TypeScript valida tipos)
- ✅ Autocompletar en IDE
- ✅ Sin necesidad de casting

## Render Function Pattern

### Qué es

Prop que recibe una función que retorna React elements.

### Ejemplo

```typescript
interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

// Uso:
const columns = [
  { key: 'name', label: 'Nombre' },
  { 
    key: 'status', 
    label: 'Estado',
    render: (value, item) => (
      <Badge bg={value ? 'success' : 'danger'}>
        {value ? 'Activo' : 'Inactivo'}
      </Badge>
    )
  }
];
```

**Ventajas:**
- ✅ Lógica de renderizado flexible
- ✅ Evita props explosion
- ✅ Permite composición
- ✅ Type-safe

## Dynamic Props Pattern

### Qué es

Props que pueden ser valores estáticos O funciones que retornan valores dinámicos.

### Ejemplo: ActionButton

```typescript
interface ActionButton<T> {
  icon: string | ((item: T) => string);
  label: string | ((item: T) => string);
  variant?: string | ((item: T) => string);
}

// Uso estático:
{
  icon: '✏️',
  label: 'Editar',
  variant: 'primary'
}

// Uso dinámico:
{
  icon: (item) => item.active ? '🔒' : '🔓',
  label: (item) => item.active ? 'Desactivar' : 'Activar',
  variant: (item) => item.active ? 'warning' : 'success'
}
```

**Ventajas:**
- ✅ Comportamiento condicional
- ✅ Sin necesidad de múltiples componentes
- ✅ Lógica clara y declarativa
- ✅ Type-safe

## Modal Wrapper Pattern

### Qué es

Modales que wrappean un formulario y manejan el ciclo de vida completo.

### Ejemplo: CreateCourseModal

```typescript
interface CreateCourseModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateCourseModal({ show, onHide, onSuccess }: CreateCourseModalProps) {
  const handleSubmit = async (data) => {
    try {
      await courseStore.createCourse(data);
      // Success feedback
      onSuccess();
      onHide();
    } catch (error) {
      // Error feedback
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Crear Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CourseForm mode="create" onSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
}
```

**Responsabilidades:**
1. Manejar visibilidad del modal
2. Validar y enviar datos
3. Mostrar feedback al usuario
4. Llamar callbacks en éxito/error

**Patrón:**
```tsx
// En página
const [show, setShow] = useState(false);

<CreateCourseModal 
  show={show}
  onHide={() => setShow(false)}
  onSuccess={() => reloadData()}
/>
```

## Search & Filter Pattern

### Estructura

```typescript
// 1. Estado de búsqueda
const [searchText, setSearchText] = useState('');

// 2. Cargar datos cuando cambia búsqueda
useEffect(() => {
  const result = store.getPaginatedItems(1, pageSize, {
    searchText
  });
  setItems(result.items);
}, [searchText]);

// 3. Resetear a página 1 cuando cambia búsqueda
useEffect(() => {
  if (currentPage !== 1) {
    setCurrentPage(1);
  }
}, [searchText]);
```

**Ventajas:**
- ✅ Búsqueda en tiempo real
- ✅ Paginación automática al buscar
- ✅ Estado sincronizado

## Best Practices

### ✅ DO

1. **Usar TypeScript con genéricos**
   ```typescript
   function process<T>(items: T[]): T[] { ... }
   ```

2. **Componentes pequeños y focalizados**
   - Una responsabilidad por componente
   - Fácil de probar y mantener

3. **Stores singleton**
   ```typescript
   export const store = new Store(); // Singleton
   ```

4. **Usar React.useMemo para definiciones**
   ```typescript
   const columns = useMemo(() => [...], []);
   ```

5. **Callbacks en props**
   ```typescript
   onSuccess: () => void
   onError: (error: Error) => void
   ```

### ❌ DON'T

1. **Props drilling excesivo**
   ```typescript
   <Component prop1={p1} prop2={p2} prop3={p3} ... /> // ❌
   ```

2. **Lógica en componentes page**
   - Usar stores para separación de concerns

3. **Duplicación de código**
   - Extraer a componentes reutilizables

4. **Estado global innecesario**
   - Usar estado local cuando sea posible

5. **Componentes god (hacer todo)**
   - Dividir responsabilidades

---

**Última actualización**: 2025-11-01
