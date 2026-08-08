"use client"
import { useBookStore } from "@/store/useBookStore"
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

export default function Temp() {

    const { books, getBooks } = useBookStore();
    const { user, getCurrentUser } = useUserStore();

    useEffect(() => {
        getBooks();
        getCurrentUser();
    }, []);

    console.log(books);

    const [book, setBook] = useState([]);
    useEffect(() => {
        if (books.length > 0) {
            setBook(books?.[0]);
        }
    }, [books]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 p-10">
            {books.map((item) => (
                <div className="container relative max-w-[300px] group overflow-hidden cursor-pointer border-2 border-white rounded-xl">
                    <div className="card border-2 h-[350px] w-full overflow-hidden rounded-xl">
                        {/* <div className="card w-full h-full group-hover:scale:105"> */}
                        <img src={item.url} alt="hi" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        {/* </div> */}
                    </div>
                    <div className="absolute bottom-0 left-0 bg-gradient-to-b p-5 from-transparent via-black/40 to-[#000000] w-full overflow-hidden z-10 transition-opacity">
                        <div className="text-xl font-semibold capitalize text-white">
                            {item.title}
                        </div>
                    </div>
                    <div className="context absolute inset-0 translate-y-full flex flex-col gap-1 h-full w-full backdrop-blur-sm justify-between bg-black/80 text-white group-hover:translate-y-0 z-10 transition-transform p-10 duration-400">
                        <h5 className="text-2xl font-semibold capitalize">{item.title}</h5>
                        <div className="flex-1 overflow-hidden">
                            <p className="line-clamp-3 text-md">
                                {item.description}
                            </p>
                            <button className="mt-2 text-sm font-semibold underline">
                                Read more
                            </button>
                        </div>
                        {user == null && <Link href="/user/login" className={`"cursor-pointer" w-full lg:w-full
                            text-white px-3 py-1 justify-center mx-auto my-6 flex items-center gap-3 rounded-full bg-[#2563eb] hover:bg-[#60a5fa] font-semibold`}
                        >Login to Explore</Link>}
                        <div className="mb-3 flex justify-between gap-2">

                            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold">
                                ₹ {item.price}
                            </span>

                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold">
                                Stock : {item.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        // <>
        /* {books.map((item) => (
            <Card key={item.id} className="max-w-sm m-2 hover:scale-105 cursor-pointer h-[300px] flex flex-col justify-around" imgSrc={item.url} horizontal>
                <div className="context flex flex-col gap-1">
                    <h5 className="font-semibold text-3xl capitalize">{item?.title}</h5>
                    <p className="text-sm">{item.description}</p>
                    </div>
                    <div className="other flex justify-between ">
                    <span>{item.price}</span>
                    <span>{item.quantity}</span>
                </div>
            </Card>
        ))} */
        // </>
    )
}