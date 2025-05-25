import React from 'react';

interface MenuListProps {
    name: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ name, onEdit, onDelete }) => {
    return (
        <div className="shadow py-3 px-4 rounded bg-white w-full flex justify-between items-center">
            <p>{name}</p>
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
    );
};

export default MenuList;
