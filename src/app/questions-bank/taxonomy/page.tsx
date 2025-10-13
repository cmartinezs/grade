"use client";

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateTaxonomyModal from '@/components/CreateTaxonomyModal';
import {
  getAllSubjects,
  getUnitsBySubject,
  getTopicsByUnit,
} from '@/lib/taxonomyStore';
import { Subject, Unit, Topic } from '@/types/taxonomy';

export default function TaxonomyPage() {
  const [subjects, setSubjects] = useState<Subject[]>(getAllSubjects());
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSuccess = () => {
    // Refresh data after creation
    setSubjects(getAllSubjects());
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

        {/* Info Card */}
        <Row className="mb-4">
          <Col>
            <Card bg="light">
              <Card.Body>
                <h6>📚 CU-BP-11: Crear elemento de taxonomía curricular</h6>
                <p className="mb-2 small">
                  <strong>Jerarquía:</strong> Asignatura (nivel 1) → Unidad (nivel 2) → Tema (nivel 3)
                </p>
                <p className="mb-0 small">
                  <strong>Reglas:</strong> Nombres únicos por nivel, códigos únicos para asignaturas.
                </p>
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
                      <TaxonomySubjectItem key={subject.subject_id} subject={subject} />
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
      </Container>
    </ProtectedRoute>
  );
}

function TaxonomySubjectItem({ subject }: { subject: Subject }) {
  const units = getUnitsBySubject(subject.subject_id);

  return (
    <Accordion.Item eventKey={subject.subject_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between w-100 pe-3">
          <span>
            <strong>{subject.name}</strong> <Badge bg="secondary">{subject.code}</Badge>
          </span>
          <Badge bg="primary">{units.length} unidad(es)</Badge>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {units.length === 0 ? (
          <p className="text-muted mb-0">No hay unidades en esta asignatura.</p>
        ) : (
          <Accordion>
            {units.map((unit) => (
              <TaxonomyUnitItem key={unit.unit_id} unit={unit} />
            ))}
          </Accordion>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

function TaxonomyUnitItem({ unit }: { unit: Unit }) {
  const topics = getTopicsByUnit(unit.unit_id);

  return (
    <Accordion.Item eventKey={unit.unit_id}>
      <Accordion.Header>
        <div className="d-flex justify-content-between w-100 pe-3">
          <span>{unit.name}</span>
          <Badge bg="info">{topics.length} tema(s)</Badge>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {topics.length === 0 ? (
          <p className="text-muted mb-0">No hay temas en esta unidad.</p>
        ) : (
          <ul>
            {topics.map((topic) => (
              <TaxonomyTopicItem key={topic.topic_id} topic={topic} />
            ))}
          </ul>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

function TaxonomyTopicItem({ topic }: { topic: Topic }) {
  return <li>{topic.name}</li>;
}
