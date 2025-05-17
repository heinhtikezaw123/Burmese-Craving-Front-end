// components/restaurant/TopNav.tsx
"use client";

import Image from "next/image";

export default function TopNav() {
    return (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">Hello, Admin</span>
                <Image
                    src="/assets/avatar.png"
                    alt="Admin Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            </div>
        </header>
    );
}
