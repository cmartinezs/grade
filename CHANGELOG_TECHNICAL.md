# 🔧 CHANGELOG_TECHNICAL - Cambios Técnicos

> **Nota:** Archivo de control de cambios técnicos para desarrolladores.
> Para cambios funcionales, ver [CHANGELOG.md](./CHANGELOG.md).

---

## [1.0.0] - 23 Octubre 2025

### 📚 v00: Refactorización del Módulo Taxonomía

**Estado:** ✅ Completado  
**Build:** ✅ Exitoso (2.7s, 22 páginas, 0 errores TypeScript)  
**Documentación:** `docs/changes/00-taxonomy-refactor/`

**Cambios Técnicos:**
- ✅ Refactorización de `questions-bank/taxonomy/` usando patrón `page/components/hooks`
- ✅ 7 componentes modularizados
- ✅ 2 hooks customizados (`useTaxonomy`, `useTaxonomyForm`)
- ✅ 5 archivos de tipo TypeScript
- ✅ Reducción de código duplicado (~40%)
- ✅ Mejora de mantenibilidad

**Archivos Principales:**
- `src/app/questions-bank/taxonomy/page.tsx` - Exporta componentes modulares
- `src/app/questions-bank/taxonomy/components/` - Componentes UI
- `src/app/questions-bank/taxonomy/hooks/` - Lógica reutilizable
- `src/types/taxonomy.ts` - Tipos TypeScript

**Detalles:** Ver `docs/changes/00-taxonomy-refactor/ARCHITECTURE.md`

---

### 🎨 v01: Implementación de SidebarLayout Genérico

**Estado:** ✅ Completado  
**Build:** ✅ Exitoso (2.7s, 22 páginas, 0 errores TypeScript)  
**Documentación:** `docs/changes/01-sidebar-generic/`

**Cambios Técnicos:**

#### 1. Componente SidebarLayout
- ✅ Componente genérico y reutilizable
- ✅ Props configurables:
  - `items: SidebarItem[]` - Menú configurable
  - `children: ReactNode` - Contenido
  - `sidebarTitle?: string` - Título del sidebar
- ✅ Interfaz `SidebarItem`:
  ```tsx
  interface SidebarItem {
    label: string;
    href?: string;
    icon?: string;
    children?: SidebarItem[];
    isSection?: boolean;  // Nuevo
  }
  ```
- ✅ Auto-detección de rutas activas con `usePathname()`
- ✅ Soporte para secciones y etiquetas
- ✅ Responsive (Offcanvas en móvil)

**Archivos:**
- `src/components/SidebarLayout.tsx` - Componente genérico

#### 2. Estilos Globales Mejorados
- ✅ Rewrite completo de estilos sidebar en `globals.css`
- ✅ 45+ nuevas clases CSS
- ✅ Colores unificados:
  - Activo: `#0d6efd` (azul)
  - Fondo activo: `#e7f1ff` (azul muy claro)
  - Secciones: `#868e96` (gris oscuro)
  - Header/Footer: `#f8f9fa` (gris claro)
- ✅ Animations: 0.2s ease
- ✅ Scrollbar customizado (6px)
- ✅ Shadow mejorada (2px 0 8px)

**Clases CSS Nuevas:**
```css
.sidebar-header
.sidebar-section
.sidebar-section-label
.sidebar-section-items
.sidebar-menu-item
.sidebar-menu-item-content
.sidebar-menu-icon
.sidebar-menu-label
.sidebar-menu-arrow
.sidebar-menu-arrow.open
.sidebar-footer
/* + hover, active states */
```

**Archivos:**
- `src/app/globals.css` - Líneas 145-287 (estilos sidebar)

#### 3. Layouts Actualizados

**Dashboard:**
```tsx
const dashboardMenu = [
  { label: 'PRINCIPAL', isSection: true, children: [...] },
  { label: 'CONFIGURACIÓN', isSection: true, children: [...] }
];

<SidebarLayout items={dashboardMenu} sidebarTitle="Panel de Control">
```

**Evaluation-Management:**
```tsx
const evalMenu = [
  { label: 'EVALUACIONES', isSection: true, children: [...] },
  { label: 'GESTIÓN ACADÉMICA', isSection: true, children: [...] },
  { label: 'RESULTADOS', isSection: true, children: [...] }
];

<SidebarLayout items={evalMenu} sidebarTitle="Gestión de Evaluaciones">
```

**Questions-Bank:**
```tsx
const qbMenu = [
  { label: 'GESTIÓN', isSection: true, children: [...] },
  { label: 'HERRAMIENTAS', isSection: true, children: [...] }
];

<SidebarLayout items={qbMenu} sidebarTitle="Banco de Preguntas">
```

**Archivos Actualizados:**
- `src/app/dashboard/layout.tsx`
- `src/app/evaluation-management/layout.tsx`
- `src/app/questions-bank/layout.tsx`

#### 4. Rutas Nuevas Creadas

