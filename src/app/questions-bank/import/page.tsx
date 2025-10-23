'use client';

import { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ImportQuestionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel') {
        setMessage({ type: 'error', text: 'Por favor selecciona un archivo CSV válido' });
        return;
      }
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Por favor selecciona un archivo' });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Archivo importado correctamente' });
      setSelectedFile(null);
    } catch {
      setMessage({ type: 'error', text: 'Error al importar el archivo' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-3">Importar Preguntas</h2>
        
        <Card>
          <Card.Body>
            <div className="mb-4">
              <h5>Cargar archivo CSV</h5>
              <p className="text-muted small">
                Selecciona un archivo CSV con tus preguntas. 
                <a href="#" className="ms-2">Ver formato esperado</a>
              </p>
            </div>

            {message && (
              <Alert variant={message.type === 'success' ? 'success' : 'danger'} dismissible>
                {message.text}
              </Alert>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Archivo CSV</Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              <Form.Text className="d-block mt-2">
                {selectedFile ? `✅ ${selectedFile.name}` : 'Sin archivo seleccionado'}
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={handleImport}
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? 'Importando...' : '📥 Importar'}
              </Button>
              
              <Button
                variant="outline-secondary"
                href="/questions-bank"
              >
                ← Volver
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
