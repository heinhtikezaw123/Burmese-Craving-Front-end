// VariantGroupCard.tsx
"use client";

import React from "react";
import { VariantGroup } from "./VariantsSection";

interface Props {
    group: VariantGroup;
    onEdit: () => void;
    onDelete: () => void;
}

const VariantGroupCard = ({ group, onEdit, onDelete }: Props) => {
    return (
        <div className="bg-gray-100 rounded-md p-4">
            <div className="flex justify-between mb-3">
                <h3 className="font-semibold">{group.title}</h3>
                <div className="space-x-4 text-sm text-orange-500">
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete} className="text-red-500">
                        Delete
                    </button>
                </div>
            </div>
            {group.items.map((option) => (
                <div key={option.id} className="flex justify-between py-1 text-sm">
                    <div className="flex items-center space-x-2">
                        <input type="radio" name={group.title} />
                        <span>{option.title}</span>
                    </div>
                    <span>${option.price}</span>
                </div>
            ))}
        </div>
    );
};

export default VariantGroupCard;
