"use client"

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

const AppContext = createContext();

export function AppProvider({ children }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isSubmit = useRef(false);

    const { getCurrentUser } = useUserStore();

    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser]);

    const [dummy, setDummy] = useState(null);

    return (
        <AppContext.Provider value={{
            router, loading, setLoading, isSubmit,
            dummy, setDummy
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}