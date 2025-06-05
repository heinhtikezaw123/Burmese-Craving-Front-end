"use client";

import React, { useState, useEffect } from "react";
import type { Option } from "@/components/ui/SelectInput";
import VariantsSection from "./VariantsSection";
import { useInvalidateEndpointMutation } from "@/services/apiSlice";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { PriceInput } from "@/components/ui/PriceInput";

// Menu options
const menuOptions: Option[] = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
];

// 🧪 Mock existing item (can be replaced with props or fetched)
const mockExistingItem = {
    title: "Fried Rice",
    menuTitle: { value: "lunch", label: "Lunch" },
    description: "Delicious Thai-style fried rice with shrimp.",
    price: "120",
    image: null,
    variants: [
        {
            id: "variant-group-1",
            title: "Portion Size",
            items: [
                { id: "item-1", title: "Normal", price: 0 },
                { id: "item-2", title: "Large", price: 200 }
            ]
        },
        {
            id: "variant-group-2",
            title: "Extras",
            items: [
                { id: "item-3", title: "Egg", price: 300 },
                { id: "item-4", title: "Sausage", price: 200 }
            ]
        }
    ]
};

// Component
const FoodEditForm = () => {
    const [title, setTitle] = useState("");
    const [menuTitle, setMenuTitle] = useState<Option | null>(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [variants, setVariants] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [submitItem, { isLoading }] = useInvalidateEndpointMutation();

    // Populate with mock item on mount
    useEffect(() => {
        setTitle(mockExistingItem.title);
        setMenuTitle(mockExistingItem.menuTitle);
        setDescription(mockExistingItem.description);
        setPrice(mockExistingItem.price);
        setImage(mockExistingItem.image);
        setVariants(mockExistingItem.variants);
    }, []);

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (!title || !menuTitle || !price) {
            setError("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("menuTitle", menuTitle.value);
        formData.append("description", description);
        formData.append("price", price);
        if (image) formData.append("image", image);
        formData.append("variants", JSON.stringify(variants));

        try {
            await submitItem(formData).unwrap();
            setSuccess("Item updated successfully.");
        } catch (err) {
            console.error(err);
            setError("An error occurred while updating the item.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Upload */}
                <ImageUpload onChange={setImage} defaultImage={image} />

                {/* Form fields */}
                <div className="md:col-span-2">
                    <h3 className="mb-2 font-bold text-xl">Edit Item</h3>
                    <div className="space-y-4 mb-4">
                        <Input
                            type="text"
                            placeholder="Edit Title"
                            className="w-full border px-3 py-2 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <SelectInput
                            options={menuOptions}
                            value={menuTitle}
                            onChange={(selected) => setMenuTitle(selected as Option)}
                            placeholder="Choose Menu Title"
                        />
                        <Input
                            as="textarea"
                            placeholder="Edit Description"
                            className="w-full border px-3 py-2 rounded h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <PriceInput
                            placeholder="Edit Price"
                            className="w-full border px-3 py-2 rounded"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Variants */}
                    <VariantsSection variants={variants} onChange={setVariants} />
                </div>
            </div>

            {/* Error or Success Message */}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-primary/90 hover:bg-primary cursor-pointer text-white py-3 rounded-md text-lg font-medium disabled:opacity-50"
            >
                {isLoading ? "Updating..." : "Update Item"}
            </button>
        </div>
    );
};

export default FoodEditForm;
