'use client';

/**
 * QuestionCreateHelp Component
 * 
 * Componente de presentación para mostrar contenido de ayuda
 * en el sidebar de la página de creación de preguntas.
 * 
 * Este componente es separado para mantener la responsabilidad única
 * y facilitar el testing y reutilización.
 */
export function QuestionCreateHelp() {
  return (
    <>
      <p className="text-muted mb-3">
        Crea una nueva pregunta para tu banco de preguntas. Completa todos los campos requeridos y asegúrate de que la información sea precisa.
      </p>
      
      <div className="mb-3">
        <h6 className="fw-bold mb-2">📋 Datos Requeridos</h6>
        <div className="small">
          <p className="mb-2">
            <strong>🔹 Tipo de Pregunta:</strong>
            <br />
            <span className="text-muted">
              Selecciona el formato (Verdadero/Falso, Selección Única, Múltiple, etc.)
            </span>
          </p>
          <p className="mb-2">
            <strong>🔹 Enunciado:</strong>
            <br />
            <span className="text-muted">
              Texto principal claro y sin ambigüedades
            </span>
          </p>
          <p className="mb-2">
            <strong>🔹 Jerarquía Curricular:</strong>
            <br />
            <span className="text-muted">
              Asignatura → Unidad → Tema
            </span>
          </p>
          <p className="mb-2">
            <strong>🔹 Dificultad:</strong>
            <br />
            <span className="text-muted">
              Bajo, Medio o Alto
            </span>
          </p>
          <p className="mb-2">
            <strong>🔹 Taxonomía:</strong>
            <br />
            <span className="text-muted">
              Nivel cognitivo según Bloom
            </span>
          </p>
          <p>
            <strong>🔹 Opciones:</strong>
            <br />
            <span className="text-muted">
              Alternativas con respuesta(s) correcta(s)
            </span>
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">💡 Consejos de Creación</h6>
        <ul className="small mb-0">
          <li><strong>Claridad:</strong> Enunciados directos y sin ambigüedades</li>
          <li><strong>Gramática:</strong> Revisa ortografía y puntuación</li>
          <li><strong>Coherencia:</strong> Alternativas plausibles y lógicas</li>
          <li><strong>Verificación:</strong> Marca correctamente las respuestas</li>
          <li><strong>Especificidad:</strong> Selecciona la ubicación curricular más precisa</li>
        </ul>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold mb-2">✨ Funciones Especiales</h6>
        <div className="small text-muted">
          <p className="mb-1">• <strong>Detección de duplicados:</strong> Se verifica automáticamente</p>
          <p className="mb-1">• <strong>Validación en tiempo real:</strong> Errores mostrados inmediatamente</p>
          <p className="mb-0">• <strong>Opciones dinámicas:</strong> Según tipo de pregunta</p>
        </div>
      </div>

      <div className="alert alert-warning small mb-0">
        <strong>⚠️ Duplicados:</strong> Si el sistema detecta preguntas similares, te pedirá confirmación antes de guardar
      </div>
    </>
  );
}
