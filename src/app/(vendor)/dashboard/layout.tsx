// app/(restaurant)/layout.tsx
import MobileSidebar from "@/components/restaurant/layouts/MobileSidebar";
import Sidebar from "@/components/restaurant/layouts/Sidebar";
import TopNav from "@/components/restaurant/layouts/TopNav";
import React from "react";


export default function RestaurantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            <MobileSidebar />


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
