// components/restaurant/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menuItems = [
    { label: "Dashboard", href: "/(restaurant)" },
    { label: "Menu", href: "/(restaurant)/menu" },
    { label: "Items", href: "/(restaurant)/items" },
    { label: "Coupons", href: "/(restaurant)/coupons" },
    { label: "Analytics", href: "/(restaurant)/analytics" },
    { label: "Settings", href: "/(restaurant)/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-white shadow-md p-6">
            <h2 className="text-2xl font-bold mb-8 text-green-600">Restaurant</h2>
            <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "text-gray-700 hover:text-green-600 hover:font-semibold",
                            pathname === item.href && "text-green-600 font-semibold"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
