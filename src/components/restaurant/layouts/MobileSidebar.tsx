// components/layouts/MobileSidebar.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeSidebar } from "@/store/slices/sidebarSlice";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    return (
        <div
            className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } md:hidden`}
            onClick={() => dispatch(closeSidebar())}
        >
            <div
                className={`w-64 h-full bg-primary text-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-200"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <Sidebar />
            </div>
        </div>
    );
}
