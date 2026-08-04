"use client"

import PaymentPreview from "@/app/components/PaymentPreview";
import { useAppContext } from "@/app/hooks/AppContext"
import useFetch from "@/app/hooks/useFetch";
import { formattedDate, getDeliveryDate } from "@/app/utils/helper";
import { showSuccess } from "@/app/utils/showToasts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeliveryDtls() {

    const { carts, cartItems, books, user, initialize } = useAppContext();

    const [edit, setEdit] = useState(false);
    const [date, setDate] = useState(null);
    const router = useRouter();
    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
        display_name: "",
    });

    if (!user || !carts || books.length === 0 || cartItems.length === 0) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            setLocation((prev) => ({
                ...prev,
                latitude: latitude,
                longitude: longitude,
            }))
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            const data = await response.json();

            console.log(data);
            setLocation((prev) => ({
                ...prev,
                display_name: data.display_name
            }))
        });
    }, []);

    const orders = {
        cartId: carts?._id,
        userId: carts?.userId,
        books: carts?.books.filter(item => item.count > 0)
            .map((item) => {
                const book = cartItems.find(b => b.id == item.bookId);
                return {
                    bookId: item.bookId,
                    quantity: book.quantity,
                    price: book.price,
                    count: item.count
                }
            }),
        location: location,
        deliveryby: date
    };

    const orderedBooks = orders?.books.map((item) => {
        const book = books?.find((b) => b.id === item.bookId);
        return {
            bookId: item.bookId,
            url: book.url,
            bookName: book.title,
            bookCount: item.count,
            bookPrice: book.price,
        }
    });

    useEffect(() => {
        if (orderedBooks.length > 0) {
            getDeliveryDate(setDate, orderedBooks);
        }
    }, [orderedBooks.length]);
    const previewOrders = orderedBooks.slice(0, 4);

    function handleAddress() {
        if (edit) {
            setEdit(false);
            setLocation((prev) => ({
                ...prev
            }));
        }
        else {
            setEdit(true);
        }
    }

    async function handleOrder() {
        const response = await useFetch("post", process.env.NEXT_PUBLIC_API_Order, process.env.NEXT_PUBLIC_MAPPING_Order, "checkout", { orders }, false);
        console.log("book details: ", response.data);
        const orderResponse = response.data;
        if (orderResponse.success) {
            showSuccess(orderResponse.message);
            router.replace("/bookstore");
        }
        initialize();
    }

    return (
        <div className="overflow-auto relative flex">
            <div className="box flex flex-col gap-5 w-[40vw] m-10">
                <div className="orders flex gap-2 border-2 border-[color:var(--foreground)] p-4  rounded-2xl">
                    {previewOrders.map((item) => {
                        return (
                            <div key={item.bookId} className="h-27.5 w-27.5">
                                <img src={item.url} className="h-full w-full rounded-xl object-cover" />
                            </div>
                        )
                    })}
                    {orderedBooks.length > 4 && (
                        <div className="flex h-27.5 w-27.5 flex-col items-center justify-center rounded-xl bg-gray-200 text-gray-700">
                            <span className="text-3xl font-bold">+{orderedBooks.length - 4}</span>
                            <span className="text-sm">more</span>
                        </div>
                    )}
                </div>
                <div className="editcart flex items-center gap-3">
                    <p>Want to edit your cart? </p>
                    <span className="text-[color:var(--foreground)] hover:text-[color:var(--background)] hover:bg-[color:var(--foreground)] border-2 
                border-[color:var(--foreground)] w-fit p-2 rounded-2xl cursor-pointer font-semibold" onClick={() => {
                            router.push("/bookstore/carts");
                        }}>Edit Cart</span>
                </div>
                <div className="delivery dtls border-2 border-[color:var(--foreground)] p-2 rounded-2xl gap-5 flex flex-col">
                    <h3 className="text-2xl font-semibold">Order Delivery Details</h3>
                    <div className="grid grid-flow-row grid-cols-[180px_1fr] gap-3 *:p-1 p-2 items-center ">
                        <span className="font-semibold text-start">UserId</span>
                        <span className="bg-gray-300 text-black">{user.id}</span>
                        <span className="font-semibold text-start">Name</span>
                        <span className="bg-gray-300 text-black">{user.name}</span>
                        <span className="font-semibold text-start">Delivery By</span>
                        <span className="bg-gray-300 text-black">{formattedDate(date)}</span>
                        <span className="font-semibold text-start">Delivery Address</span>
                        {edit ? <input className="border-2 border-[color:var(--foreground)] outline-none" type="text" value={location.display_name} onChange={(e) => {
                            setLocation((prev) => ({
                                ...prev,
                                display_name: e.target.value,
                            }))
                        }} /> : <span className="bg-gray-300 text-black">{location.display_name}</span>}
                    </div>
                    <div className="btns flex items-center justify-around *:font-semibold *:cursor-pointer">
                        <button className="p-2 rounded-xl border-2 border-[color:var(--foreground)] text-[color:var(--foreground)] hover:text-[color:var(--background)] hover:bg-[color:var(--foreground)]"
                            onClick={handleAddress}
                        >{edit ? "Save Address" : "Edit Address"}</button>
                        <button className="p-2 rounded-xl border-2 text-[#fff] bg-[#2c6727] hover:text-[#2c6727] hover:bg-[#fff]"
                            onClick={handleOrder}
                        >Proceed to Order</button>
                    </div>
                </div>
            </div>
            <div className="right-payment fixed top-20 right-20 w-[45vw] rounded-xl border-2 border-[color:var(--foreground)]  bg-[color:var(--order)] h-fit p-5 shadow-md">
                <PaymentPreview data={orderedBooks} />
            </div>
        </div >
    )
}