'use client';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useGetEndpointQuery } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import StatusBadge from '@/components/ui/statusBadge/StatusBadge';

interface OrderSummary {
    id: string;
    orderID: string;
    customerName: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    orderType: 'delivery' | 'pickup';
    deliveryAddress?: {
        street: string;
        city: string;
        phone: string;
    };
}

const groupOrdersByDate = (orders: OrderSummary[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const grouped = {
        today: [] as OrderSummary[],
        yesterday: [] as OrderSummary[],
        earlier: [] as OrderSummary[],
    };

    for (const order of orders) {
        const date = new Date(order.orderDate);
        if (isSameDay(date, today)) {
            grouped.today.push(order);
        } else if (isSameDay(date, yesterday)) {
            grouped.yesterday.push(order);
        } else {
            grouped.earlier.push(order);
        }
    }

    return grouped;
};

const AllOrders = () => {
    const router = useRouter();
    const { data: orders = [], isLoading } = useGetEndpointQuery(endpoints.orders);

    const groupedOrders = useMemo(() => groupOrdersByDate(orders), [orders]);

    const renderOrderCard = (order: OrderSummary) => (
        <div
            onClick={() => router.push(`orders/${order.id}`)}
            key={order.id}
            className="bg-white hover:bg-primary/10 cursor-pointer p-5 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-gray-300 last:border-0"
        >
            <div className="space-y-1 text-sm text-gray-700">
                <p className="text-base font-semibold text-gray-900">{order.orderID}</p>
                <p>Customer: <span className="font-medium">{order.customerName}</span></p>
                <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Status: <StatusBadge status={order.status} /></p>
                {order.orderType === 'delivery' ? (
                    <div>
                        {order.deliveryAddress && (
                            <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                                <p>Deliver to: {order.deliveryAddress?.street}, {order.deliveryAddress?.city}</p>
                                <p>Phone: {order.deliveryAddress.phone}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                        <p>Customer Pickup</p>
                    </div>
                )}
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right space-y-2">
                <p className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );

    return (
        <div className="px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Orders</h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-8">
                    {groupedOrders.today.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3">Today</h2>
                            <div className="space-y-4">
                                {groupedOrders.today.map(renderOrderCard)}
                            </div>
                        </div>
                    )}
                    {groupedOrders.yesterday.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3">Yesterday</h2>
                            <div className="space-y-4">
                                {groupedOrders.yesterday.map(renderOrderCard)}
                            </div>
                        </div>
                    )}
                    {groupedOrders.earlier.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-3">Earlier</h2>
                            <div className="space-y-4">
                                {groupedOrders.earlier.map(renderOrderCard)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllOrders;
