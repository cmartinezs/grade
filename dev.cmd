@echo off
REM ===================================================================
REM Grade Web App - Quick Development Server Launcher
REM Ejecuta rápidamente el servidor de desarrollo (CMD)
REM ===================================================================

setlocal enabledelayedexpansion

echo.
echo 🚀 Grade Web App - Starting Development Server
echo.

REM Verificar si package.json existe
if not exist "package.json" (
    echo ❌ Error: Ejecuta desde la raíz del proyecto
    exit /b 1
)

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Verificar .env.local
if not exist ".env.local" (
    echo ⚠️  Warning: .env.local file not found
    echo Configure Firebase credentials in .env.local before running
    echo.
)

REM Mostrar URL
echo ✓ Dev server starting...
echo 📍 Local URL: http://localhost:3000
echo 📍 Press Ctrl+C to stop
echo.

REM Ejecutar servidor de desarrollo
call npm run dev
