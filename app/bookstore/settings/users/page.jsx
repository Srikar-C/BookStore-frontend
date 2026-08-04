"use client"

import useFetch from "@/app/hooks/useFetch";
import { useEffect, useState } from "react"

export default function Users() {

    const [userDtls, setUserDtls] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10;

    async function getAllUsers() {
        const response = await useFetch("get", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, `?page=${currentPage}&size=${pageSize}`, "", false);
        const result = response.data;
        console.log(result);
        const dtls = result.object;
        console.log("dtls: ", dtls);
        setUserDtls(dtls.content);
        setTotalPages(dtls.totalPages);
        setCurrentPage(dtls.currentPage);
    }

    useEffect(() => {
        getAllUsers();
    }, [currentPage]);

    return (
        <div className="w-full h-[80vh] flex flex-col">
            <div className="users flex flex-col gap-3 border-2 border-black h-full">
                <div className="head grid grid-flow-col grid-cols-4 gap-2 *:font-semibold items-center text-center border-b-2 border-[color:var(--foreground)] py-1 px-3 uppercase *:w-[150px]">
                    <span>UserId</span>
                    <span>Username</span>
                    <span>Email</span>
                    <span>Phone Number</span>
                </div>
                <div className="body p-4">
                    {userDtls.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-flow-col grid-cols-4 gap-3 items-center text-center border-b border-gray-300 hover:bg-[color:var(--orderhover)] dark:hover:bg-[color:var(--orderbg)] transition-colors *:w-[150px]"
                        >
                            <span className="py-2 text-left px-2 font-medium capitalize">
                                {item.id}
                            </span>
                            <span className="uppercase">{item.name}</span>
                            <span>{item.email}</span>
                            <span>{item.phone}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center gap-4 my-8 h-[5vh] items-center">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="cursor-pointer"
                >
                    Previous
                </button>

                <span>
                    {totalPages > 0 ? currentPage + 1 : currentPage} / {totalPages}
                </span>

                <button
                    disabled={currentPage + 1 >= totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="cursor-pointer"
                >
                    Next
                </button>

            </div>
        </div>
    )
}