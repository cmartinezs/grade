import { useState, useEffect, useCallback, useRef } from 'react';
import { Subject } from '@/types/curriculumHierarchy';
import {
  getAllSubjects,
  getAllUnits,
  getAllTopics,
  searchCurriculumHierarchy,
} from '@/lib/curriculumHierarchyStore';

export function useCurriculumHierarchyData() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const loadAttemptRef = useRef(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const loadAllData = useCallback(() => {
    // Cargar TODOS los datos (esto inicia cargas en background si no están en caché)
    getAllSubjects();
    getAllUnits();
    getAllTopics();
    
    if (searchTerm.trim() === '') {
      const subjectsData = getAllSubjects();
      setSubjects(subjectsData);
    } else {
      const results = searchCurriculumHierarchy(searchTerm);
      setSubjects(results.subjects);
    }
  }, [searchTerm]);

  // Load data on mount and retry until we have all data
  useEffect(() => {
    setIsLoading(true);
    loadAttemptRef.current = 0;

    const attemptLoad = () => {
      // Cargar todos los datos
      const subjectsData = getAllSubjects();
      const unitsData = getAllUnits();
      getAllTopics(); // Triggering background load
      
      setSubjects(subjectsData);
      
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
      
      setSubjects(subjectsData);
      
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
  };

  return {
    subjects,
    searchTerm,
    setSearchTerm,
    handleSuccess,
    handleClearSearch,
    isLoading,
  };
}

