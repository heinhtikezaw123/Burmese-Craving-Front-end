// StatusBadge.tsx
import React from "react";

interface StatusBadgeProps {
    status: string;
}

const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "placed":
            return "bg-blue-100 text-blue-800";
        case "cooking":
            return "bg-orange-100 text-orange-800";
        case "delivered":
            return "bg-green-100 text-green-800";
        case "cancelled":
            return "bg-gray-200 text-gray-700 line-through";
        case "failed":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const badgeClass = getStatusBadgeClass(status);

    return (
        <span
            className={`px-2 py-0.5 rounded text-xs font-semibold inline-block ${badgeClass}`}
            aria-label={`Order status: ${status}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
