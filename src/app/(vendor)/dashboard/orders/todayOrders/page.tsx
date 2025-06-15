'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useGetEndpointQuery } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';
import StatusBadge from '@/components/ui/statusBadge/StatusBadge';
import { useRouter } from 'next/navigation';

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

const TodayOrders = () => {
    const router = useRouter();

    const { data: orders = [], isLoading, refetch } = useGetEndpointQuery(endpoints.orders);
    useEffect(() => {
        console.log("orders", orders)
    }, [orders])


    return (
        <div className="px-4 py-6 bg-gray-50 rounded-lg shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Today’s Orders</h1>

            <div className="space-y-4">
                {orders.map((order: OrderSummary) => (
                    <div
                        onClick={() => router.push(`orders/${order.id}`)}
                        key={order.id}
                        className="bg-white hover:bg-primary/10 cursor-pointer p-5 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-gray-300 last:border-0"
                    >
                        <div className="space-y-1 text-sm text-gray-700">
                            <p className="text-base font-semibold text-gray-900">{order.orderID}</p>
                            <p>Customer: <span className="font-medium">{order.customerName}</span></p>
                            <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                            <p>Status: <StatusBadge status={order.status} /> </p>
                            <p>Type: {order.orderType}</p>

                            {order.orderType === 'delivery' && order.deliveryAddress && (
                                <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                                    <p>Address: {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                                    <p>Phone: {order.deliveryAddress.phone}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 sm:mt-0 sm:text-right space-y-2">
                            <p className="text-lg font-bold text-primary">${order.totalAmount.toFixed(2)}</p>
                            {/* <Link
                                href={`orders/${order.id}`}
                                className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition"
                            >
                                View Details
                            </Link> */}
                        </div>
                    </div>
                ))}
            </div>
        </div >

    );
};

export default TodayOrders;
