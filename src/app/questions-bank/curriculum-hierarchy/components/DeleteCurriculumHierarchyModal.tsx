"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Alert, ListGroup } from 'react-bootstrap';
import {
  analyzeSubjectDeleteImpact,
  analyzeUnitDeleteImpact,
  analyzeTopicDeleteImpact,
  deleteSubject,
  deleteUnit,
  deleteTopic,
  getSubjectById,
  getUnitById,
  getTopicById,
} from '@/lib/curriculumHierarchyStore';
import { useAuth } from '@/contexts/AuthContext';
import { CurriculumHierarchyType, DeleteImpactAnalysis } from '@/types/curriculumHierarchy';

interface DeleteCurriculumHierarchyModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  elementType: CurriculumHierarchyType;
  elementId: string;
}

export default function DeleteCurriculumHierarchyModal({
  show,
  onHide,
  onSuccess,
  elementType,
  elementId,
}: DeleteCurriculumHierarchyModalProps) {
  const { user } = useAuth();
  const [impact, setImpact] = useState<DeleteImpactAnalysis | null>(null);
  const [elementName, setElementName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load impact analysis when modal opens
  useEffect(() => {
    if (show && elementId) {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      // Get element name
      let name = '';
      if (elementType === 'subject') {
        const subject = getSubjectById(elementId);
        name = subject ? `${subject.name} (${subject.code})` : 'Elemento desconocido';
        setImpact(analyzeSubjectDeleteImpact(elementId));
      } else if (elementType === 'unit') {
        const unit = getUnitById(elementId);
        name = unit ? unit.name : 'Elemento desconocido';
        setImpact(analyzeUnitDeleteImpact(elementId));
      } else {
        const topic = getTopicById(elementId);
        name = topic ? topic.name : 'Elemento desconocido';
        setImpact(analyzeTopicDeleteImpact());
      }

      setElementName(name);
      setLoading(false);
    }
  }, [show, elementId, elementType]);

  const handleHide = () => {
    setImpact(null);
    setElementName('');
    setSuccessMessage(null);
    setErrorMessage(null);
    onHide();
  };

  const handleConfirmDelete = async () => {
    if (!impact || !impact.canDelete) {
      return;
    }

    try {
      // Obtener userId del contexto de autenticación
      const userId = user?.id;
      
      if (!userId) {
        setErrorMessage('Usuario no autenticado');
        return;
      }

      if (elementType === 'subject') {
        await deleteSubject(elementId, userId);
      } else if (elementType === 'unit') {
        await deleteUnit(elementId, userId);
      } else {
        await deleteTopic(elementId, userId);
      }

      setSuccessMessage(`✅ ${getCurriculumHierarchyLabel(elementType)} eliminado exitosamente`);
      setTimeout(() => {
        onSuccess();
        handleHide();
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar elemento';
      console.error('Error deleting CurriculumHierarchy:', error);
      setErrorMessage(errorMessage);
    }
  };

  const getCurriculumHierarchyLabel = (type: CurriculumHierarchyType): string => {
    switch (type) {
      case 'subject':
        return 'Asignatura';
      case 'unit':
        return 'Unidad';
      case 'topic':
        return 'Tema';
    }
  };

  const getCurriculumHierarchyIcon = (type: CurriculumHierarchyType): string => {
    switch (type) {
      case 'subject':
        return '📚';
      case 'unit':
        return '📂';
      case 'topic':
        return '📄';
    }
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <span className="d-flex align-items-center gap-2">
            <span>🗑️</span>
            <span>{getCurriculumHierarchyIcon(elementType)}</span>
            <span>Eliminar {getCurriculumHierarchyLabel(elementType)}</span>
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p className="text-muted">Analizando impacto...</p>
        ) : (
          <>
            {/* Success Message */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {/* Error Message */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {/* Cannot Delete Warning */}
            {impact && !impact.canDelete && (
              <Alert variant="danger">
                <strong>❌ No se puede eliminar este elemento:</strong>
                <ul className="mb-0 mt-2">
                  {impact.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {/* Can Delete - Show Impact */}
            {impact && impact.canDelete && (
              <>
                <Alert variant="warning">
                  <strong>⚠️ Confirmación de Eliminación</strong>
                  <p className="mb-0 mt-2">
                    Estás a punto de eliminar: <strong>{elementName}</strong>
                  </p>
                </Alert>

                <div className="mb-3">
                  <h6>📊 Análisis de Impacto:</h6>
                  <ListGroup>
                    {impact.affectedUnits > 0 && (
                      <ListGroup.Item variant="warning">
                        <strong>Unidades afectadas:</strong> {impact.affectedUnits}
                        <br />
                        <small className="text-muted">
                          Estas unidades serán marcadas como inactivas (eliminación lógica).
                        </small>
                      </ListGroup.Item>
                    )}
                    {impact.affectedTopics > 0 && (
                      <ListGroup.Item variant="warning">
                        <strong>Temas afectados:</strong> {impact.affectedTopics}
                        <br />
                        <small className="text-muted">
                          Estos temas serán marcados como inactivos (eliminación lógica).
                        </small>
                      </ListGroup.Item>
                    )}
                    {impact.warnings.map((warning, idx) => (
                      <ListGroup.Item key={idx} variant="info">
                        <small>{warning}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>

                <Alert variant="info">
                  <strong>ℹ️ Importante:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Esta es una <strong>eliminación lógica</strong> (no se borra físicamente)</li>
                    <li>Los datos históricos se mantienen para auditoría</li>
                    <li>Los elementos eliminados no aparecerán en listados ni formularios</li>
                    <li>Las preguntas asociadas mantendrán su referencia histórica</li>
                  </ul>
                </Alert>

                <div className="bg-light p-3 rounded border">
                  <p className="mb-2">
                    <strong>¿Estás seguro de que deseas continuar?</strong>
                  </p>
                  <p className="mb-0 small text-muted">
                    Esta acción marcará el elemento y sus dependencias como inactivos.
                    La operación quedará registrada en la auditoría.
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          ❌ Cancelar
        </Button>
        {impact && impact.canDelete && (
          <Button variant="danger" onClick={handleConfirmDelete}>
            🗑️ Confirmar Eliminación
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
