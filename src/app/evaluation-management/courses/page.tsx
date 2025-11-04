'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/MasterDataTable';
import CreateCourseModal from '@/components/CreateCourseModal';
import EditCourseModal from '@/components/EditCourseModal';
import { courseStore } from '@/lib/courseStore';
import { levelStore } from '@/lib/levelStore';
import { Course } from '@/types/course';

const PAGE_SIZE = 10;

export default function CoursesPage() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load courses when page or search changes
  useEffect(() => {
    if (!user?.firebaseUid || !user?.id) return; // Wait for user to be authenticated

    const loadCoursesData = async () => {
      setIsLoading(true);
      try {
        // First load from Data-Connect if not already loaded
        // Pass both userId (system UUID) and firebaseUid (auth.uid from Firebase token)
        console.log('[COURSES PAGE] Loading courses with:', {
          userId: user.id,
          firebaseUid: user.firebaseUid,
          currentPage,
          searchText
        });
        
        await courseStore.loadCourses(user.id, user.firebaseUid);
        
        // Then get paginated results from cache
        const result = courseStore.getPaginatedCourses(currentPage, PAGE_SIZE, {
          searchText,
          includeInactive: true
        });

        setCourses(result.courses);
        setTotalCourses(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoursesData();
  }, [currentPage, searchText, user?.id, user?.firebaseUid]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleCreateSuccess = () => {
    setCurrentPage(1);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourseId(course.course_id);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    // Reload current page
    const result = courseStore.getPaginatedCourses(currentPage, PAGE_SIZE, {
      searchText,
      includeInactive: true
    });

    setCourses(result.courses);
    setTotalCourses(result.total);
    setTotalPages(result.totalPages);
  };

  const getLevelEditUrl = (levelId: string): string => {
    const level = levelStore.getLevelById(levelId);
    return level ? `/evaluation-management/levels/edit?id=${level.id}` : '#';
  };

  const getLevelName = (levelId: string): string => {
    const level = levelStore.getLevelById(levelId);
    return level ? level.name : `Nivel ${levelId}`;
  };

  const columns: ColumnConfig<Course>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => <code className="text-primary">{String(value)}</code>,
      width: '180px',
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <strong>{String(value)}</strong>,
    },
    {
      key: 'levelId',
      label: 'Nivel',
      render: (value) => (
        <Link href={getLevelEditUrl(String(value))} style={{ textDecoration: 'none' }}>
          <Badge bg="info" role="button" className="cursor-pointer">
            {getLevelName(String(value))}
          </Badge>
        </Link>
      ),
      width: '140px',
    },
    {
      key: 'institution',
      label: 'Institución',
      render: (value) => <span className="text-muted">{String(value)}</span>,
    },
    {
      key: 'active',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
      width: '100px',
    },
    {
      key: 'created_at',
      label: 'Fecha Creación',
      render: (value) => {
        if (!value) return <span className="text-muted small">-</span>;
        const date = new Date(value as string | Date);
        return <span className="text-muted small">{date.toLocaleDateString()}</span>;
      },
      width: '120px',
    },
  ];

  const actions: ActionButton<Course>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: handleEditCourse,
      variant: 'outline-primary',
      title: 'Editar curso',
    },
  ];

  return (
    <ProtectedRoute>
      <MasterDataTable<Course>
        items={courses}
        totalItems={totalCourses}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        title="Gestión de Cursos"
        description="Administra el catálogo de cursos disponibles"
        icon="📚"
        columns={columns}
        actions={actions}
        searchText={searchText}
        onSearchChange={setSearchText}
        onPageChange={setCurrentPage}
        onCreateClick={() => setShowCreateModal(true)}
        createButtonLabel="Crear Curso"
        createButtonIcon="➕"
        emptyMessage="No hay cursos registrados"
        emptyIcon="📭"
        emptyActionLabel="Generación Masiva"
        emptyActionHref="/evaluation-management/courses/bulk-generate"
      />

      {/* Create Course Modal */}
      <CreateCourseModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Course Modal */}
      <EditCourseModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
        courseId={selectedCourseId}
      />
    </ProtectedRoute>
  );
}
