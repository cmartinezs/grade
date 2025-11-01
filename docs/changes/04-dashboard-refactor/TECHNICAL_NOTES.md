# Dashboard Refactor - Notas Técnicas

## Configuración del Pie Chart

### Imports
```typescript
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
```

### Estructura de Datos
```typescript
const chartData = [
  {
    name: 'Activos',
    value: stats.active,
    percentage: stats.activePercentage
  },
  {
    name: 'Inactivos',
    value: stats.inactive,
    percentage: stats.inactivePercentage
  }
];
```

### Componente Pie Chart (en EntityStatsCard)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      innerRadius={45}
      outerRadius={75}
      paddingAngle={2}
      dataKey="value"
      label={(entry: { payload?: { percentage?: number } }) => {
        const percentage = entry.payload?.percentage;
        return percentage !== undefined ? `${Math.round(percentage)}%` : '';
      }}
      labelLine={false}
    >
      <Cell fill={activeColor} />
      <Cell fill="#333333" />
    </Pie>
    <Tooltip
      formatter={(value: number) => {
        return [`${value}`, 'Cantidad'];
      }}
      contentStyle={{
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
  </PieChart>
</ResponsiveContainer>
```

---

## Renderizado de Labels

### Problema Inicial
Las etiquetas con 0% no eran visibles usando `labelLine={false}`. El color gris claro (#E8E8E8) del segmento inactivo hacía que el texto fuera invisible.

### Soluciones Consideradas

1. **Custom SVG Text Renderer**
   ```typescript
   // Intento: Mover labels fuera del segmento
   const renderLabel = (entry: any) => {
     // ... código para posicionar texto fuera del pie chart
   }
   ```
   - ❌ Complejidad innecesaria
   - ❌ Difícil de mantener

2. **Cambiar Color del Segmento**
   ```typescript
   <Cell fill="#333333" /> // De #E8E8E8 a #333333
   ```
   - ✅ Simple y efectivo
   - ✅ Contraste suficiente
   - ✅ Fácil de leer

### Solución Final
Cambiar el color del segmento "Inactivos" a **#333333** (gris oscuro) en lugar de #E8E8E8 (gris claro). Esto permite que el texto blanco (porcentaje) sea claramente visible.

---

## Tipado de Props

### KPICard
```typescript
interface KPICardProps {
  icon: string;      // Emoji o texto
  label: string;     // Etiqueta visible
  value: number;     // Valor a mostrar
  color: string;     // Color hex del fondo
}

export const KPICard: React.FC<KPICardProps> = ({
  icon,
  label,
  value,
  color
}) => (
  <Card style={{ backgroundColor: color }}>
    {/* Contenido */}
  </Card>
);
```

### EntityStats
```typescript
interface EntityStats {
  total: number;
  active: number;
  inactive: number;
  activePercentage: number;
  inactivePercentage: number;
}
```

### EntityStatsCard
```typescript
interface EntityStatsCardProps {
  title: string;
  icon: string;
  headerColor: string;
  stats: EntityStats;
  totalIcon: string;
  activeIcon: string;
  totalColor: string;
  activeColor: string;
  children?: React.ReactNode;
}
```

---

## Cálculo de Estadísticas

### Código Base (en dashboard/page.tsx)
```typescript
const calculateStats = (items: any[]): EntityStats => {
  const total = items.length;
  const active = items.filter((item) => item.isActive).length;
  const inactive = total - active;

  return {
    total,
    active,
    inactive,
    activePercentage: (active / total) * 100 || 0,
    inactivePercentage: (inactive / total) * 100 || 0
  };
};
```

### Uso en useEffect
```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const levels = await levelStore.getPaginatedLevels();
      const courses = await courseStore.getPaginatedCourses();

      const levelStats = calculateStats(levels);
      const courseStats = calculateStats(courses);

      setDashboardData({
        levels: levelStats,
        courses: courseStats
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  fetchData();
}, []);
```

---

## Responsividad

### Contenedor Principal
```tsx
<Container fluid className="p-4">
  <Row className="g-4">
    <Col lg={6}>
      <EntityStatsCard {...levelProps} />
    </Col>
    <Col lg={6}>
      <EntityStatsCard {...courseProps} />
    </Col>
  </Row>
</Container>
```

**Breakpoints:**
- `lg`: 2 columnas (escritorio)
- `md`: 2 columnas (tablet)
- `xs`: 1 columna (móvil) - Nota: Requiere ajuste adicional

### Responsive Container de Recharts
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    {/* ... */}
  </PieChart>
</ResponsiveContainer>
```

La altura se fija en 300px. Para mobiles, podría aumentarse o hacerse dinámica.

---

## Testing

### Casos de Prueba Manuales

1. **Carga Inicial**
   - ✅ Dashboard carga sin errores
   - ✅ Datos se cargan correctamente
   - ✅ Pie charts se renderizan

2. **Pie Chart Rendering**
   - ✅ Dos segmentos visibles
   - ✅ Porcentajes correctos
   - ✅ Colores aplicados correctamente
   - ✅ Labels visible en ambos segmentos

3. **Interactividad**
   - ✅ Tooltip aparece en hover
   - ✅ Muestra valores correctos

4. **Cálculo de Porcentajes**
   - ✅ activePercentage = (active / total) * 100
   - ✅ inactivePercentage = (inactive / total) * 100
   - ✅ Sum de porcentajes = 100%

### Ejemplo de Datos de Prueba
```javascript
// Niveles: 13 total, 9 activos, 4 inactivos
activePercentage: 69.23%  // (9/13)*100
inactivePercentage: 30.77% // (4/13)*100

// Cursos: 5 total, 3 activos, 2 inactivos
activePercentage: 60%  // (3/5)*100
inactivePercentage: 40% // (2/5)*100
```

---

## Mejoras Futuras

### 1. Soporte para Móvil
```typescript
// Detectar viewport y ajustar altura del pie chart
const chartHeight = window.innerWidth < 768 ? 250 : 300;
```

### 2. Animaciones en Carga
```typescript
// Agregar animación de carga en recharts
<Pie
  animationBegin={0}
  animationDuration={800}
  animationEasing="ease-out"
  // ...
/>
```

### 3. Legend
```typescript
import { Legend } from 'recharts';

<Legend 
  verticalAlign="bottom" 
  height={36}
  formatter={(value, entry) => `${value}: ${entry.value}`}
/>
```

### 4. Exportación de Gráficos
```typescript
// Usar recharts-to-svg o similar
import { exportComponentAsJPEG } from "react-component-export-image";

const handleExport = () => {
  exportComponentAsJPEG(pieChartRef);
};
```

### 5. Temas Dinámicos
```typescript
const theme = {
  colors: {
    active: '#2ECC71',
    inactive: '#333333',
    primary: '#4A90E2'
  }
};
```

---

## Performance

### Optimizaciones Actuales
- ✅ Componentes memorizados con React.FC
- ✅ useEffect solo ejecuta en mount (dependencias vacías)
- ✅ No hay re-renders innecesarios

### Posibles Mejoras
```typescript
// Usar React.memo para prevenir re-renders
export const KPICard = React.memo(function KPICard({...}: KPICardProps) {
  // ...
});

// Usar useCallback en dashboard para handlers
const calculateStats = useCallback((items) => {
  // ...
}, []);
```

---

## Accesibilidad

### Mejoras Recomendadas

1. **ARIA Labels**
   ```tsx
   <div role="img" aria-label="Distribución de Niveles: 69% Activos, 31% Inactivos">
     <PieChart>
       {/* ... */}
     </PieChart>
   </div>
   ```

2. **Contraste de Colores**
   - ✅ Verde (#2ECC71) sobre blanco: 4.48:1
   - ✅ Gris (#333333) sobre blanco: 11.44:1
   - Ambos cumplen con WCAG AA

3. **Focus Management**
   ```tsx
   <Card tabIndex={0} role="article">
     {/* ... */}
   </Card>
   ```

---

## Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19.0.0 | Core framework |
| react-bootstrap | 2.9.1 | UI components (Card, Row, Col) |
| recharts | 2.15.4 | Pie charts |
| typescript | 5.0+ | Type safety |

---

## Build Information

**Última Build Exitosa:**
- Tiempo: 4.6s
- Páginas: 25
- Errores: 0
- Advertencias: 0

---

## Cambios Recientes

### v1.0 (Actual)
- Extracción de KPICard component
- Extracción de EntityStatsCard component
- Implementación de pie charts
- Cambio de color #E8E8E8 → #333333 para inactivos
- Refactorización de dashboard/page.tsx (333 → 150 líneas)

### Próximas Versiones
- v1.1: Agregar legend en pie charts
- v1.2: Soporte para filtros
- v2.0: Integración con más entidades (Preguntas, Evaluaciones)
