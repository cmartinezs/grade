'use client'

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCourseModal from '@/components/CreateCourseModal';
import { courseStore } from '@/lib/courseStore';
import { Course } from '@/types/course';

export default function CoursesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const allCourses = courseStore.getCourses(true, false);
    // Sort by level and name
    const sorted = allCourses.sort((a, b) => {
      // First by level
      const levelCompare = a.level.localeCompare(b.level);
      if (levelCompare !== 0) return levelCompare;
      // Then by name
      return a.name.localeCompare(b.name);
    });
    setCourses(sorted);
  };

  const handleCreateSuccess = () => {
    loadCourses();
  };

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1>Gestión de Cursos</h1>
            <p className="text-muted">
              Administra el catálogo de cursos disponibles
              <Badge bg="secondary" className="ms-2">{courses.length} cursos</Badge>
            </p>
          </Col>
          <Col xs="auto">
            <Button
              variant="success"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Crear Curso
            </Button>
          </Col>
        </Row>

        {/* Courses List */}
        {courses.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-5">
              <h4 className="text-muted">No hay cursos registrados</h4>
              <p className="text-muted">
                Comienza creando el primer curso del catálogo
              </p>
              <Button
                variant="success"
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Crear Primer Curso
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Nivel</th>
                    <th>Estado</th>
                    <th>Fecha Creación</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.course_id}>
                      <td>
                        <code className="text-primary">{course.code}</code>
                      </td>
                      <td>
                        <strong>{course.name}</strong>
                      </td>
                      <td>
                        <Badge bg="info">{course.level}</Badge>
                      </td>
                      <td>
                        {course.active ? (
                          <Badge bg="success">Activo</Badge>
                        ) : (
                          <Badge bg="secondary">Inactivo</Badge>
                        )}
                      </td>
                      <td className="text-muted small">
                        {new Date(course.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-end">
                        <Button variant="outline-primary" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Create Course Modal */}
      <CreateCourseModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </ProtectedRoute>
  );
}
