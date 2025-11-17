'use client';

/**
 * Course Bulk Generator Form
 * Formulario reutilizable para generación masiva de cursos
 * Puede usarse en modal o página dedicada
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Card, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import BadgeInput from '@/components/shared/BadgeInput';
import CoursePreviewModal from './CoursePreviewModal';
import { useCourseDataLoader } from '@/hooks/useCourseDataLoader';
import { educationalLevelStore, levelStore } from '@/lib/levelStore';
import { CourseGenerationOptions, CourseToCreate } from '@/lib/courseDataLoader';
import { LevelCategory } from '@/types/level';

interface ProgressState {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

// Tipos de identificadores de paralelo
type SectionIdentifierType = 'none' | 'letters' | 'numbers' | 'custom';

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
  const { generateCourses, previewCourses } = useCourseDataLoader();

  // Form state
  const [institutionName, setInstitutionName] = useState('');
  const [sectionType, setSectionType] = useState<SectionIdentifierType>('letters');
  const [sectionQuantity, setSectionQuantity] = useState<number>(1);
  const [customSections, setCustomSections] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [allLevels, setAllLevels] = useState<Array<{ id: string; name: string; categoryId: string }>>([]);
  const [allCategories, setAllCategories] = useState<Array<{ id: string; name: string }>>([]);

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

  // Modal state
  const [showPreview, setShowPreview] = useState(false);
  const [previewCoursesList, setPreviewCoursesList] = useState<CourseToCreate[]>([]);
  const [generationOptions, setGenerationOptions] = useState<CourseGenerationOptions | null>(null);

  // Load levels from Data-Connect on component mount
  useEffect(() => {
    const initializeLevels = async () => {
      try {
        // Load both categories and levels from Data-Connect
        await levelStore.loadAll();
        
        // Get categories first
        const categories = levelStore.getAllCategories();
        setAllCategories(
          categories.map((c) => ({
            id: c.id,
            name: c.name,
          }))
        );
        
        // Then get levels from store
        const levels = educationalLevelStore.getAllLevels().filter((l) => l.isActive);
        setAllLevels(
          levels.map((l) => ({
            id: l.id,
            name: l.name,
            categoryId: l.categoryId || '',
          }))
        );
      } catch (error) {
        console.error('Error loading levels:', error);
        // Still try to use what's in the store even if loading fails
        const categories = levelStore.getAllCategories();
        setAllCategories(
          categories.map((c) => ({
            id: c.id,
            name: c.name,
          }))
        );
        
        const levels = educationalLevelStore.getAllLevels().filter((l) => l.isActive);
        setAllLevels(
          levels.map((l) => ({
            id: l.id,
            name: l.name,
            categoryId: l.categoryId || '',
          }))
        );
      }
    };

    initializeLevels();
  }, []);

  // Legacy: Load levels from store directly (keeps existing behavior as fallback)
  useEffect(() => {
    const levels = educationalLevelStore.getAllLevels().filter((l) => l.isActive);
    if (levels.length > 0) {
      setAllLevels(
        levels.map((l) => ({
          id: l.id,
          name: l.name,
          categoryId: l.categoryId || '',
        }))
      );
    }
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
    setSectionType('letters');
    setSectionQuantity(1);
    setCustomSections([]);
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

    if (selectedLevels.length === 0) {
      setError('Por favor selecciona al menos un nivel');
      onError?.('Por favor selecciona al menos un nivel');
      return;
    }

    // Validar según el tipo de identificador
    let sections: string[] = [];
    if (sectionType === 'none') {
      sections = [];
    } else if (sectionType === 'letters') {
      if (sectionQuantity < 1 || sectionQuantity > 26) {
        setError('La cantidad de letras debe estar entre 1 y 26');
        onError?.('La cantidad de letras debe estar entre 1 y 26');
        return;
      }
      sections = Array.from({ length: sectionQuantity }, (_, i) =>
        String.fromCharCode(65 + i)
      );
    } else if (sectionType === 'numbers') {
      if (sectionQuantity < 1 || sectionQuantity > 100) {
        setError('La cantidad de números debe estar entre 1 y 100');
        onError?.('La cantidad de números debe estar entre 1 y 100');
        return;
      }
      sections = Array.from({ length: sectionQuantity }, (_, i) =>
        String(i + 1)
      );
    } else if (sectionType === 'custom') {
      if (customSections.length === 0) {
        setError('Por favor ingresa al menos un identificador personalizado');
        onError?.('Por favor ingresa al menos un identificador personalizado');
        return;
      }
      sections = customSections;
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

    const options: CourseGenerationOptions = {
      institution: institutionName,
      sections,
      levelIds: selectedLevels,
      levelNames,
      levelCategories,
      categoryNames,
    };

    // Generar cursos en memoria para mostrar preview
    const coursesToPreview = previewCourses(options);
    setPreviewCoursesList(coursesToPreview);
    setGenerationOptions(options);
    setShowPreview(true);
  };

  // Manejador para cuando el usuario confirma desde el modal
  const handleConfirmPreview = async (selectedCourses: CourseToCreate[]) => {
    if (!generationOptions) return;

    setIsLoading(true);
    setError('');
    setSuccess(false);
    setShowPreview(false);

    try {
      const result = await generateCourses(
        generationOptions,
        (progressUpdate: ProgressState) => {
          setProgress({
            currentStep: progressUpdate.currentStep,
            currentIndex: progressUpdate.currentIndex,
            total: progressUpdate.total,
            itemName: progressUpdate.itemName,
            percentage: progressUpdate.percentage,
          });
        },
        selectedCourses
      );

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

          {/* Fila 1: Institución, Tipo de Paralelo y Campo Dinámico (3 columnas) */}
          
              <div className="row mb-4">
                <div className="col-md-4">
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
                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label>
                      <strong>Tipo de Identificador de Paralelo</strong>
                    </Form.Label>
                    <AutocompleteSelect
                      value={sectionType}
                      onChange={(value) => setSectionType(value as SectionIdentifierType)}
                      disabled={isLoading}
                      options={[
                        { id: 'none', name: '🔘 Sin paralelo' },
                        { id: 'letters', name: '🔤 Letras (A, B, C...)' },
                        { id: 'numbers', name: '🔢 Números (1, 2, 3...)' },
                        { id: 'custom', name: '✏️ Personalizado' },
                      ]}
                      placeholder="Selecciona el tipo de identificador"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-4">
                  {sectionType !== 'none' && (
                    <>
                      {(sectionType === 'letters' || sectionType === 'numbers') && (
                        <Form.Group>
                          <Form.Label>
                            <strong>{sectionType === 'letters' ? 'Cantidad de Letras' : 'Cantidad de Números'}</strong>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min={1}
                            max={sectionType === 'letters' ? 26 : 100}
                            value={sectionQuantity}
                            onChange={(e) => setSectionQuantity(Math.max(1, Math.min(sectionType === 'letters' ? 26 : 100, parseInt(e.target.value) || 1)))}
                            disabled={isLoading}
                          />
                          <Form.Text className="text-muted">
                            {sectionType === 'letters' ? 'Máximo 26' : 'Máximo 100'}
                          </Form.Text>
                        </Form.Group>
                      )}
                      {sectionType === 'custom' && (
                        <BadgeInput
                          label="Identificadores Personalizados"
                          value={customSections}
                          onChange={setCustomSections}
                          placeholder="Escribe y presiona Enter para agregar"
                          disabled={isLoading}
                          helperText="Ej: Ositos, Delfines, Exploradores"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

          {/* Level Selection - Agrupado por categoría */}
          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Label className="mb-0">
                <strong>📚 Seleccionar Niveles</strong>
              </Form.Label>
              <Form.Text className="text-muted">
                📊 <strong>Seleccionados:</strong> {selectedLevels.length} de {allLevels.length} niveles
              </Form.Text>
            </div>
            
            {/* Select All Switch */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '0.375rem' }}>
              <Form.Check
                id="select-all-levels"
                type="switch"
                checked={selectedLevels.length === allLevels.length && allLevels.length > 0}
                onChange={handleSelectAll}
                style={{ margin: 0 }}
              />
              <Form.Label
                htmlFor="select-all-levels"
                className="ms-2 mb-0"
                style={{ cursor: 'pointer', userSelect: 'none', fontWeight: 'bold' }}
              >
                Seleccionar Todos los Niveles
              </Form.Label>
            </div>

            {/* Niveles agrupados por categoría */}
            {allLevels.length === 0 ? (
              <div className="alert alert-info mb-0">
                <p className="mb-0">No hay niveles disponibles. Por favor, carga los datos de Chile primero.</p>
              </div>
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

                const categoryCards = Array.from(grouped.entries()).map(([categoryId, levelsInCat]) => {
                  // Get category name from state instead of store
                  const categoryName = categoryId === 'sin-categoria' 
                    ? 'Sin Categoría' 
                    : allCategories.find(c => c.id === categoryId)?.name || categoryId;
                  
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
                    <Card key={categoryId} className="border-start border-5 h-100" style={{ borderLeftColor: '#0d6efd' }}>
                      <Card.Header className="bg-light d-flex align-items-center justify-content-between p-3">
                        <div>
                          <h6 className="mb-0 text-primary fw-bold">
                            {categoryName}
                          </h6>
                          <small className="text-muted">
                            {levelsInCat.length} nivel{levelsInCat.length !== 1 ? 'es' : ''} disponible{levelsInCat.length !== 1 ? 's' : ''}
                          </small>
                        </div>
                        <Button
                          variant={allInCategorySelected ? 'primary' : someInCategorySelected ? 'warning' : 'outline-primary'}
                          size="sm"
                          onClick={handleSelectCategory}
                          className="fw-bold"
                        >
                          {allInCategorySelected ? '✓ Todos' : someInCategorySelected ? '~ Parcial' : 'Seleccionar'}
                        </Button>
                      </Card.Header>
                      <Card.Body className="p-3">
                        <div style={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                          gap: '0.75rem'
                        }}>
                          {levelsInCat.map((level) => (
                            <div key={level.id} style={{ display: 'flex', alignItems: 'center' }}>
                              <Form.Check
                                id={`level-${level.id}`}
                                type="switch"
                                checked={selectedLevels.includes(level.id)}
                                onChange={() => handleLevelToggle(level.id)}
                                style={{ margin: 0 }}
                              />
                              <Form.Label
                                htmlFor={`level-${level.id}`}
                                className={`ms-2 mb-0 ${selectedLevels.includes(level.id) ? 'fw-bold text-primary' : ''}`}
                                style={{ cursor: 'pointer', userSelect: 'none' }}
                              >
                                {level.name}
                              </Form.Label>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  );
                });

                return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {categoryCards}
                  </div>
                );
              })()
            )}
          </Form.Group>

          {/* Summary Card */}
          <Card className={`mb-4 bg-info text-white`}>
            <Card.Body className="py-3 px-4">
              <p className="mb-2">
                <strong>Resumen:</strong> {selectedLevels.length} niveles × {
                  sectionType === 'none' 
                    ? '1 (sin paralelo)'
                    : sectionType === 'custom'
                    ? `${customSections.length} identificadores`
                    : `${sectionQuantity} ${sectionType === 'letters' ? 'letra' : 'número'}${sectionQuantity > 1 ? 's' : ''}`
                } = <strong>{
                  selectedLevels.length * (
                    sectionType === 'none' 
                      ? 1 
                      : sectionType === 'custom'
                      ? Math.max(1, customSections.length)
                      : sectionQuantity
                  )
                }</strong> cursos
              </p>
            </Card.Body>
          </Card>

          {/* Botones */}
          <div className={`d-flex gap-2 : 'justify-content-between'}`}>
            <Button
              variant="success"
              type="submit"
              disabled={isLoading || selectedLevels.length === 0 || !institutionName.trim()}
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

      {/* Modal de vista previa */}
      <CoursePreviewModal
        show={showPreview}
        courses={previewCoursesList}
        isLoading={isLoading}
        onConfirm={handleConfirmPreview}
        onCancel={() => setShowPreview(false)}
        title="Vista Previa de Cursos a Generar"
        institution={institutionName}
      />
    </div>
  );
};

export default CourseBulkGeneratorForm;
