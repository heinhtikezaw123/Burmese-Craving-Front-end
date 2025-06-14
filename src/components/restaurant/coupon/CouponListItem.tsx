import React from 'react';

interface CouponListItemProps {
    name: string;
    code: string;
    minOrder: number;
    maxUses: number;
    percentage: number;
    expiredDate: string;
    status: 'Active' | 'Inactive';
    usedCount: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

const CouponListItem: React.FC<CouponListItemProps> = ({
    name,
    code,
    minOrder,
    maxUses,
    percentage,
    expiredDate,
    status,
    usedCount,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="shadow py-3 px-4 rounded bg-white">
            <div className="w-full flex justify-between items-center">
                <p className="font-bold text-primary text-lg">{name}</p>
                <div className="flex divide-x divide-black/40">
                    <button
                        className="text-orange-400 pe-2 cursor-pointer hover:underline"
                        onClick={onEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 ps-2 cursor-pointer hover:underline"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="mt-2 text-sm text-gray-700">
                <div className="flex">
                    <span className="me-2 font-medium">Code:</span>
                    <span className='font-bold'>{code}</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Discount:</span>
                    <span>{percentage}%</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Min Order Amount:</span>
                    <span>${minOrder}</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Max Uses:</span>
                    <span>{maxUses}</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Expired In:</span>
                    <span>{expiredDate}</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Status:</span>
                    <span>{status}</span>
                </div>
                <div className="flex">
                    <span className="me-2 font-medium">Used:</span>
                    <span>{usedCount} / {maxUses}</span>
                </div>

            </div>
        </div>
    );
};

export default CouponListItem;
