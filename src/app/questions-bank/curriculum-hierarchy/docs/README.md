# Taxonomía Curricular - Refactorización

## �� Resumen

Página refactorizada siguiendo patrón `page/components/hooks`:
- **7 componentes** modularizados
- **2 hooks** personalizados  
- **-77%** líneas en page.tsx (431 → 98)
- **0 errores** TypeScript

## 📁 Estructura

```
taxonomy/
├── page.tsx               # Componente raíz (98 líneas)
├── components/            # 7 componentes modularizados
├── hooks/                 # 2 hooks personalizados
├── types/                 # Tipos específicos
└── ARCHITECTURE.md        # Diagrama y flujo de datos
```

## 💡 Uso Rápido

### Importar
```typescript
import { TaxonomyHeader, TaxonomyCatalog } from './components';
import { useTaxonomyData, useTaxonomyModals } from './hooks';
```

### Usar
```tsx
function Component() {
  const { subjects, searchTerm, setSearchTerm } = useTaxonomyData();
  const { handleEdit, handleDelete } = useTaxonomyModals();

  return (
    <TaxonomyCatalog
      subjects={subjects}
      searchTerm={searchTerm}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

## 📦 Componentes

| Componente | Función |
|-----------|---------|
| **TaxonomyHeader** | Título y descripción |
| **TaxonomySearchBar** | Búsqueda y filtrado |
| **TaxonomyHelpCard** | Información y opciones |
| **TaxonomyCatalog** | Contenedor jerárquico |
| **TaxonomySubjectItem** | Asignatura (nivel 1) |
| **TaxonomyUnitItem** | Unidad (nivel 2) |
| **TaxonomyTopicItem** | Tema (nivel 3) |

## 🎣 Hooks

### useTaxonomyData
```typescript
const { subjects, searchTerm, setSearchTerm, handleSuccess, handleClearSearch } 
  = useTaxonomyData();
```

### useTaxonomyModals
```typescript
const { 
  showCreateModal, setShowCreateModal,
  showEditModal, editElement, handleEdit,
  showDeleteModal, deleteElement, handleDelete
} = useTaxonomyModals();
```

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

## ✅ Validación

✅ 0 errores TypeScript  
✅ Build exitoso  
✅ Funcionalidad 100% preservada  
✅ 100% tipado

## 📚 Documentación

- **ARCHITECTURE.md** - Diagrama, flujo y estructura
- **TESTING_EXAMPLES.md** - Ejemplos de tests
