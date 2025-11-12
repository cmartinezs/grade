'use client';

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateQuestionModal from '../components/CreateQuestionModal';

export default function CreateQuestionPage() {
  const [showModal, setShowModal] = useState(true);

  const handleCreateSuccess = () => {
    setShowModal(false);
  };

  const handleModalHide = () => {
    setShowModal(false);
    window.location.href = '/questions-bank';
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">Crear Pregunta</h2>
        
        <Card>
          <Card.Body className="text-center py-5">
            <p className="text-muted mb-4">
              Selecciona cómo deseas crear una nueva pregunta
            </p>
            
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
              >
                ➕ Crear Pregunta
              </Button>
              
              <Button
                variant="outline-secondary"
                size="lg"
                href="/questions-bank"
              >
                ← Volver
              </Button>
            </div>
          </Card.Body>
        </Card>

        <CreateQuestionModal
          show={showModal}
          onHide={handleModalHide}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </ProtectedRoute>
  );
}
