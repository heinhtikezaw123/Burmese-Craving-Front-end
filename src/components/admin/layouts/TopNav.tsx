// components/restaurant/TopNav.tsx
"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { HiOutlineMenu } from "react-icons/hi";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { HiBellAlert } from "react-icons/hi2";
import { useParams, useRouter } from "next/navigation";


export default function TopNav() {
    const dispatch = useDispatch();
    const router = useRouter();
    // const params = useParams();
    // const id = params.id as string;


    return (
        <header className="h-16 bg-white  shadow px-2 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Menu icon (mobile only) */}
                <button onClick={() => dispatch(toggleSidebar())} className="lg:hidden text-2xl text-gray-700">
                    <HiOutlineMenu />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Burmese Craving</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-2xl flex items-center justify-center text-primary pt-1 relative">
                    <HiBellAlert className="" />
                    <div className="w-3 h-3 rounded-full absolute top-1.5 right-1 ">
                        <span className="relative flex size-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                        </span>
                    </div>

                </div>
                <div onClick={() => router.push(`/dashboard/profile`)} className="w-8 h-8 cursor-pointer rounded-full overflow-hidden bg-slate-400">
                    <Image
                        src="/assets/avatar.png"
                        alt="Admin Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
