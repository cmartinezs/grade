# 👥 Guía de Contribución

Bienvenido a Grade Web App. Esta guía te ayudará a contribuir de manera efectiva al proyecto.

## 🎯 Antes de Empezar

1. Lee [docs/README.md](./README.md) para entender la estructura
2. Lee [docs/ARCHITECTURE_PATTERNS.md](./ARCHITECTURE_PATTERNS.md) para conocer los patrones
3. Revisa los componentes existentes para entender el estilo

## 📋 Checklist para Nuevas Features

### 1. Crear un Store (si es necesario)

```typescript
// src/lib/entityStore.ts
class EntityStore {
  getPaginatedItems(page, pageSize, options) {
    // Implementar con búsqueda opcional
  }
  
  create(input): Entity { ... }
  update(id, input): Entity { ... }
  delete(id): void { ... }
}

export const entityStore = new EntityStore();
```

✅ Checklist:
- [ ] El método `getPaginatedItems` soporta `searchText`
- [ ] Los métodos manuejan errores adecuadamente
- [ ] Usa localStorage para persistencia
- [ ] Exporta singleton instance

### 2. Definir Tipos

```typescript
// src/types/entity.ts
export interface Entity {
  id: string;
  name: string;
  // ... otros campos
}

export interface CreateEntityInput {
  name: string;
  // ... solo campos creables
}

export interface EditEntityInput {
  name: string;
  // ... solo campos editables
}
```

✅ Checklist:
- [ ] Tipos están en `src/types/`
- [ ] Tipos son exportados
- [ ] Interfaz principal tiene `id` y timestamps

### 3. Crear Componentes

#### Page Component

```typescript
// src/app/[section]/entity/page.tsx
export default function EntityPage() {
  const [items, setItems] = useState<Entity[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const result = entityStore.getPaginatedItems(currentPage, PAGE_SIZE, {
      searchText
    });
    setItems(result.items);
  }, [currentPage, searchText]);

  const columns: ColumnConfig<Entity>[] = [
    { key: 'name', label: 'Nombre' },
    // ... más columnas
  ];

  const actions: ActionButton<Entity>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: handleEdit,
      variant: 'outline-primary',
    },
    // ... más acciones
  ];

  return (
    <MasterDataTable<Entity>
      items={items}
      totalItems={totalItems}
      totalPages={totalPages}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      columns={columns}
      actions={actions}
      searchText={searchText}
      onSearchChange={setSearchText}
      onPageChange={setCurrentPage}
      onCreateClick={() => setShowCreateModal(true)}
      title="Gestión de Entidades"
      description="Administra tus entidades"
      icon="📋"
    />
  );
}
```

✅ Checklist:
- [ ] Usa `MasterDataTable` para la lista
- [ ] Define `columns` y `actions`
- [ ] Implementa búsqueda
- [ ] Usa el patrón de efecto + reset a página 1

#### Modal Component

```typescript
// src/components/CreateEntityModal.tsx
interface CreateEntityModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateEntityModal({ show, onHide, onSuccess }: CreateEntityModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (data: CreateEntityInput) => {
    setIsSubmitting(true);
    try {
      await entityStore.create(data);
      setSubmitSuccess(true);
      setTimeout(() => {
        onSuccess();
        onHide();
      }, 1500);
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>
          {submitSuccess ? '✅ Éxito' : '➕ Crear'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitSuccess ? (
          <Alert variant="success">¡Creado exitosamente!</Alert>
        ) : (
          <EntityForm mode="create" onSubmit={handleSubmit} />
        )}
      </Modal.Body>
    </Modal>
  );
}
```

✅ Checklist:
- [ ] Maneja estados: inicial, enviando, éxito, error
- [ ] Usa un formulario centralizado
- [ ] Llama `onSuccess()` después de crear
- [ ] Tiene feedback visual al usuario

### 4. Documentar

Crea un archivo `docs/FEATURE_NAME.md`:

