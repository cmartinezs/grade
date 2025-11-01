'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Pagination } from 'react-bootstrap';
import { levelStore } from '@/lib/levelStore';
import { EducationalLevel } from '@/types/level';

const PAGE_SIZE = 10;

export default function LevelsPage() {
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [totalLevels, setTotalLevels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Load levels on component mount
  useEffect(() => {
    const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
      includeInactive: true,
    });
    setLevels(result.levels);
    setTotalLevels(result.total);
    setTotalPages(result.totalPages);
  }, [currentPage]);

  const handleDeleteLevel = (levelId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este nivel?')) {
      try {
        levelStore.deleteLevel(levelId);
        const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
          includeInactive: true,
        });
        setLevels(result.levels);
        setTotalLevels(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        alert(`Error al eliminar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  };

  const handleToggleStatus = (level: EducationalLevel) => {
    try {
      levelStore.updateLevel(level.id, {
        name: level.name,
        code: level.code,
        description: level.description,
        isActive: !level.isActive,
      });
      const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
        includeInactive: true,
      });
      setLevels(result.levels);
      setTotalLevels(result.total);
      setTotalPages(result.totalPages);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">📊 Gestión de Niveles Educacionales</h1>
              <p className="text-muted">
                Administra los niveles educacionales del sistema
                <Badge bg="secondary" className="ms-2">
                  {totalLevels} nivel{totalLevels !== 1 ? 'es' : ''}
                </Badge>
              </p>
            </div>
            <Button href="/evaluation-management/levels/create" variant="primary" className="d-flex align-items-center gap-2">
              <span>➕</span>
              <span>Nuevo Nivel</span>
            </Button>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Total Niveles</p>
                  <h3 className="mb-0">{totalLevels}</h3>
                </div>
                <span style={{ fontSize: '2rem' }}>📊</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Niveles Activos</p>
                  <h3 className="mb-0">{levels.filter(l => l.isActive).length}</h3>
                </div>
                <span style={{ fontSize: '2rem' }}>✅</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Levels Table */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-light">
              <h5 className="mb-0">Lista de Niveles Educacionales</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {levels.length > 0 ? (
                <>
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cursos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {levels.map((level) => (
                        <tr key={level.id}>
                          <td className="fw-bold">{level.name}</td>
                          <td>
                            <code>{level.code}</code>
                          </td>
                          <td>{level.description}</td>
                          <td>
                            <Badge bg="info">{level.courseCount || 0}</Badge>
                          </td>
                          <td>
                            <Badge bg={level.isActive ? 'success' : 'secondary'}>
                              {level.isActive ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant={level.isActive ? 'outline-warning' : 'outline-success'}
                              size="sm"
                              className="me-2"
                              onClick={() => handleToggleStatus(level)}
                              title={level.isActive ? 'Desactivar' : 'Activar'}
                            >
                              {level.isActive ? '🔒' : '🔓'}
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteLevel(level.id)}
                              title="Eliminar"
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center py-3">
                      <Pagination>
                        <Pagination.First
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        />

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Pagination.Item
                            key={page}
                            active={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Pagination.Item>
                        ))}

                        <Pagination.Next
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted">No hay niveles creados aún</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
