# ⚡ Referencia Rápida

Consulta rápida de comandos, patrones y soluciones comunes.

## 🚀 Comandos Esenciales

```bash
# Desarrollo
npm run dev          # Inicia servidor desarrollo (localhost:3000)
npm run build        # Build para producción
npm run start        # Ejecuta build de producción
npm run lint         # Ejecuta ESLint

# Testing (futuro)
npm test             # Ejecutar tests
npm run test:watch   # Watch mode para tests
```

## 📁 Crear Nuevo Módulo CRUD

### 1️⃣ Paso 1: Crear Tipos

Archivo: `src/types/myentity.ts`

```typescript
export interface MyEntity {
  id: string;
  name: string;
  code: string;
  description?: string;
  active: boolean;
}

export interface CreateMyEntityInput {
  name: string;
  code: string;
  description?: string;
  active?: boolean;
}
```

### 2️⃣ Paso 2: Crear Store

Archivo: `src/lib/myentityStore.ts`

```typescript
import { MyEntity, CreateMyEntityInput } from '@/types/myentity';

class MyEntityStore {
  private items: MyEntity[] = [];

  getPaginatedMyEntities(page: number, size: number = 10, options?: {
    searchText?: string;
  }): {
    data: MyEntity[];
    total: number;
    pages: number;
  } {
    let filtered = this.items;
    
    if (options?.searchText) {
      const search = options.searchText.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search) ||
        item.code.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / size);
    const data = filtered.slice((page - 1) * size, page * size);
    
    return { data, total, pages };
  }

  create(input: CreateMyEntityInput): MyEntity {
    const entity: MyEntity = {
      id: Date.now().toString(),
      ...input,
      active: input.active ?? true,
    };
    this.items.push(entity);
    return entity;
  }

  update(id: string, input: Partial<CreateMyEntityInput>): MyEntity {
    const item = this.items.find(i => i.id === id);
    if (!item) throw new Error('No encontrado');
    Object.assign(item, input);
    return item;
  }

  delete(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
  }
}

export const myEntityStore = new MyEntityStore();
```

### 3️⃣ Paso 3: Crear Página Lista

Archivo: `src/app/mymodule/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import MasterDataTable from '@/components/MasterDataTable';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { MyEntity } from '@/types/myentity';
import { myEntityStore } from '@/lib/myentityStore';

export default function MyEntityListPage() {
  const [items, setItems] = useState<MyEntity[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MyEntity | null>(null);

  const loadData = (page: number = 1, search: string = '') => {
    const result = myEntityStore.getPaginatedMyEntities(page, 10, {
      searchText: search,
    });
    setItems(result.data);
    setTotalPages(result.pages);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <MasterDataTable<MyEntity>
        title="Mis Entidades"
        columns={[
          { key: 'code', label: 'Código' },
          { key: 'name', label: 'Nombre' },
          { key: 'description', label: 'Descripción' },
          { key: 'active', label: 'Activo', render: (item) => item.active ? '✓' : '✗' },
        ]}
        items={items}
        onSearch={(text) => loadData(1, text)}
        onAddClick={() => setShowCreate(true)}
        actions={[
          {
            label: 'Editar',
            icon: 'pencil',
            onClick: (item) => {
              setSelectedItem(item);
              setShowEdit(true);
            },
          },
          {
            label: 'Eliminar',
            icon: 'trash',
            variant: 'danger',
            onClick: (item) => {
              setSelectedItem(item);
              setShowDelete(true);
            },
          },
        ]}
      />

      <CreateModal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        onSuccess={() => {
          setShowCreate(false);
          loadData();
        }}
      />

      <EditModal
        show={showEdit}
        item={selectedItem}
        onHide={() => setShowEdit(false)}
        onSuccess={() => {
          setShowEdit(false);
          loadData();
        }}
      />

      <DeleteModal
        show={showDelete}
        item={selectedItem}
        onHide={() => setShowDelete(false)}
        onSuccess={() => {
          setShowDelete(false);
          loadData();
        }}
      />
    </div>
  );
}
```

### 4️⃣ Paso 4: Crear Modales

Archivo: `src/app/mymodule/CreateModal.tsx`

