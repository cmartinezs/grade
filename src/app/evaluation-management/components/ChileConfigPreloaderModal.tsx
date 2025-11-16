'use client';

import React, { useState, useEffect } from 'react';
import DataPreloaderModal from '@/app/questions-bank/components/shared/DataPreloaderModal';
import { useChileDataLoader } from '@/hooks/useChileDataLoader';

interface ChileConfigPreloaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

/**
 * Modal para cargar Categorías y Niveles de Chile
 * Usa dos loaders separados (uno por categorías, otro por niveles)
 * La información se carga dinámicamente desde los archivos JSON
 * 
 * NO muestra automáticamente - solo cuando show={true}
 * El usuario debe presionar el botón de precarga para abrirlo
 */
export default function ChileConfigPreloaderModal({
  show,
  onHide,
  onSuccess,
}: ChileConfigPreloaderModalProps) {
  const { loadChileCategories, loadChileLevels } = useChileDataLoader();
  const [categoriesInfo, setCategoriesInfo] = useState<string>('Cargando categorías...');
  const [levelsInfo, setLevelsInfo] = useState<string>('Cargando niveles...');

  // Cargar información dinámica desde los archivos JSON
  useEffect(() => {
    const loadInfo = async () => {
      try {
        // Cargar categorías
        const categoriesResponse = await fetch('/data/level-categories.json');
        if (categoriesResponse.ok) {
          const categories: Array<{ name: string }> = await categoriesResponse.json();
          setCategoriesInfo(`${categories.length} Categorías (${categories.map((c) => c.name).join(', ')})`);
        }
      } catch (error) {
        console.error('Error loading categories info:', error);
      }

      try {
        // Cargar niveles
        const levelsResponse = await fetch('/data/education-levels.json');
        if (levelsResponse.ok) {
          const levels: Array<{ name: string }> = await levelsResponse.json();
          setLevelsInfo(`${levels.length} Niveles (${levels.map((l) => l.name).join(', ')})`);
        }
      } catch (error) {
        console.error('Error loading levels info:', error);
      }
    };

    loadInfo();
  }, []);

  return (
    <DataPreloaderModal
      show={show}
      onHide={onHide}
      onSuccess={onSuccess}
      title="📍 Cargar Categorías y Niveles de Chile"
      description="¿Deseas cargar las categorías y niveles del sistema educativo chileno?"
      loaders={[
        {
          label: 'Categorías de Chile',
          info: categoriesInfo,
          loadFn: async (onProgress) => {
            try {
              const result = await loadChileCategories(onProgress);
              return {
                itemsLoaded: result.itemsCreated,
                errors: result.errors,
              };
            } catch (error) {
              return {
                itemsLoaded: 0,
                errors: [error instanceof Error ? error.message : 'Error desconocido'],
              };
            }
          },
        },
        {
          label: 'Niveles Educacionales',
          info: levelsInfo,
          loadFn: async (onProgress) => {
            try {
              const result = await loadChileLevels(onProgress);
              return {
                itemsLoaded: result.itemsCreated,
                errors: result.errors,
              };
            } catch (error) {
              return {
                itemsLoaded: 0,
                errors: [error instanceof Error ? error.message : 'Error desconocido'],
              };
            }
          },
        },
      ]}
    />
  );
}
