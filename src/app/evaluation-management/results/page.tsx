'use client'

import { Container } from 'react-bootstrap';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function EvaluationResultsPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="mt-4">
          <h1 className="mb-4">Resultados de Evaluaciones</h1>
          <UnderMaintenance 
            message="Estamos construyendo un sistema completo de análisis de resultados donde podrás visualizar estadísticas detalladas, revisar el desempeño de estudiantes, generar reportes y obtener insights valiosos sobre las evaluaciones aplicadas."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
