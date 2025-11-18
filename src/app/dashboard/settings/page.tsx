'use client'

import { Container } from 'react-bootstrap';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function DashboardSettingsPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <Container className="mt-4">
          <h1 className="mb-4">Configuración del Dashboard</h1>
          <UnderMaintenance 
            message="Estamos construyendo opciones de personalización para tu dashboard, donde podrás configurar widgets, ajustar la visualización de datos y personalizar tu panel de control según tus necesidades."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
