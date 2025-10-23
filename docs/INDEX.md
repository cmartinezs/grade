# 📚 Documentación del Proyecto

Bienvenido a la documentación de **GRADE Web App**. Aquí encontrarás toda la información que necesitas para trabajar en el proyecto.

---

## 📖 Documentación General

### 🏠 [README.md](../README.md)
**Para:** Nuevos developers que clonan el proyecto  
**Contiene:**
- Información general del proyecto
- Cómo ejecutar localmente
- Estructura de carpetas
- Tech stack
- Módulos principales
- Comandos disponibles

### 📋 [CHANGELOG.md](../CHANGELOG.md)
**Para:** Usuarios finales y stakeholders  
**Contiene:**
- Cambios funcionales (user-facing)
- Nuevas características
- Mejoras de UX
- Compatibilidad

### 🔧 [CHANGELOG_TECHNICAL.md](./CHANGELOG_TECHNICAL.md)
**Para:** Developers  
**Contiene:**
- Resumen técnico de cambios
- Componentes nuevos/modificados
- Cambios en estilos
- Métricas de código
- Rutas nuevas

---

## 🔍 Documentación Técnica por Cambio

### [docs/changes/INDEX.md](./changes/INDEX.md)
**Para:** Entender cambios técnicos en detalle  
**Estructura:**
```
docs/changes/
├── 00-taxonomy-refactor/     # Refactorización Taxonomía
├── 01-sidebar-generic/       # SidebarLayout Genérico
├── 02-menu-alignment/        # Alineación de Menús
└── INDEX.md                  # Índice de cambios
```

**Cada cambio incluye:**
- `README.md` - Resumen ejecutivo
- Archivos técnicos detallados
- Ejemplos de código
- Archivos afectados

---

## 🎯 Guías por Rol

### 👤 Nuevo Developer

1. **Empieza aquí:** [../README.md](../README.md)
2. **Aprende estructura:** Sección "Estructura del Proyecto"
3. **Revisa tech stack:** Sección "Tech Stack"
4. **Ejecuta local:** Sección "Inicio Rápido"
5. **Entiende cambios:** [./CHANGELOG_TECHNICAL.md](./CHANGELOG_TECHNICAL.md)

### 🏗️ Architect / Tech Lead

1. **Visión general:** [./CHANGELOG_TECHNICAL.md](./CHANGELOG_TECHNICAL.md)
2. **Cambios técnicos:** [./changes/INDEX.md](./changes/INDEX.md)
3. **Decisiones arquitectónicas:** Cada `README.md` en `changes/XX-*/`
4. **Code patterns:** Código en `../src/`

### 👨‍💼 Project Manager / Product Owner

1. **Características:** [../CHANGELOG.md](../CHANGELOG.md)
2. **Progreso:** [./CHANGELOG_TECHNICAL.md](./CHANGELOG_TECHNICAL.md) - "Resumen de Cambios"
3. **Roadmap:** [./CHANGELOG_TECHNICAL.md](./CHANGELOG_TECHNICAL.md) - "Próximos Cambios"

### 📊 QA / Tester

1. **Nuevas features:** [CHANGELOG.md](../CHANGELOG.md)
2. **Cambios técnicos:** [CHANGELOG_TECHNICAL.md](../CHANGELOG_TECHNICAL.md)
3. **Testing ejemplos:** `docs/changes/00-taxonomy-refactor/TESTING_EXAMPLES.md`

---

## 🧭 Mapa de Documentación

```
grade-web-app/
├── README.md                          ← Inicio aquí
├── CHANGELOG.md                       ← Cambios funcionales
├── CHANGELOG_TECHNICAL.md             ← Cambios técnicos (resumen)
│
└── docs/
    ├── INDEX.md                       ← Este archivo
    ├── DOCUMENTATION_REORGANIZATION.md ← Resumen de reorganización
    │
    ├── archived/                      ← Archivos históricos
    │   └── README.md                  ← Índice de archivos archivados
    │
    └── changes/                       ← Documentación detallada
        ├── INDEX.md                   ← Índice de cambios
        ├── 00-taxonomy-refactor/
        ├── 01-sidebar-generic/
        └── 02-menu-alignment/
```

---

## 📚 Documentación por Módulo