**Questions Bank:**
- `src/app/questions-bank/create/page.tsx` - Crear pregunta
- `src/app/questions-bank/import/page.tsx` - Importar CSV
- `src/app/questions-bank/statistics/page.tsx` - Estadísticas
- `src/app/questions-bank/settings/page.tsx` - Configuración

**Detalles:** Ver `docs/changes/01-sidebar-generic/`

---

### 📋 v02: Alineación de Estructura de Menús

**Estado:** ✅ Completado  
**Build:** ✅ Exitoso (2.7s, 22 páginas, 0 errores TypeScript)  
**Documentación:** `docs/changes/02-menu-alignment/`

**Cambios Técnicos:**

#### 1. Reestructuración de Menús Dashboard
- ✅ Convertido de menú plano a estructura de secciones
- ✅ Agregado prop `sidebarTitle="Panel de Control"`
- ✅ 2 secciones: PRINCIPAL, CONFIGURACIÓN

#### 2. Reestructuración de Menús Evaluation-Management
- ✅ Convertido de collapsibles a secciones
- ✅ Agregado prop `sidebarTitle="Gestión de Evaluaciones"`
- ✅ 3 secciones: EVALUACIONES, GESTIÓN ACADÉMICA, RESULTADOS

#### 3. Normalización de Formato
- ✅ Todos los menús usan `isSection: true`
- ✅ Etiquetas en MAYÚSCULAS
- ✅ Iconos emoji descriptivos
- ✅ `sidebarTitle` personalizado por sección

**Archivos:**
- `src/app/dashboard/layout.tsx` - Actualizado
- `src/app/evaluation-management/layout.tsx` - Actualizado

**Detalles:** Ver `docs/changes/02-menu-alignment/MENU_STRUCTURE_ALIGNMENT.md`

---

## 📊 Resumen de Cambios Técnicos

| Cambio | Componentes | Hooks | Tipos | Rutas | Estilos CSS |
|--------|-------------|-------|-------|-------|------------|
| v00 - Taxonomía | 7 | 2 | 5 | 1 | - |
| v01 - Sidebar | 1 | 1 | 1 | 4 | 45+ |
| v02 - Menús | - | - | - | - | - |

---

## 🏗️ Cambios Arquitectónicos

### Patrón de Diseño

**Antes:**
```
Cada sección → Componente sidebar específico
└─ QBankSidebar.tsx, QBankLayout.tsx (no reutilizable)
```

**Después:**
```
Todas las secciones → SidebarLayout genérico
├─ Dashboard
├─ Evaluation-Management
└─ Questions-Bank
```

### Componentes Genéricos

| Componente | Reutilizable | Props | Estado |
|-----------|--------------|-------|--------|
| `SidebarLayout` | ✅ Sí | items, children, sidebarTitle | Activo |
| `NavigationBar` | ✅ Sí | - | Activo |
| `ProtectedRoute` | ✅ Sí | - | Activo |
| `PageWrapper` | ✅ Sí | - | Activo |

---

## 🔄 Migraciones

### Estado Global
- ✅ `AuthContext` - Sin cambios
- ✅ `LoadingContext` - Sin cambios
- ✅ `localStorage` - Sin cambios

### Tipos TypeScript
- ✅ Tipos de Taxonomía migrados a `src/types/taxonomy.ts`
- ✅ Tipos de Curso en `src/types/course.ts`
- ✅ Tipos de Pregunta en `src/types/question.ts`

---

## 📈 Métricas de Código

### Antes (v0)
- Componentes específicos: 10+
- CSS duplicado: 40%
- Layouts específicos: 5
- Tamaño bundle: ~175 kB

### Después (v1.0.0)
- Componentes genéricos: 8
- CSS duplicado: 0%
- Layouts genéricos: 1 (reutilizable)
- Tamaño bundle: ~175 kB (sin cambios)

---

## ✅ Validación

```
✓ Build exitoso en 2.7s (Turbopack)
✓ 22 páginas compiladas
✓ 0 errores TypeScript
✓ 0 warnings
✓ ESLint check: Passed
```

---

## 🚀 Próximos Cambios Técnicos Planeados

### v03: Sistema de Notificaciones
- [ ] Componente Notification
- [ ] Toast context
- [ ] Integración con módulos

### v04: Autenticación Mejorada
- [ ] Refresh token
- [ ] Session persistence
- [ ] 2FA support

### v05: Testing Framework
- [ ] Jest setup
- [ ] React Testing Library
- [ ] E2E tests Playwright

---

## 📚 Recursos Técnicos

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **React Bootstrap:** https://react-bootstrap.github.io/

---

## 🔗 Enlaces a Documentación Detallada

- `docs/changes/00-taxonomy-refactor/` - Refactorización Taxonomía
- `docs/changes/01-sidebar-generic/` - SidebarLayout Genérico
- `docs/changes/02-menu-alignment/` - Alineación de Menús

---

**Última actualización:** 23 de Octubre de 2025  
**Versión:** 1.0.0-technical
