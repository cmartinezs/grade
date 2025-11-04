#!/bin/bash

# ===================================================================
# Grade Web App - Quick Development Server Launcher
# Ejecuta rápidamente el servidor de desarrollo
# ===================================================================

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Grade Web App - Starting Development Server${NC}"
echo ""

# Verificar directorios y archivos básicos
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ Error: Ejecuta desde la raíz del proyecto${NC}"
  exit 1
fi

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install
  echo ""
fi

# Verificar .env.local
if [ ! -f ".env.local" ]; then
  echo -e "${YELLOW}⚠️  Warning: .env.local file not found${NC}"
  echo -e "${YELLOW}Configure Firebase credentials in .env.local before running${NC}"
  echo ""
fi

# Mostrar URL
echo -e "${GREEN}✓ Dev server starting...${NC}"
echo -e "${BLUE}📍 Local URL: http://localhost:3000${NC}"
echo -e "${BLUE}📍 Press Ctrl+C to stop${NC}"
echo ""

# Ejecutar servidor de desarrollo
npm run dev
