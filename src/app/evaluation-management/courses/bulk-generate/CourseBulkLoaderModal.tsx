'use client';

/**
 * Course Bulk Loader Modal
 * Modal para generación masiva de cursos con:
 * - Nombre de institución
 * - Cantidad de letras (A-Z)
 * - Selección de niveles educacionales
 * - Barra de progreso en tiempo real
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar, Card, Alert, Spinner } from 'react-bootstrap';
import AutocompleteSelect from '@/components/shared/AutocompleteSelect';
import BadgeInput from '@/components/shared/BadgeInput';
import { useCourseDataLoader } from '@/hooks/useCourseDataLoader';
import { CourseGenerationOptions } from '@/lib/courseDataLoader';
import { educationalLevelStore, levelStore } from '@/lib/levelStore';

// Re-export ProgressUpdate type from hook for use in this component
interface ProgressUpdate {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

interface ProgressState {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
  percentage: number;
}

interface CourseBulkLoaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  onDismiss?: () => void;
}

export const CourseBulkLoaderModal: React.FC<CourseBulkLoaderModalProps> = ({
  show,
  onHide,
  onSuccess,
  onDismiss,
}) => {
  const { generateCourses } = useCourseDataLoader();

  // Form state
  const [institutionName, setInstitutionName] = useState('');
  const [sectionType, setSectionType] = useState<'none' | 'letters' | 'numbers' | 'custom'>('letters');
  const [sectionQuantity, setSectionQuantity] = useState<number>(1);
  const [customSections, setCustomSections] = useState<string[]>([]);
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
  // Load levels from Data-Connect when modal opens
  useEffect(() => {
    if (!show) return;

    const initializeLevels = async () => {
      try {
        // Load both categories and levels from Data-Connect
        await levelStore.loadAll();
        
        // Get levels from store
        const levels = educationalLevelStore.getAllLevels();
        setAllLevels(
          levels
            .filter((l) => l.isActive)
            .map((l) => ({
              id: l.id,
              name: l.name,
            }))
        );
      } catch (error) {
        console.error('Error loading levels:', error);
        // Still try to use what's in the store even if loading fails
        const levels = educationalLevelStore.getAllLevels();
        setAllLevels(
          levels
            .filter((l) => l.isActive)
            .map((l) => ({
              id: l.id,
              name: l.name,
            }))
        );
      }
    };

    initializeLevels();
  }, [show]);

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

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onHide();
      onDismiss?.();
    }
  };

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
      return;
    }

    // Construir array de secciones según el tipo seleccionado
    let sections: string[] = [];
    
    switch (sectionType) {
      case 'none':
        sections = [];
        break;
      case 'letters':
        if (sectionQuantity < 1 || sectionQuantity > 26) {
          setError('La cantidad de letras debe estar entre 1 y 26');
          return;
        }
        sections = Array.from({ length: sectionQuantity }, (_, i) =>
          String.fromCharCode(65 + i)
        );
        break;
      case 'numbers':
        if (sectionQuantity < 1 || sectionQuantity > 100) {
          setError('La cantidad de números debe estar entre 1 y 100');
          return;
        }
        sections = Array.from({ length: sectionQuantity }, (_, i) =>
          (i + 1).toString()
        );
        break;
      case 'custom':
        if (customSections.length === 0) {
          setError('Por favor ingresa al menos un identificador personalizado');
          return;
        }
        sections = customSections;
        break;
    }

    if (selectedLevels.length === 0) {
      setError('Por favor selecciona al menos un nivel');
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

    const options: CourseGenerationOptions = {
      institution: institutionName,
      sections,
      levelIds: selectedLevels,
      levelNames,
    };

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await generateCourses(options, (progressUpdate: ProgressUpdate) => {
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
        
        // Auto-close después de 2 segundos
        setTimeout(() => {
          resetForm();
          onHide();
          onSuccess?.();
        }, 2000);
      } else {
        setError(result.message || '❌ Error al crear los cursos');
        setCoursesCreated(result.coursesCreated);
      }
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : 'Error desconocido'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop={isLoading ? 'static' : true}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>📚 Generar Cursos en Masivo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!isLoading && !success && (
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Institution Name, Section Type and Dynamic Field in one row */}
            <div className="row mb-4">
              <div className="col-md-4">
                <Form.Group>
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
              </div>

              <div className="col-md-4">
                <Form.Group>
                  <Form.Label>
                    <strong>Tipo de Identificador de Paralelo</strong>
                  </Form.Label>
                  <AutocompleteSelect
                    value={sectionType}
                    onChange={(value) => setSectionType(value as 'none' | 'letters' | 'numbers' | 'custom')}
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
                          {sectionType === 'letters' 
                            ? 'Máximo 26' 
                            : 'Máximo 100'}
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
                  <strong>Resumen de carga:</strong>
                </p>
                <p className="mb-0">
                  Se crearán <strong>{
                    selectedLevels.length * (
                      sectionType === 'none' 
                        ? 1 
                        : sectionType === 'custom'
                        ? Math.max(1, customSections.length)
                        : sectionQuantity
                    )
                  }</strong> cursos
                  ({selectedLevels.length} niveles × {
                    sectionType === 'none' 
                      ? '1 (sin paralelo)'
                      : sectionType === 'custom'
                      ? `${customSections.length} identificadores`
                      : `${sectionQuantity} ${sectionType === 'letters' ? 'letra' : 'número'}${sectionQuantity > 1 ? 's' : ''}`
                  })
                </p>
              </Card.Body>
            </Card>

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading || selectedLevels.length === 0 || !institutionName.trim()}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Cargando...
                  </>
                ) : (
                  '✨ Generar Cursos'
                )}
              </Button>
            </div>
          </Form>
        )}

        {isLoading && (
          <div className="text-center">
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

        {success && (
          <Alert variant="success">
            <Alert.Heading>✅ ¡Éxito!</Alert.Heading>
            <p>
              Se crearon <strong>{coursesCreated}</strong> cursos exitosamente.
            </p>
            <hr />
            <p className="mb-0">Cerrando modal...</p>
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};
