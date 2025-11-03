# Requerimientos para LevelCategory y EducationalLevel en Data Connect

## Análisis de Requisitos

Basándome en la estructura existente de `Subject/Unit/Topic` en el esquema Data Connect, aquí están los requerimientos para integrar LevelCategory y EducationalLevel:

---

## 1. Tipos GraphQL Necesarios en `schema.gql`

```graphql
type LevelCategory @table(name: "level_categories", key: "categoryId") {
  # Identificador único de la categoría de nivel
  categoryId: UUID! @col(name: "category_id")
  
  # Código de la categoría (ej. CAT_BASIC, CAT_MEDIA)
  code: String! @unique
  
  # Nombre de la categoría
  name: String!
  
  # Descripción de la categoría
  description: String
  
  # Indicador de activo/inactivo
  active: Boolean! @default(value: true)
  
  # Fecha de creación
  createdAt: Timestamp! @col(name: "created_at") @default(expr: "request.time")
  
  # ID del usuario que realizó la creación
  createdBy: UUID! @col(name: "created_by")
  
  # Fecha de última actualización
  updatedAt: Timestamp @col(name: "updated_at")
  
  # ID del usuario que realizó la última actualización
  updatedBy: UUID @col(name: "updated_by")
  
  # Fecha de eliminación (soft delete)
  deletedAt: Timestamp @col(name: "deleted_at")
  
  # ID del usuario que realizó la eliminación
  deletedBy: UUID @col(name: "deleted_by")
}

type EducationalLevel @table(name: "educational_levels", key: "levelId") {
  # Identificador único del nivel educacional
  levelId: UUID! @col(name: "level_id")
  
  # Identificador de la categoría padre
  categoryId: UUID! @col(name: "category_fk")
  
  # Código del nivel (ej. LEVEL_1B, LEVEL_2M)
  code: String! @unique
  
  # Nombre del nivel (ej. 1° Básico, 1° Medio)
  name: String!
  
  # Descripción del nivel
  description: String
  
  # Indicador de activo/inactivo
  active: Boolean! @default(value: true)
  
  # Fecha de creación
  createdAt: Timestamp! @col(name: "created_at") @default(expr: "request.time")
  
  # ID del usuario que realizó la creación
  createdBy: UUID! @col(name: "created_by")
  
  # Fecha de última actualización
  updatedAt: Timestamp @col(name: "updated_at")
  
  # ID del usuario que realizó la última actualización
  updatedBy: UUID @col(name: "updated_by")
  
  # Fecha de eliminación (soft delete)
  deletedAt: Timestamp @col(name: "deleted_at")
  
  # ID del usuario que realizó la eliminación
  deletedBy: UUID @col(name: "deleted_by")
}
```

---

## 2. Queries Necesarias

```graphql
# Query para obtener todas las categorías
query ListLevelCategories {
  levelCategories {
    categoryId
    code
    name
    description
    active
    createdAt
    createdBy
    updatedAt
    updatedBy
    deletedAt
    deletedBy
  }
}

# Query para obtener una categoría específica
query GetLevelCategory($categoryId: UUID!) {
  levelCategory(categoryId: $categoryId) {
    categoryId
    code
    name
    description
    active
    createdAt
    createdBy
  }
}

# Query para obtener todos los niveles educacionales
query ListEducationalLevels {
  educationalLevels {
    levelId
    categoryId
    code
    name
    description
    active
    createdAt
    createdBy
  }
}

# Query para obtener niveles de una categoría específica
query GetLevelsByCategory($categoryId: UUID!) {
  levelsByCategory(categoryId: $categoryId) {
    levelId
    code
    name
    description
    active
  }
}

# Query para obtener un nivel específico
query GetEducationalLevel($levelId: UUID!) {
  educationalLevel(levelId: $levelId) {
    levelId
    categoryId
    code
    name
    description
    active
  }
}
```

---

## 3. Mutations Necesarias

