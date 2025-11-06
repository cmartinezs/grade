'use client';

import React, { useState, useCallback } from 'react';
import { Modal, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { useChileDataLoader } from '@/hooks/useChileDataLoader';

interface ChileDataLoaderModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess?: () => void;
  title?: string;
  description?: string;
  /**
   * Información personalizada de qué se cargará (opcional)
   * Si no se proporciona, no se muestra la sección azul de información
   */
  loadInfo?: Array<{
    label: string;
    value: string;
  }>;
}

interface ProgressState {
  currentStep: 'categories' | 'levels' | 'completed';
  currentIndex: number;
  total: number;
  itemName: string;
}

export default function ChileDataLoaderModal({
  show,
  onHide,
  onSuccess,
  title = '📍 Cargar Configuración de Chile',
  description = '¿Deseas cargar los niveles educacionales y categorías del sistema educativo chileno?',
  loadInfo,
}: ChileDataLoaderModalProps) {
  const { loadChileConfiguration } = useChileDataLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<ProgressState | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    categoriesLoaded?: number;
    levelsLoaded?: number;
  } | null>(null);

  // Callback para recibir actualizaciones de progreso
  const handleProgressUpdate = useCallback((progressData: ProgressState) => {
    setProgress(progressData);
  }, []);

  const handleLoadChileData = async () => {
    setIsLoading(true);
    setResult(null);
    setProgress(null);

    const loadResult = await loadChileConfiguration(handleProgressUpdate);
    
    setProgress({
      currentStep: 'completed',
      currentIndex: 2,
      total: 2,
      itemName: 'Completado',
    });

    setResult({
      success: loadResult.success,
      message: loadResult.message,
      categoriesLoaded: loadResult.categoriesLoaded,
      levelsLoaded: loadResult.levelsLoaded,
    });

    setIsLoading(false);

    // Auto-close después de 2 segundos si fue exitoso
    if (loadResult.success) {
      setTimeout(() => {
        handleClose();
        onSuccess?.();
      }, 2000);
    }
  };

  const handleClose = () => {
    setResult(null);
    setProgress(null);
    setIsLoading(false);
    onHide();
  };

  // Calcular porcentaje total
  const calculateOverallProgress = (): number => {
    if (!progress) return 0;
    if (progress.currentStep === 'completed') return 100;
    
    // Primero 50% para categorías, segundo 50% para niveles
    const categoryProgress = progress.currentStep === 'categories' 
      ? (progress.currentIndex / progress.total) * 50
      : 50;
    
    const levelProgress = progress.currentStep === 'levels'
      ? 50 + ((progress.currentIndex / progress.total) * 50)
      : 0;
    
    return Math.round(categoryProgress + levelProgress);
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
            
            {loadInfo && loadInfo.length > 0 && (
              <div className="alert alert-info">
                <h6 className="mb-2">📚 Se cargarán:</h6>
                <ul className="mb-0 small">
                  {loadInfo.map((info, idx) => (
                    <li key={idx}><strong>{info.label}:</strong> {info.value}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="alert alert-warning">
              <small>
                <strong>⚠️ Nota:</strong> Solo se cargarán los datos que no existan. 
                Si ya hay datos registrados, no se duplicarán.
              </small>
            </div>

            {/* Barra de progreso */}
            {isLoading && progress && (
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <small className="text-muted">
                      {progress.currentStep === 'categories' ? '📂 Cargando Categorías' : '📋 Cargando Niveles'}
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
              {result.success && (
                <div className="mt-3 small">
                  <p className="mb-1">✅ Categorías cargadas: <strong>{result.categoriesLoaded}</strong></p>
                  <p className="mb-0">✅ Niveles cargados: <strong>{result.levelsLoaded}</strong></p>
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
              onClick={handleLoadChileData}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Cargando...
                </>
              ) : (
                '✅ Cargar Configuración'
              )}
            </Button>
          </>
        ) : (
          <Button 
            variant={result.success ? 'success' : 'danger'} 
            onClick={handleClose}
            disabled={isLoading}
          >
            {result.success ? 'Cerrar' : 'Reintentar'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
