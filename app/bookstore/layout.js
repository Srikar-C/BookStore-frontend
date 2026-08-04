"use client";

import { useEffect } from "react";
import BookStoreNav from "../components/BookStoreNav";
import { useAppContext } from "../hooks/AppContext";
import { useRouter } from "next/navigation";

export default function BookStore({ children }) {

    const router = useRouter();
    const { user, loadingUser } = useAppContext();

    console.log(user);

    useEffect(() => {
        if (!loadingUser && user == null) {
            router.replace("/login");
        }
    }, [loadingUser, user]);

    if (loadingUser) {
        return <p>Loading...</p>
    }

    if (!user) {
        return null;
    }

    return (
        <div className="main h-screen flex flex-col z-1">
            <BookStoreNav />
            <div className="pt-[10vh] h-full">{children}</div>
        </div>
    )
}