```graphql
# Crear categoría de nivel
mutation CreateLevelCategory(
  $categoryId: UUID!
  $code: String!
  $name: String!
  $description: String
  $createdBy: UUID!
) {
  levelCategory_insert(
    data: {
      categoryId: $categoryId
      code: $code
      name: $name
      description: $description
      createdBy: $createdBy
    }
  ) {
    categoryId
    code
    name
  }
}

# Actualizar categoría de nivel
mutation UpdateLevelCategory(
  $categoryId: UUID!
  $name: String
  $description: String
  $updatedBy: UUID!
  $updatedAt: Timestamp!
) {
  levelCategory_update(
    key: { categoryId: $categoryId }
    data: {
      name: $name
      description: $description
      updatedBy: $updatedBy
      updatedAt: $updatedAt
    }
  ) {
    categoryId
    name
  }
}

# Desactivar categoría (soft delete)
mutation DeactivateLevelCategory(
  $categoryId: UUID!
  $deletedBy: UUID!
  $deletedAt: Timestamp!
) {
  levelCategory_update(
    key: { categoryId: $categoryId }
    data: {
      active: false
      deletedBy: $deletedBy
      deletedAt: $deletedAt
    }
  ) {
    categoryId
    active
  }
}

# Crear nivel educacional
mutation CreateEducationalLevel(
  $levelId: UUID!
  $categoryId: UUID!
  $code: String!
  $name: String!
  $description: String
  $createdBy: UUID!
) {
  educationalLevel_insert(
    data: {
      levelId: $levelId
      categoryId: $categoryId
      code: $code
      name: $name
      description: $description
      createdBy: $createdBy
    }
  ) {
    levelId
    code
    name
  }
}

# Actualizar nivel educacional
mutation UpdateEducationalLevel(
  $levelId: UUID!
  $name: String
  $description: String
  $updatedBy: UUID!
  $updatedAt: Timestamp!
) {
  educationalLevel_update(
    key: { levelId: $levelId }
    data: {
      name: $name
      description: $description
      updatedBy: $updatedBy
      updatedAt: $updatedAt
    }
  ) {
    levelId
    name
  }
}

# Desactivar nivel (soft delete)
mutation DeactivateEducationalLevel(
  $levelId: UUID!
  $deletedBy: UUID!
  $deletedAt: Timestamp!
) {
  educationalLevel_update(
    key: { levelId: $levelId }
    data: {
      active: false
      deletedBy: $deletedBy
      deletedAt: $deletedAt
    }
  ) {
    levelId
    active
  }
}
```

---

## 4. Estructura de Archivos Necesarios

```
src/lib/
  ├── levelDataConnect.ts      (NEW - wrapper para Data Connect)
  └── levelStore.ts            (UPDATE - agregar functions con cache)

src/
  └── types/
      └── level.ts             (UPDATE - tipos actualizados)
```

---

## 5. Patrón a Seguir

Seguir exactamente el patrón de `taxonomyDataConnect.ts`:

```typescript
// levelDataConnect.ts
import {
  createLevelCategory as dcCreateLevelCategory,
  updateLevelCategory as dcUpdateLevelCategory,
  // ... etc
} from '../dataconnect-generated';

export const createNewLevelCategory = async (
  code: string,
  name: string,
  description: string | undefined,
  createdBy: string
): Promise<void> => {
  const categoryId = crypto.randomUUID?.() || `uuid-${Date.now()}`;
  await dcCreateLevelCategory({
    categoryId,
    code,
    name,
    description,
    createdBy
  });
};
```

Y en `levelStore.ts`:

```typescript
export const createLevelCategory = async (
  code: string,
  name: string,
  description: string | undefined,
  createdBy: string
): Promise<void> => {
  const categoryId = crypto.randomUUID?.() || `uuid-${Date.now()}`;
  await createNewLevelCategory(code, name, description, createdBy);
  
  // Actualizar caché local
  const newCategory: LevelCategory = {
    categoryId,
    code,
    name,
    description,
    active: true,
    createdAt: new Date().toISOString(),
    createdBy,
    // ... otros campos
  };
  
  if (cache.categories && Array.isArray(cache.categories)) {
    cache.categories.push(newCategory);
  } else {
    cache.categories = null;
  }
};
```

---

## Próximos Pasos

1. ✅ Agregar tipos en `dataconnect/schema/schema.gql`
2. ✅ Agregar queries y mutations en `dataconnect/example/queries.gql` y `mutations.gql`
3. ✅ Crear `src/lib/levelDataConnect.ts`
4. ✅ Actualizar `src/lib/levelStore.ts` con funciones para Data Connect
5. ✅ Actualizar tipos en `src/types/level.ts`
6. ✅ Regenerar tipos con Data Connect (`npm run generate`)
7. ✅ Integrar en componentes UI
