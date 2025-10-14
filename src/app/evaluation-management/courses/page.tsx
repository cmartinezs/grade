'use client'

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Table, Form, InputGroup, Pagination } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCourseModal from '@/components/CreateCourseModal';
import { courseStore } from '@/lib/courseStore';
import { Course } from '@/types/course';

const PAGE_SIZE = 10;

export default function CoursesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Load courses when page or search changes
  useEffect(() => {
    const result = courseStore.getPaginatedCourses(currentPage, PAGE_SIZE, {
      searchText,
      includeInactive: true
    });

    setCourses(result.courses);
    setTotalCourses(result.total);
    setTotalPages(result.totalPages);
  }, [currentPage, searchText]);

  // Reset to page 1 when search changes (but not on initial render)
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleCreateSuccess = () => {
    setCurrentPage(1);
    // Trigger reload by changing a dependency
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ProtectedRoute>
      <Container className="mt-3">
        {/* Header */}
        <Row className="mb-3">
          <Col>
            <h1 className="mb-2">Gestión de Cursos</h1>
            <p className="text-muted mb-0">
              Administra el catálogo de cursos disponibles
              <Badge bg="secondary" className="ms-2">
                {totalCourses} curso{totalCourses !== 1 ? 's' : ''} total{totalCourses !== 1 ? 'es' : ''}
                {totalCourses > PAGE_SIZE && ` (Página ${currentPage} de ${totalPages})`}
              </Badge>
            </p>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-success"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Crear Curso
            </Button>
          </Col>
        </Row>

        {/* Courses List */}
        {totalCourses === 0 && !searchText ? (
          <Card>
            <Card.Body className="text-center py-5">
              <h4 className="text-muted">No hay cursos registrados</h4>
              <p className="text-muted">
                Comienza creando el primer curso del catálogo
              </p>
              <Button
                variant="outline-success"
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Crear Primer Curso
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            <Card>
              <Card.Header className="bg-light">
                <Row className="align-items-center">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>🔍</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Buscar en todas las columnas..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      {searchText && (
                        <Button
                          variant="outline-secondary"
                          onClick={() => setSearchText('')}
                        >
                          ✕
                        </Button>
                      )}
                    </InputGroup>
                  </Col>
                  <Col md={6} className="text-end text-muted small">
                    Mostrando {courses.length} de {totalCourses} cursos
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                {courses.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="text-muted">No se encontraron cursos</h5>
                    <p className="text-muted">
                      Intenta ajustar la búsqueda
                    </p>
                  </div>
                ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Nivel</th>
                      <th>Institución</th>
                      <th>Estado</th>
                      <th>Fecha Creación</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course: Course) => (
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
                      <td className="text-muted">
                        {course.institution}
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
                )}
              </Card.Body>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-2 mb-2">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  
                  {/* Show page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first, last, current, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Pagination.Item>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <Pagination.Ellipsis key={page} disabled />;
                    }
                    return null;
                  })}
                  
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
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
