#!/bin/bash

# ===================================================================
# Grade Web App - Quick Development Server Launcher
# Ejecuta rápidamente el servidor de desarrollo
# 
# Uso:
#   ./dev.sh              - Inicia servidor de desarrollo normal
#   ./dev.sh --inspect    - Inicia servidor con Node.js inspector (debugging)
#   ./dev.sh --clean      - Limpia .next antes de iniciar
#   ./dev.sh --help       - Muestra ayuda
# ===================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Mostrar ayuda
show_help() {
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║      Grade Web App - Development Server Options            ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  echo -e "${CYAN}Uso:${NC}"
  echo "  ./dev.sh              Inicia servidor de desarrollo normal"
  echo "  ./dev.sh --inspect    Inicia servidor con Node.js inspector (debugging)"
  echo "  ./dev.sh --clean      Limpia caché .next antes de iniciar"
  echo "  ./dev.sh --help       Muestra esta ayuda"
  echo ""
  echo -e "${CYAN}Opciones combinadas:${NC}"
  echo "  ./dev.sh --clean --inspect    Limpia caché e inicia con debugging"
  echo ""
  echo -e "${CYAN}Debugging con --inspect:${NC}"
  echo "  1. Ejecuta: ./dev.sh --inspect"
  echo "  2. Abre Chrome y navega a: chrome://inspect"
  echo "  3. Haz clic en 'Open dedicated DevTools for Node'"
  echo "  4. El debugger estará disponible en puerto 9229"
  echo ""
  exit 0
}

# Procesar argumentos
INSPECT_MODE=false
CLEAN_MODE=false

for arg in "$@"; do
  case $arg in
    --inspect)
      INSPECT_MODE=true
      ;;
    --clean)
      CLEAN_MODE=true
      ;;
    --help|-h)
      show_help
      ;;
  esac
done

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

# Limpiar caché si se solicitó
if [ "$CLEAN_MODE" = true ]; then
  echo -e "${YELLOW}🧹 Cleaning .next cache...${NC}"
  rm -rf .next
  echo -e "${GREEN}✓ Cache cleared${NC}"
  echo ""
fi

# Mostrar URL
echo -e "${GREEN}✓ Dev server starting...${NC}"
echo -e "${BLUE}📍 Local URL: http://localhost:3000${NC}"

if [ "$INSPECT_MODE" = true ]; then
  echo -e "${CYAN}🔍 Debug Mode: ENABLED${NC}"
  echo -e "${CYAN}📍 Inspector URL: chrome://inspect${NC}"
  echo -e "${CYAN}📍 Debug Port: 9229${NC}"
fi

echo -e "${BLUE}📍 Press Ctrl+C to stop${NC}"
echo ""

# Ejecutar servidor de desarrollo
if [ "$INSPECT_MODE" = true ]; then
  # Ejecutar con Node.js inspector habilitado
  NODE_OPTIONS='--inspect' npm run dev
else
  # Ejecutar normalmente
  npm run dev
fi
