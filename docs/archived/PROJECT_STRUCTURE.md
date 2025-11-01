# 🗂️ Estructura del Proyecto

Guía visual de la estructura de directorios de Grade Web App.

## Árbol de Carpetas

```
grade-web-app/
├── docs/                           # 📚 Documentación completa
│   ├── README.md                   # Índice principal
│   ├── MASTER_DATA_TABLE.md        # Guía del componente genérico
│   ├── ARCHITECTURE_PATTERNS.md    # Patrones de arquitectura
│   ├── CONTRIBUTING.md             # Guía de contribución
│   ├── CHANGES.md                  # Resumen de cambios
│   └── PROJECT_STRUCTURE.md        # Este archivo
│
├── public/                         # 📁 Archivos estáticos
│   └── ...
│
├── src/
│   ├── app/                        # 🎯 Next.js App Router
│   │   ├── layout.tsx              # Layout root
│   │   ├── page.tsx                # Página inicio
│   │   ├── globals.css             # Estilos globales
│   │   │
│   │   ├── auth/                   # 🔐 Autenticación
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── dashboard/              # 📈 Dashboard principal
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── evaluation-management/  # 📊 Gestión de evaluaciones
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── courses/            # Gestión de cursos
│   │   │   │   └── page.tsx        # 📌 REFACTORIZADO CON MasterDataTable
│   │   │   └── levels/             # Gestión de niveles
│   │   │       ├── page.tsx        # 📌 REFACTORIZADO CON MasterDataTable
│   │   │       ├── create/page.tsx
│   │   │       └── edit/page.tsx
│   │   │
│   │   ├── questions-bank/         # ❓ Banco de preguntas
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── taxonomy/page.tsx
│   │   │   └── ...
│   │   │
│   │   ├── profile/                # 👤 Perfil de usuario
│   │   │   └── page.tsx
│   │   │
│   │   ├── public/                 # 🌐 Sección pública
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── features/page.tsx
│   │   │   └── pricing/page.tsx
│   │   │
│   │   └── settings/               # ⚙️ Configuración
│   │       └── page.tsx
│   │
│   ├── components/                 # ⚛️ React Components
│   │   ├── MasterDataTable.tsx     # ⭐ COMPONENTE GENÉRICO
│   │   │   # Tabla genérica para CRUD lists con:
│   │   │   # - Búsqueda integrada
│   │   │   # - Paginación automática
│   │   │   # - Acciones dinámicas
│   │   │   # - Estadísticas opcionales
│   │   │
│   │   ├── AutocompleteSelect.tsx  # 🔍 Select con autocompletar
│   │   │   # Componente genérico para seleccionar con búsqueda
│   │   │   # Uso: Niveles en cursos, Instituciones, etc.
│   │   │
│   │   ├── CourseForm.tsx          # 📝 Formulario unificado de cursos
│   │   │   # Modo: 'create' | 'edit'
│   │   │   # Usa: AutocompleteSelect para niveles e instituciones
│   │   │   # Usa: Form.Switch de React Bootstrap
│   │   │
│   │   ├── CreateCourseModal.tsx   # ➕ Modal crear curso
│   │   │   # Wrappea: CourseForm en modo 'create'
│   │   │
│   │   ├── EditCourseModal.tsx     # ✏️ Modal editar curso
│   │   │   # Wrappea: CourseForm en modo 'edit'
│   │   │
│   │   ├── CloneQuestionModal.tsx
│   │   ├── CreateQuestionModal.tsx
│   │   ├── CreateTaxonomyModal.tsx
│   │   ├── DeleteTaxonomyModal.tsx
│   │   ├── EditQuestionModal.tsx
│   │   ├── EditTaxonomyModal.tsx
│   │   ├── ReactivateQuestionModal.tsx
│   │   ├── RetireQuestionModal.tsx
│   │   ├── ViewQuestionModal.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingLink.tsx
│   │   ├── NavigationBar.tsx
│   │   ├── PageWrapper.tsx
│   │   ├── ProtectedRoute.tsx       # 🔒 Ruta protegida
│   │   ├── QuestionFormFields.tsx
│   │   └── SidebarLayout.tsx
│   │
│   ├── contexts/                   # 🎭 React Context
│   │   ├── AuthContext.tsx         # Contexto de autenticación
│   │   └── LoadingContext.tsx      # Contexto de carga global
│   │
│   ├── lib/                        # 📦 Lógica reutilizable
│   │   ├── courseStore.ts          # Store de cursos
│   │   │   # getPaginatedCourses(page, size, options)
│   │   │   # create, update, delete
│   │   │   # getInstitutions() - instituciones existentes
│   │   │
│   │   ├── levelStore.ts           # Store de niveles educacionales
│   │   │   # getPaginatedLevels(page, size, options) ✨ CON BÚSQUEDA
│   │   │   # create, update, delete
│   │   │   # 12 niveles chilenos por defecto
│   │   │
│   │   ├── questionStore.ts        # Store de preguntas
│   │   │   # CRUD de preguntas
│   │   │
│   │   └── taxonomyStore.ts        # Store de taxonomías
│   │       # CRUD de taxonomías
│   │
│   └── types/                      # 🔷 TypeScript Definitions
│       ├── course.ts               # Tipos: Course, CreateCourseInput, etc.
│       ├── level.ts                # Tipos: EducationalLevel, etc.
│       ├── question.ts             # Tipos de preguntas
│       └── taxonomy.ts             # Tipos de taxonomías
│
├── .eslintrc.json                  # ESLint config
├── eslint.config.mjs
├── middleware.ts                   # Middleware Next.js
├── next.config.ts                  # Config Next.js
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencias
├── README.md                       # 📖 Este README
└── ...
```

