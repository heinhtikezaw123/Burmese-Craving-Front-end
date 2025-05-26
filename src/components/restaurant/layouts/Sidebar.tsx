"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // adjust this path as needed
import { useDispatch } from "react-redux";
import { closeSidebar } from "@/store/slices/sidebarSlice";
import { logout } from "@/store/slices/authSlice";

type UserRole = 'superAdmin' | 'vendor';

interface MenuItem {
    label: string;
    path?: string;
    children?: MenuItem[];
}


// Sample role-based menu configuration
const menuByRole: Record<UserRole, MenuItem[]> = {
    superAdmin: [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Cateogries", path: "/dashboard/orders" },
        { label: "Vendors", path: "/dashboard/items" },
        { label: "Customers", path: "/dashboard/items" },
        { label: "Coupons", path: "/dashboard/coupons" },
        { label: "Setting", path: "/dashboard/setting" },
    ],
    vendor: [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Orders", path: "/dashboard/orders" },
        { label: "Items", path: "/dashboard/items" },
        { label: "Menu", path: "/dashboard/menu" },
        { label: "Coupons", path: "/dashboard/coupons" },
        { label: "Setting", path: "/dashboard/setting" },
    ],

};


export default function Sidebar() {
    const dispatch = useDispatch()
    const pathname = usePathname();
    const role: UserRole = useSelector((state: RootState) => state.auth.userData?.role || "vendor");
    const menuItems = menuByRole[role] || [];

    const router = useRouter();


    const handleLinkClick = () => {
        dispatch(closeSidebar());
    };

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/');

    };
    return (
        <aside className="w-64 h-screen shadow-lg flex flex-col bg-white">
            <h2 className="text-xl font-bold p-4 capitalize bg-primary text-white">{role.replace(/([A-Z])/g, ' $1')}</h2>

            {/* Scrollable Menu Area */}
            <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-2">
                {menuItems.map((item, index) =>
                    item.children ? (
                        <div key={index}>
                            <div className="font-semibold px-2 py-1 ">{item.label}</div>
                            <div className="ml-4 flex flex-col gap-1">
                                {item.children
                                    .filter((sub) => sub.path) // only include items with a path
                                    .map((sub) => (
                                        <Link
                                            key={sub.path}
                                            href={sub.path!} // the '!' asserts it's not undefined
                                            className={clsx(
                                                "text-sm hover:bg-primary/20 px-2 py-1 rounded",
                                                pathname === sub.path && "bg-primary/30 font-semibold"
                                            )}
                                            onClick={handleLinkClick}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ) : item.path ? ( // only render Link if item.path exists
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(
                                "hover:bg-primary/20 px-2 py-2 rounded block",
                                pathname === item.path && "bg-primary/30 font-semibold "
                            )}
                            onClick={handleLinkClick}
                        >
                            {item.label}
                        </Link>
                    ) : null // skip rendering if path is undefined
                )}
            </nav>

            {/* Logout at Bottom */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full hover:bg-white/10 hover:cursor-pointer p-2 text-primary border rounded"
                >
                    Logout
                </button>
            </div>
        </aside>

    );
}
