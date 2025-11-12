'use client';

import React, { useState, useCallback } from 'react';
import { Modal, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';

/**
 * Componente Modal genérico y reutilizable para precargar datos maestros
 * 
 * Abstrae el patrón común de:
 * 1. Mostrar modal con confirmación
 * 2. Ejecutar función de carga con progreso de múltiples pasos
 * 3. Mostrar barra de progreso en tiempo real
 * 4. Auto-cerrar al completar
 * 
 * Ejemplo de uso:
 * ```tsx
 * <DataPreloaderModal
 *   show={showLoader}
 *   onHide={() => setShowLoader(false)}
 *   onSuccess={() => refetch()}
 *   loaders={[
 *     {
 *       label: 'Categorías',
 *       loadFn: (onProgress) => loadCategories(onProgress)
 *     },
 *     {
 *       label: 'Niveles',
 *       loadFn: (onProgress) => loadLevels(onProgress)
 *     }
 *   ]}
 *   title="Cargar Datos"
 *   description="¿Cargar datos predefinidos?"
 * />
 * ```
 */

interface ProgressState {
  currentStep: string;
  currentIndex: number;
  total: number;
  itemName: string;
}

interface DataLoader {
  /** Etiqueta del paso (ej: "Categorías", "Niveles", "Tipos de Preguntas") */
  label: string;
  
  /** Función que carga los datos. Recibe callback de progreso y retorna { itemsLoaded, ...} */
  loadFn: (
    onProgress: (progress: Omit<ProgressState, 'currentStep'>) => void
  ) => Promise<{
    itemsLoaded: number;
    errors?: string[];
  }>;
  
  /** Información adicional a mostrar (opcional) */
  info?: string;
}

interface DataPreloaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void | Promise<void>;
  
  /** Array de loaders a ejecutar secuencialmente */
  loaders: DataLoader[];
  
  /** Título del modal */
  title: string;
  
  /** Descripción del modal */
  description: string;
  
  /** Label para el botón de confirmar */
  confirmLabel?: string;
}

interface LoadResult {
  success: boolean;
  message: string;
  results: Map<string, number>; // label -> itemsLoaded
}

