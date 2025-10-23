import { useState, useEffect, useCallback } from 'react';
import { Subject } from '@/types/taxonomy';
import {
  getAllSubjects,
  searchTaxonomy,
} from '@/lib/taxonomyStore';

export function useTaxonomyData() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadData = useCallback(() => {
    if (searchTerm.trim() === '') {
      setSubjects(getAllSubjects());
    } else {
      setSubjects(searchTaxonomy(searchTerm));
    }
  }, [searchTerm]);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSuccess = () => {
    // Refresh data after creation, edition, or deletion
    loadData();
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
  };
}
