# 🎓 GRADE - Web App

**Plataforma educacional integral para la gestión de evaluaciones, preguntas y recursos académicos.**

Desarrollada con **Next.js 15.5.4**, **React 19**, **TypeScript 5+** y **React Bootstrap**.

---

## 📚 Documentación

### 🗂️ Índice de Documentación (EMPIEZA AQUÍ)
**[→ DOCS_INDEX.md](./DOCS_INDEX.md)** - Guía de lectura en orden lógico

## � Documentación

### 🔐 Firebase Authentication (Reciente)
**[→ docs/changes/07-firebase-auth/INDEX.md](./docs/changes/07-firebase-auth/INDEX.md)** - Documentación Firebase Auth integrada

| Archivo | Propósito | Duración |
|---------|-----------|----------|
| **[01_QUICK_START.md](./docs/changes/07-firebase-auth/01_QUICK_START.md)** | ⚡ Configuración rápida | 5 min |
| **[02_FIREBASE_AUTH_SETUP.md](./docs/changes/07-firebase-auth/02_FIREBASE_AUTH_SETUP.md)** | 🔐 Autenticación detallada | 15 min |
| **[03_FIRESTORE_STRUCTURE.md](./docs/changes/07-firebase-auth/03_FIRESTORE_STRUCTURE.md)** | 📊 Estructura de datos | 10 min |
| **[04_IMPLEMENTATION_SUMMARY.md](./docs/changes/07-firebase-auth/04_IMPLEMENTATION_SUMMARY.md)** | 🔧 Cambios técnicos | 10 min |
| **[05_PROJECT_STATUS.md](./docs/changes/07-firebase-auth/05_PROJECT_STATUS.md)** | 📈 Estado del proyecto | 5 min |

### �️ Firebase Data Connect (Reciente)
**[→ docs/DATACONNECT_TECHNICAL_GUIDE.md](./docs/DATACONNECT_TECHNICAL_GUIDE.md)** - Documentación técnica de Data Connect

| Archivo | Propósito |
|---------|-----------|
| **[DATACONNECT_TECHNICAL_GUIDE.md](./docs/DATACONNECT_TECHNICAL_GUIDE.md)** | 🔧 Guía técnica completa (Schemas, Queries, Mutations, SDK, Deploy) |
| **[DATACONNECT_QUICK_REFERENCE.md](./docs/DATACONNECT_QUICK_REFERENCE.md)** | ⚡ Referencia rápida (comandos y ejemplos) |

