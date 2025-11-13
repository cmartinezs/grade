'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Form, Spinner, Alert } from 'react-bootstrap';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/shared/MasterDataTable';
import DataPreloaderModal from '../components/shared/DataPreloaderModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import type { Taxonomy } from '@/lib/masterDataConnect';
import { useTaxonomies } from '@/hooks/useTaxonomies';
import { loadTaxonomiesData } from '@/lib/taxonomiesDataLoader';

const PAGE_SIZE = 10;

export default function TaxonomiesPage() {
  const { user } = useAuth();
  const { taxonomies, loading, error: hookError, creating, create, refetch } =
    useTaxonomies();

  const [showLoaderModal, setShowLoaderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    level: 1,
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Filter items by search text
  const filteredItems = useMemo(() => {
    return taxonomies.filter((taxonomy) => {
      const searchLower = searchText.toLowerCase();
      return (
        taxonomy.code.toLowerCase().includes(searchLower) ||
        taxonomy.name.toLowerCase().includes(searchLower) ||
        (taxonomy.description?.toLowerCase().includes(searchLower) ?? false)
      );
    });
  }, [taxonomies, searchText]);

  // Paginate filtered items
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + PAGE_SIZE);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);

  const handleOpenModal = (taxonomy?: Taxonomy) => {
    if (taxonomy) {
      setEditingId(taxonomy.taxonomyId);
      setFormData({
        code: taxonomy.code,
        name: taxonomy.name,
        level: taxonomy.level || 1,
        description: taxonomy.description || '',
      });
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', level: 1, description: '' });
    }
    setLocalError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ code: '', name: '', level: 1, description: '' });
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

      const userId = user?.id;
      if (!userId) {
        setLocalError('Usuario no autenticado');
        setSubmitting(false);
        return;
      }

      await create(
        formData.code,
        formData.name,
        formData.level,
        userId,
        formData.description
      );
      handleCloseModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setLocalError(message);
      setSubmitting(false);
    }
  };

  const columns: ColumnConfig<Taxonomy>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => <strong>{String(value)}</strong>,
      width: '150px',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <span>{String(value)}</span>,
      sortable: true,
    },
    {
      key: 'level',
      label: 'Nivel (Bloom)',
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

  const actions: ActionButton<Taxonomy>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (taxonomy) => handleOpenModal(taxonomy),
      variant: 'outline-primary',
      title: 'Editar taxonomía',
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: (taxonomy) => {
        console.log('Delete:', taxonomy.taxonomyId);
        // TODO: Implementar DELETE
      },
      variant: 'outline-danger',
      title: 'Eliminar taxonomía',
    },
  ];

  const displayError = localError || hookError;

  return (
    <ProtectedRoute>
      <MasterDataTable<Taxonomy>
        items={paginatedItems}
        totalItems={filteredItems.length}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={loading}
        title="🏷️ Gestión de Taxonomías"
        description="Define las taxonomías de Bloom que pueden asignarse a preguntas"
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
        createButtonLabel="Crear Taxonomía"
        createButtonIcon="➕"
        onPreloadClick={() => setShowLoaderModal(true)}
        preloadButtonLabel="Cargar Predefinidas"
        preloadButtonIcon="📥"
        emptyMessage="No hay taxonomías registradas"
        emptyIcon="📭"
      />

      {/* Create/Edit Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingId
                ? 'Editar Taxonomía'
                : 'Crear Nueva Taxonomía'}
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
                  placeholder="ej: REMEMBER"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Código único de la taxonomía (ej: REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nombre <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ej: Recordar"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Nombre descriptivo de la taxonomía
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Nivel de Bloom <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="6"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                  disabled={submitting}
                />
                <Form.Text className="text-muted">
                  Nivel en la taxonomía de Bloom (1-6, donde 1=Recordar, 6=Crear)
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Descripción de la taxonomía"
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
        title="📚 Cargar Taxonomías de Bloom"
        description="¿Deseas cargar las taxonomías de Bloom predefinidas del sistema?"
        loaders={[
          {
            label: 'Taxonomías de Bloom',
            info: 'Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear',
            loadFn: async (onProgress) => {
              const userId = user?.id;
              if (!userId) {
                throw new Error('Usuario no autenticado');
              }
              const res = await loadTaxonomiesData(userId, onProgress);
              return { itemsLoaded: res.taxonomiesCreated, errors: res.errors };
            },
          },
        ]}
      />
    </ProtectedRoute>
  );
}
