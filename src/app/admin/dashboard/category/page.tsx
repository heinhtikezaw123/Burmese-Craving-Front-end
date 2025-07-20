'use client';

import React, { useState } from 'react';
import MenuList from '@/components/restaurant/menu/MenuList'; // Rename this component if needed
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { toast } from 'react-toastify';

interface CategoryItem {
  id: number;
  name: string;
}

const Page = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<CategoryItem | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState('');
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: 1, name: 'Salad' },
    { id: 2, name: 'Pizza' },
  ]);

  const handleCreate = () => {
    const trimmed = newCategoryTitle.trim();
    if (!trimmed) return toast.error('Category name is required');
    setCategories(prev => [...prev, { id: Date.now(), name: trimmed }]);
    setNewCategoryTitle('');
    setOpenCreate(false);
    toast.success('Category created!');
  };

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(item => item.id !== id));
    toast.success('Category deleted.');
  };

  const handleEdit = (item: CategoryItem) => {
    setEditItem(item);
    setEditCategoryTitle(item.name);
  };

  const handleUpdate = () => {
    const trimmed = editCategoryTitle.trim();
    if (!trimmed) return toast.error('Category name cannot be empty');
    setCategories(prev =>
      prev.map(item =>
        item.id === editItem?.id ? { ...item, name: trimmed } : item
      )
    );
    toast.success('Category updated!');
    setEditItem(null);
    setEditCategoryTitle('');
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Category Lists</h1>
        <button
          onClick={() => setOpenCreate(true)}
          type="button"
          className="border border-primary text-primary bg-transparent hover:bg-primary/20 px-3 py-2 rounded cursor-pointer"
        >
          + Create Category
        </button>
      </div>

      {/* Create Modal */}
      <Modal isOpen={openCreate} onClose={() => setOpenCreate(false)} title="Create New Category" size="md">
        <Input
          type="text"
          placeholder="Category Title"
          value={newCategoryTitle}
          onChange={e => setNewCategoryTitle(e.target.value)}
        />
        <div className="mt-4">
          <Button onClick={handleCreate} label="Create" type="button" className="w-full" />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editItem !== null}
        onClose={() => setEditItem(null)}
        title="Edit Category"
        size="md"
      >
        <Input
          type="text"
          placeholder="Category Title"
          value={editCategoryTitle}
          onChange={e => setEditCategoryTitle(e.target.value)}
        />
        <div className="mt-4">
          <Button onClick={handleUpdate} label="Update" type="button" className="w-full" />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => confirmDeleteId !== null && handleDelete(confirmDeleteId)}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Category List */}
      <div className="w-full my-5">
        <div className="flex flex-col gap-y-2">
          {categories.map(item => (
            <MenuList
              key={item.id}
              name={item.name}
              onEdit={() => handleEdit(item)}
              onDelete={() => setConfirmDeleteId(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
