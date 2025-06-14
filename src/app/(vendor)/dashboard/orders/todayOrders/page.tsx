'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // or 'next/navigation' if you're using App Router


interface OrderSummary {
    id: string;
    customerName: string;
    orderDate: string; // ISO date string
    status: string;
    totalAmount: number;
}

const TodayOrders = () => {
    // Mock order data for today
    const orders: OrderSummary[] = [
        {
            id: 'ORD12345',
            customerName: 'John Doe',
            orderDate: '2025-06-14T09:30:00Z',
            status: 'Pending',
            totalAmount: 15.99,
        },
        {
            id: 'ORD12346',
            customerName: 'Jane Smith',
            orderDate: '2025-06-14T10:00:00Z',
            status: 'Completed',
            totalAmount: 22.5,
        },
    ];

    return (
        <div className="">
            <h1 className="font-semibold text-xl mb-3">Today Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="p-4 rounded-md flex justify-between items-center bg-white">
                        <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Status: {order.status}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                            <Link href={`orders/${order.id}`} className="mt-2 inline-block px-3 py-1 text-sm bg-primary/90 text-white rounded hover:bg-primary">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayOrders;
