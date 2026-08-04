"use client";

import OrderCard from "@/app/components/OrderCard";
import { useAppContext } from "@/app/hooks/AppContext"
import useFetch from "@/app/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Orders() {

    const router = useRouter();
    const { user, loadingUser, books } = useAppContext();
    const [orders, setOrders] = useState([]);

    console.log(user, books);

    useEffect(() => {
        if (loadingUser) return;

        if (!user) {
            router.replace("/login");
            return;
        }
        getOrders();
    }, [loadingUser, user]);

    async function getOrders() {
        console.log("calling getorders");
        const orderResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Order, process.env.NEXT_PUBLIC_MAPPING_Order, user.id, "", false);
        const orderResult = orderResponse.data;
        if (orderResult.success) {
            setOrders(orderResult.object);
        }
    }

    if (loadingUser) {
        return <p>Loading...</p>
    }

    return (
        <div className="orders flex flex-col gap-4">
            <h3 className="text-3xl font-semibold">Your Orders</h3>
            {user && orders?.map((order) => (
                <OrderCard key={order._id} order={order} books={books} />
            ))}
        </div>
    )
}