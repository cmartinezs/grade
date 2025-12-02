'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageWrapper from '@/components/PageWrapper';
import EvaluationForm from '../../components/EvaluationForm';

export default function EditEvaluationPage() {
  const params = useParams();
  const evaluationId = params.evaluationId as string;

  return (
    <ProtectedRoute>
      <PageWrapper>
        <EvaluationForm mode="edit" evaluationId={evaluationId} />
      </PageWrapper>
    </ProtectedRoute>
  );
}
