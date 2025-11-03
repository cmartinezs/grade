'use client';

/**
 * Course Bulk Generator Form
 * Formulario reutilizable para generación masiva de cursos
 * Puede usarse en modal o página dedicada
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Card, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { useCourseDataLoader } from '@/hooks/useCourseDataLoader';
import { educationalLevelStore } from '@/lib/levelStore';
import { CourseLoadOptions } from '@/lib/courseDataLoader';

interface ProgressState {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

interface CourseBulkGeneratorFormProps {
  onSuccess?: (coursesCreated: number) => void;
  onError?: (error: string) => void;
  showSummary?: boolean;
}

export const CourseBulkGeneratorForm: React.FC<CourseBulkGeneratorFormProps> = ({
  onSuccess,
  onError,
  showSummary = false,
}) => {
  const { loadCourses } = useCourseDataLoader();

  // Form state
  const [institutionName, setInstitutionName] = useState('');
  const [numberOfLetters, setNumberOfLetters] = useState<number>(1);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [allLevels, setAllLevels] = useState<Array<{ id: string; name: string }>>([]);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState>({
    currentStep: '',
    currentIndex: 0,
    total: 0,
    itemName: '',
    percentage: 0,
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [coursesCreated, setCoursesCreated] = useState(0);

  // Load levels from store
  useEffect(() => {
    const levels = educationalLevelStore.getAllLevels();
    setAllLevels(
      levels
        .filter((l) => l.isActive)
        .map((l) => ({
          id: l.id,
          name: l.name,
        }))
    );
  }, []);

  const handleLevelToggle = useCallback((levelId: string) => {
    setSelectedLevels((prev) =>
      prev.includes(levelId)
        ? prev.filter((id) => id !== levelId)
        : [...prev, levelId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedLevels.length === allLevels.length) {
      setSelectedLevels([]);
    } else {
      setSelectedLevels(allLevels.map((l) => l.id));
    }
  }, [allLevels, selectedLevels.length]);

  const resetForm = () => {
    setInstitutionName('');
    setNumberOfLetters(1);
    setSelectedLevels([]);
    setProgress({
      currentStep: '',
      currentIndex: 0,
      total: 0,
      itemName: '',
      percentage: 0,
    });
    setError('');
    setSuccess(false);
    setCoursesCreated(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar inputs
    if (!institutionName.trim()) {
      setError('Por favor ingresa el nombre de la institución');
      onError?.('Por favor ingresa el nombre de la institución');
      return;
    }

    if (numberOfLetters < 1 || numberOfLetters > 26) {
      setError('La cantidad de letras debe estar entre 1 y 26');
      onError?.('La cantidad de letras debe estar entre 1 y 26');
      return;
    }

    if (selectedLevels.length === 0) {
      setError('Por favor selecciona al menos un nivel');
      onError?.('Por favor selecciona al menos un nivel');
      return;
    }

    // Construir mapping de levelId -> levelName
    const levelNames: Record<string, string> = {};
    selectedLevels.forEach((levelId) => {
      const level = allLevels.find((l) => l.id === levelId);
      if (level) {
        levelNames[levelId] = level.name;
      }
    });

    const options: CourseLoadOptions = {
      institution: institutionName,
      numberOfLetters,
      levelIds: selectedLevels,
      levelNames,
    };

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await loadCourses(options, (progressUpdate) => {
        setProgress({
          currentStep: progressUpdate.currentStep,
          currentIndex: progressUpdate.currentIndex,
          total: progressUpdate.total,
          itemName: progressUpdate.itemName,
          percentage: progressUpdate.percentage,
        });
      });

      if (result.success) {
        setSuccess(true);
        setCoursesCreated(result.coursesCreated);
        onSuccess?.(result.coursesCreated);
      } else {
        setError(result.message || '❌ Error al crear los cursos');
        onError?.(result.message || '❌ Error al crear los cursos');
        setCoursesCreated(result.coursesCreated);
      }
    } catch (err) {
      const errorMsg = `Error: ${err instanceof Error ? err.message : 'Error desconocido'}`;
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="course-bulk-generator-form">
      {!isLoading && !success && (
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Institution Name Input */}
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Nombre de la Institución</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ej. Colegio San Miguel"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              disabled={isLoading}
            />
          </Form.Group>

          {/* Number of Letters */}
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Cantidad de Letras (A, B, C...)</strong>
            </Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={26}
              value={numberOfLetters}
              onChange={(e) => setNumberOfLetters(Math.max(1, Math.min(26, parseInt(e.target.value) || 1)))}
              disabled={isLoading}
            />
            <Form.Text className="text-muted">
              Ej: 3 = A, B, C (máximo 26)
            </Form.Text>
          </Form.Group>

          {/* Level Selection */}
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Seleccionar Niveles</strong>
            </Form.Label>
            
            {/* Select All Checkbox */}
            <Form.Check
              id="select-all-levels"
              label={<strong>Seleccionar Todos</strong>}
              checked={selectedLevels.length === allLevels.length && allLevels.length > 0}
              onChange={handleSelectAll}
              className="mb-2"
            />

            {/* Level List */}
            <Card className="bg-light">
              <Card.Body className="p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {allLevels.length === 0 ? (
                  <p className="text-muted">No hay niveles disponibles</p>
                ) : (
                  <div>
                    {allLevels.map((level) => (
                      <Form.Check
                        key={level.id}
                        id={`level-${level.id}`}
                        label={level.name}
                        checked={selectedLevels.includes(level.id)}
                        onChange={() => handleLevelToggle(level.id)}
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            <Form.Text className="text-muted d-block mt-2">
              Seleccionados: <strong>{selectedLevels.length}</strong> de{' '}
              <strong>{allLevels.length}</strong> niveles
            </Form.Text>
          </Form.Group>

          {/* Summary */}
          <Card className="bg-info text-white mb-4">
            <Card.Body>
              <p className="mb-1">
                <strong>Resumen de generación:</strong>
              </p>
              <p className="mb-0">
                Se crearán <strong>{selectedLevels.length * numberOfLetters}</strong> cursos
                ({selectedLevels.length} niveles × {numberOfLetters} letra{numberOfLetters > 1 ? 's' : ''})
              </p>
            </Card.Body>
          </Card>

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || selectedLevels.length === 0 || !institutionName.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Generando...
                </>
              ) : (
                '✨ Generar Cursos'
              )}
            </Button>
          </div>
        </Form>
      )}

      {isLoading && (
        <div className="text-center py-5">
          <p className="mb-3">
            <span style={{ fontSize: '2rem' }}>{progress.currentStep}</span>
          </p>
          <ProgressBar
            animated
            striped
            variant="success"
            now={progress.percentage}
            className="mb-3"
            style={{ height: '30px' }}
          >
            <span style={{ lineHeight: '30px' }}>
              <strong>{Math.round(progress.percentage)}%</strong>
            </span>
          </ProgressBar>
          <p className="mb-2">
            <strong>
              {progress.currentIndex} de {progress.total}
            </strong>
          </p>
          <p className="text-muted">{progress.itemName}</p>
        </div>
      )}

      {success && showSummary && (
        <Alert variant="success">
          <Alert.Heading>✅ ¡Éxito!</Alert.Heading>
          <p>
            Se crearon <strong>{coursesCreated}</strong> cursos exitosamente.
          </p>
          <hr />
          <Button 
            variant="success" 
            size="sm"
            onClick={() => {
              resetForm();
              window.location.href = '/evaluation-management/courses';
            }}
          >
            Ver Cursos Creados →
          </Button>
        </Alert>
      )}

      {success && !showSummary && (
        <Alert variant="success">
          <Alert.Heading>✅ ¡Éxito!</Alert.Heading>
          <p>
            Se crearon <strong>{coursesCreated}</strong> cursos exitosamente.
          </p>
        </Alert>
      )}
    </div>
  );
};

export default CourseBulkGeneratorForm;
