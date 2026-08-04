"use client"

import { useAppContext } from "@/app/hooks/AppContext";
import useFetch from "@/app/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaRegIdCard, FaTruckLoading } from "react-icons/fa";
import { TbArrowBackUp, TbSum } from "react-icons/tb";
import { IoMdListBox, IoMdLocate } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { formattedDate, getDeliveryStatus } from "@/app/utils/helper";
import PaymentPreview from "@/app/components/PaymentPreview";

export default function OrderInvoice() {

    const router = useRouter();
    const { orderId } = useParams();
    const { selectedOrder, setSelectedOrder, selectedOrderBooks, setSelectedOrderBooks, books } = useAppContext();

    console.log("select order: ", selectedOrder, orderId);

    useEffect(() => {
        if (!selectedOrder && books.length > 0) {
            getOrderDtls();
        }
    }, [books]);

    async function getOrderDtls() {
        const orderResponse = await useFetch("post", process.env.NEXT_PUBLIC_API_Order, process.env.NEXT_PUBLIC_MAPPING_Order, "orderId", { orderId }, false);
        const orderResult = orderResponse.data;
        console.log(orderResult);
        const orderedBooks = orderResult.object.books.map((item) => {
            const book = books?.find((b) => b.id === item.bookId);
            return {
                bookId: item.bookId,
                bookName: book.title,
                url: book.url,
                count: item.count,
            }
        });
        setSelectedOrder(orderResult.object);
        setSelectedOrderBooks(orderedBooks);
    }

    if (!selectedOrder || !selectedOrderBooks) {
        return <div>...Loading</div>
    }

    const orderPriceDtls = selectedOrderBooks.map((item) => {
        const book = books?.find((b) => b.id === item.bookId);
        return {
            bookName: book.title,
            bookCount: item.count,
            bookPrice: book.price,
        }
    })

    const status = getDeliveryStatus(selectedOrder.deliveryDate);

    console.log("selectedOrderBooks", selectedOrderBooks);

    return (
        <div className="flex justify-around">
            <div className="left-books flex flex-col gap-10 rounded-2xl w-[50vw]">
                <div className="left-top sticky top-0 left-0 index flex items-center gap-3 justify-between">
                    <div className="top-left flex items-center gap-1 cursor-pointer" onClick={() => { router.replace("/bookstore/settings/orders") }}>
                        <TbArrowBackUp className="text-xl" />
                        <p>Back to Orders</p>
                    </div>
                    <div className="top-right flex items-center gap-3">
                        <FaRegIdCard className="text-3xl" />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-xl font-semibold capitalize">OrderId </p>
                                <p>{selectedOrder._id}</p>
                            </div>
                            <p className="text-gray-500">
                                Placed On {formattedDate(selectedOrder.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="left-bottom books flex gap-6 flex-wrap items-center justify-center">
                    {selectedOrderBooks.map((item) => {
                        return (
                            <div key={item.bookId} className="h-62.5 w-50 relative border-2 border-[color:var(--foreground)] flex flex-col gap-0.5 rounded-xl p-0.5 hover:scale-105">
                                <img src={item.url} className="h-[90%] w-full rounded-t-xl rounded-b-lg object-cover" />
                                <span className="absolute -top-1 -right-2 rounded-full w-7.5 h-7.5 text-center items-center bg-[color:var(--foreground)] text-[color:var(--background)]">{item.count}</span>
                                <p className="h-[10%] text-center">{item.bookName}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="right-payment sticky top-20 right-5 w-[40vw] rounded-xl border-2 border-[color:var(--foreground)]  bg-[color:var(--order)] h-fit px-5 py-2 shadow-md">
                <div className="head flex items-center text-center mx-auto justify-center pb-3">
                    <IoMdListBox className="text-3xl" />
                    <p className="font-semibold text-xl uppercase">Payment Summary</p>
                </div>

                <PaymentPreview data={orderPriceDtls} />


                <div className="foot grid grid-flow-col grid-cols-7 text-start *:font-semibold pt-3">
                    <div className="heading col-span-3 col-start-2 flex items-center gap-0.5">
                        <MdDateRange className="text-xl" />
                        <p>Delivery</p>
                    </div>
                    <span className="col-span-3">{new Date(selectedOrder.deliveryDate).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                </div>

                <div className="foot grid grid-flow-col grid-cols-7 text-start *:font-semibold pt-3">
                    <div className="heading col-span-3 col-start-2 flex items-center gap-0.5">
                        <FaTruckLoading className="text-xl" />
                        <p>Delivery Status</p>
                    </div>
                    <span className="col-span-3 flex items-center gap-1">
                        <p>{status.text}</p>
                        {status.icon}
                    </span>
                </div>

                <div className="foot grid grid-flow-col grid-cols-7 text-start *:font-semibold pt-3">
                    <div className="heading col-span-3 col-start-2 flex items-center gap-0.5">
                        <IoMdLocate className="text-xl" />
                        <p>Address</p>
                    </div>
                    <span className="col-span-3">{selectedOrder.location.display_name}</span>
                </div>

            </div>
        </div >
    )
}