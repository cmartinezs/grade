import { useState, useEffect, useCallback, useRef } from 'react';
import { Subject } from '@/types/curriculumHierarchy';
import {
  getAllSubjects,
  getAllUnits,
  getAllTopics,
  searchCurriculumHierarchy,
} from '@/lib/curriculumHierarchyStore';
import { levelStore } from '@/lib/levelStore';

interface EducationalLevel {
  id: string;
  name: string;
  code: string;
  categoryId: string;
}

export function useCurriculumHierarchyData() {
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [educationalLevels, setEducationalLevels] = useState<EducationalLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [levelsLoaded, setLevelsLoaded] = useState(false);
  const loadAttemptRef = useRef(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Filtrar subjects según búsqueda y nivel educacional
  const subjects = allSubjects.filter(subject => {
    // Filtro por nivel educacional
    if (selectedLevelId && subject.level_fk !== selectedLevelId) {
      return false;
    }
    return true;
  });

  const loadAllData = useCallback(() => {
    // Cargar TODOS los datos (esto inicia cargas en background si no están en caché)
    getAllSubjects();
    getAllUnits();
    getAllTopics();
    
    if (searchTerm.trim() === '') {
      const subjectsData = getAllSubjects();
      setAllSubjects(subjectsData);
    } else {
      const results = searchCurriculumHierarchy(searchTerm);
      setAllSubjects(results.subjects);
    }
  }, [searchTerm]);

  // Load data on mount and retry until we have all data
  useEffect(() => {
    setIsLoading(true);
    loadAttemptRef.current = 0;

    // Cargar niveles y categorías de forma asíncrona (solo una vez)
    const loadEducationalData = async () => {
      try {
        await levelStore.loadAll();
        // Obtener los niveles educacionales cargados
        const levels = levelStore.getAllLevels();
        setEducationalLevels(levels.map(l => ({
          id: l.id,
          name: l.name,
          code: l.code,
          categoryId: l.categoryId,
        })));
        console.log('[useCurriculumHierarchyData] Educational levels and categories loaded');
        setLevelsLoaded(true); // Marcar que los niveles están cargados
      } catch (error) {
        console.error('[useCurriculumHierarchyData] Error loading educational data:', error);
        setLevelsLoaded(true); // Marcar como cargados incluso si hay error
      }
    };

    loadEducationalData();

    const attemptLoad = () => {
      // Cargar todos los datos
      const subjectsData = getAllSubjects();
      const unitsData = getAllUnits();
      getAllTopics(); // Triggering background load
      
      setAllSubjects(subjectsData);
      
      // Considerar que tenemos datos listos cuando al menos tenemos subjects Y units
      const allDataReady = subjectsData.length > 0 && unitsData.length > 0;
      
      if (allDataReady || loadAttemptRef.current > 100) {
        // Si tenemos datos completos o después de 10 segundos, detener el polling
        setIsLoading(false);
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      } else {
        loadAttemptRef.current += 1;
      }
    };

    // Primer intento inmediato
    attemptLoad();

    // Polling cada 100ms para esperar a que los datos lleguen
    if (loadAttemptRef.current <= 100) {
      intervalIdRef.current = setInterval(attemptLoad, 100);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  // Cuando cambia el término de búsqueda, recargar datos
  useEffect(() => {
    loadAllData();
  }, [searchTerm, loadAllData]);

  const handleSuccess = () => {
    // Refresh data after creation, edition, or deletion
    // Important: We need to retry loading since cache was invalidated
    loadAttemptRef.current = 0;
    setIsLoading(true);
    
    // Retry with polling to ensure data is reloaded
    const attemptLoad = () => {
      const subjectsData = getAllSubjects();
      const unitsData = getAllUnits();
      
      setAllSubjects(subjectsData);
      
      // Keep polling until we have data (cache rebuild completed)
      const allDataReady = subjectsData.length > 0 && unitsData.length > 0;
      
      if (allDataReady || loadAttemptRef.current > 100) {
        setIsLoading(false);
      } else {
        loadAttemptRef.current += 1;
        // Continue polling
        setTimeout(attemptLoad, 100);
      }
    };
    
    attemptLoad();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedLevelId('');
  };

  return {
    subjects,
    searchTerm,
    setSearchTerm,
    selectedLevelId,
    setSelectedLevelId,
    educationalLevels,
    handleSuccess,
    handleClearSearch,
    isLoading,
    levelsLoaded,
  };
}

