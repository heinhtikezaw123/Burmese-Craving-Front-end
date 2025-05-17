// components/customer/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-green-600">
                    Burmese Craving
                </Link>
                <div className="space-x-4">
                    <Link href="/search" className="text-gray-700 hover:text-green-600">
                        Search
                    </Link>
                    <Link href="/profile" className="text-gray-700 hover:text-green-600">
                        Profile
                    </Link>
                    <Link href="/favourite" className="text-gray-700 hover:text-green-600">
                        Favourites
                    </Link>
                </div>
            </div>
        </nav>
    );
}
