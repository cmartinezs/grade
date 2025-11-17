'use client';

/**
 * BulkGenerateHelp Component
 * 
 * Componente de presentación para mostrar contenido de ayuda
 * en el sidebar de la página de generación masiva de cursos.
 * 
 * Este componente es separado para mantener la responsabilidad única
 * y facilitar el testing y reutilización.
 */
export function BulkGenerateHelp() {
  return (
    <>
      <p className="text-muted mb-3">
        Crea múltiples cursos de una sola vez combinando niveles educacionales y secciones de letras.
      </p>
      
      <div className="mb-3">
        <h6 className="fw-bold mb-2">📋 Cómo Funciona</h6>
        <div className="small">
          <p className="mb-2">
            <strong>Institución:</strong>
            <br />
            <span className="text-muted">Nombre de tu escuela o colegio</span>
          </p>
          <p className="mb-2">
            <strong>Letras:</strong>
            <br />
            <span className="text-muted">Número de secciones (A, B, C... máx 26)</span>
          </p>
          <p>
            <strong>Niveles:</strong>
            <br />
            <span className="text-muted">Selecciona uno o más niveles educacionales</span>
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">🧮 Cálculo</h6>
        <ul className="small mb-0">
          <li>3 niveles × 2 letras = 6 cursos</li>
          <li>8 niveles × 5 letras = 40 cursos</li>
          <li>Los nombres se generan automáticamente</li>
        </ul>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">✨ Ejemplos de Nombres</h6>
        <div className="small text-muted bg-light p-2 rounded">
          <p className="mb-1">&quot;4° Medio A&quot;</p>
          <p className="mb-1">&quot;1° Básico B&quot;</p>
          <p className="mb-0">&quot;2° Medio C&quot;</p>
        </div>
      </div>

      <div className="alert alert-info small mb-0">
        <strong>⚡ Tip:</strong> Puedes crear más cursos en cualquier momento
      </div>
    </>
  );
}
