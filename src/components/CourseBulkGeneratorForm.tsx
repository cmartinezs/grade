'use client';

/**
 * Course Bulk Generator Form
 * Formulario reutilizable para generación masiva de cursos
 * Puede usarse en modal o página dedicada
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Card, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { useCourseDataLoader } from '@/hooks/useCourseDataLoader';
import { educationalLevelStore, levelStore } from '@/lib/levelStore';
import { CourseLoadOptions } from '@/lib/courseDataLoader';
import { LevelCategory } from '@/types/level';

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
  compact?: boolean;
}

export const CourseBulkGeneratorForm: React.FC<CourseBulkGeneratorFormProps> = ({
  onSuccess,
  onError,
  showSummary = false,
  compact = false,
}) => {
  const { loadCourses } = useCourseDataLoader();

  // Form state
  const [institutionName, setInstitutionName] = useState('');
  const [numberOfLetters, setNumberOfLetters] = useState<number>(1);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [allLevels, setAllLevels] = useState<Array<{ id: string; name: string; categoryId: string }>>([]);

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
    const levels = educationalLevelStore.getAllLevels().filter((l) => l.isActive);
    setAllLevels(
      levels.map((l) => ({
        id: l.id,
        name: l.name,
        categoryId: l.categoryId || '',
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

    // Construir mapping de levelId -> levelName y levelId -> categoryId
    const levelNames: Record<string, string> = {};
    const levelCategories: Record<string, string> = {};
    const categoryNames: Record<string, string> = {};

    selectedLevels.forEach((levelId) => {
      const level = allLevels.find((l) => l.id === levelId);
      if (level) {
        levelNames[levelId] = level.name;
        if (level.categoryId) {
          levelCategories[levelId] = level.categoryId;
        }
      }
    });

    // Cargar nombres de categorías desde la tienda
    const categories = levelStore.getAllCategories();
    categories.forEach((cat: LevelCategory) => {
      categoryNames[cat.id] = cat.name || '';
    });

    const options: CourseLoadOptions = {
      institution: institutionName,
      numberOfLetters,
      levelIds: selectedLevels,
      levelNames,
      levelCategories,
      categoryNames,
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
          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

          {/* Fila 1: Institución y Letras (2 columnas) */}
          {compact ? (
            <div className="row mb-4">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>
                    <strong>Institución</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ej. Colegio San Miguel"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    disabled={isLoading}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>
                    <strong>Letras (A-Z)</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={26}
                    value={numberOfLetters}
                    onChange={(e) => setNumberOfLetters(Math.max(1, Math.min(26, parseInt(e.target.value) || 1)))}
                    disabled={isLoading}
                  />
                </Form.Group>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}

          {/* Level Selection - Agrupado por categoría */}
          <Form.Group className="mb-4">
            <Form.Label>
              <strong>Seleccionar Niveles</strong>
            </Form.Label>
            
            {/* Select All Switch */}
            <Form.Switch
              id="select-all-levels"
              label={<strong>Seleccionar Todos</strong>}
              checked={selectedLevels.length === allLevels.length && allLevels.length > 0}
              onChange={handleSelectAll}
              className="mb-3"
            />

            {/* Niveles agrupados por categoría */}
            {allLevels.length === 0 ? (
              <p className="text-muted">No hay niveles disponibles</p>
            ) : (
              (() => {
                // Agrupar niveles por categoría
                const grouped = new Map<string, typeof allLevels>();
                allLevels.forEach((level) => {
                  const catId = level.categoryId || 'sin-categoria';
                  if (!grouped.has(catId)) {
                    grouped.set(catId, []);
                  }
                  grouped.get(catId)!.push(level);
                });

                return Array.from(grouped.entries()).map(([categoryId, levelsInCat]) => {
                  const categoryName = categoryId === 'sin-categoria' ? 'Sin Categoría' : 
                    levelStore.getCategoryById(categoryId)?.name || categoryId;
                  
                  const allInCategorySelected = levelsInCat.every((l) => selectedLevels.includes(l.id));
                  const someInCategorySelected = levelsInCat.some((l) => selectedLevels.includes(l.id));

                  const handleSelectCategory = () => {
                    if (allInCategorySelected) {
                      // Deseleccionar categoría
                      setSelectedLevels((prev) => 
                        prev.filter((id) => !levelsInCat.find((l) => l.id === id))
                      );
                    } else {
                      // Seleccionar categoría
                      setSelectedLevels((prev) => [
                        ...prev,
                        ...levelsInCat.filter((l) => !prev.includes(l.id)).map(l => l.id)
                      ]);
                    }
                  };

                  return (
                    <div key={categoryId} className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <strong style={{ fontSize: '0.9rem', color: '#0d6efd' }}>
                          {categoryName}
                        </strong>
                        <Button
                          variant={allInCategorySelected ? 'primary' : someInCategorySelected ? 'warning' : 'outline-primary'}
                          size="sm"
                          onClick={handleSelectCategory}
                          className="ms-auto"
                        >
                          {allInCategorySelected ? '✓ Todos' : someInCategorySelected ? '~ Parcial' : 'Seleccionar'}
                        </Button>
                      </div>
                      
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '0.5rem',
                        marginLeft: '0.5rem'
                      }}>
                        {levelsInCat.map((level) => (
                          <Form.Check
                            key={level.id}
                            id={`level-${level.id}`}
                            type="switch"
                            label={level.name}
                            checked={selectedLevels.includes(level.id)}
                            onChange={() => handleLevelToggle(level.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                });
              })()
            )}

            <Form.Text className="text-muted d-block mt-3">
              Seleccionados: <strong>{selectedLevels.length}</strong> de <strong>{allLevels.length}</strong>
            </Form.Text>
          </Form.Group>

          {/* Summary Card */}
          <Card className={`mb-4 ${compact ? 'bg-info text-white' : 'bg-info text-white'}`}>
            <Card.Body className="py-3 px-4">
              <p className="mb-2">
                <strong>Resumen:</strong> {selectedLevels.length} niveles × {numberOfLetters} letra{numberOfLetters > 1 ? 's' : ''} = <strong>{selectedLevels.length * numberOfLetters}</strong> cursos
              </p>
            </Card.Body>
          </Card>

          {/* Botones */}
          <div className={`d-flex gap-2 ${compact ? 'justify-content-start' : 'justify-content-between'}`}>
            <Button
              variant="success"
              type="submit"
              disabled={isLoading || selectedLevels.length === 0 || !institutionName.trim()}
              size={compact ? 'sm' : 'lg'}
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
            label={`${Math.round(progress.percentage)}%`}
            className="mb-3"
            style={{ height: '30px' }}
          />
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
