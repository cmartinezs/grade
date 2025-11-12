"use client";

import { Container, Row, Col } from 'react-bootstrap';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateTaxonomyModal from '@/app/questions-bank/taxonomy/components/CreateTaxonomyModal';
import EditTaxonomyModal from './components/EditTaxonomyModal';
import DeleteTaxonomyModal from './components/DeleteTaxonomyModal';
import {
  TaxonomyHeader,
  TaxonomySearchBar,
  TaxonomyHelpCard,
  TaxonomyCatalog,
} from './components';
import { TaxonomyDebug } from './components/TaxonomyDebug';
import { useTaxonomyData, useTaxonomyModals } from './hooks';

export default function TaxonomyPage() {
  const { subjects, searchTerm, setSearchTerm, handleSuccess, handleClearSearch } =
    useTaxonomyData();
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
  } = useTaxonomyModals();

  return (
    <ProtectedRoute>
      <Container className="mt-4">
        {/* Debug Component - only in development */}
        {process.env.NODE_ENV === 'development' && <TaxonomyDebug />}

        {/* Header */}
        <Row className="mb-4">
          <Col>
            <TaxonomyHeader />
          </Col>
        </Row>

        {/* Collapsible Info Card */}
        <Row className="mb-3">
          <Col>
            <TaxonomyHelpCard />
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-3">
          <Col>
            <TaxonomySearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClearSearch={handleClearSearch}
              resultsCount={subjects.length}
            />
          </Col>
        </Row>

        {/* Taxonomy Catalog */}
        <Row>
          <Col>
            <TaxonomyCatalog
              subjects={subjects}
              searchTerm={searchTerm}
              onCreateClick={() => setShowCreateModal(true)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>

        {/* Create Modal */}
        <CreateTaxonomyModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSuccess={handleSuccess}
        />

        {/* Edit Modal */}
        {editElement && (
          <EditTaxonomyModal
            show={showEditModal}
            onHide={handleEditModalHide}
            onSuccess={handleSuccess}
            elementType={editElement.type}
            elementId={editElement.id}
          />
        )}

        {/* Delete Modal */}
        {deleteElement && (
          <DeleteTaxonomyModal
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
