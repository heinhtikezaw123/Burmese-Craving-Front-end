'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-toastify';
import { useInvalidateEndpointMutation } from '@/services/apiSlice';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

const CreateCouponModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
    const [invalidateEndpoint] = useInvalidateEndpointMutation();

    const [form, setForm] = useState({
        title: '',
        code: '',
        percentage: 0,
        minOrder: 0,
        maxUses: 0,
        expiredDate: '',
        status: 'Inactive',
    });

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.code.trim()) {
            toast.error('Title and Code are required');
            return;
        }

        await invalidateEndpoint({
            url: '/coupons',
            method: 'POST',
            body: form,
        });

        toast.success('Coupon created!');
        onCreated();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Coupon" size="md">
            <div className="flex flex-col gap-3">
                <Input label='Title' placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <Input label='Code' placeholder="Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
                <Input
                    label='Discount Percentage'
                    type="number"
                    placeholder="Discount Percentage"
                    value={form.percentage}
                    onChange={e => setForm({ ...form, percentage: +e.target.value })}
                />
                <Input label='Min Order' type="number" placeholder="Min Order" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: +e.target.value })} />
                <Input label='Max Uses' type="number" placeholder="Max Uses" value={form.maxUses} onChange={e => setForm({ ...form, maxUses: +e.target.value })} />
                <Input label='Expire Date' type="date" value={form.expiredDate} onChange={e => setForm({ ...form, expiredDate: e.target.value })} />
                <div className="w-full">
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="border px-3 py-2 rounded w-full">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <Button onClick={handleSubmit} label="Create" className="w-full" />
            </div>
        </Modal>
    );
};

export default CreateCouponModal;
