"use client"
import { useBookStore } from "@/store/useBookStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import TopNavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";
import { useAppContext } from "@/store/AppContext";

export default function BookStoreLayout({ children }) {

    const { user, authLoading, authChecked } = useUserStore();
    const { books, getBooks } = useBookStore();
    const { router } = useAppContext();

    useEffect(() => {
        if (!authLoading && authChecked && user === null) {
            router.replace("/user/login");
        }
    }, [authLoading, authChecked, user, router]);

    useEffect(() => {
        getBooks();
    }, []);

    console.log(user, books);

    return (
        <div className="grid grid-cols-[0.2fr_1fr] grid-rows-[0.1fr_1fr] gap-2 bg-gray-400 py-2 px-2 h-screen w-screen">
            <aside className="row-span-2">
                <SideNavBar />
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