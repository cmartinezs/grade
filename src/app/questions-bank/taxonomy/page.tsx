"use client";

import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion, Form, InputGroup } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateTaxonomyModal from '@/components/CreateTaxonomyModal';
import EditTaxonomyModal from '@/components/EditTaxonomyModal';
import DeleteTaxonomyModal from '@/components/DeleteTaxonomyModal';
import {
  getAllSubjects,
  getUnitsBySubject,
  getTopicsByUnit,
  searchTaxonomy,
  searchUnitsBySubject,
  searchTopicsByUnit,
  clearAllTaxonomyData,
} from '@/lib/taxonomyStore';
import { Subject, Unit, Topic, TaxonomyType } from '@/types/taxonomy';

export default function TaxonomyPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editElement, setEditElement] = useState<{ type: TaxonomyType; id: string } | null>(null);
  const [deleteElement, setDeleteElement] = useState<{ type: TaxonomyType; id: string } | null>(null);

  const loadData = useCallback(() => {
    if (searchTerm.trim() === '') {
      setSubjects(getAllSubjects());
    } else {
      setSubjects(searchTaxonomy(searchTerm));
    }
  }, [searchTerm]);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSuccess = () => {
    // Refresh data after creation, edition, or deletion
    loadData();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleEdit = (type: TaxonomyType, id: string) => {
    setEditElement({ type, id });
    setShowEditModal(true);
  };

  const handleEditModalHide = () => {
    setShowEditModal(false);
    setEditElement(null);
  };

  const handleDelete = (type: TaxonomyType, id: string) => {
    setDeleteElement({ type, id });
    setShowDeleteModal(true);
  };

  const handleDeleteModalHide = () => {
    setShowDeleteModal(false);
    setDeleteElement(null);
  };

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1>Taxonomía Curricular</h1>
            <p className="text-muted">
              Gestiona la estructura jerárquica: Asignaturas → Unidades → Temas
            </p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              ➕ Crear Elemento
            </Button>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <span>🔍</span>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar por asignatura, unidad o tema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  ✕ Limpiar
                </Button>
              )}
            </InputGroup>
            {searchTerm && (
              <small className="text-muted">
                {subjects.length === 0
                  ? 'No se encontraron resultados'
                  : `${subjects.length} asignatura(s) encontrada(s)`}
              </small>
            )}
          </Col>
        </Row>

        {/* Info Card */}
        <Row className="mb-4">
          <Col>
            <Card bg="light">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6>📚 CU-BP-11, 12 & 13: Gestión completa de taxonomía curricular</h6>
                    <p className="mb-2 small">
                      <strong>Jerarquía:</strong> Asignatura (nivel 1) → Unidad (nivel 2) → Tema (nivel 3)
                    </p>
                    <p className="mb-2 small">
                      <strong>Crear:</strong> Usa el botón &quot;➕ Crear Elemento&quot; para agregar nuevos elementos.
                    </p>
                    <p className="mb-2 small">
                      <strong>Editar:</strong> Haz clic en &quot;✏️ Editar&quot; para modificar cualquier elemento.
                    </p>
                    <p className="mb-2 small">
                      <strong>Eliminar:</strong> Haz clic en &quot;🗑️ Eliminar&quot; para inactivar elementos (eliminación lógica en cascada).
                    </p>
                    <p className="mb-0 small">
                      <strong>Reglas:</strong> Nombres únicos por nivel, códigos únicos para asignaturas. 
                      Se mantiene integridad referencial. La eliminación es lógica con análisis de impacto.
                    </p>
                    <p className="mb-0 small text-muted mt-2">
                      💾 Los datos se guardan automáticamente en localStorage con auditoría completa.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de resetear todos los datos? Esta acción no se puede deshacer.')) {
                        clearAllTaxonomyData();
                      }
                    }}
                  >
                    🔄 Resetear Datos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Taxonomy Catalog */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <strong>Catálogo Jerárquico</strong>
              </Card.Header>
              <Card.Body>
                {subjects.length === 0 ? (
                  <p className="text-muted">No hay asignaturas creadas aún.</p>
                ) : (
                  <Accordion>
                    {subjects.map((subject) => (
                      <TaxonomySubjectItem
                        key={subject.subject_id}
                        subject={subject}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        searchTerm={searchTerm}
                      />
                    ))}
                  </Accordion>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Create Modal */}
        <CreateTaxonomyModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={handleSuccess}
        />

        {/* Edit Modal */}
        {editElement && (
          <EditTaxonomyModal
            show={showEditModal}
            onHide={handleEditModalHide}
            onSuccess={handleSuccess}
            elementType={editElement.type}
            elementId={editElement.id}
          />
        )}

        {/* Delete Modal */}
        {deleteElement && (
          <DeleteTaxonomyModal
            show={showDeleteModal}
            onHide={handleDeleteModalHide}
            onSuccess={handleSuccess}
            elementType={deleteElement.type}
            elementId={deleteElement.id}
          />
        )}
      </Container>
    </ProtectedRoute>
  );
}

