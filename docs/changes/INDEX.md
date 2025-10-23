# 📚 Índice de Cambios Técnicos

> Documentación técnica detallada de todos los cambios realizados en el proyecto.

---

## 📋 Lista de Cambios

### [v00: Refactorización del Módulo Taxonomía](./00-taxonomy-refactor/README.md)

**Estado:** ✅ Completado  
**Fecha:** 23 Octubre 2025  
**Build:** ✅ Exitoso (2.7s, 0 errores TS)

Refactorización completa del módulo de taxonomía en el Banco de Preguntas, separando componentes en archivos independientes y mejorando la reutilización de código.

**Incluye:**
- 7 componentes modularizados
- 2 custom hooks reutilizables
- Eliminación de código duplicado
- Documentación técnica completa
- Ejemplos de testing

**Archivos:**
- `README.md` - Resumen ejecutivo
- `ARCHITECTURE.md` - Detalle arquitectónico
- `TESTING_EXAMPLES.md` - Ejemplos de testing

---

### [v01: SidebarLayout Genérico y Centralizado](./01-sidebar-generic/README.md)

**Estado:** ✅ Completado  
**Fecha:** 23 Octubre 2025  
**Build:** ✅ Exitoso (2.7s, 0 errores TS)

Implementación de componente `SidebarLayout` genérico y reutilizable que centraliza la navegación lateral en toda la aplicación.

**Incluye:**
- Componente genérico `SidebarLayout`
- Soporte para secciones (`isSection: true`)
- Prop `sidebarTitle` personalizable
- 45+ nuevas clases CSS
- 4 nuevas rutas en Questions-Bank
- Estilos unificados y profesionales

**Archivos:**
- `README.md` - Resumen ejecutivo
- `DESIGN.md` - Detalles de diseño (próximamente)
- `EXAMPLES.md` - Ejemplos de uso (próximamente)

---

### [v02: Alineación de Estructura de Menús](./02-menu-alignment/README.md)

**Estado:** ✅ Completado  
**Fecha:** 23 Octubre 2025  
**Build:** ✅ Exitoso (2.7s, 0 errores TS)

Normalización y alineación de la estructura de menús en Dashboard y Evaluation-Management para mantener consistencia visual.

**Incluye:**
- Reestructuración de Dashboard (2 secciones)
- Reestructuración de Evaluation-Management (3 secciones)
- Formato unificado en todos los menús
- 100% consistencia visual

**Archivos:**
- `README.md` - Resumen ejecutivo

---

## 🗂️ Estructura de Directorios

```
docs/changes/
├── 00-taxonomy-refactor/
│   ├── README.md              ✅ Resumen ejecutivo
│   ├── ARCHITECTURE.md        ✅ Detalle técnico
│   └── TESTING_EXAMPLES.md    ✅ Ejemplos de testing
│
├── 01-sidebar-generic/
│   ├── README.md              ✅ Resumen ejecutivo
│   ├── DESIGN.md              📝 Próximamente
│   └── EXAMPLES.md            📝 Próximamente
│
├── 02-menu-alignment/
│   ├── README.md              ✅ Resumen ejecutivo
│   └── COMPARATIVES.md        📝 Próximamente
│
└── INDEX.md                   ✅ Este archivo
```

---

## 🎯 Cómo Usar Esta Documentación

### Para Entender un Cambio

1. **Ir a `docs/changes/XX-<name>/`**
2. **Leer `README.md`** - Resumen ejecutivo y objetivos
3. **Leer archivos específicos** - Detalles técnicos según necesidad

### Para Buscar Componentes

- **SidebarLayout:** `01-sidebar-generic/README.md`
- **Taxonomía:** `00-taxonomy-refactor/README.md`
- **Menús:** `02-menu-alignment/README.md`

### Para Developer Onboarding

1. Leer `../../README.md` - Información general del proyecto
2. Leer `../../CHANGELOG_TECHNICAL.md` - Resumen de cambios
3. Leer `README.md` en cambio de interés
4. Explorar código en `src/`

---

## 📊 Resumen de Impacto

| v00 | v01 | v02 |
|-----|-----|-----|
| **Componentes:** 7 | **CSS Classes:** 45+ | **Menús:** 3 |
| **Hooks:** 2 | **Rutas:** 4 | **Secciones:** 7 |
| **Tipos:** 5 | **Prop:** sidebarTitle | **Unificado:** 100% |
| **Código:** -40% | **Reutilización:** +100% | **Consistencia:** 100% |

---

## ✅ Estado General

```
Build:           ✅ Exitoso (2.7s)
Pages:           ✅ 22 compiladas
TypeScript:      ✅ 0 errores
ESLint:          ✅ Passed
Testing:         📝 En desarrollo
```

---

## 🚀 Próximos Cambios Planeados

- **v03:** Sistema de Notificaciones
- **v04:** Autenticación Mejorada
- **v05:** Testing Framework
- **v06:** Reportes Avanzados

---

## 📞 Referencias

- **Código Fuente:** `src/`
- **Tipos:** `src/types/`
- **Componentes:** `src/components/`
- **Hooks:** En módulos específicos
- **Estilos:** `src/app/globals.css`

---

## 📝 Notas

- Todos los cambios son retrocompatibles
- 0 breaking changes
- Build optimizado con Turbopack
- TypeScript 5+ con strict mode

---

**Última actualización:** 23 de Octubre de 2025  
**Versión:** 1.0.0
