'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import EvaluationForm from '../components/EvaluationForm';

export default function CreateEvaluationPage() {
  return (
    <ProtectedRoute>
      <PageWrapper>
        <EvaluationForm mode="create" />
      </PageWrapper>
    </ProtectedRoute>
  );
}
