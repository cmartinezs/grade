"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { getAllEvaluationsByUser, getUserByEmail, listSubjects } from '@/dataconnect-generated';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
  StatCard,
} from '@/components/shared/MasterDataTable';
import {
  EvaluationState,
  getEvaluationStateInfo,
  getGradeScaleInfo,
  isEvaluationDraft,
} from '@/types/evaluation';

const PAGE_SIZE = 10;

interface Evaluation {
  evaluationId: string;
  title: string;
  gradeScale: string;
  state: string;
  subjectId: string;
  allowQuestionSubset: boolean;
  questionSubsetPercent?: number | null;
  createdAt: string;
}

interface Subject {
  subjectId: string;
  name: string;
}

export default function EvaluationManagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Data state
  const [allEvaluations, setAllEvaluations] = useState<Evaluation[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<Evaluation[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [totalItems, setTotalItems] = useState(0);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);

        // Obtener userId de Data Connect
        const userResult = await getUserByEmail({ email: user.email });
        const userData = userResult.data?.users?.[0];

        if (!userData?.userId) {
          console.error('Usuario no encontrado');
          return;
        }

        // Cargar evaluaciones y asignaturas en paralelo
        const [evaluationsResult, subjectsResult] = await Promise.all([
          getAllEvaluationsByUser({
            userId: userData.userId,
            firebaseId: user.firebaseUid,
          }),
          listSubjects(),
        ]);

        setAllEvaluations(evaluationsResult.data?.evaluations || []);
        setSubjects(subjectsResult.data?.subjects || []);
      } catch (err) {
        console.error('Error loading evaluations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Filter and paginate evaluations
  useEffect(() => {
    const filtered = allEvaluations.filter(evaluation => {
      const subjectName = getSubjectName(evaluation.subjectId).toLowerCase();
      const search = searchText.toLowerCase();
      return (
        evaluation.title.toLowerCase().includes(search) ||
        subjectName.includes(search) ||
        evaluation.state.toLowerCase().includes(search)
      );
    });

    setTotalItems(filtered.length);

    // Paginate
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);
    setFilteredEvaluations(paginated);
  }, [allEvaluations, searchText, currentPage, subjects]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.subjectId === subjectId);
    return subject?.name || 'Sin asignatura';
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '-';
    }
  };

  // Columns configuration
  const columns: ColumnConfig<Evaluation>[] = [
    {
      key: 'title',
      label: 'Título',
      render: (value, item) => (
        <span>
          <strong>{String(value)}</strong>
          {item.allowQuestionSubset && (
            <Badge bg="info" className="ms-2">
              🎲 {item.questionSubsetPercent}%
            </Badge>
          )}
        </span>
      ),
    },
    {
      key: 'subjectId',
      label: 'Asignatura',
      render: (value) => getSubjectName(String(value)),
    },
    {
      key: 'gradeScale',
      label: 'Escala',
      render: (value) => (
        <small className="text-muted">
          {getGradeScaleInfo(String(value)).name}
        </small>
      ),
      width: '150px',
    },
    {
      key: 'state',
      label: 'Estado',
      render: (value) => {
        const stateInfo = getEvaluationStateInfo(String(value));
        return <Badge bg={stateInfo.variant}>{stateInfo.label}</Badge>;
      },
      width: '120px',
    },
    {
      key: 'createdAt',
      label: 'Creada',
      render: (value) => <small>{formatDate(String(value))}</small>,
      width: '120px',
    },
  ];

  // Actions configuration
  const actions: ActionButton<Evaluation>[] = [
    {
      icon: '👁️',
      label: 'Ver',
      onClick: (evaluation) => router.push(`/evaluation-management/${evaluation.evaluationId}`),
      variant: 'outline-primary',
      title: 'Ver detalles de la evaluación',
    },
    {
      icon: '✏️',
      label: 'Editar',
      onClick: (evaluation) => router.push(`/evaluation-management/${evaluation.evaluationId}/edit`),
      variant: 'outline-secondary',
      title: 'Editar evaluación',
      show: (evaluation) => isEvaluationDraft(evaluation.state),
    },
  ];

  // Stats for header
  const statCards: StatCard[] = [
    {
      label: 'Total',
      value: allEvaluations.length,
      icon: '📝',
      variant: 'primary',
    },
    {
      label: 'Borradores',
      value: allEvaluations.filter(e => e.state === EvaluationState.DRAFT).length,
      icon: '📋',
      variant: 'secondary',
    },
    {
      label: 'Publicadas',
      value: allEvaluations.filter(e => e.state === EvaluationState.PUBLISHED).length,
      icon: '📢',
      variant: 'success',
    },
    {
      label: 'Aplicadas',
      value: allEvaluations.filter(e => e.state === EvaluationState.APPLIED).length,
      icon: '✅',
      variant: 'info',
    },
  ];

  return (
    <ProtectedRoute>
      <MasterDataTable<Evaluation>
        title="📝 Mis Evaluaciones"
        description="Gestiona y crea evaluaciones basadas en tus preguntas"
        columns={columns}
        items={filteredEvaluations}
        totalItems={totalItems}
        totalPages={Math.ceil(totalItems / PAGE_SIZE)}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        isLoading={loading}
        searchText={searchText}
        onSearchChange={setSearchText}
        onPageChange={setCurrentPage}
        searchPlaceholder="Buscar por título, asignatura, estado..."
        onCreateClick={() => router.push('/evaluation-management/create')}
        createButtonLabel="Nueva Evaluación"
        createButtonIcon="➕"
        emptyMessage="No tienes evaluaciones creadas aún"
        emptyIcon="📭"
        emptyActionLabel="Crear Primera Evaluación"
        actions={actions}
        statCards={statCards}
      />
    </ProtectedRoute>
  );
}

