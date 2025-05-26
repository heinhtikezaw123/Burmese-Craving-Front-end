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
            <div className="hidden lg:block fixed top-0 left-0 h-screen w-64 z-20">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            <MobileSidebar />

            <div className="lg:pl-64 flex flex-col min-h-screen w-full">
                <TopNav />
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
