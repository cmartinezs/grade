'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Form, Spinner, Alert } from 'react-bootstrap';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/shared/MasterDataTable';
import DataPreloaderModal from '../components/shared/DataPreloaderModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { QuestionType } from '@/lib/masterDataConnect';
import { useQuestionTypes } from '@/hooks/useQuestionTypes';
import { loadQuestionTypesData } from '@/lib/questionTypesDataLoader';

const PAGE_SIZE = 10;


export default function QuestionTypesPage() {
  const { questionTypes, loading, error: hookError, creating, create, refetch } =
    useQuestionTypes();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoaderModal, setShowLoaderModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    minOptions: 2,
    maxOptions: 10,
    correctOptions: 1,
  });
  const [unlimitedMaxOptions, setUnlimitedMaxOptions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [preloadInfo, setPreloadInfo] = useState<string>('');

  // Cargar información de tipos de preguntas predefinidos
  useEffect(() => {
    const loadPreloadInfo = async () => {
      try {
        const response = await fetch('/data/question-types.json');
        if (response.ok) {
          const data: Array<{ name: string }> = await response.json();
          const names = data.map((type) => type.name).join(', ');
          setPreloadInfo(names);
        }
      } catch (error) {
        console.error('Error loading preload info:', error);
      }
    };
    loadPreloadInfo();
  }, []);

  // Show loader modal if no question types
  // Comentado: ahora el botón aparece directamente en MasterDataTable
  // useEffect(() => {
  //   if (!loading && questionTypes.length === 0 && !showModal) {
  //     setShowLoaderModal(true);
  //   }
  // }, [loading, questionTypes.length, showModal]);

  // Filter items by search text
  const filteredItems = useMemo(() => {
    return questionTypes.filter((type) => {
      const searchLower = searchText.toLowerCase();
      return (
        type.code.toLowerCase().includes(searchLower) ||
        type.name.toLowerCase().includes(searchLower) ||
        (type.description?.toLowerCase().includes(searchLower) ?? false)
      );
    });
  }, [questionTypes, searchText]);

  // Paginate filtered items
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + PAGE_SIZE);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const handleOpenModal = (type?: QuestionType) => {
    if (type) {
      setEditingId(type.questionTypeId);
      setFormData({
        code: type.code,
        name: type.name,
        description: type.description || '',
        minOptions: type.minOptions,
        maxOptions: type.maxOptions,
        correctOptions: type.correctOptions,
      });
      setUnlimitedMaxOptions(type.maxOptions === 0);
    } else {
      setEditingId(null);
      setFormData({ 
        code: '', 
        name: '', 
        description: '',
        minOptions: 2,
        maxOptions: 10,
        correctOptions: 1,
      });
      setUnlimitedMaxOptions(false);
    }
    setLocalError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ 
      code: '', 
      name: '', 
      description: '',
      minOptions: 2,
      maxOptions: 10,
      correctOptions: 1,
    });
    setUnlimitedMaxOptions(false);
    setLocalError(null);
    setSubmitting(false);
  };

  

  // Función de validación
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar código
    if (!formData.code.trim()) {
      newErrors.code = 'El código es requerido';
    }

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    // Validar minOptions
    if (formData.minOptions < 1) {
      newErrors.minOptions = 'El mínimo debe ser al menos 1';
    }

    // Validar maxOptions (solo si no es ilimitado)
    if (!unlimitedMaxOptions) {
      if (formData.maxOptions < 1) {
        newErrors.maxOptions = 'El máximo debe ser al menos 1';
      }
      if (formData.maxOptions < formData.minOptions) {
        newErrors.maxOptions = 'El máximo no puede ser menor al mínimo';
      }
    }

    // Validar correctOptions
    if (formData.correctOptions < 1) {
      newErrors.correctOptions = 'Debe haber al menos 1 opción correcta';
    }
    
    // correctOptions no puede exceder maxOptions (cuando no es ilimitado)
    if (!unlimitedMaxOptions && formData.correctOptions > formData.maxOptions) {
      newErrors.correctOptions = `No puede haber más de ${formData.maxOptions} opciones correctas`;
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      if (editingId) {
        setLocalError('Edición no implementada aún');
        setSubmitting(false);
        return;
      }

      // Si está marcado "sin límite", usar 0; si no, usar el valor del input
      const maxOptions = unlimitedMaxOptions ? 0 : formData.maxOptions;

      await create(
        formData.code, 
        formData.name, 
        formData.description,
        formData.minOptions,
        maxOptions,
        formData.correctOptions
      );
      handleCloseModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setLocalError(message);
      setSubmitting(false);
    }
  };

  const columns: ColumnConfig<QuestionType>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => (
        <code className="text-primary" style={{ fontWeight: 'bold' }}>
          {String(value)}
        </code>
      ),
      width: '120px',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <strong>{String(value)}</strong>,
      sortable: true,
    },
    {
      key: 'description',
      label: 'Descripción',
      render: (value) => (
        <span className="text-muted">{String(value) || '—'}</span>
      ),
    },
    {
      key: 'minOptions',
      label: 'Min Opciones',
      render: (value) => <span className="badge bg-info">{String(value)}</span>,
      width: '100px',
      sortable: true,
    },
    {
      key: 'maxOptions',
      label: 'Max Opciones',
      render: (value) => {
        const numValue = Number(value);
        if (numValue === 0) {
          return <span className="badge bg-info">∞ Sin límite</span>;
        }
        return <span className="badge bg-warning">{String(value)}</span>;
      },
      width: '120px',
      sortable: true,
    },
    {
      key: 'correctOptions',
      label: 'Correctas',
      render: (value) => <span className="badge bg-success">{String(value)}</span>,
      width: '100px',
      sortable: true,
    },
  ];

  const actions: ActionButton<QuestionType>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (type) => handleOpenModal(type),
      variant: 'outline-primary',
      title: 'Editar tipo de pregunta',
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: (type) => {
        console.log('Delete:', type.questionTypeId);
        // TODO: Implementar DELETE
      },
      variant: 'outline-danger',
      title: 'Eliminar tipo de pregunta',
    },
  ];

  const displayError = localError || hookError;

  return (
    <ProtectedRoute>
      <MasterDataTable<QuestionType>
        items={paginatedItems}
        totalItems={filteredItems.length}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={loading}
        title="🏷️ Gestión de Tipos de Preguntas"
        description="Define los tipos de preguntas que pueden ser creadas en el banco"
        columns={columns}
        actions={actions}
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
        searchPlaceholder="Buscar por código, nombre o descripción..."
        onCreateClick={() => handleOpenModal()}
        createButtonLabel="Crear Tipo"
        createButtonIcon="➕"
        onPreloadClick={() => setShowLoaderModal(true)}
        preloadButtonLabel="Cargar Predefinidos"
        preloadButtonIcon="📥"
        emptyMessage="No hay tipos de preguntas registrados"
        emptyIcon="📭"
      />

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId ? 'Editar Tipo de Pregunta' : 'Crear Nuevo Tipo'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {displayError && (
                <Alert
                  variant="danger"
                  onClose={() => setLocalError(null)}
                  dismissible
                >
                  {displayError}
                </Alert>
              )}

              {/* Identificadores (Código y Nombre) */}
              <div className="row">
                <div className="col-md-4">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      Código <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: MC"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      disabled={submitting}
                      isInvalid={!!formErrors.code}
                    />
                    {formErrors.code && (
                      <Form.Control.Feedback type="invalid">
                        {formErrors.code}
                      </Form.Control.Feedback>
                    )}
                    <Form.Text className="text-muted d-block mt-1">
                      Identificador único (MC, TF, etc)
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-md-8">
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      Nombre <span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ej: Selección Múltiple"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={submitting}
                      isInvalid={!!formErrors.name}
                    />
                    {formErrors.name && (
                      <Form.Control.Feedback type="invalid">
                        {formErrors.name}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </div>
              </div>

              {/* Descripción */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción breve del tipo de pregunta"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows={2}
                  disabled={submitting}
                />
              </Form.Group>

              {/* Separador visual */}
              <hr className="my-3" />

              {/* Configuración de Opciones */}
              <div className="mb-3">
                <Form.Label className="fw-bold d-block mb-3">⚙️ Configuración de Opciones</Form.Label>
                
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Mínimo <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="2"
                        value={formData.minOptions}
                        onChange={(e) =>
                          setFormData({ ...formData, minOptions: parseInt(e.target.value) || 2 })
                        }
                        disabled={submitting}
                        isInvalid={!!formErrors.minOptions}
                      />
                      {formErrors.minOptions && (
                        <Form.Control.Feedback type="invalid">
                          {formErrors.minOptions}
                        </Form.Control.Feedback>
                      )}
                      <Form.Text className="text-muted d-block mt-1 small">
                        Opciones mínimas
                      </Form.Text>
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Máximo <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <Form.Control
                          type="number"
                          placeholder="10"
                          value={formData.maxOptions}
                          onChange={(e) =>
                            setFormData({ ...formData, maxOptions: parseInt(e.target.value) || 10 })
                          }
                          disabled={submitting || unlimitedMaxOptions}
                          isInvalid={!!formErrors.maxOptions}
                          style={{ flex: 1 }}
                        />
                      </div>
                      {formErrors.maxOptions && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {formErrors.maxOptions}
                        </Form.Control.Feedback>
                      )}
                      <Form.Check
                        type="switch"
                        id="unlimited-max-options"
                        label={<span className="small">Sin límite</span>}
                        checked={unlimitedMaxOptions}
                        onChange={(e) => setUnlimitedMaxOptions(e.target.checked)}
                        disabled={submitting}
                        style={{ marginTop: '8px' }}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label className="small fw-semibold">
                        Correctas <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="1"
                        value={formData.correctOptions}
                        onChange={(e) =>
                          setFormData({ ...formData, correctOptions: parseInt(e.target.value) || 1 })
                        }
                        disabled={submitting}
                        isInvalid={!!formErrors.correctOptions}
                      />
                      {formErrors.correctOptions && (
                        <Form.Control.Feedback type="invalid">
                          {formErrors.correctOptions}
                        </Form.Control.Feedback>
                      )}
                      <Form.Text className="text-muted d-block mt-1 small">
                        Respuestas correctas
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-top pt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCloseModal}
                disabled={submitting}
              >
                ✕ Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || creating}
              >
                {submitting || creating ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Guardando...
                  </>
                ) : editingId ? (
                  '💾 Guardar Cambios'
                ) : (
                  '✓ Crear Tipo'
                )}
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}

      {/* Data Preloader Modal (reusable) */}
      <DataPreloaderModal
        show={showLoaderModal}
        onHide={() => setShowLoaderModal(false)}
        onSuccess={async () => await refetch()}
        title="📚 Cargar Tipos de Preguntas"
        description="¿Deseas cargar los tipos de preguntas predefinidos del sistema?"
        loaders={[
          {
            label: 'Tipos de Preguntas',
            info: preloadInfo || 'Cargando tipos de preguntas...',
            loadFn: async (onProgress) => {
              const res = await loadQuestionTypesData(onProgress);
              return { itemsLoaded: res.typesCreated, errors: res.errors };
            },
          },
        ]}
      />
    </ProtectedRoute>
  );
}

