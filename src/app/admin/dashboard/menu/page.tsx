'use client';

import React, { useState } from 'react';
import MenuList from '@/components/restaurant/menu/MenuList';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { toast } from 'react-toastify';

interface MenuItem {
  id: number;
  name: string;
}

const Page = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Salad' },
    { id: 2, name: 'Pizza' },
  ]);

  const handleCreate = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return toast.error('Menu name is required');
    setMenuItems(prev => [...prev, { id: Date.now(), name: trimmed }]);
    setNewTitle('');
    setOpenCreate(false);
    toast.success('Menu created!');
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success('Menu deleted.');
  };

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
    setEditTitle(item.name);
  };

  const handleUpdate = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return toast.error('Menu name cannot be empty');
    setMenuItems(prev =>
      prev.map(item =>
        item.id === editItem?.id ? { ...item, name: trimmed } : item
      )
    );
    toast.success('Menu updated!');
    setEditItem(null);
    setEditTitle('');
  };

  return (
    <div className='w-full'>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Menu Lists</h1>
        <button
          onClick={() => setOpenCreate(true)}
          type="button"
          className="border border-primary text-primary bg-transparent hover:bg-primary/20 px-3 py-2 rounded cursor-pointer"
        >
          + Create Menu
        </button>
      </div>

      {/* Create Modal */}
      <Modal isOpen={openCreate} onClose={() => setOpenCreate(false)} title="Create New Menu" size="md">
        <Input
          type="text"
          placeholder="Menu Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <div className="mt-4">
          <Button onClick={handleCreate} label="Create" type="button" className="w-full" />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editItem !== null}
        onClose={() => setEditItem(null)}
        title="Edit Menu"
        size="md"
      >
        <Input
          type="text"
          placeholder="Menu Title"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
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
        title="Delete Menu"
        message="Are you sure you want to delete this menu?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Menu List */}
      <div className="w-full my-5">
        <div className="flex flex-col gap-y-2">
          {menuItems.map(item => (
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