## 📍 Ubicaciones Importantes

### Componentes Reutilizables

| Componente | Ubicación | Propósito |
|-----------|----------|----------|
| `MasterDataTable` | `components/MasterDataTable.tsx` | ⭐ Tabla genérica para cualquier CRUD |
| `AutocompleteSelect` | `components/AutocompleteSelect.tsx` | Select con búsqueda |
| `CourseForm` | `components/CourseForm.tsx` | Formulario unificado (create/edit) |

### Stores (Datos)

| Store | Ubicación | Métodos Clave |
|-------|----------|---------------|
| `courseStore` | `lib/courseStore.ts` | `getPaginatedCourses`, `create`, `update`, `delete` |
| `levelStore` | `lib/levelStore.ts` | `getPaginatedLevels`, `create`, `update`, `delete` |
| `questionStore` | `lib/questionStore.ts` | Similar patrón |
| `taxonomyStore` | `lib/taxonomyStore.ts` | Similar patrón |

### Tipos

| Tipo | Ubicación | Descripción |
|-----|----------|-------------|
| `Course` | `types/course.ts` | Interfaz de curso |
| `EducationalLevel` | `types/level.ts` | Interfaz de nivel |
| `Question` | `types/question.ts` | Interfaz de pregunta |
| `Taxonomy` | `types/taxonomy.ts` | Interfaz de taxonomía |

## 🎯 Páginas Principales

### Rutas Autenticadas

```
/dashboard              → Dashboard principal
/evaluation-management  → Gestión central
  /courses             → 📊 LISTA DE CURSOS (usa MasterDataTable)
  /levels              → 📊 LISTA DE NIVELES (usa MasterDataTable)
    /create            → Crear nivel
    /edit?id=...       → Editar nivel
/questions-bank        → Banco de preguntas
  /taxonomy            → Gestión de taxonomías
/profile               → Perfil del usuario
/settings              → Configuración
```

### Rutas Públicas

```
/                      → Home/Landing
/public                → Sección pública
  /about               → Acerca de
  /features            → Características
  /pricing             → Precios
/auth/login            → Iniciar sesión
/auth/register         → Registro
```

## 🔄 Flujo de Datos

### Listado de Cursos (Ejemplo)

```
1. Page (/courses)
   ↓
   Uses: courseStore.getPaginatedCourses()
   ↓
2. State Management
   - items: Course[]
   - searchText: string
   - currentPage: number
   ↓
3. MasterDataTable Component
   - Define: columns, actions
   - Renderiza: tabla, búsqueda, paginación
   ↓
4. User Actions
   - Buscar → recargar datos
   - Cambiar página → recargar datos
   - Click acción → Modal (create/edit/delete)
```

### Crear Curso (Ejemplo)

```
1. CreateCourseModal
   - Renderiza: CourseForm (mode="create")
   ↓
2. CourseForm
   - Inputs: name, code, level, institution, active
   - AutocompleteSelect para: levels, institutions
   ↓
3. handleSubmit
   - Llama: courseStore.create()
   ↓
4. Feedback al Usuario
   - Success: Modal cierra + recargar lista
   - Error: Mostrar mensaje
```

## 🏗️ Patrones Utilizados

### 1. Store Pattern
```typescript
// Singleton instance
export const store = new Store();

// Métodos principales
store.getPaginatedItems(page, size, options)
store.create(input)
store.update(id, input)
store.delete(id)
```

### 2. Mode-Based Components
```typescript
// Mismo componente para create y edit
<CourseForm mode="create" />
<CourseForm mode="edit" />
```

### 3. Generic Components
```typescript
// Funciona con cualquier tipo
<MasterDataTable<Course> ... />
<MasterDataTable<EducationalLevel> ... />
<AutocompleteSelect<Institution> ... />
```

### 4. Modal Wrappers
```typescript
// Modal maneja ciclo de vida
<CreateCourseModal 
  show={show}
  onHide={() => setShow(false)}
  onSuccess={reloadData}
/>
```

## 📦 Dependencias Principales

```json
{
  "next": "15.5.4",
  "react": "19",
  "react-bootstrap": "^2",
  "typescript": "5+",
  "eslint": "latest"
}
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Ejecutar en desarrollo (hot reload)
npm run build    # Build para producción
npm run start    # Ejecutar producción
npm run lint     # ESLint check
```

## 🚀 Próximas Adiciones

- [ ] Aplicar MasterDataTable a Preguntas
- [ ] Aplicar MasterDataTable a Taxonomías
- [ ] Implementar Tests
- [ ] Agregar ordenamiento en columnas
- [ ] Agregar bulk actions

---

**Última actualización**: 2025-11-01

¿Necesitas ayuda? Revisa [CONTRIBUTING.md](./CONTRIBUTING.md)
