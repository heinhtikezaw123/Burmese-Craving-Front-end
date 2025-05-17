// app/(restaurant)/layout.tsx
import React from "react";
import Sidebar from "@/components/restaurant/Sidebar";
import TopNav from "@/components/restaurant/TopNav";

export default function RestaurantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* Top Nav */}
                <TopNav />

                {/* Page Content */}
                <main className="flex-1 p-4 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}
