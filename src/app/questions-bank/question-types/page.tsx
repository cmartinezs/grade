'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Form, Spinner, Alert, Button } from 'react-bootstrap';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import DataPreloaderModal from '@/components/DataPreloaderModal';
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

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
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', description: '' });
    }
    setLocalError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: '', name: '', description: '' });
    setLocalError(null);
    setSubmitting(false);
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSubmitting(true);

    try {
      if (editingId) {
        setLocalError('Edición no implementada aún');
        setSubmitting(false);
        return;
      }

      await create(formData.code, formData.name, formData.description);
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
        emptyMessage="No hay tipos de preguntas registrados"
        emptyIcon="📭"
        preloadComponent={
          <Button
            variant="success"
            onClick={() => setShowLoaderModal(true)}
            className="d-flex align-items-center gap-2"
          >
            <span>📥 Pre-carga</span>
          </Button>
        }
      />

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
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

              <Form.Group className="mb-3">
                <Form.Label>
                  Código <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: MC"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Identificador único del tipo (ej: MC, TF, SA)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nombre <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Selección Múltiple"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción del tipo de pregunta"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  disabled={submitting}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
                disabled={submitting}
              >
                Cancelar
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
                  'Guardar Cambios'
                ) : (
                  'Crear'
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
            info: 'Selección Simple, Selección Múltiple, Verdadero/Falso',
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

