# Dashboard Refactor - Documentación Completa

## Fecha: 1 de Noviembre 2025

### Cambios Realizados

Se refactorizó completamente el dashboard para mejorar la mantenibilidad, reutilización de componentes y separación de responsabilidades.

### Componentes Extraídos

#### 1. **KPICard** (`/src/components/KPICard.tsx`)
Componente reutilizable para mostrar métricas clave (KPI).

**Props:**
- `icon` (string): Emoji o icono a mostrar
- `label` (string): Etiqueta de la métrica (ej: "Total", "Activos")
- `value` (number): Valor numérico a mostrar
- `color` (string): Color de fondo del card (código hex)

**Ejemplo:**
```tsx
<KPICard
  icon="📚"
  label="Total"
  value={13}
  color="#4A90E2"
/>
```

**Características:**
- Diseño con Bootstrap
- Fondo coloreado con texto blanco
- Icono destacado al lado derecho
- Totalmente reutilizable en cualquier página

---

#### 2. **EntityStatsCard** (`/src/components/EntityStatsCard.tsx`)
Componente principal que combina KPI cards con gráfico de pastel.

**Props:**
- `title` (string): Título de la tarjeta (ej: "Niveles Educacionales")
- `icon` (string): Icono del header
- `headerColor` (string): Color del header
- `stats` (EntityStats): Objeto con estadísticas
- `totalIcon` (string): Icono para el KPI Total
- `activeIcon` (string): Icono para el KPI Activos
- `totalColor` (string): Color del KPI Total
- `activeColor` (string): Color del KPI Activos
- `children?` (React.ReactNode): Contenido adicional opcional

**Ejemplo:**
```tsx
<EntityStatsCard
  title="Niveles Educacionales"
  icon="📊"
  headerColor="#4A90E2"
  stats={dashboardData.levels}
  totalIcon="📚"
  activeIcon="✅"
  totalColor="#4A90E2"
  activeColor="#2ECC71"
/>
```

**Estructura Interna:**
```
EntityStatsCard
├── Header (Con icono y título)
├── Body (2 columnas)
│   ├── Col izquierda (xs=6)
│   │   ├── KPICard (Total)
│   │   └── KPICard (Activos)
│   └── Col derecha (xs=6)
│       └── Pie Chart (Donut)
│           ├── Segmento: Activos (activeColor)
│           ├── Segmento: Inactivos (#333333)
│           ├── Labels: Porcentajes coloreados
│           └── Tooltip: Valores en hover
└── Children (Contenido adicional si aplica)
```

**Características del Pie Chart:**
- Tipo Donut (innerRadius=45, outerRadius=75)
- Dos segmentos: Activos e Inactivos
- Labels con porcentajes:
  - Color verde (#2ECC71) para "Activos"
  - Color gris oscuro (#333333) para "Inactivos"
- Tooltip en hover mostrando valores absolutos
- Responsive container (ajusta al tamaño del contenedor)

---

### Estadísticas de Entidad (`EntityStats`)

```typescript
interface EntityStats {
  total: number;              // Total de registros
  active: number;             // Registros activos
  inactive: number;           // Registros inactivos
  activePercentage: number;   // Porcentaje de activos
  inactivePercentage: number; // Porcentaje de inactivos
}
```

---

### Dashboard Page (`/src/app/dashboard/page.tsx`)

**Responsabilidades:**
1. Cargar datos desde stores (`levelStore`, `courseStore`)
2. Calcular estadísticas (totales, activos, porcentajes)
3. Renderizar componentes `EntityStatsCard`

**Flujo de Datos:**
```
useEffect (en mount)
  ↓
levelStore.getPaginatedLevels()
courseStore.getPaginatedCourses()
  ↓
Calcular:
  - total, active, inactive
  - activePercentage, inactivePercentage
  - coursesByLevel (distribución)
  ↓
setDashboardData()
  ↓
Render EntityStatsCard components
```

**Tarjetas Actuales:**

1. **Niveles Educacionales**
   - Total: Azul (#4A90E2)
   - Activos: Verde (#2ECC71)
   - Sin contenido adicional

2. **Cursos**
   - Total: Teal (#17A2B8)
   - Activos: Verde (#2ECC71)
   - Contenido adicional: Distribución por Nivel (bar chart)

3. **Preguntas y Evaluaciones** (Placeholders para próximas versiones)

---

### Beneficios de la Refactorización

✅ **Separación de Responsabilidades**
- Componentes aislados con responsabilidades específicas
- Dashboard page enfocado en lógica de datos

✅ **Reutilización**
- KPICard reutilizable en múltiples contextos
- EntityStatsCard fácil de replicar para nuevas entidades
- Estructura consistente

✅ **Mantenibilidad**
- Cambios en componentes aplicados automáticamente en todos lados
- Código más limpio y legible
- Fácil de modificar estilos o comportamiento

✅ **Extensibilidad**
- Agregar nuevas tarjetas solo requiere crear nueva instancia de EntityStatsCard
- Contenido adicional mediante `children` prop
- Fácil agregar más datos o gráficos

✅ **Testabilidad**
- Componentes pequeños y enfocados
- Fáciles de testear de forma aislada

---

### Colores Utilizados

| Elemento | Color | Código |
|----------|-------|--------|
| Niveles - Total | Azul | #4A90E2 |
| Cursos - Total | Teal | #17A2B8 |
| Ambos - Activos | Verde | #2ECC71 |
| Ambos - Inactivos | Gris Oscuro | #333333 |

---

### Próximas Mejoras

- [ ] Agregar tarjetas para Preguntas (por tipo, dificultad)
- [ ] Agregar tarjetas para Evaluaciones (por estado)
- [ ] Agregar Legend a los pie charts
- [ ] Implementar filtros por rango de fechas
- [ ] Agregar exportación de datos
- [ ] Responsive design para móvil

---

### Archivos Modificados

- `/src/components/KPICard.tsx` (nuevo)
- `/src/components/EntityStatsCard.tsx` (nuevo)
- `/src/app/dashboard/page.tsx` (refactorizado)

### Dependencias

- `react-bootstrap`: UI components
- `recharts`: Gráficos (pie charts)
- `typescript`: Type safety