### 📚 Banco de Preguntas
- **Ubicación:** `src/app/questions-bank/`
- **Layout:** `src/app/questions-bank/layout.tsx`
- **Taxonomía docs:** `src/app/questions-bank/taxonomy/docs/`
- **Cambio técnico:** [docs/changes/00-taxonomy-refactor/](./changes/00-taxonomy-refactor/)

### 📊 Gestión de Evaluaciones
- **Ubicación:** `src/app/evaluation-management/`
- **Layout:** `src/app/evaluation-management/layout.tsx`
- **Cambio técnico:** [docs/changes/02-menu-alignment/](./changes/02-menu-alignment/)

### 📈 Dashboard
- **Ubicación:** `src/app/dashboard/`
- **Layout:** `src/app/dashboard/layout.tsx`
- **Cambio técnico:** [docs/changes/02-menu-alignment/](./changes/02-menu-alignment/)

### 🎨 Componentes Genéricos
- **SidebarLayout:** `src/components/SidebarLayout.tsx`
- **Documentación:** [docs/changes/01-sidebar-generic/](./changes/01-sidebar-generic/)

---

## 🔗 Enlaces Útiles

### Documentación Externa
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap 5](https://getbootstrap.com/)

### Archivo del Proyecto
- **Código:** `src/`
- **Tipos:** `src/types/`
- **Componentes:** `src/components/`
- **Contextos:** `src/contexts/`
- **Estilos:** `src/app/globals.css`

---

## ❓ FAQs Rápidos

### ¿Dónde agrego una nueva página?

1. Crea carpeta en `src/app/nueva-seccion/`
2. Crea `layout.tsx` con configuración de sidebar (si es necesario)
3. Crea `page.tsx` con el contenido
4. Ver ejemplo en [docs/changes/02-menu-alignment/](./changes/02-menu-alignment/)

### ¿Cómo creo un componente reutilizable?

1. Crea archivo en `src/components/MiComponente.tsx`
2. Exporta interfaz de props
3. Documenta el componente
4. Usa en múltiples lugares

Ver ejemplo: `src/components/SidebarLayout.tsx`

### ¿Dónde va la lógica compartida?

- **Hooks custom:** Junto al módulo que los usa
- **Helpers/utils:** `src/lib/`
- **Estado global:** Context en `src/contexts/`
- **Tipos:** `src/types/`

### ¿Cómo actualizo la documentación?

1. Haz cambios en el código
2. Actualiza `CHANGELOG.md` (cambios funcionales)
3. Crea/actualiza en `docs/changes/XX-*/`
4. Actualiza `CHANGELOG_TECHNICAL.md` (resumen)
5. Commit todo junto

---

## 📋 Checklist para Nuevos Developers

- [ ] He leído [README.md](../README.md)
- [ ] He ejecutado `npm install` y `npm run dev` localmente
- [ ] He revisado [CHANGELOG_TECHNICAL.md](../CHANGELOG_TECHNICAL.md)
- [ ] Entiendo la estructura en `src/`
- [ ] He visto [docs/changes/INDEX.md](./changes/INDEX.md)
- [ ] Sé dónde buscar documentación específica
- [ ] Puedo hacer build exitoso (`npm run build`)

---

## 🤝 Convenciones de Documentación

### Archivos en `docs/changes/XX-*/`

Cada cambio debe tener:
- ✅ `README.md` - Resumen ejecutivo (obligatorio)
- ✅ Archivos técnicos según sea necesario
- ✅ Ejemplos de código
- ✅ Referencias a archivos fuente

### Formato de Changelog

**CHANGELOG.md:**
- Cambios user-facing
- Lenguaje no técnico
- Emojis para categorías

**CHANGELOG_TECHNICAL.md:**
- Cambios técnicos internos
- Resumido pero claro
- Links a `docs/changes/XX-*/`

---

## 📞 Contacto / Ayuda

Para preguntas:
1. Busca en documentación existente
2. Revisa `docs/changes/` para tu tema
3. Consulta con tech lead
4. Crea issue con contexto

---

## 📈 Actualización de Documentación

**Última actualización:** 23 de Octubre de 2025  
**Versión:** 1.0.0  
**Mantiene:** Tech Lead + Developers

---

**¡Bienvenido al proyecto GRADE! 🎉**
