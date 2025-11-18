'use client'

import { Container } from 'react-bootstrap';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/components/ProtectedRoute';
import UnderMaintenance from '@/components/UnderMaintenance';

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <NavigationBar />
        
        <Container className="mt-4">
          <h1 className="mb-4">Facturación</h1>
          <UnderMaintenance 
            message="Estamos construyendo un sistema completo de facturación y pagos para gestionar tu suscripción, métodos de pago e historial de transacciones de forma segura y eficiente."
          />
        </Container>
      </PageWrapper>
    </ProtectedRoute>
  );
}
