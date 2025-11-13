# Taxonomía Curricular - Arquitectura Refactorizada

## 📁 Estructura

```
taxonomy/
├── page.tsx                          # Componente raíz (98 líneas)
├── components/                       # Componentes modularizados
│   ├── TaxonomyHeader.tsx
│   ├── TaxonomySearchBar.tsx
│   ├── TaxonomyHelpCard.tsx
│   ├── TaxonomyCatalog.tsx
│   ├── TaxonomySubjectItem.tsx
│   ├── TaxonomyUnitItem.tsx
│   ├── TaxonomyTopicItem.tsx
│   └── index.ts
├── hooks/                            # Lógica de estado
│   ├── useTaxonomyData.ts
│   ├── useTaxonomyModals.ts
│   └── index.ts
└── types/                            # Tipos específicos
    └── index.ts
```

## 🎯 Flujo de Datos

```
page.tsx (raíz)
├─ useTaxonomyData()
│  └─ Gestiona: subjects, searchTerm, handleSuccess
├─ useTaxonomyModals()
│  └─ Gestiona: showCreateModal, showEditModal, showDeleteModal
└─ Renderiza:
   ├─ TaxonomyHeader
   ├─ TaxonomyHelpCard
   ├─ TaxonomySearchBar
   ├─ TaxonomyCatalog
   │  └─ TaxonomySubjectItem (recursivo)
   │     └─ TaxonomyUnitItem (recursivo)
   │        └─ TaxonomyTopicItem
   └─ 3 Modales (globales)
```

## 📊 Componentes

| Componente | Props | Responsabilidad |
|-----------|-------|-----------------|
| TaxonomyHeader | - | Título y descripción |
| TaxonomySearchBar | searchTerm, onSearchChange, onClearSearch, resultsCount | Búsqueda |
| TaxonomyHelpCard | - | Info y reset de datos |
| TaxonomyCatalog | subjects, searchTerm, onCreateClick, onEdit, onDelete | Contenedor |
| TaxonomySubjectItem | subject, searchTerm, onEdit, onDelete | Asignatura (nivel 1) |
| TaxonomyUnitItem | unit, searchTerm, onEdit, onDelete | Unidad (nivel 2) |
| TaxonomyTopicItem | topic, onEdit, onDelete | Tema (nivel 3) |

## 🎣 Hooks

### useTaxonomyData
```typescript
const { subjects, searchTerm, setSearchTerm, handleSuccess, handleClearSearch } = useTaxonomyData();
```
- Carga datos de localStorage
- Busca y filtra
- Recarga tras cambios

### useTaxonomyModals
```typescript
const { 
  showCreateModal, setShowCreateModal,
  showEditModal, editElement, handleEdit, handleEditModalHide,
  showDeleteModal, deleteElement, handleDelete, handleDeleteModalHide
} = useTaxonomyModals();
```
- Gestiona 3 modales independientes
- Almacena elementos siendo editados/eliminados

## 📦 Tipos

```typescript
interface ModalElement {
  type: TaxonomyType;  // 'subject' | 'unit' | 'topic'
  id: string;
}

interface TaxonomyContextProps {
  onEdit: (type: TaxonomyType, id: string) => void;
  onDelete: (type: TaxonomyType, id: string) => void;
}

interface TaxonomyItemProps extends TaxonomyContextProps {
  searchTerm: string;
}
```

## 💡 Cómo Usar

### Importar componentes
```typescript
import { 
  TaxonomyHeader, 
  TaxonomyCatalog,
  TaxonomySearchBar 
} from './components';
```

### Importar hooks
```typescript
import { 
  useTaxonomyData, 
  useTaxonomyModals 
} from './hooks';
```

### En un componente
```tsx
function MyComponent() {
  const { subjects, searchTerm, setSearchTerm } = useTaxonomyData();
  const { handleEdit, handleDelete } = useTaxonomyModals();

  return (
    <TaxonomyCatalog
      subjects={subjects}
      searchTerm={searchTerm}
      onCreateClick={() => {}}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

## ✅ Cambios Realizados

- **Antes**: 1 archivo monolítico (431 líneas)
- **Después**: 7 componentes (260 líneas) + 2 hooks (89 líneas)
- **Reducción**: -77% en page.tsx

## 🚀 Validación

✅ 0 errores TypeScript  
✅ Build exitoso  
✅ Funcionalidad 100% preservada  
✅ 100% tipado  

