/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { LuFilter } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface FilterProps {
    onApply: (filters: Record<string, any>) => void;
}

export default function VendorFilterDrawer({ onApply }: FilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        business_name: "",
        owner_name: "",
        email: "",
        phone: "",
        business_type: "",
        location: "",
        status: "",
        start_date: "",
        end_date: "",
    });

    const updateFilter = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onApply(filters);
        setIsOpen(false);
    };

    const handleReset = () => {
        setFilters({
            business_name: "",
            owner_name: "",
            email: "",
            phone: "",
            business_type: "",
            location: "",
            status: "",
            start_date: "",
            end_date: "",
        });
    };

    const filterCount = Object.values(filters).filter((val) =>
        typeof val === "string" ? val.trim() !== "" : val != null
    ).length;

    return (
        <>
            <Button
                type="button"
                onClick={() => setIsOpen(true)}
                label={
                    <div className="flex items-center gap-2 relative">
                        <LuFilter className="text-xl" />
                        {filterCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 min-w-[16px] text-center leading-tight">
                                {filterCount}
                            </span>
                        )}
                        Add Filter
                    </div>
                }
            />

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Filter Vendors</h2>
                        <button type="button" onClick={() => setIsOpen(false)} className="cursor-pointer">
                            <AiOutlineClose className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <Input
                            placeholder="Business Name"
                            value={filters.business_name}
                            onChange={(e) => updateFilter("business_name", e.target.value)}
                        />
                        <Input
                            placeholder="Owner Name"
                            value={filters.owner_name}
                            onChange={(e) => updateFilter("owner_name", e.target.value)}
                        />
                        <Input
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => updateFilter("email", e.target.value)}
                        />
                        <Input
                            placeholder="Phone"
                            value={filters.phone}
                            onChange={(e) => updateFilter("phone", e.target.value)}
                        />
                        <Input
                            placeholder="Business Type"
                            value={filters.business_type}
                            onChange={(e) => updateFilter("business_type", e.target.value)}
                        />
                        <Input
                            placeholder="Location"
                            value={filters.location}
                            onChange={(e) => updateFilter("location", e.target.value)}
                        />
                        <select
                            value={filters.status}
                            onChange={(e) => updateFilter("status", e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        >
                            <option value="">Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="pending">Pending</option>
                        </select>

                        <div>
                            <label className="block text-sm font-medium mb-1">Registration Date Range</label>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    value={filters.start_date}
                                    onChange={(e) => updateFilter("start_date", e.target.value)}
                                />
                                <Input
                                    type="date"
                                    value={filters.end_date}
                                    onChange={(e) => updateFilter("end_date", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex">
                            <Button onClick={handleSubmit} type="button" label={<p>Apply Filter</p>} />
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-auto ml-2 whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
