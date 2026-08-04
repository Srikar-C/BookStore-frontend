"use client"
import BookCard from "@/app/components/BookCard";
import { useAppContext } from "@/app/hooks/AppContext";
import useFetch from "@/app/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Carts() {

    const router = useRouter();
    const { user, cartItems, carts, initialize, setCarts, loadingUser } = useAppContext();

    console.log("carts: ", cartItems, carts)

    useEffect(() => {
        getCart();
    }, [cartItems])

    async function getCart() {
        const cartResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Cart, process.env.NEXT_PUBLIC_MAPPING_Cart, user.id, "", false);
        const cartResult = cartResponse.data;
        if (cartResult.success) {
            setCarts(cartResult.object);
        }
    }

    async function handleCheckout() {
        router.push("/bookstore/deliveryDtls");
    }

    if (!carts) {
        return (
            <div className="text-gray-400">No Items in Cart</div>
        )
    }

    return (
        <div className="flex flex-col relative overflow-auto h-full w-full bg-[color:var(--background)] rounded-xl">
            <button className="sticky w-fit top-0 just-end m-3 px-3 py-2 rounded-lg font-semibold transition cursor-pointer border-2 border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)] hover:bg-[color:var(--background)] hover:text-[color:var(--foreground)] z-0 " onClick={handleCheckout}>
                Checkout
            </button>
            {loadingUser && !books.length ? (
                <div className="grid grid-cols-3 grid-rows-2 gap-5 h-fit text-[color:var(--input-label)] mx-auto items-center justify-center">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <BookCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="main grid grid-cols-3 grid-rows-2 gap-5 h-fit text-[color:var(--foreground)] mx-auto items-center justify-center">
                    {user && cartItems?.map((item) => (
                        <BookCard key={item.id} book={item} user={user} />
                    ))}
                </div>
            )}

        </div>
    )
}