'use client';

/**
 * Master Data Bulk Loader Modal
 * Modal reutilizable para cargar datos maestros (tipos de preguntas, dificultades, etc.)
 * Muestra progreso visual con barra de progreso
 */

import React, { useState, useCallback } from 'react';
import { Modal, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';

interface ProgressState {
  currentIndex: number;
  total: number;
  itemName: string;
}

interface MasterDataBulkLoaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  title: string;
  description: string;
  itemsLabel: string;
  onLoad: (handleProgressUpdate: (progress: ProgressState) => void) => Promise<{
    success: boolean;
    message: string;
    itemsLoaded: number;
  }>;
}

export default function MasterDataBulkLoaderModal({
  show,
  onHide,
  onSuccess,
  title,
  description,
  itemsLabel,
  onLoad,
}: MasterDataBulkLoaderModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    itemsLoaded: number;
  } | null>(null);

  // Callback para recibir actualizaciones de progreso
  const handleProgressUpdate = useCallback((progressData: ProgressState) => {
    setProgress(progressData);
  }, []);

  const handleLoadData = async () => {
    setIsLoading(true);
    setResult(null);
    setProgress(null);

    try {
      const loadResult = await onLoad(handleProgressUpdate);
      
      setProgress({
        currentIndex: loadResult.itemsLoaded,
        total: loadResult.itemsLoaded,
        itemName: 'Completado',
      });

      setResult({
        success: loadResult.success,
        message: loadResult.message,
        itemsLoaded: loadResult.itemsLoaded,
      });

      setIsLoading(false);

      // Auto-close después de 2 segundos si fue exitoso
      if (loadResult.success) {
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
        itemsLoaded: 0,
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

  const calculateProgress = (): number => {
    if (!progress) return 0;
    if (progress.total === 0) return 0;
    return Math.round((progress.currentIndex / progress.total) * 100);
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
            
            {/* Progress Bar */}
            {isLoading && progress && (
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <small className="text-muted">📦 Cargando {itemsLabel}</small>
                    <br />
                    <strong>{progress.itemName}</strong>
                  </div>
                  <div className="text-end">
                    <strong>{progress.currentIndex} de {progress.total}</strong>
                    <br />
                    <small className="text-muted">{calculateProgress()}%</small>
                  </div>
                </div>
                <ProgressBar 
                  now={calculateProgress()} 
                  label={`${calculateProgress()}%`}
                  animated
                  striped
                  variant="success"
                />
              </div>
            )}

            {!isLoading && !progress && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Iniciando carga...</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Alert variant={result.success ? 'success' : 'danger'}>
              <h5>{result.message}</h5>
              {result.success && (
                <div className="mt-3 small">
                  <p className="mb-0">✅ {itemsLabel} cargados: <strong>{result.itemsLoaded}</strong></p>
                </div>
              )}
            </Alert>

            {result.success && (
              <div className="text-center">
                <small className="text-muted">
                  Cerrando en 2 segundos...
                </small>
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
                '✅ Cargar Datos'
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
