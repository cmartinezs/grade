'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MasterDataTable, {
  ColumnConfig,
  ActionButton,
} from '@/components/shared/MasterDataTable';
import { Badge } from 'react-bootstrap';
import ChileConfigPreloaderModal from '../components/ChileConfigPreloaderModal';
import { useAuth } from '@/contexts/AuthContext';
import { levelStore } from '@/lib/levelStore';
import { courseStore } from '@/lib/courseStore';
import { EducationalLevel, LevelCategory } from '@/types/level';

const PAGE_SIZE = 10;

export default function LevelsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [levels, setLevels] = useState<EducationalLevel[]>([]);
  const [categories, setCategories] = useState<LevelCategory[]>([]);
  const [totalLevels, setTotalLevels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChileLoader, setShowChileLoader] = useState(false);

  // Helper function to add courseCount to levels
  const addCourseCountToLevels = (levelsList: EducationalLevel[]): EducationalLevel[] => {
    // Get all courses and count by levelId
    const courses = courseStore.getCourses(true, false); // include inactive, exclude deleted
    const courseCountByLevel: Record<string, number> = {};
    
    courses.forEach((course) => {
      if (course.levelId) {
        courseCountByLevel[course.levelId] = (courseCountByLevel[course.levelId] || 0) + 1;
      }
    });

    // Add courseCount to each level
    return levelsList.map((level) => ({
      ...level,
      courseCount: courseCountByLevel[level.id] || 0,
    }));
  };

  // Helper function to get category name by id
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '-';
  };

  // Load levels when page or search changes
  useEffect(() => {
    const loadLevelsData = async () => {
      setIsLoading(true);
      try {
        // Load categories, levels and courses from Data-Connect
        await levelStore.loadCategories();
        await levelStore.loadLevels();
        if (user?.id && user?.firebaseUid) {
          await courseStore.loadCourses(user.id, user.firebaseUid);
        }
        
        // Get categories for display
        const loadedCategories = levelStore.getAllCategories();
        setCategories(loadedCategories);
        
        // Then get paginated results from cache
        const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
          includeInactive: true,
          searchText,
        });
        
        // Add courseCount to levels
        const levelsWithCourseCount = addCourseCountToLevels(result.levels);
        
        setLevels(levelsWithCourseCount);
        setTotalLevels(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Error loading levels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevelsData();
  }, [currentPage, searchText, user?.id, user?.firebaseUid]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleToggleStatus = (level: EducationalLevel) => {
    try {
      levelStore.updateLevel(level.id, {
        name: level.name,
        code: level.code,
        description: level.description,
        isActive: !level.isActive,
        userId: user?.id,
      });
      // Reload current page
      const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
        includeInactive: true,
        searchText,
      });
      const levelsWithCourseCount = addCourseCountToLevels(result.levels);
      setLevels(levelsWithCourseCount);
      setTotalLevels(result.total);
      setTotalPages(result.totalPages);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleDeleteLevel = async (level: EducationalLevel) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este nivel?')) {
      try {
        await levelStore.deleteLevel(level.id, user?.id);
        // Reload current page
        const result = levelStore.getPaginatedLevels(currentPage, PAGE_SIZE, {
          includeInactive: true,
          searchText,
        });
        const levelsWithCourseCount = addCourseCountToLevels(result.levels);
        setLevels(levelsWithCourseCount);
        setTotalLevels(result.total);
        setTotalPages(result.totalPages);
      } catch (error) {
        alert(`Error al eliminar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  };

  const handleEditLevel = (level: EducationalLevel) => {
    router.push(`/evaluation-management/levels/edit?id=${level.id}`);
  };

  const handleChileLoaderClose = () => {
    setShowChileLoader(false);
  };

  const handleChileDataLoaded = async () => {
    // Recargar categorías y niveles desde Data-Connect después de cargar datos de Chile
    try {
      await levelStore.loadCategories();
      await levelStore.loadLevels();
      
      // Get categories for display
      const loadedCategories = levelStore.getAllCategories();
      setCategories(loadedCategories);
      
      const result = levelStore.getPaginatedLevels(1, PAGE_SIZE, {
        includeInactive: true,
        searchText: '',
      });
      const levelsWithCourseCount = addCourseCountToLevels(result.levels);
      setLevels(levelsWithCourseCount);
      setTotalLevels(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(1);
      setSearchText('');
    } catch (error) {
      console.error('Error reloading levels after Chile data load:', error);
      // Fallback: try to get whatever is cached
      const loadedCategories = levelStore.getAllCategories();
      setCategories(loadedCategories);
      
      const result = levelStore.getPaginatedLevels(1, PAGE_SIZE, {
        includeInactive: true,
        searchText: '',
      });
      const levelsWithCourseCount = addCourseCountToLevels(result.levels);
      setLevels(levelsWithCourseCount);
      setTotalLevels(result.total);
      setTotalPages(result.totalPages);
      setCurrentPage(1);
      setSearchText('');
    }
  };

  const columns: ColumnConfig<EducationalLevel>[] = [
    {
      key: 'code',
      label: 'Código',
      render: (value) => <code>{String(value)}</code>,
    },
    {
      key: 'name',
      label: 'Nombre',
      render: (value) => <span className="fw-bold">{String(value)}</span>,
    },
    {
      key: 'categoryId',
      label: 'Categoría',
      render: (value, _level) => (
        <Badge bg="primary" className="text-white">
          {getCategoryName(String(value))}
        </Badge>
      ),
    },
    {
      key: 'description',
      label: 'Descripción',
    },
    {
      key: 'courseCount',
      label: 'Cursos',
      render: (value) => <Badge bg="info">{String(value || 0)}</Badge>,
      width: '80px',
    },
    {
      key: 'isActive',
      label: 'Estado',
      render: (value) => (
        <Badge bg={value ? 'success' : 'secondary'}>
          {value ? 'Activo' : 'Inactivo'}
        </Badge>
      ),
      width: '100px',
    },
  ];

  const actions: ActionButton<EducationalLevel>[] = [
    {
      icon: '✏️',
      label: 'Editar',
      onClick: handleEditLevel,
      variant: 'outline-primary',
      title: 'Editar nivel',
    },
    {
      icon: (level) => (level.isActive ? '🔒' : '🔓'),
      label: (level) => (level.isActive ? 'Desactivar' : 'Activar'),
      onClick: handleToggleStatus,
      variant: (level) => (level.isActive ? 'outline-warning' : 'outline-success'),
      title: (level) => (level.isActive ? 'Desactivar' : 'Activar'),
    },
    {
      icon: '🗑️',
      label: 'Eliminar',
      onClick: handleDeleteLevel,
      variant: 'outline-danger',
      title: 'Eliminar nivel',
    },
  ];

  return (
    <>
      <MasterDataTable<EducationalLevel>
        items={levels}
        totalItems={totalLevels}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        isLoading={isLoading}
        title="Gestión de Niveles Educacionales"
        description="Administra los niveles educacionales del sistema"
        icon="📊"
        columns={columns}
        actions={actions}
        searchText={searchText}
        onSearchChange={setSearchText}
        onPageChange={setCurrentPage}
        onCreateClick={() => router.push('/evaluation-management/levels/create')}
        createButtonLabel="Nuevo Nivel"
        createButtonIcon="➕"
        onPreloadClick={() => setShowChileLoader(true)}
        preloadButtonLabel="Cargar de Chile"
        preloadButtonIcon="📥"
        emptyMessage="No hay niveles creados aún"
        emptyIcon="📭"
        emptyActionLabel="Crear Primer Nivel"
      />
      
      <ChileConfigPreloaderModal 
        show={showChileLoader}
        onHide={handleChileLoaderClose}
        onSuccess={handleChileDataLoaded}
      />
    </>
  );
}
