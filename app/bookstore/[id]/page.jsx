"use client";

import InputBox from "@/app/components/InputBox";
import { useAppContext } from "@/app/hooks/AppContext";
import useFetch from "@/app/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaLink } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline, MdOutlineDescription, MdSubtitles } from "react-icons/md";


export default function AddBook() {

    const { id } = useParams();
    const isNew = id == "new";
    const [spin, setSpin] = useState(false);
    const isSubmit = useRef(false);
    const { user, initialize, category } = useAppContext();
    const router = useRouter();

    const [book, setBook] = useState({
        id: user.id,
        title: "",
        author: "",
        description: "",
        url: "",
        price: "",
        quantity: "",
        category: "",
    });

    const [error, setError] = useState({
        titleError: "",
        authorError: "",
        descriptionError: "",
        urlError: "",
        priceError: "",
        quantityError: "",
    })

    const [color, setColor] = useState({
        titleColor: "text-red-400",
        authorColor: "text-red-400",
        descriptionColor: "text-red-400",
        urlColor: "text-red-400",
        priceColor: "text-red-400",
        quantityColor: "text-red-400",
    })

    async function getBook() {
        const bookResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, id, "", false);
        const bookResult = bookResponse.data;
        console.log("edit book: ", bookResult.object);
        const b = bookResult.object;
        setBook((prev) => ({
            ...prev,
            id: user.id,
            title: b.title,
            author: b.author,
            description: b.description,
            url: b.url,
            price: b.price,
            quantity: b.quantity,
            category: b.category,
        }))
    }

    useEffect(() => {
        if (!isNew) {
            getBook();
        }
    }, [id]);

    async function handleBook() {
        if (isSubmit.current) return;
        setSpin(true);
        isSubmit.current = true;
        console.log("book dtls: ", book);
        const bookResponse = !isNew ?
            await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, id, book, false) :
            await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, "book", book, false);
        const bookResult = bookResponse;
        console.log(bookResult);
        router.replace("/bookstore");
        initialize();
        setSpin(false);
        isSubmit.current = false;
    }

    return (
        <div className="bookform w-85 h-140 backdrop-blur-2xl bg-[color:val(--background)] absolute left-1/2 top-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col p-6 rounded-lg shadow-sm shadow-[color:var(--foreground)]">
            <div className="inputs flex flex-col gap-2 items-center space-y-1 *:w-full">
                <h1 className="heading font-semibold text-2xl text-[color:var(--heading)] text-center uppercase tracking-wider my-3">
                    {isNew ? "Add New Book" : "Edit Book"}
                </h1>
                <InputBox classid="title" field="title" icon={<MdSubtitles />} value={book.title} object={book} setObject={setBook} type="text" placeholder="Enter Title" spin={spin} error={error.titleError} color={color.titleColor} />
                <InputBox classid="author" field="author" icon={<MdDriveFileRenameOutline />} value={book.author} object={book} setObject={setBook} type="text" placeholder="Enter Author" spin={spin} error={error.authorError} color={color.authorColor} />
                <InputBox classid="description" field="description" icon={<MdOutlineDescription />} value={book.description} object={book} setObject={setBook} type="text" placeholder="Enter Description" spin={spin} error={error.descriptionError} color={color.descriptionColor} />
                <InputBox classid="url" field="url" icon={<FaLink />} value={book.url} object={book} setObject={setBook} type="text" placeholder="Enter URL" spin={spin} error={error.urlError} color={color.urlColor} />
                <InputBox classid="price" field="price" icon={<IoPricetagsOutline />} value={book.price} object={book} setObject={setBook} type="number" spin={spin} placeholder="Enter Price" error={error.priceError} color={color.priceColor} />
                <InputBox classid="quantity" field="quantity" icon={<AiOutlineStock />} value={book.quantity} object={book} setObject={setBook} type="number" placeholder="Enter Quantity" spin={spin} error={error.quantityError} color={color.quantityColor} />
                <InputBox classid="category" field="category" icon={<BiCategory />} value={book.category} object={book} setObject={setBook} type="text" placeholder="Enter Category" spin={spin} error={error.quantityError} color={color.quantityColor} />
                <button className="cursor-pointer bg-[color:var(--foreground)] hover:bg-[color:var(--background)] text-[color:var(--background)] hover:text-[color:var(--textground)] hover:shadow-xs hover:shadow-[color:var(--foreground)] py-2 rounded-2xl" onClick={handleBook} >
                    {isNew ? "Add New Book" : "Edit Book"}
                </button>
            </div>
        </div>
    )
}