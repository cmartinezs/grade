"use client";

import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCurriculumHierarchyModal from '@/app/questions-bank/curriculum-hierarchy/components/CreateCurriculumHierarchyModal';
import EditCurriculumHierarchyModal from './components/EditCurriculumHierarchyModal';
import DeleteCurriculumHierarchyModal from './components/DeleteCurriculumHierarchyModal';
import {
  CurriculumHierarchyHeader,
  CurriculumHierarchySearchBar,
  CurriculumHierarchyCatalog,
} from './components';
import { CurriculumHierarchyHelp } from './CurriculumHierarchyHelp';
import { useCurriculumHierarchyData, useCurriculumHierarchyModals } from './hooks';
import { useHelpContent } from '@/contexts/HelpContext';

export default function CurriculumHierarchyPage() {
  const { 
    subjects, 
    searchTerm, 
    setSearchTerm, 
    selectedLevelId,
    setSelectedLevelId,
    educationalLevels,
    handleSuccess, 
    handleClearSearch, 
    levelsLoaded 
  } = useCurriculumHierarchyData();
  const {
    showCreateModal,
    setShowCreateModal,
    showEditModal,
    showDeleteModal,
    editElement,
    deleteElement,
    handleEdit,
    handleEditModalHide,
    handleDelete,
    handleDeleteModalHide,
  } = useCurriculumHierarchyModals();
  const { setHelpContent } = useHelpContent();

  // Definir el contenido de ayuda cuando la página carga
  useEffect(() => {
    setHelpContent({
      title: 'ℹ️ Jerarquía Curricular',
      children: <CurriculumHierarchyHelp />,
    });

    // Limpiar cuando el componente se desmonta
    return () => setHelpContent(null);
  }, [setHelpContent]);

  return (
    <ProtectedRoute>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <CurriculumHierarchyHeader />
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-3">
          <Col>
            <CurriculumHierarchySearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClearSearch={handleClearSearch}
              resultsCount={subjects.length}
              educationalLevels={educationalLevels}
              selectedLevelId={selectedLevelId}
              onLevelChange={setSelectedLevelId}
            />
          </Col>
        </Row>

        {/* CurriculumHierarchy Catalog */}
        <Row>
          <Col>
            <CurriculumHierarchyCatalog
              subjects={subjects}
              searchTerm={searchTerm}
              levelsLoaded={levelsLoaded}
              onCreateClick={() => setShowCreateModal(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>

        {/* Create Modal */}
        <CreateCurriculumHierarchyModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={handleSuccess}
        />

        {/* Edit Modal */}
        {editElement && (
          <EditCurriculumHierarchyModal
            show={showEditModal}
            onHide={handleEditModalHide}
            onSuccess={handleSuccess}
            elementType={editElement.type}
            elementId={editElement.id}
          />
        )}

        {/* Delete Modal */}
        {deleteElement && (
          <DeleteCurriculumHierarchyModal
            show={showDeleteModal}
            onHide={handleDeleteModalHide}
            onSuccess={handleSuccess}
            elementType={deleteElement.type}
            elementId={deleteElement.id}
          />
        )}
      </Container>
    </ProtectedRoute>
  );
}
