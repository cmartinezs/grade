'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { questionStore } from '@/lib/questionStore';
import { QuestionWithDetails } from '@/types/question';

export default function StatisticsPage() {
  const [questions, setQuestions] = useState<QuestionWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    try {
      const allQuestions = questionStore.getAllQuestionsWithDetails(true);
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    total: questions.length,
    active: questions.filter(q => !q.deleted_at && q.active).length,
    retired: questions.filter(q => !q.active).length,
    deleted: questions.filter(q => q.deleted_at).length,
    byType: {
      'TF': questions.filter(q => q.type === 'TF').length,
      'SS': questions.filter(q => q.type === 'SS').length,
      'MC2': questions.filter(q => q.type === 'MC2').length,
      'MC3': questions.filter(q => q.type === 'MC3').length,
      'MC4': questions.filter(q => q.type === 'MC4').length,
      'MC5': questions.filter(q => q.type === 'MC5').length,
    },
    byDifficulty: {
      'bajo': questions.filter(q => q.difficulty_fk === 'bajo').length,
      'medio': questions.filter(q => q.difficulty_fk === 'medio').length,
      'alto': questions.filter(q => q.difficulty_fk === 'alto').length,
    },
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="p-4">
          <h2 className="mb-3">Estadísticas</h2>
          <Card>
            <Card.Body className="text-center py-5">
              <p className="text-muted">Cargando estadísticas...</p>
            </Card.Body>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">Estadísticas del Banco de Preguntas</h2>
        
        <div className="mb-5">
          <h5 className="mb-3">Resumen General</h5>
          <Row className="g-3">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <div className="display-6 fw-bold text-primary">{stats.total}</div>
                  <p className="text-muted small mb-0">Total Preguntas</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <div className="display-6 fw-bold text-success">{stats.active}</div>
                  <p className="text-muted small mb-0">Activas</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <div className="display-6 fw-bold text-warning">{stats.retired}</div>
                  <p className="text-muted small mb-0">Retiradas</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <div className="display-6 fw-bold text-danger">{stats.deleted}</div>
                  <p className="text-muted small mb-0">Eliminadas</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <Row className="g-3">
          <Col md={6}>
            <Card>
              <Card.Header className="bg-light">
                <h6 className="mb-0">Distribución por Tipo</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-2">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Verdadero/Falso (TF)</span>
                    <span className="badge bg-secondary">{stats.byType.TF}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Selección Simple (SS)</span>
                    <span className="badge bg-primary">{stats.byType.SS}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Selección Múltiple (2 correctas)</span>
                    <span className="badge bg-info">{stats.byType.MC2}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Selección Múltiple (3 correctas)</span>
                    <span className="badge bg-info">{stats.byType.MC3}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Selección Múltiple (4 correctas)</span>
                    <span className="badge bg-info">{stats.byType.MC4}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Selección Múltiple (5 correctas)</span>
                    <span className="badge bg-info">{stats.byType.MC5}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header className="bg-light">
                <h6 className="mb-0">Distribución por Dificultad</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-2">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Bajo</span>
                    <span className="badge bg-success">{stats.byDifficulty.bajo}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Medio</span>
                    <span className="badge bg-warning">{stats.byDifficulty.medio}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Alto</span>
                    <span className="badge bg-danger">{stats.byDifficulty.alto}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="outline-secondary" href="/questions-bank">
            ← Volver al Banco
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
