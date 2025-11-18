'use client'

import { Container } from 'react-bootstrap';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function CreateEvaluationPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="mt-4">
          <h1 className="mb-4">Crear Evaluación</h1>
          <UnderMaintenance 
            message="Estamos desarrollando una herramienta avanzada para crear y configurar evaluaciones personalizadas, seleccionar preguntas de tu banco, establecer criterios de evaluación y programar fechas de aplicación."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
