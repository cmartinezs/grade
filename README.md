# 📚 Grade Question Bank - Web App

Una aplicación web moderna para la gestión de bancos de preguntas académicas, desarrollada con **Next.js**, **React** y **React Bootstrap**.

## 🚀 Características

- ✅ **Gestión de Preguntas**: Crea, edita y organiza preguntas de diferentes tipos
- 🏷️ **Sistema de Categorías**: Organiza preguntas por materias y temas
- 📝 **Múltiples Tipos**: Opción múltiple, verdadero/falso, respuesta corta
- 🔍 **Búsqueda y Filtros**: Encuentra preguntas rápidamente
- 📊 **Estadísticas**: Visualiza métricas del banco de preguntas
- 📱 **Responsive**: Funciona perfectamente en dispositivos móviles y desktop

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
   git clone https://github.com/tuusuario/grade-question-bank-web-app.git
   cd grade-question-bank-web-app
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
├── app/                    # App Router de Next.js
│   ├── categories/         # Página de categorías
│   ├── questions/          # Página de preguntas
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   └── NavigationBar.tsx  # Barra de navegación
public/                    # Archivos estáticos
├── favicon.ico
└── ...
```

## 🎯 Funcionalidades Principales

### 🏠 Página Principal
- Dashboard con estadísticas generales
- Cards de características principales
- Navegación intuitiva

### ❓ Gestión de Preguntas
- Vista de todas las preguntas
- Filtros por categoría y dificultad
- Búsqueda en tiempo real
- Edición y eliminación de preguntas

### 🏷️ Gestión de Categorías
- Vista en grid de todas las categorías
- Estadísticas por categoría
- Creación y edición de categorías

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter ESLint

## 🔧 Configuración

### Bootstrap
Bootstrap se configura automáticamente importando:
- `bootstrap/dist/css/bootstrap.min.css` en el layout
- Componentes de React Bootstrap en las páginas

### TypeScript
El proyecto está completamente tipado con TypeScript. La configuración se encuentra en `tsconfig.json`.

## 🎨 Personalización

### Estilos
Los estilos personalizados se definen en `src/app/globals.css`:
```css
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  /* Más variables... */
}
```

### Componentes
Todos los componentes utilizan React Bootstrap para mantener consistencia visual.

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 📟 Tablets (768px - 992px)  
- 💻 Desktop (> 992px)

## 🔮 Próximas Funcionalidades

- [ ] Autenticación de usuarios
- [ ] Base de datos persistente
- [ ] API REST para gestión de datos
- [ ] Exportar evaluaciones a PDF
- [ ] Sistema de permisos y roles
- [ ] Importar preguntas desde CSV/Excel

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado con ❤️ por [Tu Nombre]

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
