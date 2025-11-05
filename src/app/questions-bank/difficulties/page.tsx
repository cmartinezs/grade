'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Form, Spinner, Alert } from 'react-bootstrap';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { Difficulty } from '@/lib/masterDataConnect';
import { useDifficulties } from '@/hooks/useDifficulties';

const PAGE_SIZE = 10;


export default function DifficultiesPage() {
  const { difficulties, loading, error: hookError, creating, create } =
    useDifficulties();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    level: '',
    weight: 1,
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
        level: difficulty.level,
        weight: difficulty.weight || 1,
        description: difficulty.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({ level: '', weight: 1, description: '' });
    }
    setLocalError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ level: '', weight: 1, description: '' });
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
      key: 'level',
      label: 'Nivel',
      render: (value) => <strong>{String(value)}</strong>,
      width: '150px',
      sortable: true,
    },
    {
      key: 'weight',
      label: 'Peso',
      render: (value) => (
        <span className="badge bg-info" style={{ fontSize: '1rem' }}>
          {String(value)}
        </span>
      ),
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
                  Nombre del nivel de dificultad
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Peso <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Número que ordena los niveles (1 = más fácil, mayor = más difícil)
                </Form.Text>
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
    </ProtectedRoute>
  );
}
