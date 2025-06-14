'use client';

import React from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { toast } from 'react-toastify';
import { useInvalidateEndpointMutation } from '@/services/apiSlice';

interface Props {
    id: number;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteCouponModal: React.FC<Props> = ({ id, isOpen, onClose, onDelete }) => {
    const [invalidateEndpoint] = useInvalidateEndpointMutation();

    const handleConfirm = async () => {
        await invalidateEndpoint({
            url: `/coupons/${id}`,
            method: 'DELETE',
        });
        toast.success('Coupon deleted!');
        onDelete();
    };

    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={handleConfirm}
            title="Delete Coupon"
            message="Are you sure you want to delete this coupon?"
            confirmText="Delete"
            cancelText="Cancel"
        />
    );
};

export default DeleteCouponModal;
