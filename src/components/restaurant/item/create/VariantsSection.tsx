// VariantsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import VariantGroupCard from "./VariantGroupCard";
import VariantGroupModal from "./VariantGroupModal";

export interface VariantOption {
    id: string;
    title: string;
    price: number;
}

export interface VariantGroup {
    id: string;
    title: string;
    items: VariantOption[];
}

interface Props {
    variants: VariantGroup[];
    onChange: (groups: VariantGroup[]) => void;
}

const VariantsSection = ({ variants, onChange }: Props) => {
    const [groups, setGroups] = useState<VariantGroup[]>(variants);
    const [modalOpen, setModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        setGroups(variants);
    }, [variants]);

    const handleSave = (group: VariantGroup) => {
        let newGroups = [...groups];
        if (editIndex !== null) {
            newGroups[editIndex] = group;
        } else {
            newGroups.push(group);
        }
        setGroups(newGroups);
        onChange(newGroups);
        setEditIndex(null);
        setModalOpen(false);
    };

    const handleDelete = (index: number) => {
        const updated = groups.filter((_, i) => i !== index);
        setGroups(updated);
        onChange(updated);
    };

    return (
        <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold">Add New Variants</h2>
                <button
                    onClick={() => {
                        setEditIndex(null);
                        setModalOpen(true);
                    }}
                    className="text-orange-500 font-medium"
                >
                    + Create
                </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Create extra options for a dish—like portion size or how it's prepared (e.g., salad, boiled, fried). Add a title and optional choices with or without prices.
            </p>
            <div className="space-y-3">
                {groups.map((group, idx) => (
                    <VariantGroupCard
                        key={group.id}
                        group={group}
                        onEdit={() => {
                            setEditIndex(idx);
                            setModalOpen(true);
                        }}
                        onDelete={() => handleDelete(idx)}
                    />
                ))}
            </div>
            <VariantGroupModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditIndex(null);
                }}
                onSave={handleSave}
                initialData={editIndex !== null ? groups[editIndex] : undefined}
            />
        </div>
    );
};

export default VariantsSection;
