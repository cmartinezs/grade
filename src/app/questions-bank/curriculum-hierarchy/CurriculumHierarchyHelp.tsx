'use client';

/**
 * CurriculumHierarchyHelp Component
 * 
 * Componente de presentación para mostrar contenido de ayuda
 * en el sidebar de la página de jerarquía curricular.
 * 
 * Este componente es separado para mantener la responsabilidad única
 * y facilitar el testing y reutilización.
 */
export function CurriculumHierarchyHelp() {
  return (
    <>
      <p className="text-muted mb-3">
        Gestiona la estructura completa de tu taxonomía curricular organizando asignaturas, unidades y temas.
      </p>
      
      <div className="mb-3">
        <h6 className="fw-bold mb-2">📚 Estructura Jerárquica</h6>
        <div className="small">
          <p className="mb-2">
            <strong>Nivel 1 - Asignatura:</strong>
            <br />
            <span className="text-muted">Matemáticas, Lenguaje, Ciencias, etc.</span>
          </p>
          <p className="mb-2">
            <strong>Nivel 2 - Unidad:</strong>
            <br />
            <span className="text-muted">Geometría, Álgebra, Números, etc.</span>
          </p>
          <p>
            <strong>Nivel 3 - Tema:</strong>
            <br />
            <span className="text-muted">Triángulos, Ecuaciones, Fracciones, etc.</span>
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">🔧 Acciones Disponibles</h6>
        <ul className="small mb-0">
          <li><strong>➕ Crear:</strong> Agrega nuevos elementos</li>
          <li><strong>✏️ Editar:</strong> Modifica elementos existentes</li>
          <li><strong>🗑️ Eliminar:</strong> Inactiva elementos (eliminación lógica)</li>
          <li><strong>🔍 Buscar:</strong> Filtra por nombre de cualquier nivel</li>
        </ul>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">✨ Reglas Importantes</h6>
        <div className="small text-muted">
          <p className="mb-1">• Nombres únicos por nivel</p>
          <p className="mb-1">• Códigos únicos para asignaturas</p>
          <p className="mb-1">• Eliminación en cascada con análisis de impacto</p>
          <p className="mb-0">• Se mantiene integridad referencial</p>
        </div>
      </div>

      <div className="alert alert-info small mb-0">
        <strong>💾 Auto-guardado:</strong> Los datos se guardan automáticamente en localStorage con auditoría completa
      </div>
    </>
  );
}
