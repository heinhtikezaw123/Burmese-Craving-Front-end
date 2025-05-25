// components/ui/ConfirmModal.tsx
import React from 'react';
import Modal from './Modal';
import { Button } from './Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Yes',
    cancelText = 'Cancel',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <p className="text-gray-700">{message}</p>
            <div className="flex justify-end gap-3 mt-4">
                <Button
                    label={cancelText}
                    type="button"
                    onClick={onClose}
                    className="bg-gray-200 text-gray-800"
                />
                <Button
                    label={confirmText}
                    type="button"
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="bg-red-500 text-white"
                />
            </div>
        </Modal>
    );
};

export default ConfirmModal;
