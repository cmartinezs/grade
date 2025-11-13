import { useState } from 'react';
import { ModalElement } from '../types';

export function useCurriculumHierarchyModals() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editElement, setEditElement] = useState<ModalElement | null>(null);
  const [deleteElement, setDeleteElement] = useState<ModalElement | null>(null);

  const handleEdit = (type: ModalElement['type'], id: string) => {
    setEditElement({ type, id });
    setShowEditModal(true);
  };

  const handleEditModalHide = () => {
    setShowEditModal(false);
    setEditElement(null);
  };

  const handleDelete = (type: ModalElement['type'], id: string) => {
    setDeleteElement({ type, id });
    setShowDeleteModal(true);
  };

  const handleDeleteModalHide = () => {
    setShowDeleteModal(false);
    setDeleteElement(null);
  };

  return {
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
  };
}
