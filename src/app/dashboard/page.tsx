"use client";

import PageWrapper from '@/components/PageWrapper';
import NavigationBar from '@/components/NavigationBar';

export default function DashboardPage() {
  return (
    <PageWrapper>
      <NavigationBar />
      <div className="container py-5">
        <h1>Dashboard</h1>
        <p className="text-muted">Página principal del dashboard — contenido por implementar.</p>
      </div>
    </PageWrapper>
  );
}
