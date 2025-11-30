import { Alert, Badge, Table } from 'react-bootstrap';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';

export function CurriculumImportHelp() {
  const { subjects, units, topics } = useCurriculumHierarchy();

  return (
    <div>
      <h6 className="mb-3">📊 Datos Actuales en el Sistema</h6>
      <ul className="mb-4">
        <li><strong>{subjects.filter(s => s.active).length}</strong> asignaturas activas</li>
        <li><strong>{units.filter(u => u.active).length}</strong> unidades activas</li>
        <li><strong>{topics.filter(t => t.active).length}</strong> temas activos</li>
      </ul>

      <h6 className="mb-3">📋 Formato del CSV</h6>
      <Alert variant="info" className="mb-3">
        <small>
          La plantilla incluye <strong>7 columnas</strong> con nombres descriptivos. 
          Incluye ejemplos de una jerarquía completa que puedes modificar.
        </small>
      </Alert>

      <h6 className="mb-3">📝 Estructura Jerárquica</h6>
      <Alert variant="success" className="mb-3">
        <div className="text-center">
          <Badge bg="primary" className="me-2">Asignatura</Badge>
          <span>→</span>
          <Badge bg="info" className="mx-2">Unidad</Badge>
          <span>→</span>
          <Badge bg="success" className="ms-2">Tema</Badge>
        </div>
        <p className="mb-0 mt-2 text-center">
          <small className="text-muted">
            Ejemplo: <strong>Matemática</strong> → <strong>Números</strong> → <strong>Suma</strong>
          </small>
        </p>
      </Alert>

      <h6 className="mb-3">🔤 Columnas del CSV</h6>
      <Table size="sm" bordered className="mb-4">
        <thead>
          <tr>
            <th>Columna</th>
            <th>Obligatorio</th>
            <th>Aplica a</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>tipo</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Todos (asignatura/unidad/tema)</td>
          </tr>
          <tr>
            <td><code>nombre</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Todos</td>
          </tr>
          <tr>
            <td><code>codigo</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Todos (único por tipo)</td>
          </tr>
          <tr>
            <td><code>nivel_educativo</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Solo asignaturas</td>
          </tr>
          <tr>
            <td><code>asignatura_padre</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Unidades y temas</td>
          </tr>
          <tr>
            <td><code>unidad_padre</code></td>
            <td><Badge bg="danger">Sí</Badge></td>
            <td>Solo temas</td>
          </tr>
          <tr>
            <td><code>descripcion</code></td>
            <td><Badge bg="secondary">No</Badge></td>
            <td>Todos (recomendado)</td>
          </tr>
        </tbody>
      </Table>

      <h6 className="mb-3">💡 Consejos Importantes</h6>
      <ul className="mb-4">
        <li>El orden importa: primero <strong>asignaturas</strong>, luego <strong>unidades</strong>, finalmente <strong>temas</strong></li>
        <li>Los códigos deben ser <strong>únicos dentro de su tipo</strong> (dos asignaturas no pueden tener el mismo código, pero una asignatura y una unidad sí pueden)</li>
        <li>Usa <strong>código o nombre exacto</strong> en las referencias (asignatura_padre, unidad_padre)</li>
        <li>El nivel educativo debe existir en el sistema</li>
        <li>Puedes incluir múltiples asignaturas en el mismo archivo</li>
      </ul>

      <h6 className="mb-3">📋 Ejemplo Completo</h6>
      <Alert variant="light" className="mb-4">
        <pre className="mb-0" style={{ fontSize: '0.85rem' }}>
{`tipo;nombre;codigo;nivel_educativo;asignatura_padre;unidad_padre;descripcion
asignatura;Matemática;MAT;Básica;;;Asignatura de matemáticas
unidad;Números;;;Matemática;;Operaciones con números
tema;Suma;;;Matemática;Números;Operaciones de adición
tema;Resta;;;Matemática;Números;Operaciones de sustracción
unidad;Geometría;;;Matemática;;Figuras geométricas
tema;Triángulos;;;Matemática;Geometría;Propiedades`}
        </pre>
      </Alert>

      <h6 className="mb-3">✨ Ventajas de Importar</h6>
      <ul className="mb-4">
        <li>✅ Crea <strong>jerarquías completas</strong> en un solo paso</li>
        <li>🔄 Edita en <strong>Excel o LibreOffice</strong></li>
        <li>📋 Copia/pega desde planificaciones existentes</li>
        <li>⚡ Mucho más rápido que crear elemento por elemento</li>
        <li>📊 Ideal para configuración inicial del sistema</li>
      </ul>

      <Alert variant="warning">
        <h6 className="mb-2">⚠️ Validaciones del Archivo</h6>
        <ul className="mb-0">
          <li><strong>Tamaño máximo:</strong> 2 MB</li>
          <li><strong>Formato:</strong> CSV con separador punto y coma (;)</li>
          <li><strong>Codificación:</strong> UTF-8 (recomendado con BOM)</li>
          <li>Los <strong>códigos</strong> deben ser únicos dentro de cada tipo (asignaturas, unidades, temas)</li>
          <li>El sistema validará que todos los <strong>niveles educativos</strong> existan</li>
          <li>Verificará que las <strong>referencias</strong> (asignatura_padre, unidad_padre) sean correctas</li>
          <li>Si hay errores, se mostrará un reporte detallado</li>
        </ul>
      </Alert>

      <Alert variant="success" className="mb-0">
        <h6 className="mb-2">✅ Proceso Recomendado</h6>
        <ol className="mb-0">
          <li>Descarga la plantilla CSV</li>
          <li>Revisa los ejemplos incluidos</li>
          <li>Completa con tu estructura curricular</li>
          <li>Verifica el orden: asignaturas → unidades → temas</li>
          <li>Sube el archivo</li>
          <li>Revisa el resumen de importación</li>
        </ol>
      </Alert>
    </div>
  );
}
