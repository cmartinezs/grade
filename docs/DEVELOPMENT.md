# 🚀 Guía de Desarrollo Local - Grade Web App

## Requisitos Previos

- **Node.js** ≥ 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** ≥ 9.0.0 (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- Cuenta en **Firebase** con Data-Connect habilitado

## 1️⃣ Configuración Inicial

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/cmartinezs/wanku-cl.git
cd wanku-cl/grade-web-app
```

### Paso 2: Crear archivo `.env.local`
Crea un archivo llamado `.env.local` en la raíz del proyecto con tu configuración de Firebase:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Data-Connect Configuration (si aplica)
NEXT_PUBLIC_FIREBASE_DATA_CONNECT_API_URL=https://region-project.firebasedataconnect.com
```

### Paso 3: Instalar dependencias
```bash
npm install
```

## 2️⃣ Ejecutar en Desarrollo

### Opción A: Usar el script (Recomendado)
```bash
# Desde Linux/Mac
chmod +x dev.sh
./dev.sh

# Desde Windows (PowerShell)
.\dev.sh
```

### Opción B: Comando directo
```bash
npm run dev
```

### Opción C: Script completo con validaciones
```bash
chmod +x dataconnect/run.sh
./dataconnect/run.sh

# Con opciones:
./dataconnect/run.sh --clean    # Limpiar build anterior
./dataconnect/run.sh --lint     # Ejecutar linter antes
```

## 3️⃣ Acceder a la Aplicación

Una vez que el servidor esté corriendo:

- 🌐 **Web**: [http://localhost:3000](http://localhost:3000)
- 📱 **Responsive**: Accesible desde cualquier dispositivo en la red
- 🔄 **Hot Reload**: Los cambios se aplican automáticamente

## 4️⃣ Estructura del Proyecto

```
grade-web-app/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # Componentes React
│   ├── contexts/             # React Contexts
│   ├── lib/                  # Utilidades y servicios
│   ├── types/                # TypeScript types
│   └── ...
├── dataconnect/              # Configuración de Data-Connect
├── public/                   # Archivos estáticos
├── .env.local               # Variables de entorno (NO versionar)
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración TypeScript
└── dev.sh                   # Script para desarrollo rápido
```

## 5️⃣ Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Build para producción
npm run build

# Ejecutar build en producción
npm start

# Verificar código con ESLint
npm run lint
```

## 6️⃣ Características Principales

✅ **Framework**: Next.js 15.5.4 con Turbopack  
✅ **Lenguaje**: TypeScript con tipado estricto  
✅ **UI**: Bootstrap 5 + React Bootstrap  
✅ **Base de Datos**: Firebase + Data-Connect  
✅ **Autenticación**: Firebase Auth  
✅ **Gráficos**: Recharts  

## 7️⃣ Componentes Clave

### Autenticación (`AuthContext`)
- Login con email/password
- Registro de nuevos usuarios
- Auto-creación de perfiles en Data-Connect
- Gestión de tokens de sesión

### Gestión de Cursos (`courseStore`)
- CRUD de cursos
- Generación masiva de cursos
- Integración con Data-Connect
- Validación de UUID

### Gestión de Niveles (`levelStore`)
- CRUD de niveles educacionales
- Categorías de niveles
- Sincronización con Data-Connect

## 8️⃣ Debugging

### Logs en Consola
El proyecto incluye logging extenso en:
- `courseStore.ts` - Operaciones de cursos
- `courseDataConnect.ts` - Llamadas a Data-Connect
- `AuthContext.tsx` - Eventos de autenticación

### Abrir DevTools
```
F12 o Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)
```

### Verificar Variables de Entorno
```bash
# Ver variables cargadas
npm run dev
# En la consola del navegador:
console.log(process.env)
```

## 9️⃣ Troubleshooting

### ❌ Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: "Firebase configuration not found"
- Verifica que `.env.local` exista
- Verifica que las claves Firebase sean correctas
- Reinicia el servidor dev

### ❌ Errores de compilación TypeScript
```bash
npm run lint
# Revisa los errores reportados
```

### ❌ Puerto 3000 ya en uso
```bash
# Usar puerto diferente
npm run dev -- -p 3001
```

## 🔟 Contribuir

Cuando hagas cambios:

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz commit: `git commit -m "Add: descripción"`
3. Push: `git push origin feature/mi-feature`
4. Abre un Pull Request

## 1️⃣1️⃣ Recursos

- 📚 [Next.js Docs](https://nextjs.org/docs)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- 🎨 [Bootstrap Docs](https://getbootstrap.com/docs)
- 📖 [TypeScript Docs](https://www.typescriptlang.org/docs)

## 1️⃣2️⃣ Soporte

Si encuentras problemas:
- Revisa la sección Troubleshooting arriba
- Verifica los logs en la consola del navegador (F12)
- Consulta la documentación del proyecto en `docs/`

---

**¡Listo para desarrollar! 🎉**
