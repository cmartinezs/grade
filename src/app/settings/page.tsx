'use client'

import { Container } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <NavigationBar />
        
        <Container className="mt-4">
          <h1 className="mb-4">Configuración</h1>
          <UnderMaintenance 
            message="Estamos desarrollando un panel de configuración completo donde podrás personalizar tu experiencia, ajustar preferencias y gestionar las opciones de tu cuenta."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}