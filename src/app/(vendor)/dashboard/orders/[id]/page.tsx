'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface VariantItem {
    label: string;
    price: number;
}

interface OrderItem {
    id: number;
    title: string;
    basePrice: number;
    quantity: number;
    variants: {
        title: string;
        selected: VariantItem;
    }[];
    image: string;
}

interface OrderDetail {
    id: string;
    customerName: string;
    orderDate: string;
    status: string;
    items: OrderItem[];
}

const OrderDetailPage = () => {
    const params = useParams();
    const id = params.id as string;

    const [order, setOrder] = useState<OrderDetail | null>(null);

    useEffect(() => {
        if (id) {
            // Mocked data (replace with real API fetch)
            const mockData: OrderDetail = {
                id,
                customerName: 'John Doe',
                orderDate: '2025-06-14T12:34:00Z',
                status: 'Pending',
                items: [
                    {
                        id: 1,
                        title: 'Beef Burger',
                        basePrice: 8.5,
                        quantity: 2,
                        image: 'https://th.bing.com/th/id/OIP.g_EYshV4TBrKFonMmN2KEgHaE7?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
                        variants: [
                            {
                                title: 'Size',
                                selected: { label: 'Large', price: 2 },
                            },
                            {
                                title: 'Add-ons',
                                selected: { label: 'Cheese', price: 1 },
                            },
                        ],
                    },
                    {
                        id: 2,
                        title: 'Beef Pizza',
                        basePrice: 8.5,
                        quantity: 2,
                        image: 'https://th.bing.com/th/id/OIP.Yn-FB-HTuWvEKS2tqTYyzgHaE8?w=252&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
                        variants: [
                            {
                                title: 'Size',
                                selected: { label: 'Large', price: 2 },
                            },
                            {
                                title: 'Add-ons',
                                selected: { label: 'Cheese', price: 1 },
                            },
                        ],
                    },
                ],
            };
            setOrder(mockData);
        }
    }, [id]);

    const calculateTotal = () => {
        return order?.items.reduce((total, item) => {
            const variantPrice = item.variants.reduce(
                (vSum, v) => vSum + v.selected.price,
                0
            );
            return total + (item.basePrice + variantPrice) * item.quantity;
        }, 0) ?? 0;
    };

    if (!order) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
            <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
            <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">Status: {order.status}</p>

            <div className="space-y-4">
                {order.items.map((item) => {
                    const variantPrice = item.variants.reduce((sum, v) => sum + v.selected.price, 0);
                    const totalPrice = (item.basePrice + variantPrice) * item.quantity;

                    return (
                        <div key={item.id} className="p-4 border-b border-gray-300 last:border-b-0 flex gap-4 items-start">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg">{item.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Base Price: ${item.basePrice.toFixed(2)} × {item.quantity}
                                </p>
                                {item.variants.map((variant, index) => (
                                    <p key={index} className="text-sm text-gray-600">
                                        {variant.title}: {variant.selected.label} (+${variant.selected.price.toFixed(2)})
                                    </p>
                                ))}
                                <p className="mt-1 font-bold">Item Total: ${totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 border-t pt-4">
                <p className="text-lg font-bold text-right">
                    Total: ${calculateTotal().toFixed(2)}
                </p>
            </div>

            <div className="mt-4 flex gap-4 justify-end">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Mark as Completed
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Cancel Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetailPage;
