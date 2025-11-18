'use client'

import { Container } from 'react-bootstrap';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function DashboardReportsPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="mt-4">
          <h1 className="mb-4">Reportes</h1>
          <UnderMaintenance 
            message="Estamos desarrollando un módulo de reportes avanzados donde podrás generar informes personalizados, exportar datos en múltiples formatos y obtener análisis detallados sobre el uso de la plataforma y el rendimiento académico."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
