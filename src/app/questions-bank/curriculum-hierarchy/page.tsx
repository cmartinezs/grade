"use client";

import { Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCurriculumHierarchyModal from '@/app/questions-bank/curriculum-hierarchy/components/CreateCurriculumHierarchyModal';
import EditCurriculumHierarchyModal from './components/EditCurriculumHierarchyModal';
import DeleteCurriculumHierarchyModal from './components/DeleteCurriculumHierarchyModal';
import {
  CurriculumHierarchyHeader,
  CurriculumHierarchySearchBar,
  CurriculumHierarchyHelpCard,
  CurriculumHierarchyCatalog,
} from './components';
import { CurriculumHierarchyDebug } from './components/CurriculumHierarchyDebug';
import { useCurriculumHierarchyData, useCurriculumHierarchyModals } from './hooks';

export default function CurriculumHierarchyPage() {
  const { subjects, searchTerm, setSearchTerm, handleSuccess, handleClearSearch } =
    useCurriculumHierarchyData();
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

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        {/* Debug Component - only in development */}
        {process.env.NODE_ENV === 'development' && <CurriculumHierarchyDebug />}

        {/* Header */}
        <Row className="mb-4">
          <Col>
            <CurriculumHierarchyHeader />
          </Col>
        </Row>

        {/* Collapsible Info Card */}
        <Row className="mb-3">
          <Col>
            <CurriculumHierarchyHelpCard />
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
            />
          </Col>
        </Row>

        {/* CurriculumHierarchy Catalog */}
        <Row>
          <Col>
            <CurriculumHierarchyCatalog
              subjects={subjects}
              searchTerm={searchTerm}
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
