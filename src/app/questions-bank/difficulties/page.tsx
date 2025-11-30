'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Form, Spinner, Alert } from 'react-bootstrap';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/shared/MasterDataTable';
import DataPreloaderModal from '../components/shared/DataPreloaderModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { Difficulty } from '@/lib/masterDataConnect';
import { useDifficulties } from '@/hooks/useDifficulties';
import { loadDifficultiesData } from '@/lib/difficultiesDataLoader';
import { getDifficultyColorRgb, formatWeightAsPercent, isValidWeight } from '@/lib/difficultyUtils';

const PAGE_SIZE = 10;


export default function DifficultiesPage() {
  const { difficulties, loading, error: hookError, creating, create, refetch } =
    useDifficulties();

  const [showLoaderModal, setShowLoaderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    level: '',
    weight: 0.5,
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Filter items by search text
  const filteredItems = useMemo(() => {
    return difficulties.filter((difficulty) => {
      const searchLower = searchText.toLowerCase();
      return (
        difficulty.level.toLowerCase().includes(searchLower) ||
        (difficulty.description?.toLowerCase().includes(searchLower) ?? false)
      );
    });
  }, [difficulties, searchText]);

  // Paginate filtered items
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + PAGE_SIZE);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const handleOpenModal = (difficulty?: Difficulty) => {
    if (difficulty) {
      setEditingId(difficulty.difficultyId);
      setFormData({
        code: difficulty.code || '',
        level: difficulty.level,
        weight: difficulty.weight || 0.5,
        description: difficulty.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', level: '', weight: 0.5, description: '' });
    }
    setLocalError(null);
    setShowModal(true);
  };

  

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: '', level: '', weight: 1, description: '' });
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

      await create(
        formData.code,
        formData.level,
        formData.weight,
        formData.description
      );
      handleCloseModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setLocalError(message);
      setSubmitting(false);
    }
  };

  const columns: ColumnConfig<Difficulty>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => (
        <code className="bg-light px-2 py-1 rounded">{String(value)}</code>
      ),
      width: '120px',
      sortable: true,
    },
    {
      key: 'level',
      label: 'Nivel',
      render: (value) => <strong>{String(value)}</strong>,
      width: '150px',
      sortable: true,
    },
    {
      key: 'weight',
      label: 'Peso',
      render: (value) => {
        const weight = Number(value);
        return (
          <span 
            className="badge" 
            style={{ 
              fontSize: '1rem',
              backgroundColor: getDifficultyColorRgb(weight),
              color: weight > 0.6 ? 'white' : 'black'
            }}
          >
            {formatWeightAsPercent(weight)}
          </span>
        );
      },
      width: '100px',
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

  const actions: ActionButton<Difficulty>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (difficulty) => handleOpenModal(difficulty),
      variant: 'outline-primary',
      title: 'Editar nivel de dificultad',
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: (difficulty) => {
        console.log('Delete:', difficulty.difficultyId);
        // TODO: Implementar DELETE
      },
      variant: 'outline-danger',
      title: 'Eliminar nivel de dificultad',
    },
  ];

  const displayError = localError || hookError;

  return (
    <ProtectedRoute>
      <MasterDataTable<Difficulty>
        items={paginatedItems}
        totalItems={filteredItems.length}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={loading}
        title="📈 Gestión de Niveles de Dificultad"
        description="Define los niveles de dificultad que pueden asignarse a preguntas"
        columns={columns}
        actions={actions}
        searchText={searchText}
        onSearchChange={(text) => {
          setSearchText(text);
          setCurrentPage(1);
        }}
        onPageChange={setCurrentPage}
        searchPlaceholder="Buscar por nombre o descripción..."
        onCreateClick={() => handleOpenModal()}
        createButtonLabel="Crear Nivel"
        createButtonIcon="➕"
        onPreloadClick={() => setShowLoaderModal(true)}
        preloadButtonLabel="Cargar Predefinidos"
        preloadButtonIcon="📥"
        emptyMessage="No hay niveles de dificultad registrados"
        emptyIcon="📭"
      />

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId
                ? 'Editar Nivel de Dificultad'
                : 'Crear Nuevo Nivel de Dificultad'}
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
                  placeholder="ej: EASY, MEDIUM, HARD"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Código único del nivel (EASY, MEDIUM, HARD)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nivel <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Fácil"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Nombre del nivel de dificultad para mostrar
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Peso (0-1) <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formData.weight}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setFormData({
                      ...formData,
                      weight: isNaN(val) ? 0.5 : Math.max(0, Math.min(1, val)),
                    });
                  }}
                  required
                  disabled={submitting}
                  isInvalid={!isValidWeight(formData.weight)}
                />
                <Form.Text className="text-muted">
                  0 = Más fácil (verde), 0.5 = Medio (amarillo), 1 = Más difícil (rojo)
                </Form.Text>
                {!isValidWeight(formData.weight) && (
                  <Form.Control.Feedback type="invalid">
                    El peso debe estar entre 0 y 1
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción del nivel de dificultad"
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
        title="📚 Cargar Niveles de Dificultad"
        description="¿Deseas cargar los niveles de dificultad predefinidos del sistema?"
        loaders={[
          {
            label: 'Niveles de Dificultad',
            info: 'Fácil, Medio, Difícil',
            loadFn: async (onProgress) => {
              const res = await loadDifficultiesData(onProgress);
              return { itemsLoaded: res.difficultiesCreated, errors: res.errors };
            },
          },
        ]}
      />
    </ProtectedRoute>
  );
}
