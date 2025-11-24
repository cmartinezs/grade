import { Alert, Badge, Table } from 'react-bootstrap';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { useDifficulties } from '@/hooks/useDifficulties';
import { useCurriculumHierarchy } from '@/hooks/useCurriculumHierarchy';
import { useTaxonomies } from '@/hooks/useTaxonomies';

export function QuestionImportHelp() {
  const { questionTypes } = useQuestionTypes();
  const { difficulties } = useDifficulties();
  const { subjects, units, topics } = useCurriculumHierarchy();
  const { taxonomies } = useTaxonomies();

  return (
    <div>
      <h6 className="mb-3">📊 Datos Disponibles en el Sistema</h6>
      <ul className="mb-4">
        <li><strong>{questionTypes.length}</strong> tipos de pregunta</li>
        <li><strong>{difficulties.length}</strong> niveles de dificultad</li>
        <li><strong>{subjects.filter(s => s.active).length}</strong> asignaturas activas</li>
        <li><strong>{units.filter(u => u.active).length}</strong> unidades activas</li>
        <li><strong>{topics.filter(t => t.active).length}</strong> temas activos</li>
        <li><strong>{taxonomies.filter(t => t.active).length}</strong> taxonomías activas</li>
      </ul>

      <h6 className="mb-3">📋 Formato del CSV</h6>
      <Alert variant="info" className="mb-3">
        <small>
          La plantilla incluye <strong>17 columnas</strong> con nombres descriptivos. 
          La primera fila contiene un ejemplo que puedes eliminar.
        </small>
      </Alert>

      <h6 className="mb-3">📝 Columnas Principales</h6>
      <Table size="sm" bordered className="mb-4">
        <thead>
          <tr>
            <th>Columna</th>
            <th>Descripción</th>
            <th>Valores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>tipo_pregunta</code></td>
            <td>Tipo de pregunta</td>
            <td>
              <div className="d-flex flex-wrap gap-1">
                {questionTypes.map((type) => (
                  <Badge key={type.questionTypeId} bg="secondary">{type.code}</Badge>
                ))}
              </div>
              <small className="text-muted d-block mt-1">
                O nombres completos
              </small>
            </td>
          </tr>
          <tr>
            <td><code>enunciado</code></td>
            <td>Texto pregunta</td>
            <td><Badge bg="warning">Obligatorio</Badge></td>
          </tr>
          <tr>
            <td><code>asignatura</code></td>
            <td>Materia</td>
            <td>Nombre, código o ID</td>
          </tr>
          <tr>
            <td><code>unidad</code></td>
            <td>Unidad temática</td>
            <td>Nombre, código o ID</td>
          </tr>
          <tr>
            <td><code>tema</code></td>
            <td>Tema específico</td>
            <td><Badge bg="warning">Obligatorio</Badge></td>
          </tr>
          <tr>
            <td><code>dificultad</code></td>
            <td>Nivel</td>
            <td>
              {difficulties.map((diff, idx) => (
                <span key={diff.difficultyId}>
                  <Badge bg={idx === 0 ? 'success' : idx === 1 ? 'warning' : 'danger'}>
                    {diff.level}
                  </Badge>
                  {idx < difficulties.length - 1 ? ' ' : ''}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <td><code>taxonomia</code></td>
            <td>Nivel taxonómico</td>
            <td>
              Nombre, código o ID<br />
              <small className="text-muted">
                Ej: {taxonomies.slice(0, 3).map(t => t.name).join(', ')}
                {taxonomies.length > 3 ? '...' : ''}
              </small>
            </td>
          </tr>
          <tr>
            <td><code>opcion_N</code></td>
            <td>Alternativa N</td>
            <td>Texto libre</td>
          </tr>
          <tr>
            <td><code>opcion_N_correcta</code></td>
            <td>¿Es correcta?</td>
            <td>
              <Badge bg="success">SI</Badge> o{' '}
              <Badge bg="danger">NO</Badge>
            </td>
          </tr>
        </tbody>
      </Table>

      <h6 className="mb-3">💡 Consejos Importantes</h6>
      <ul className="mb-4">
        <li>Puedes usar <strong>nombres</strong> en lugar de IDs (ej: &quot;Matemática&quot;)</li>
        <li>El sistema buscará coincidencias automáticamente</li>
        <li>Las opciones 3, 4 y 5 son <strong>opcionales</strong></li>
        <li>Para Verdadero/Falso solo usa opciones 1 y 2</li>
        <li>Para Desarrollo no completes opciones</li>
        <li>Los valores son <strong>case-insensitive</strong> (mayús/minús no importa)</li>
      </ul>

      <h6 className="mb-3">✨ Ventajas de Importar</h6>
      <ul className="mb-4">
        <li>✅ Crea <strong>múltiples preguntas</strong> a la vez</li>
        <li>🔄 Edita en <strong>Excel o LibreOffice</strong></li>
        <li>📋 Copia/pega desde otras fuentes</li>
        <li>⚡ Mucho más rápido que una por una</li>
        <li>📊 Ideal para migrar contenido existente</li>
      </ul>

      <Alert variant="warning">
        <h6 className="mb-2">⚠️ Antes de Importar</h6>
        <ul className="mb-0">
          <li>El sistema <strong>validará</strong> todos los campos</li>
          <li>Te mostrará <strong>errores específicos</strong> si algo falla</li>
          <li>No se importará <strong>nada</strong> si hay errores</li>
          <li>Revisa el archivo antes de subirlo</li>
        </ul>
      </Alert>

      <Alert variant="success" className="mb-0">
        <h6 className="mb-2">✅ Proceso Recomendado</h6>
        <ol className="mb-0">
          <li>Descarga la plantilla CSV</li>
          <li>Complétala con tus preguntas</li>
          <li>Revisa que los datos sean correctos</li>
          <li>Sube el archivo</li>
          <li>Revisa el resumen de importación</li>
        </ol>
      </Alert>
    </div>
  );
}
