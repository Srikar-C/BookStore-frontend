"use client"
import { useAppContext } from "@/store/AppContext";
import { useUserStore } from "@/store/useUserStore"
import { showInfo } from "@/utils/showToasts";
import { useEffect } from "react";

export default function Bookstore() {

    const { user, authLoading, authChecked } = useUserStore();
    const { router } = useAppContext();

    useEffect(() => {
        if (!authLoading && authChecked && user === null) {
            router.replace("/user/login");
            showInfo("Session expired, Please Login");
            return;
        }
    }, [user, authLoading, authChecked, router]);

    if (!authChecked) {
        return <div className="min-h-screen flex items-center justify-center">Checking session...</div>;
    }

    return <h1>Bookstore</h1>
}