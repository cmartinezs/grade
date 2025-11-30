#!/bin/bash

# ===================================================================
# Grade Web App - Local Development Runner
# Ejecuta la aplicación web en ambiente local
# ===================================================================

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║        Grade Web App - Development Environment             ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Error: package.json no encontrado${NC}"
  echo -e "${YELLOW}Por favor ejecuta este script desde la raíz del proyecto (grade-web-app)${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Ubicación correcta${NC}"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Error: Node.js no está instalado${NC}"
  echo -e "${YELLOW}Por favor instala Node.js desde https://nodejs.org/${NC}"
  exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js detectado: $NODE_VERSION${NC}"
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
  echo -e "${RED}❌ Error: npm no está instalado${NC}"
  exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm detectado: $NPM_VERSION${NC}"
echo ""

# Verificar si existen las dependencias instaladas
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
  npm install
  echo -e "${GREEN}✓ Dependencias instaladas${NC}"
  echo ""
else
  echo -e "${GREEN}✓ Dependencias ya instaladas${NC}"
  echo ""
fi

# Verificar si existe .env.local
if [ ! -f ".env.local" ]; then
  echo -e "${YELLOW}⚠️  Archivo .env.local no encontrado${NC}"
  echo -e "${YELLOW}Por favor crea un archivo .env.local con la configuración de Firebase${NC}"
  echo ""
  echo -e "${BLUE}Ejemplo de .env.local:${NC}"
  echo "NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key"
  echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain"
  echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id"
  echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket"
  echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id"
  echo "NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id"
  echo "NEXT_PUBLIC_FIREBASE_DATA_CONNECT_API_URL=your_dataconnect_url"
  echo ""
else
  echo -e "${GREEN}✓ Archivo .env.local encontrado${NC}"
  echo ""
fi

# Mostrar información del proyecto
echo -e "${BLUE}📋 Información del Proyecto:${NC}"
echo "  • Framework: Next.js 15.5.4"
echo "  • Runtime: Turbopack"
echo "  • Lenguaje: TypeScript"
echo "  • Base de datos: Firebase Data-Connect"
echo ""

# Limpiar builds anteriores (opcional)
if [ "$1" == "--clean" ]; then
  echo -e "${YELLOW}🧹 Limpiando builds anteriores...${NC}"
  rm -rf .next
  echo -e "${GREEN}✓ Build anterior eliminado${NC}"
  echo ""
fi

# Ejecutar lint (opcional)
if [ "$1" == "--lint" ]; then
  echo -e "${YELLOW}🔍 Ejecutando ESLint...${NC}"
  npm run lint
  echo ""
fi

# Iniciar el servidor de desarrollo
echo -e "${BLUE}🚀 Iniciando servidor de desarrollo...${NC}"
echo -e "${YELLOW}Accede a http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  El servidor está escuchando...                           ║${NC}"
echo -e "${BLUE}║  Presiona Ctrl+C para detener                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

npm run dev

