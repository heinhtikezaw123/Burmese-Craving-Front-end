'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetEndpointQuery, useInvalidateEndpointMutation } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';

interface VariantItem {
    label: string;
    price: number;
}

interface OrderItem {
    id: string;
    title: string;
    quantity: number;
    image: string;
    callMe: boolean;
    note: string;
    basePrice: number;
    variants: {
        title: string;
        selected: VariantItem;

    }[];
}

interface DeliveryAddress {
    street: string;
    city: string;
    phone: string;
}

interface OrderDetail {
    id: string;
    orderID: string;
    customerName: string;
    customerPhone: string;
    orderDate: string;
    status: string;
    totalAmount: number;
    orderType: string;
    deliveryAddress: DeliveryAddress | null;
    items: OrderItem[];
}

const statusOptions = ['Pending', 'Placed', 'Cooking', 'Delivered', 'Cancelled', 'Failed'];
const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Placed: 'bg-blue-100 text-blue-800',
    Cooking: 'bg-orange-100 text-orange-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Failed: 'bg-gray-200 text-gray-800',
};

const OrderDetailPage = () => {
    const params = useParams();
    const id = params.id as string;

    const { data, isLoading } = useGetEndpointQuery(`${endpoints.orders}/${id}`);
    const [invalidateEndpoint] = useInvalidateEndpointMutation();
    const [order, setOrder] = useState<OrderDetail | null>(null);

    useEffect(() => {
        if (data) setOrder(data);
    }, [data]);

    const handleStatusChange = async (newStatus: string) => {
        if (!order) return;

        const updated = { ...order, status: newStatus };
        setOrder(updated);
        try {
            await invalidateEndpoint({ endpoint: `${endpoints.orders}/${order.id}`, body: updated }).unwrap();
        } catch (error) {
            alert('Failed to update order status');
        }
    };

    if (isLoading || !order) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-2">Order #{order.orderID}</h1>
            <p className="text-gray-600 text-sm">Customer: {order.customerName} - <i>{order.customerPhone}</i></p>
            <p className="text-gray-600 text-sm">Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="text-gray-600 text-sm capitalize">Type: {order.orderType}</p>


            {/* Status with dropdown */}
            <div className="mt-2 flex items-center gap-2">
                <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                </span>
                <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                >
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Delivery Info */}
            {order.deliveryAddress && (
                <div className="mt-4 bg-gray-50 p-4 rounded border text-sm text-gray-700">
                    <h3 className="font-medium text-gray-900 mb-1">Delivery Address</h3>
                    <p>{order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                    <p>Phone: {order.deliveryAddress.phone}</p>
                </div>
            )}

            {/* Items */}
            <div className="mt-6 space-y-4">
                {order.items.map((item) => {
                    const variantTotal = item.variants.reduce((sum, v) => sum + v.selected.price, 0);
                    const itemTotal = (item.basePrice + variantTotal) * item.quantity;

                    return (
                        <div key={item.id} className="p-4 border-b border-gray-300 last:border-0 flex gap-4">
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    {item.callMe && (
                                        <span className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full">Call Me If Unavailable</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                <p className="text-sm text-gray-500">Base Price: ${item.basePrice.toFixed(2)}</p>

                                {item.variants.map((variant, idx) => (
                                    <p key={idx} className="text-sm text-gray-600">
                                        {variant.title}: {variant.selected.label} (+${variant.selected.price.toFixed(2)})
                                    </p>
                                ))}

                                {item.note && (
                                    <p className="text-sm italic text-gray-400 mt-1">Note: {item.note}</p>
                                )}

                                <p className="mt-1 font-bold text-sm">Item Total: ${itemTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Summary */}
            <div className="mt-6 border-t pt-4 text-right">
                <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderDetailPage;