```typescript
'use client';

import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { myEntityStore } from '@/lib/myentityStore';

interface CreateModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export default function CreateModal({ show, onHide, onSuccess }: CreateModalProps) {
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    try {
      myEntityStore.create(formData);
      setFormData({ name: '', code: '', description: '' });
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Entidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Código</Form.Label>
          <Form.Control
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
```

## 🎨 MasterDataTable - Ejemplos Rápidos

### Búsqueda Simple

```typescript
<MasterDataTable
  items={items}
  onSearch={(text) => {
    // text = lo que escribió el usuario
    loadData(1, text);
  }}
/>
```

### Acciones Dinámicas

```typescript
actions={[
  {
    label: 'Activar',
    icon: 'check-circle',
    onClick: (item) => activate(item.id),
    variant: (item) => item.active ? 'success' : 'outline-success',
  },
]}
```

### Renderizado Personalizado

```typescript
columns={[
  {
    key: 'status',
    label: 'Estado',
    render: (item) => (
      <span className={item.active ? 'text-success' : 'text-danger'}>
        {item.active ? 'Activo' : 'Inactivo'}
      </span>
    ),
  },
]}
```

## 🔍 Búsqueda en Stores

Todos los stores deben soportar búsqueda:

```typescript
getPaginatedItems(page, size, options?: { searchText?: string })
```

**Filtro estándar:**
```typescript
const search = options?.searchText?.toLowerCase() || '';
return items.filter(item =>
  item.name.toLowerCase().includes(search) ||
  item.code.toLowerCase().includes(search) ||
  item.description?.toLowerCase().includes(search)
);
```

## 🛠️ Debugging

### Verificar Store

```typescript
// En consola del navegador (DevTools)
import { myEntityStore } from '@/lib/myentityStore';
myEntityStore.getPaginatedMyEntities(1, 10)
```

### Logs de Componentes

```typescript
useEffect(() => {
  console.log('Items cargados:', items);
  console.log('Total páginas:', totalPages);
}, [items, totalPages]);
```

## 📱 Bootstrap - Clases Comunes

| Clase | Uso |
|-------|-----|
| `mb-3` | Margin bottom |
| `mt-2` | Margin top |
| `ps-2` | Padding start |
| `pe-2` | Padding end |
| `text-danger` | Texto rojo |
| `text-success` | Texto verde |
| `text-muted` | Texto gris |
| `d-flex` | Display flex |
| `justify-content-between` | Flex space-between |
| `align-items-center` | Flex align center |

## 🎯 Soluciones Comunes

### Q: ¿Cómo agrego validación a un formulario?

**A:**
```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!formData.name) newErrors.name = 'Nombre requerido';
  if (!formData.code) newErrors.code = 'Código requerido';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;
  // Continuar...
};
```

### Q: ¿Cómo muestro un mensaje de éxito?

**A:**
```typescript
import { Alert } from 'react-bootstrap';

const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

// Mostrar
setAlert({ type: 'success', message: 'Guardado correctamente' });

// Renderizar
{alert && <Alert variant={alert.type}>{alert.message}</Alert>}

// Ocultar después de 3s
useEffect(() => {
  if (alert) {
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }
}, [alert]);
```

### Q: ¿Cómo combino búsqueda con filtros adicionales?

**A:**
```typescript
const loadData = (page: number, search: string, active?: boolean) => {
  let result = store.getPaginatedItems(page, 10, { searchText: search });
  
  if (active !== undefined) {
    result.data = result.data.filter(item => item.active === active);
  }
  
  setItems(result.data);
};
```

## 📚 Lecturas Recomendadas

1. **[ARCHITECTURE_PATTERNS.md](./ARCHITECTURE_PATTERNS.md)** - Entiende los patrones
2. **[MASTER_DATA_TABLE.md](./MASTER_DATA_TABLE.md)** - Domina el componente principal
3. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Navega el proyecto
4. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Sigue el workflow

## 🔗 Enlaces Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)

---

**Última actualización**: 2025-11-01

¿Algo no funciona? Revisa [CONTRIBUTING.md](./CONTRIBUTING.md#faq) para más soluciones.
