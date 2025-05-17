// app/(customer)/layout.tsx
import React from "react";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/customer/Footer";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
