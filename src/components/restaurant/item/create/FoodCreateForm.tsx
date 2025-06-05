"use client"

import React, { useState } from "react";
import type { Option } from '@/components/ui/SelectInput';

import VariantsSection from "./VariantsSection";
import { useInvalidateEndpointMutation } from "@/services/apiSlice";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { PriceInput } from "@/components/ui/PriceInput";

const menuOptions = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
];

const FoodCreateForm = () => {
    const [title, setTitle] = useState("");
    const [menuTitle, setMenuTitle] = useState<Option | null>(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [variants, setVariants] = useState<any[]>([]); // structure based on your backend


    const [submitItem, { isLoading }] = useInvalidateEndpointMutation();

    const handleSubmit = async () => {
        if (!title || !menuTitle || !price) {
            alert("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("menuTitle", menuTitle?.value || "");
        formData.append("description", description);
        formData.append("price", price);
        if (image) formData.append("image", image);
        formData.append("variants", JSON.stringify(variants));

        try {
            await submitItem(formData).unwrap();
            alert("Item created successfully");
            // Reset form or navigate
        } catch (err) {
            console.error(err);
            alert("Error creating item");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageUpload onChange={setImage} />
                <div className="md:col-span-2">
                    <h3 className="mb-2 font-bold text-xl">Adding New Item</h3>
                    <div className="space-y-3 mb-3">
                        <Input
                            type="text"
                            placeholder="Add Title Of Item"
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
                            placeholder="Add Description"
                            className="w-full border px-3 py-2 rounded h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <PriceInput
                            type="text"
                            placeholder="Add Price"
                            className="w-full border px-3 py-2 rounded"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <VariantsSection variants={variants} onChange={setVariants} />
                </div>
            </div>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md text-lg font-medium"
            >
                {isLoading ? "Creating..." : "Create New Item"}
            </button>
        </div>
    );
};

export default FoodCreateForm;
