"use client"
import { useBookStore } from "@/store/useBookStore"
import { useEffect } from "react";

export default function Books() {

    const { books, getBooks } = useBookStore();
    useEffect(() => {
        getBooks();
    }, []);

    console.log(books);

    return (
        <div>Hello</div>
    )
}