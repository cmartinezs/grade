'use client';

import React from 'react';
import DataPreloaderModal from '@/app/questions-bank/components/shared/DataPreloaderModal';
import { useChileDataLoader } from '@/hooks/useChileDataLoader';

interface ChileConfigPreloaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
}

/**
 * Modal genérico para cargar Categorías y Niveles de Chile
 * Se usa con DataPreloaderButton en: categorías y niveles
 * 
 * NO muestra automáticamente - solo cuando show={true}
 * El usuario debe presionar el botón de precarga para abrirlo
 */
export default function ChileConfigPreloaderModal({
  show,
  onHide,
  onSuccess,
}: ChileConfigPreloaderModalProps) {
  const { loadChileConfiguration } = useChileDataLoader();

  return (
    <DataPreloaderModal
      show={show}
      onHide={onHide}
      onSuccess={onSuccess}
      title="📍 Cargar Categorías y Niveles de Chile"
      description="¿Deseas cargar las categorías y niveles del sistema educativo chileno?"
      loaders={[
        {
          label: 'Categorías y Niveles',
          info: '2 Categorías + 12 Niveles',
          loadFn: async (onProgress) => {
            try {
              // Usar el hook para cargar los datos reales desde Data-Connect
              // Pasando el callback de progreso del DataPreloaderModal
              // para que se actualice la barra en tiempo real
              const result = await loadChileConfiguration((progressData) => {
                // Mapear los datos de progreso del formato interno al formato del DataPreloaderModal
                onProgress({
                  currentIndex: progressData.currentIndex,
                  total: progressData.total,
                  itemName: progressData.itemName,
                });
              });
              
              if (!result.success) {
                return {
                  itemsLoaded: 0,
                  errors: [result.message],
                };
              }

              return {
                itemsLoaded: result.categoriesLoaded + result.levelsLoaded,
                errors: [],
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