```markdown
# Gestión de [Entidad]

## Resumen

Describe qué hace la feature

## Componentes

- `EntityPage` - Página principal de listado
- `CreateEntityModal` - Modal para crear
- `EditEntityModal` - Modal para editar
- `EntityForm` - Formulario compartido

## Store

`entityStore` - Maneja la lógica de datos

## Ejemplo de Uso

\`\`\`tsx
// En página
<MasterDataTable<Entity> ... />
\`\`\`

## Notas

- Búsqueda funciona por nombre
- Soporta paginación
- Estados activos/inactivos
```

✅ Checklist:
- [ ] Documentación en `docs/`
- [ ] Incluye ejemplos de uso
- [ ] Explica componentes principales
- [ ] Notas sobre limitaciones

## 🔄 Workflow de Contribución

### 1. Rama de Feature

```bash
git checkout -b feature/entity-management
```

### 2. Desarrollar

- Crea store → tipos → componentes → documentación
- Build frecuentemente: `npm run build`
- Verifica no haya errores TypeScript

### 3. Testing

```bash
# Verificar build
npm run build

# Verificar que compila sin errores
npm run dev
```

### 4. Commit

```bash
git add .
git commit -m "feat: add entity management with MasterDataTable"
```

**Formato de mensaje:**
- `feat:` Para nuevas features
- `fix:` Para bugfixes
- `refactor:` Para refactorizaciones
- `docs:` Para documentación
- `chore:` Para cambios de tooling

### 5. Push y PR

```bash
git push origin feature/entity-management
```

Crea PR con descripción clara.

## 🎨 Guía de Estilo

### Componentes

```typescript
// ✅ DO: Nombres descriptivos y específicos
function UserFormModal() { }
function CreateCourseModal() { }

// ❌ DON'T: Nombres genéricos o abreviados
function Modal() { }
function CrForm() { }
```

### Props

```typescript
// ✅ DO: Props bien tipadas
interface Props {
  items: Entity[];
  onCreateClick: () => void;
  isLoading?: boolean;
}

// ❌ DON'T: Props any o sin tipos
function Component(props: any) { }
```

### Estilos

```typescript
// ✅ DO: Usar Bootstrap classes
<div className="d-flex gap-2">

// ❌ DON'T: Estilos inline o CSS custom
<div style={{ display: 'flex', gap: '8px' }}>
```

## 🧪 Pruebas Manuales

Antes de mergear, verifica:

- [ ] La lista se renderiza correctamente
- [ ] La búsqueda filtra los datos
- [ ] La paginación funciona
- [ ] Los botones de acción funcionan
- [ ] El modal de creación/edición funciona
- [ ] Los mensajes de éxito/error se muestran
- [ ] Build sin errores: `npm run build`
- [ ] No hay errores TypeScript: `npm run build`

## 📚 Recursos Útiles

- [ARCHITECTURE_PATTERNS.md](./ARCHITECTURE_PATTERNS.md) - Patrones usados
- [MASTER_DATA_TABLE.md](./MASTER_DATA_TABLE.md) - Componente principal
- [React Bootstrap Docs](https://react-bootstrap.github.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🆘 Preguntas Comunes

### "¿Cómo agrego una nueva columna a MasterDataTable?"

```typescript
const columns: ColumnConfig<Entity>[] = [
  { key: 'name', label: 'Nombre' },
  { 
    key: 'newField', 
    label: 'Nuevo Campo',
    render: (value) => <span>{value}</span>,
  },
];
```

### "¿Cómo hago búsqueda avanzada?"

Implementa en el store:
```typescript
if (options?.searchText) {
  const term = options.searchText.toLowerCase();
  items = items.filter(item =>
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
}
```

### "¿Cómo agrego una nueva acción a MasterDataTable?"

```typescript
const actions: ActionButton<Entity>[] = [
  {
    icon: '🗑️',
    label: 'Eliminar',
    onClick: handleDelete,
    variant: 'outline-danger',
  },
];
```

### "¿Dónde va la documentación de mi feature?"

En `docs/FEATURE_NAME.md`

---

**Última actualización**: 2025-11-01

¡Gracias por contribuir! 🙌
