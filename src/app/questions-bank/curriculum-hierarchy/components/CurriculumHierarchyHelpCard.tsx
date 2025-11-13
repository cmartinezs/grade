import { Accordion, Button } from 'react-bootstrap';
import { clearAllCurriculumHierarchyData } from '@/lib/curriculumHierarchyStore';

export function CurriculumHierarchyHelpCard() {
  const handleResetData = () => {
    if (
      window.confirm(
        '¿Estás seguro de resetear todos los datos? Esta acción no se puede deshacer.'
      )
    ) {
      clearAllCurriculumHierarchyData();
    }
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <small>
            <strong>ℹ️ Información y ayuda</strong>
          </small>
        </Accordion.Header>
        <Accordion.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6>📚 CU-BP-11, 12 & 13: Gestión completa de taxonomía curricular</h6>
              <p className="mb-2 small">
                <strong>Jerarquía:</strong> Asignatura (nivel 1) → Unidad (nivel 2) → Tema (nivel 3)
              </p>
              <p className="mb-2 small">
                <strong>Crear:</strong> Usa el botón &quot;➕ Crear Elemento&quot; para agregar nuevos elementos.
              </p>
              <p className="mb-2 small">
                <strong>Editar:</strong> Haz clic en &quot;✏️ Editar&quot; para modificar cualquier elemento.
              </p>
              <p className="mb-2 small">
                <strong>Eliminar:</strong> Haz clic en &quot;🗑️ Eliminar&quot; para inactivar elementos (eliminación lógica en cascada).
              </p>
              <p className="mb-2 small">
                <strong>Buscar:</strong> Usa el buscador para filtrar por asignatura, unidad o tema.
              </p>
              <p className="mb-0 small">
                <strong>Reglas:</strong> Nombres únicos por nivel, códigos únicos para asignaturas. 
                Se mantiene integridad referencial. La eliminación es lógica con análisis de impacto.
              </p>
              <p className="mb-0 small text-muted mt-2">
                💾 Los datos se guardan automáticamente en localStorage con auditoría completa.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={handleResetData}
            >
              🔄 Resetear Datos
            </Button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
