'use client';
import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/datatable/DataTable';
import VendorFilterDrawer from '@/components/admin/filterDrawers/VendorFilterDrawer';

interface Vendor {
    vendorId: string;
    businessName: string;
    ownerName: string;
    email: string;
    phone: string;
    businessType: string;
    location: string;
    status: 'active' | 'suspended' | 'pending';
    rating: number;
    totalReviews: number;
    halalCertified: boolean;
    registeredDate: string;
    lastLogin: string;
    deliveryTime: string;
    distance: number;
    categories: string[];
    coverImage: string;
    actions: {
        viewProfile: string;
        suspend: boolean;
        delete: boolean;
        edit: boolean;
    };
    joinedAt: string;
}


const mockData: Vendor[] = [
    {
        vendorId: "1",
        businessName: "Yangon Street Bites",
        ownerName: "Aung Ko Ko",
        email: "yangonbites@example.com",
        phone: "+1 212-555-1234",
        businessType: "Restaurant",
        location: "Downtown, New York",
        status: "active",
        rating: 4,
        totalReviews: 3,
        halalCertified: true,
        registeredDate: "2024-09-01",
        lastLogin: "2025-07-18T12:45:00Z",
        deliveryTime: "25-30 mins",
        distance: 1.5,
        categories: ["Burmese", "Street Food", "Tea Shop"],
        coverImage: "https://tse3.mm.bing.net/th/id/OIP.fMG7YbNVZpjRqO0EEnWt4QHaE6?rs=1&pid=ImgDetMain&cb=idpwebpc1",
        actions: {
            viewProfile: "/admin/vendors/1",
            suspend: true,
            delete: true,
            edit: true
        },
        joinedAt: ""
    },
    {
        vendorId: "2",
        businessName: "Mandalay Eats Express",
        ownerName: "Su Hnin Phyu",
        email: "mandalayexpress@example.com",
        phone: " + 1 718 - 555 - 6789",
        businessType: "Catering",
        location: "Brooklyn, New York",
        status: "suspended",
        rating: 3.5,
        totalReviews: 12,
        halalCertified: false,
        registeredDate: "2024-06 - 20",
        lastLogin: "2025-07 - 10T09: 15:00Z",
        deliveryTime: "40 - 50 mins",
        distance: 3.2,
        categories: ["Myanmar Fusion", "Catering"],
        coverImage: "https://tse1.mm.bing.net/th/id/OIP.lNOm-JDoVfdpu2fNkDRzzgHaJ2?rs=1&pid=ImgDetMain",
        actions: {
            viewProfile: " / admin / vendors / 2",
            suspend: false,
            delete: true,
            edit: true
        },
        joinedAt: ""
    }
];

export default function VendorsPage() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const columns = useMemo<ColumnDef<Vendor>[]>(() => [
        {
            accessorKey: 'coverImage',
            header: 'Logo',
            cell: info => (
                <img
                    src={info.getValue() as string}
                    alt="logo"
                    className="w-10 h-10 object-cover rounded"
                />
            ),
        },
        {
            accessorKey: 'businessName',
            header: 'Business Name',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'ownerName',
            header: 'Owner',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => {
                const value = info.getValue() as Vendor['status'];
                const color =
                    value === 'active'
                        ? 'bg-green-100 text-green-800'
                        : value === 'suspended'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800';
                return (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: 'rating',
            header: 'Rating',
            cell: info => `${info.getValue()} ★`,
        },
        {
            accessorKey: 'totalReviews',
            header: 'Reviews',
            cell: info => `${info.getValue()} reviews`,
        },
        {
            accessorKey: 'halalCertified',
            header: 'Halal',
            cell: info => (info.getValue() ? '✅' : '❌'),
        },
        {
            accessorKey: 'registeredDate',
            header: 'Registered',
            cell: info => new Date(info.getValue() as string).toLocaleDateString(),
        },
        {
            accessorKey: 'lastLogin',
            header: 'Last Login',
            cell: info =>
                new Date(info.getValue() as string).toLocaleString(undefined, {
                    hour12: false,
                }),
        },
        {
            accessorKey: 'distance',
            header: 'Distance (km)',
            cell: info => `${info.getValue()} km`,
        },
        {
            accessorKey: 'deliveryTime',
            header: 'Delivery Time',
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'categories',
            header: 'Categories',
            cell: info => (info.getValue() as string[]).join(', '),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const { actions } = row.original;
                return (
                    <div className="flex gap-2 flex-wrap text-xs">
                        <a href={actions.viewProfile} className="text-blue-600 underline">
                            View
                        </a>
                        {actions.edit && (
                            <button className="text-green-600 hover:underline">Edit</button>
                        )}
                        {actions.suspend && (
                            <button className="text-yellow-600 hover:underline">Suspend</button>
                        )}
                        {actions.delete && (
                            <button className="text-red-600 hover:underline">Delete</button>
                        )}
                    </div>
                );
            },
        },
    ], []);

    return (
        <div className="px-6 py-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Vendors</h1>
                <div className="w-auto">
                    <VendorFilterDrawer onApply={(filters) => {
                        console.log("Applied Filters:", filters);
                        // In real case: fetch filtered vendor list via API and set it via useState
                        // For now: just log or mock the effect
                    }} />
                </div>
            </div>
            <DataTable
                searchAble={true}
                columns={columns}
                data={mockData}
                total={mockData.length}
                pageSize={pageSize}
                pageIndex={pageIndex}
                onPaginationChange={(newPageIndex, newPageSize) => {
                    setPageIndex(newPageIndex);
                    setPageSize(newPageSize);
                }}
            />
        </div>
    );
}
