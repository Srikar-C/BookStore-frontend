"use client";

import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { useAppContext } from "../hooks/AppContext";
import { getDeliveryStatus } from "../utils/helper";

export default function OrderCard({ order, books }) {

    const router = useRouter();
    const { setSelectedOrder, setSelectedOrderBooks } = useAppContext();

    const orderedBooks = order.books.map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        return {
            bookId: item.bookId,
            bookName: book.title,
            url: book.url,
            count: item.count,
        }
    });
    const previewOrders = orderedBooks.slice(0, 3);

    function handleOrderInvoice() {
        setSelectedOrder(order);
        setSelectedOrderBooks(orderedBooks);
        router.push(`/bookstore/orderInvoice/${order._id}`);
    }

    const status = getDeliveryStatus(order?.deliveryDate || "");

    return (
        <div className="w-[90%] border-2 border-[color:var(--foreground)] rounded-xl p-4 cursor-pointer group shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300" onClick={handleOrderInvoice}>
            <div className="mb-4 flex items-center gap-4">
                <p className="text-sm text-gray-500">Order ID</p>
                <h3 className="text-lg font-semibold">{order._id}</h3>
            </div>
            <div className="box flex gap-2 items-center justify-between">
                <div className="flex items-center gap-3">
                    {previewOrders.map((item) => {
                        return (
                            <div key={item.bookId} className="h-28 w-24">
                                <img src={item.url} className="h-full w-full rounded-xl object-cover shadow-sm" />
                            </div>
                        )
                    })}
                    {orderedBooks.length > 3 && (
                        <div className="flex h-28 w-24 flex-col items-center justify-center rounded-xl bg-gray-200 text-gray-700">
                            <span className="text-3xl font-bold">+{orderedBooks.length - 3}</span>
                            <span className="text-sm">more</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                        {status.icon}
                        <h2 className={`text-3xl font-medium ${status.color}`}>
                            {status.text}
                        </h2>
                    </div>
                    <p className="mt-2 text-gray-500">
                        Delivery by {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                    <p className="text-sm text-gray-400">
                        {orderedBooks.length} item{orderedBooks.length > 1 ? "s" : ""}
                    </p>
                </div>
                <GoArrowRight className="text-5xl group-hover:-translate-x-3 transition-transform duration-300" />
            </div>
        </div>
    )
}