export default function DataPreloaderModal({
  show,
  onHide,
  onSuccess,
  loaders,
  title,
  description,
  confirmLabel = '✅ Cargar Datos',
}: DataPreloaderModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [result, setResult] = useState<LoadResult | null>(null);

  // Callback para recibir actualizaciones de progreso
  const handleProgressUpdate = useCallback(
    (progressData: Omit<ProgressState, 'currentStep'>) => {
      setProgress((prev) => ({
        ...prev,
        ...progressData,
      } as ProgressState));
    },
    []
  );

  const handleLoadData = async () => {
    setIsLoading(true);
    setResult(null);
    setProgress(null);

    try {
      const results = new Map<string, number>();

      // Ejecutar cada loader secuencialmente
      for (const loader of loaders) {
        // Establecer el step actual
        setProgress({
          currentStep: loader.label,
          currentIndex: 0,
          total: 0,
          itemName: 'Iniciando...',
        });

        try {
          // Ejecutar el loader pasando callback de progreso
          const loadResult = await loader.loadFn(
            (progressData) => {
              handleProgressUpdate({
                ...progressData,
              });
            }
          );

          results.set(loader.label, loadResult.itemsLoaded);

          if (loadResult.errors && loadResult.errors.length > 0) {
            console.warn(`[DataPreloaderModal] Errors in ${loader.label}:`, loadResult.errors);
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
          console.error(`[DataPreloaderModal] Error in ${loader.label}:`, errorMsg);
        }
      }

      // Marcar como completado
      setProgress({
        currentStep: 'Completado',
        currentIndex: loaders.length,
        total: loaders.length,
        itemName: 'Completado',
      });

      // Construir mensaje de resultado
      const resultEntries = Array.from(results.entries());
      const allSuccess = resultEntries.length > 0;
      
      let message = '✅ Datos cargados exitosamente';
      if (resultEntries.length === 1) {
        message = `✅ Se cargaron ${resultEntries[0][1]} ${resultEntries[0][0].toLowerCase()}`;
      } else if (resultEntries.length > 1) {
        const itemsList = resultEntries
          .map(([label, count]) => `${count} ${label.toLowerCase()}`)
          .join(', ');
        message = `✅ Se cargaron: ${itemsList}`;
      }

      setResult({
        success: allSuccess,
        message,
        results,
      });

      setIsLoading(false);

      // Auto-close después de 2 segundos si fue exitoso
      if (allSuccess) {
        setTimeout(() => {
          handleClose();
          onSuccess?.();
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setResult({
        success: false,
        message: `❌ Error durante la carga: ${errorMessage}`,
        results: new Map(),
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    setProgress(null);
    setIsLoading(false);
    onHide();
  };

  // Calcular porcentaje total considerando todos los loaders
  const calculateOverallProgress = (): number => {
    if (!progress) return 0;
    if (progress.currentStep === 'Completado') return 100;

    // Encontrar índice del paso actual
    const currentLoaderIndex = loaders.findIndex((l) => l.label === progress.currentStep);
    if (currentLoaderIndex === -1) return 0;

    // Cada loader ocupa 100/totalLoaders%
    const percentPerLoader = 100 / loaders.length;
    const currentLoaderProgress = progress.total > 0 
      ? (progress.currentIndex / progress.total) * percentPerLoader
      : 0;

    const completedLoadersPercent = currentLoaderIndex * percentPerLoader;
    
    return Math.round(completedLoadersPercent + currentLoaderProgress);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={isLoading ? 'static' : true}
      centered
      size="lg"
      keyboard={!isLoading}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!result ? (
          <div>
            <p className="lead">{description}</p>

            {loaders.length > 0 && (
              <div className="alert alert-info">
                <h6 className="mb-2">📚 Se cargarán:</h6>
                <ul className="mb-0 small">
                  {loaders.map((loader) => (
                    <li key={loader.label}>
                      <strong>{loader.label}</strong>
                      {loader.info && `: ${loader.info}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="alert alert-warning">
              <small>
                <strong>⚠️ Nota:</strong> Solo se cargarán los datos que no existan. No se duplicarán registros.
              </small>
            </div>

            {/* Barra de progreso */}
            {isLoading && progress && (
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <small className="text-muted">
                      {progress.currentStep === 'Completado'
                        ? '✅ Carga completada'
                        : `📂 Cargando ${progress.currentStep}`}
                    </small>
                    <br />
                    <strong>{progress.itemName}</strong>
                  </div>
                  <div className="text-end">
                    <strong>{progress.currentIndex} de {progress.total}</strong>
                    <br />
                    <small className="text-muted">{calculateOverallProgress()}%</small>
                  </div>
                </div>
                <ProgressBar
                  now={calculateOverallProgress()}
                  label={`${calculateOverallProgress()}%`}
                  animated
                  striped
                  variant="success"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <Alert variant={result.success ? 'success' : 'danger'}>
              <h5>{result.message}</h5>
              {result.success && result.results.size > 0 && (
                <div className="mt-3 small">
                  {Array.from(result.results.entries()).map(([label, count]) => (
                    <p key={label} className="mb-1">
                      ✅ {label} cargados: <strong>{count}</strong>
                    </p>
                  ))}
                </div>
              )}
            </Alert>

            {result.success && (
              <div className="text-center">
                <small className="text-muted">Cerrando en 2 segundos...</small>
              </div>
            )}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!result ? (
          <>
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleLoadData}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Cargando...
                </>
              ) : (
                confirmLabel
              )}
            </Button>
          </>
        ) : (
          <Button
            variant={result.success ? 'success' : 'danger'}
            onClick={handleClose}
          >
            {result.success ? '✅ Cerrar' : '❌ Cerrar'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