###  Documentación en `/docs/`
- **[docs/QUICK_REFERENCE.md](./docs/QUICK_REFERENCE.md)** - ⚡ Guía rápida
- **[docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)** - 🗂️ Estructura del proyecto
- **[docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - 🔧 Solución de problemas
- **[docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - 👥 Guía de contribución
- **[docs/changes/](./docs/changes/)** - 📋 Historial de cambios y features recientes

---

## �🚀 Inicio Rápido

### Requisitos Previos
- **Node.js 18+** 
- **npm 9+** o **yarn 4+**
- **Git**

### Instalación y Ejecución

```bash
# 1. Clonar repositorio
git clone https://github.com/wanku-cl/grade-web-app.git
cd grade-web-app

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en navegador
# Visita http://localhost:3000
```

### Comandos Disponibles

```bash
npm run dev        # Iniciar servidor de desarrollo (Turbopack)
npm run build      # Compilar para producción
npm run start      # Iniciar servidor producción
npm run lint       # Ejecutar linter (ESLint)
npm run type-check # Verificar tipos TypeScript
```

### Scripts de Desarrollo Rápido

Para mayor conveniencia, se proporcionan scripts de inicio rápido según tu sistema operativo:

#### 🐧 Linux / macOS
```bash
./dev.sh           # Ejecutar servidor de desarrollo
./run.sh           # Ejecutar aplicación web completa
```

#### 🪟 Windows - PowerShell
```powershell
.\dev.ps1          # Ejecutar servidor de desarrollo
.\run.ps1          # Ejecutar aplicación web completa
```

> **Nota:** Si tienes restricción de ejecución de scripts en PowerShell, ejecuta primero:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```

#### 🪟 Windows - CMD
```cmd
dev.cmd            # Ejecutar servidor de desarrollo
run.cmd            # Ejecutar aplicación web completa
```

Estos scripts automáticamente:
- ✅ Verifican que estés en la raíz del proyecto
- ✅ Instalan dependencias si no existen
- ✅ Validan la configuración de `.env.local`
- ✅ Inician el servidor en `http://localhost:3000`

---

## 🔥 Despliegue en Firebase

### Requisitos Previos
- Cuenta de Firebase/Google activa
- Firebase CLI instalado: `npm install -g firebase-tools`

### Pasos de Despliegue

#### 1. Autenticación con Firebase
```bash
firebase login
```
Esto abrirá el navegador para que inicies sesión con tu cuenta de Google.

#### 2. Inicializar Firebase
```bash
firebase init
```

**Selecciona las opciones:**
- ✅ **Hosting: Set up deployments for static web apps**
- Elige un proyecto existente o crea uno nuevo
- Public directory: **`.next`** (Next.js build output)
- ⚠️ **IMPORTANTE:** Cuando pregunta si usar `next.config.js`, responde **No** (Firebase lo detecta automáticamente)

#### 3. Habilitar Web Frameworks Experimentales (Crucial para Next.js)

Edita `firebase.json` y modifica la sección `hosting`:

```json
{
  "hosting": {
    "public": ".next",
    "webFrameworks": [
      {
        "framework": "next",
        "version": "15"
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "trailingSlashBehavior": "ADD"
  }
}
```

O puedes usar el panel de Firebase Console para habilitar "Web Frameworks" en experimentales.

#### 4. Build para Producción
```bash
npm run build
```

#### 5. Desplegar a Firebase
```bash
firebase deploy
```

Si todo sale bien, verás un mensaje como:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/tu-proyecto
Hosting URL: https://tu-proyecto.web.app
```

### Despliegues Posteriores

Para futuros despliegues, solo necesitas:
```bash
npm run build
firebase deploy
```

### Troubleshooting

| Problema | Solución |
|----------|----------|
| `Error: Failed to list Firebase projects` | Ejecuta `firebase login` nuevamente |
| `Build artifacts not found in public directory` | Verifica que `firebase.json` tenga `"public": ".next"` |
| Sitio muestra 404 en rutas dinámicas | Verifica que `webFrameworks` esté habilitado en `firebase.json` |
| Cambios no se reflejan | Limpia cache y redeploya: `firebase deploy --force` |

---

## 🗄️ Firebase Data Connect

Este proyecto usa **Firebase Data Connect** para conectarse a una base de datos **PostgreSQL** en Cloud SQL, proporcionando una forma segura y escalable de acceder a datos.

> **📖 IMPORTANTE:** Consulta las guías de Data Connect para información técnica detallada:
> - **[Guía Técnica Completa](./docs/DATACONNECT_TECHNICAL_GUIDE.md)** - Schemas, Queries, Mutations, SDK, Deploy
> - **[Quick Reference](./docs/DATACONNECT_QUICK_REFERENCE.md)** - Comandos y ejemplos rápidos

### Configuración Inicial

#### 1. Requisitos Previos
- Firebase CLI instalado: `npm install -g firebase-tools`
- Acceso a un proyecto Firebase con Data Connect habilitado
- Instancia Cloud SQL PostgreSQL configurada

#### 2. Autenticación con Firebase
```bash
firebase login
```

#### 3. Configurar Credenciales en `.env.local`
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_DATACONNECT_ENDPOINT=your_dataconnect_endpoint
```

### Estructura de Data Connect

**Archivo principal:** `/dataconnect/dataconnect.yaml`
```yaml
specVersion: "v1"
serviceId: "grade-2c5d1-2-service"
location: "southamerica-west1"
schema:
  source: "./schema"
  datasource:
    postgresql:
      database: "grade-2c5d1-2-database"
      cloudSql:
        instanceId: "grade-2c5d1-2-instance"
connectorDirs: ["./example"]
```

### Operaciones Disponibles

#### Queries (Lectura)
```typescript
// src/lib/userDataConnect.ts
import { getUserByEmail } from '@/lib/userDataConnect';

const user = await getUserByEmail('user@example.com');
```

#### Mutations (Escritura)
```typescript
// src/lib/userDataConnect.ts
import { createUser, updateUser } from '@/lib/userDataConnect';

// Crear usuario
const newUser = await createUser({
  id: generateUUID(),
  email: 'newuser@example.com',
  name: 'John Doe',
  role: 'teacher'
});

// Actualizar usuario
await updateUser(userId, { name: 'Jane Doe' });
```

### Flujo de Autenticación con Data Connect

```
Firebase Auth (signIn)
    ↓
Data Connect Query (getUserByEmail)
    ↓
Crear objeto User local
    ↓
Guardar en localStorage
    ↓
AuthContext actualizado
    ↓
Redirigir a dashboard
```

### Archivos Principales de Data Connect

| Archivo | Propósito |
|---------|-----------|
| `/dataconnect/dataconnect.yaml` | Configuración de Data Connect |
| `/dataconnect/schema/schema.gql` | Schema de GraphQL |
| `/dataconnect/example/queries.gql` | Queries (lecturas) |
| `/dataconnect/example/mutations.gql` | Mutations (escrituras) |
| `/src/lib/userDataConnect.ts` | Funciones de usuario |
| `/src/lib/levelDataConnect.ts` | Funciones de niveles |
| `/src/lib/taxonomyDataConnect.ts` | Funciones de taxonomía |

### Documentación Completa

Para más información sobre la migración de Firestore a Data Connect y arquitectura:
- **[→ docs/FIRESTORE_TO_DATACONNECT_MIGRATION.md](./docs/FIRESTORE_TO_DATACONNECT_MIGRATION.md)** - Migración detallada
- **[→ docs/UUID_ARCHITECTURE.md](./docs/UUID_ARCHITECTURE.md)** - Arquitectura con Data Connect
- **[→ docs/DATACONNECT_TECHNICAL_GUIDE.md](./docs/DATACONNECT_TECHNICAL_GUIDE.md)** - 🔧 Guía técnica completa (RECOMENDADO)

---

GRADE es una plataforma educacional completa que integra:

| Feature | Descripción |
|---------|-------------|
| 📚 **Banco de Preguntas** | Gestión avanzada, categorización, importación CSV |
| 📊 **Evaluaciones** | Crear, asignar y calificar evaluaciones |
| � **Analytics** | Reportes y estadísticas de rendimiento |
| 👥 **Gestión de Usuarios** | Perfiles para docentes y estudiantes |
| 🏛️ **Multi-institucional** | Soporte para múltiples instituciones |
| 🔐 **Autenticación** | Login seguro y registro de usuarios |
| 📱 **Responsive Design** | Optimizado para todos los dispositivos |

---

## 🛠️ Tech Stack

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Next.js** | 15.5.4 | Framework React con SSR/SSG |
| **React** | 19.1.0 | Librería UI |
| **TypeScript** | 5+ | Lenguaje tipado |
| **React Bootstrap** | 2.9.1 | Componentes Bootstrap |
| **Bootstrap** | 5.3.2 | Framework CSS |
| **ESLint** | Latest | Linting de código |

---

## 📁 Estructura del Proyecto

```
grade-web-app/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── auth/              # Autenticación (login, register)
│   │   ├── dashboard/         # Panel de control
│   │   ├── evaluation-management/  # Gestión de evaluaciones
│   │   ├── questions-bank/    # Banco de preguntas
│   │   ├── profile/           # Perfil de usuario
│   │   ├── settings/          # Configuraciones
│   │   ├── public/            # Landing page pública
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout raíz
│   │   └── page.tsx           # Landing page
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── SidebarLayout.tsx  # Sidebar genérico
│   │   ├── NavigationBar.tsx  # Barra de navegación
│   │   ├── ProtectedRoute.tsx # Protección de rutas
│   │   └── ...
│   │
│   ├── contexts/              # Context APIs
│   │   ├── AuthContext.tsx    # Contexto de autenticación
│   │   └── LoadingContext.tsx # Contexto de loading
│   │
│   ├── lib/                   # Utilidades y helpers
│   │   ├── courseStore.ts
│   │   ├── questionStore.ts
│   │   └── taxonomyStore.ts
│   │
│   └── types/                 # TypeScript types
│       ├── course.ts
│       ├── question.ts
│       └── taxonomy.ts
│
├── docs/                      # Documentación
│   ├── changes/              # Cambios técnicos por versión
│   │   ├── 00-taxonomy-refactor/
│   │   ├── 01-sidebar-generic/
│   │   └── ...
│   └── ...
│
├── public/                    # Archivos estáticos
├── eslint.config.mjs          # Configuración ESLint
├── next.config.ts             # Configuración Next.js
├── tsconfig.json              # Configuración TypeScript
├── package.json               # Dependencias y scripts
├── middleware.ts              # Middleware de Next.js
├── README.md                  # Este archivo
├── CHANGELOG.md               # Cambios funcionales
├── docs/                      # Documentación centralizada
│   ├── CHANGELOG_TECHNICAL.md # Cambios técnicos
│   ├── INDEX.md               # Guía de navegación
│   └── changes/               # Cambios técnicos detallados
└── .gitignore
```

---

## 🗂️ Rutas y Módulos Principales

### Rutas Públicas
- `/` - Landing page
- `/public/*` - Páginas públicas (about, features, pricing)
- `/auth/login` - Iniciar sesión
- `/auth/register` - Registro de usuarios

### Rutas Protegidas
- `/dashboard` - Panel de control principal
- `/questions-bank/*` - Banco de preguntas
- `/evaluation-management/*` - Gestión de evaluaciones
- `/profile` - Perfil del usuario
- `/settings` - Configuraciones

---

## 📚 Módulos Principales

### 📚 Banco de Preguntas (`/questions-bank`)
Sistema completo para gestionar preguntas de evaluaciones:
- **Listar Preguntas**: Vista principal con filtros
- **Crear Pregunta**: Formulario completo con 4 tipos
- **Importar Preguntas**: Carga masiva via CSV
- **Taxonomía**: Gestión de clasificación (Asignatura → Unidad → Tema)
- **Estadísticas**: Análisis de uso y desempeño
- **Configuración**: Ajustes del módulo

### 📊 Gestión de Evaluaciones (`/evaluation-management`)
Creación y administración de evaluaciones:
- **Mis Evaluaciones**: Lista de evaluaciones creadas
- **Crear Evaluación**: Asignar preguntas a evaluaciones
- **Cursos**: Gestión de cursos académicos
- **Resultados**: Ver resultados de estudiantes

### � Dashboard (`/dashboard`)
Panel de control personalizado:
- **Resumen**: Estadísticas generales
- **Reportes**: Análisis detallados
- **Configuración**: Ajustes del panel

---

## 🔐 Autenticación y Seguridad

- Sistema de **login/registro** seguro
- **Protección de rutas** privadas con `ProtectedRoute`
- **Gestión de sesiones** con cookies
- **Middleware** de autenticación
- Contexto `AuthContext` para estado global

---

## 🎨 Componentes Genéricos

### SidebarLayout
Componente reutilizable para navegación lateral:
- Menús configurables por sección
- Soporte para items anidados
- Detección automática de rutas activas
- Responsive (Offcanvas en móvil)

**Uso:**
```tsx
<SidebarLayout items={menu} sidebarTitle="Mi Sección">
  {children}
</SidebarLayout>
```

### NavigationBar
Barra de navegación superior con branding y opciones de usuario.

### ProtectedRoute
HOC para proteger rutas privadas que requieren autenticación.

---

## 📖 Documentación Adicional

- **[CHANGELOG.md](./CHANGELOG.md)** - Cambios funcionales (user-facing)
- **[docs/CHANGELOG_TECHNICAL.md](./docs/CHANGELOG_TECHNICAL.md)** - Cambios técnicos resumidos
- **[docs/INDEX.md](./docs/INDEX.md)** - Guía de navegación por rol
- **[docs/changes/](./docs/changes/)** - Documentación detallada por cambio técnico
  - Cada cambio tiene su propio directorio con archivos técnicos
  - Formato: `XX-<change-name>/<archivos>.md`
  - Ejemplo: `00-taxonomy-refactor/ARCHITECTURE.md`, `TESTING.md`, etc.

---

## 💡 Desarrollo

### Agregar una Nueva Sección

1. Crear carpeta en `src/app/nueva-seccion/`
2. Crear `layout.tsx` con configuración de menú
3. Crear `page.tsx` como punto de entrada
4. Usar `SidebarLayout` para navegación consistente
5. Documentar cambios en `CHANGELOG.md` y técnico

### Agregar un Nuevo Componente

1. Crear archivo en `src/components/MiComponente.tsx`
2. Documentar props y uso
3. Si es genérico/reutilizable, crear stories o ejemplos
4. Registrar en archivo índice si corresponde

### Tipos y Interfaces

Todos los tipos deben estar en `src/types/`:
- `course.ts` - Tipos relacionados con cursos
- `question.ts` - Tipos de preguntas
- `taxonomy.ts` - Tipos de taxonomía

---

## 🧪 Testing

Actualmente en desarrollo. Ver:
- Documentación técnica en `docs/changes/XX-*/TESTING.md`
- Ejemplos en módulos específicos

---

## 🤝 Contribuciones

Al contribuir, por favor:

1. Crear rama feature: `git checkout -b feature/AmazingFeature`
2. Commit cambios: `git commit -m 'Add AmazingFeature'`
3. Push a rama: `git push origin feature/AmazingFeature`
4. Abrir Pull Request

**Importante:** Actualizar `CHANGELOG.md` (cambios funcionales) y `docs/CHANGELOG_TECHNICAL.md` (cambios técnicos) con cada PR.

---

## 📝 Notas para Desarrolladores

### Build y Compilación
- Usamos **Turbopack** para compilación rápida (~2.7s)
- Verificar tipos con `npm run type-check` antes de commit
- 0 errores TypeScript es requerido

### Estilos
- CSS global en `src/app/globals.css`
- Componentes específicos pueden tener `.css` local
- Usar **React Bootstrap** para componentes UI

### Estado
- `AuthContext` para autenticación global
- `LoadingContext` para estados de carga
- `localStorage` para datos persistentes (preguntas, cursos)

### Convenciones
- Componentes en PascalCase: `MiComponente.tsx`
- Funciones utilitarias en camelCase: `miUtilidad.ts`
- Tipos con `I` o sin prefijo: `Question`, `IQuestion`
- Archivos CSS local: `MiComponente.css` junto a componente

---

## � Soporte

Para dudas o problemas:
1. Revisar documentación en `docs/changes/`
2. Buscar en issues existentes
3. Crear nuevo issue con contexto

---

## 📄 Licencia

Proyecto desarrollado por **Wanku CL**. Todos los derechos reservados.

---

**Última actualización:** 23 de Octubre de 2025  
**Versión:** 1.0.0
- Estructura jerárquica: Asignatura → Unidad → Tema
- CRUD completo con validaciones
- Análisis de impacto para eliminación
- Búsqueda y filtrado multinivel
- Prevención de duplicados
- Almacenamiento en localStorage

### 🏷️ Gestión de Categorías
- Organización por materias y temas
- Estadísticas por categoría
- Gestión visual con tarjetas

### 📝 Sistema de Evaluaciones
- Creación de evaluaciones personalizadas
- Asignación de preguntas por categoría
- Configuración de parámetros de evaluación

### 👤 Perfil de Usuario
- Gestión de datos personales
- Historial de actividades
- Preferencias de configuración

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter ESLint

## 🔧 Configuración

### Autenticación
El sistema utiliza:
- LocalStorage para persistencia del estado
- Cookies para compatibilidad con middleware
- Context API para gestión global del estado

### Loading States
Sistema global de loading con:
- Overlay de carga con blur de fondo
- Mensajes personalizables
- Integración con navegación

### Estilos Personalizados
```css
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --danger-color: #dc3545;
}
```

## 📱 Diseño Responsive

Optimizado para:
- 📱 **Móviles** (< 768px): Navegación colapsable y layouts verticales
- 📟 **Tablets** (768px - 992px): Grids adaptativos  
- 💻 **Desktop** (> 992px): Experiencia completa de escritorio

## 🛡️ Seguridad

- Protección de rutas del lado cliente y servidor
- Validación de autenticación en middleware
- Gestión segura de tokens y cookies
- Sanitización de datos de entrada

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] Base de datos PostgreSQL/MySQL
- [ ] API REST completa
- [ ] Sistema de roles y permisos
- [ ] Reportes avanzados con gráficos
- [ ] Exportación a PDF/Excel
- [ ] Integración con LMS existentes
- [ ] Análisis de IA para recomendaciones

### Módulos Futuros
- [ ] **Calendario Académico**: Programación de evaluaciones
- [ ] **Mensajería**: Comunicación entre docentes y estudiantes  
- [ ] **Biblioteca Digital**: Repositorio de recursos educativos
- [ ] **Gamificación**: Sistema de puntos y logros

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/ModuloIncreible`)
3. Commit tus cambios (`git commit -m 'Agrega ModuloIncreible'`)
4. Push a la rama (`git push origin feature/ModuloIncreible`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🏢 Sobre WANKU

GRADE es desarrollado por **WANKU**, una empresa chilena especializada en soluciones tecnológicas para el sector educacional.

---

⭐ **¡Transforma la educación con GRADEREADME.md* ⭐
