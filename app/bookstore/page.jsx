"use client";

import BookCard from "../components/BookCard";
import { useAppContext } from "../hooks/AppContext"
import { useMemo } from "react";

export default function BookStoreMain() {

    const { user, books, category, selectedCategory, setSelectedCategory, currentPage, setCurrentPage, totalPages } = useAppContext();

    return (
        <div className="flex flex-col overflow-auto">
            <div className="categories flex gap-3 items-center px-4 py-4 fixed w-full top-15 z-[18] h-16 bg-[color:var(--background)]">
                {category.map((item, index) => (
                    <span key={index} className={`p-1 border-2 border-[color:var(--order)] rounded-xl px-3 py-1 cursor-pointer font-semibold text-[color:var(--foreground)] ${selectedCategory == item ? "bg-gray-300 text-black" : " "} `}
                        onClick={() => {
                            setSelectedCategory(item);
                            setCurrentPage(0);
                        }} >{item}</span>
                ))}
            </div>
            <div className="main h-full text-[color:var(--foreground)] bg-[color:var(--background)] mt-15 p-4 flex flex-wrap items-center gap-8 justify-center">
                {user && books?.map((item) => (
                    <BookCard key={item.id} book={item} user={user} />
                ))}
            </div>
            <div className="flex justify-center gap-4 my-8">
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