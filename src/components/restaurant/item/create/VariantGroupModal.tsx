"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VariantGroup, VariantOption } from "./VariantsSection";
import { v4 as uuidv4 } from "uuid";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (group: VariantGroup) => void;
    initialData?: VariantGroup;
}

const VariantGroupModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<VariantOption[]>([]);
    const [errors, setErrors] = useState<{ title?: string; items?: string }>({});


    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setItems(initialData.items);
        } else {
            setTitle("");
            setItems([]);
        }
    }, [initialData]);

    const handleAddOption = () => {
        setItems([...items, { id: uuidv4(), title: "", price: 0 }]);
    };

    const handleOptionChange = (
        index: number,
        field: keyof VariantOption,
        value: string | number
    ) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setItems(updatedItems);
    };

    const handleRemoveOption = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleSubmit = () => {
        let hasError = false;
        const newErrors: { title?: string; items?: string } = {};

        if (!title.trim()) {
            newErrors.title = "Group title is required.";
            hasError = true;
        }

        if (items.length === 0) {
            newErrors.items = "At least one option is required.";
            hasError = true;
        } else if (items.some((item) => !item.title.trim())) {
            newErrors.items = "All option titles must be filled in.";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        onSave({
            id: initialData?.id || uuidv4(),
            title,
            items,
        });
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            setErrors({});
        }
    }, [isOpen]);

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                            <Dialog.Title className="text-lg font-medium mb-4">
                                {initialData ? "Edit Variant Group" : "Add Variant Group"}
                            </Dialog.Title>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Group Title</label>
                                    <input
                                        type="text"
                                        className="w-full border px-3 py-2 rounded hover:border-primary focus:outline-0 focus:border-primary focus-within:ring focus-within:ring-primary/50"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                    )}
                                </div>
                                {/* Options */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Options</label>
                                    <div className="space-y-2">
                                        {items.map((item, index) => (
                                            <div key={item.id} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Option Title"
                                                    className={`flex-1 border px-3 py-2 rounded hover:border-primary focus:outline-0 focus:border-primary focus-within:ring focus-within:ring-primary/50 ${errors.items && !item.title.trim() ? "border-red-500" : ""
                                                        }`}
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, "title", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Price"
                                                    className="w-24 border px-3 py-2 rounded hover:border-primary focus:outline-0 focus:border-primary focus-within:ring focus-within:ring-primary/50"
                                                    value={item.price}
                                                    onChange={(e) =>
                                                        handleOptionChange(index, "price", parseFloat(e.target.value))
                                                    }
                                                />
                                                <button
                                                    onClick={() => handleRemoveOption(index)}
                                                    className="text-red-500 hover:underline text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        {errors.items && (
                                            <p className="text-red-500 text-sm mt-1">{errors.items}</p>
                                        )}
                                        <button
                                            onClick={handleAddOption}
                                            className="text-primary cursor-pointer hover:underline text-sm"
                                        >
                                            + Add Option
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 cursor-pointer bg-primary/90 text-white rounded hover:bg-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default VariantGroupModal;