function TaxonomySubjectItem({
  subject,
  onEdit,
  onDelete,
  searchTerm,
}: {
  subject: Subject;
  onEdit: (type: TaxonomyType, id: string) => void;
  onDelete: (type: TaxonomyType, id: string) => void;
  searchTerm: string;
}) {
  const units = searchTerm ? searchUnitsBySubject(subject.subject_id, searchTerm) : getUnitsBySubject(subject.subject_id);

  return (
    <Accordion.Item eventKey={subject.subject_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between align-items-center w-100 pe-3">
          <span>
            <strong>{subject.name}</strong> <Badge bg="secondary">{subject.code}</Badge>
          </span>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="primary">{units.length} unidad(es)</Badge>
            <span
              className="btn btn-sm btn-outline-primary"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit('subject', subject.subject_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit('subject', subject.subject_id);
                }
              }}
            >
              ✏️ Editar
            </span>
            <span
              className="btn btn-sm btn-outline-danger"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete('subject', subject.subject_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete('subject', subject.subject_id);
                }
              }}
            >
              🗑️ Eliminar
            </span>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {units.length === 0 ? (
          <p className="text-muted mb-0">No hay unidades en esta asignatura.</p>
        ) : (
          <Accordion>
            {units.map((unit) => (
              <TaxonomyUnitItem
                key={unit.unit_id}
                unit={unit}
                onEdit={onEdit}
                onDelete={onDelete}
                searchTerm={searchTerm}
              />
            ))}
          </Accordion>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

function TaxonomyUnitItem({
  unit,
  onEdit,
  onDelete,
  searchTerm,
}: {
  unit: Unit;
  onEdit: (type: TaxonomyType, id: string) => void;
  onDelete: (type: TaxonomyType, id: string) => void;
  searchTerm: string;
}) {
  const topics = searchTerm ? searchTopicsByUnit(unit.unit_id, searchTerm) : getTopicsByUnit(unit.unit_id);

  return (
    <Accordion.Item eventKey={unit.unit_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between align-items-center w-100 pe-3">
          <span>{unit.name}</span>
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="info">{topics.length} tema(s)</Badge>
            <span
              className="btn btn-sm btn-outline-info"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit('unit', unit.unit_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit('unit', unit.unit_id);
                }
              }}
            >
              ✏️ Editar
            </span>
            <span
              className="btn btn-sm btn-outline-danger"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete('unit', unit.unit_id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete('unit', unit.unit_id);
                }
              }}
            >
              🗑️ Eliminar
            </span>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {topics.length === 0 ? (
          <p className="text-muted mb-0">No hay temas en esta unidad.</p>
        ) : (
          <ul className="list-unstyled">
            {topics.map((topic) => (
              <TaxonomyTopicItem key={topic.topic_id} topic={topic} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </ul>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

function TaxonomyTopicItem({
  topic,
  onEdit,
  onDelete,
}: {
  topic: Topic;
  onEdit: (type: TaxonomyType, id: string) => void;
  onDelete: (type: TaxonomyType, id: string) => void;
}) {
  return (
    <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <span>{topic.name}</span>
      <div className="d-flex gap-2">
        <Button size="sm" variant="outline-secondary" onClick={() => onEdit('topic', topic.topic_id)}>
          ✏️ Editar
        </Button>
        <Button size="sm" variant="outline-danger" onClick={() => onDelete('topic', topic.topic_id)}>
          🗑️ Eliminar
        </Button>
      </div>
    </li>
  );
}
