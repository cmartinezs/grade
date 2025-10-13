# 🎓 GRADE - Web App

Una aplicación web integral para la gestión educacional, desarrollada con **Next.js**, **React** y **React Bootstrap**.

## 🌟 Características Principales

GRADE es una plataforma educacional completa que integra múltiples funcionalidades:

- 📚 **Banco de Preguntas**: Gestión avanzada de preguntas y evaluaciones
- 📊 **Analytics**: Estadísticas y reportes de rendimiento académico
- 👥 **Gestión de Usuarios**: Sistema de perfiles para docentes y estudiantes
- 🏛️ **Multi-institucional**: Soporte para múltiples instituciones educacionales
- 🔐 **Autenticación**: Sistema seguro de login y registro
- 📱 **Responsive**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) con App Router
- **Frontend**: [React 19.1.0](https://reactjs.org/)
- **UI Library**: [React Bootstrap 2.9.1](https://react-bootstrap.github.io/)
- **Estilos**: [Bootstrap 5.3.2](https://getbootstrap.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)

## 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/wanku-cl/grade-web-app.git
   cd grade-web-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/                     # App Router de Next.js
│   ├── auth/               # Páginas de autenticación
│   │   ├── login/          # Login de usuarios
│   │   └── register/       # Registro de usuarios
│   ├── questions/          # Módulo de preguntas
│   ├── categories/         # Gestión de categorías
│   ├── evaluations/        # Sistema de evaluaciones
│   ├── profile/           # Perfil de usuario
│   ├── settings/          # Configuraciones
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Landing page
├── components/            # Componentes reutilizables
│   ├── NavigationBar.tsx # Barra de navegación
│   └── ProtectedRoute.tsx # Protección de rutas
├── contexts/              # Context APIs
│   ├── AuthContext.tsx   # Contexto de autenticación
│   └── LoadingContext.tsx # Contexto de loading
└── middleware.ts          # Middleware de Next.js
```

## 🎯 Módulos y Funcionalidades

### 🏠 Landing Page
- Página de bienvenida profesional
- Información de características
- Call-to-action para registro

### 🔐 Sistema de Autenticación
- Login y registro de usuarios
- Protección de rutas privadas
- Gestión de sesiones con cookies

### 📚 Banco de Preguntas ✨ **NUEVO**
**CU-BP-01: Crear ítem nuevo** - Implementación completa con:
- ✅ Creación de preguntas con 4 tipos:
  - Verdadero/Falso (2 opciones, 1 correcta)
  - Selección Única (múltiples opciones, 1 correcta)
  - Selección Múltiple (múltiples opciones, 1+ correctas)
  - Desarrollo (respuesta abierta)
- ✅ Validación exhaustiva según reglas de negocio
- ✅ Detección automática de duplicados potenciales
- ✅ Selector jerárquico de taxonomía (Asignatura → Unidad → Tema)
- ✅ Niveles de dificultad (Bajo, Medio, Alto)
- ✅ Búsqueda textual y filtros combinables
- ✅ Trazabilidad completa (autor, fecha, versión)
- ✅ Almacenamiento en localStorage
- 📖 [Guía de Usuario](./docs/CU-BP-01-USER-GUIDE.md)
- 🔧 [Documentación Técnica](./docs/CU-BP-01-IMPLEMENTATION.md)

### 🏛️ Gestión de Taxonomías **CU-BP-11**
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
