# ===================================================================
# Grade Web App - Quick Development Server Launcher
# Ejecuta rápidamente el servidor de desarrollo (PowerShell)
# ===================================================================

# Variables de color
$BLUE = "`e[0;34m"
$GREEN = "`e[0;32m"
$YELLOW = "`e[1;33m"
$RED = "`e[0;31m"
$NC = "`e[0m"

Write-Host "${BLUE}🚀 Grade Web App - Starting Development Server${NC}"
Write-Host ""

# Verificar si package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "${RED}❌ Error: Ejecuta desde la raíz del proyecto${NC}"
    exit 1
}

# Instalar dependencias si no existen
if (-not (Test-Path "node_modules")) {
    Write-Host "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    Write-Host ""
}

# Verificar .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host "${YELLOW}⚠️  Warning: .env.local file not found${NC}"
    Write-Host "${YELLOW}Configure Firebase credentials in .env.local before running${NC}"
    Write-Host ""
}

# Mostrar URL
Write-Host "${GREEN}✓ Dev server starting...${NC}"
Write-Host "${BLUE}📍 Local URL: http://localhost:3000${NC}"
Write-Host "${BLUE}📍 Press Ctrl+C to stop${NC}"
Write-Host ""

# Ejecutar servidor de desarrollo
npm run dev
