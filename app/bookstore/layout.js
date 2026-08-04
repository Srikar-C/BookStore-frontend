"use client"
import { useRouter } from "next/navigation";
import SideBar from "../components/SideBar";
import TopNavBar from "../components/TopNavBar";
import { useAppContext } from "../hooks/AppContext";

export default function Book({ children }) {

    const { user } = useAppContext();
    const router = useRouter();

    if (user == null) {
        router.replace("/user/login");
        return;
    }

    return (
        <div className="grid grid-cols-[0.2fr_1fr] grid-rows-[0.1fr_1fr] gap-2 bg-gray-400 py-2 px-2 h-screen w-screen">
            <aside className="row-span-2">
                <SideBar />
            </aside>

            <header className="flex items-center">
                <TopNavBar />
            </header>

            <main className="overflow-auto h-full">
                {children}
            </main>
        </div>
    )
}