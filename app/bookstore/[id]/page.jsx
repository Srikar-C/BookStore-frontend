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
    const [loading, setLoading] = useState(false);
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

    const [fieldState, setFieldState] = useState({
        id: {
            message: "",
            kind: "",
        },
        title: {
            message: "",
            kind: "",
        },
        author: {
            message: "",
            kind: "",
        },
        description: {
            message: "",
            kind: "",
        },
        url: {
            message: "",
            kind: "",
        },
        price: {
            message: "",
            kind: "",
        },
        quantity: {
            message: "",
            kind: "",
        },
        category: {
            message: "",
            kind: "",
        },
    });


    function clearFieldState(field) {
        setFieldState(prev => ({
            ...prev,
            [field]: {
                message: "",
                kind: "",
            },
        }));
    }

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
        setLoading(true);
        isSubmit.current = true;
        console.log("book dtls: ", book);

        const saveResponse = !isNew ?
            await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, id, book, false) :
            await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, "book", book, false);
        const saveResult = saveResponse?.data;
        console.log(saveResult);

        if (!saveResult?.success) {
            setLoading(false);
            isSubmit.current = false;
            return;
        }

        await initialize();
        router.replace("/bookstore");
        setLoading(false);
        isSubmit.current = false;
    }

    return (
        <div className="container bg-[color:var(--background)] w-full h-full rounded-xl flex items-center justify-center">
            <div className="bookform h-140 backdrop-blur-2xl flex flex-col py-2 px-6 rounded-lg shadow-sm shadow-[color:var(--foreground)] w-[70%] gap-3">
                <h1 className="heading font-semibold text-2xl text-[color:var(--heading)] text-center uppercase tracking-wider my-3">
                    {isNew ? "Add New Book" : "Edit Book"}
                </h1>
                <div className="inputs grid grid-cols-1 lg:grid-cols-2 gap-4 items-center space-y-1 ">
                    <InputBox classid="title" field="title" icon={<MdSubtitles />} type="text" value={book.title} setValue={setBook} state={fieldState.title} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="author" field="author" icon={<MdDriveFileRenameOutline />} type="text" value={book.author} setValue={setBook} state={fieldState.author} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="description" field="description" icon={<MdOutlineDescription />} type="text" value={book.description} setValue={setBook} state={fieldState.description} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="url" field="url" icon={<FaLink />} type="text" value={book.url} setValue={setBook} state={fieldState.url} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="price" field="price" icon={<IoPricetagsOutline />} type="number" value={book.price} setValue={setBook} state={fieldState.price} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="quantity" field="quantity" icon={<AiOutlineStock />} type="number" value={book.quantity} setValue={setBook} state={fieldState.quantity} clearFieldState={clearFieldState} loading={loading} />
                    <InputBox classid="category" field="category" icon={<BiCategory />} type="text" value={book.category} setValue={setBook} state={fieldState.category} clearFieldState={clearFieldState} loading={loading} />
                </div>
                <button className="cursor-pointer bg-[color:var(--foreground)] hover:bg-[color:var(--background)] 
                    text-[color:var(--background)] hover:text-[color:var(--textground)] hover:shadow-xs 
                    hover:shadow-[color:var(--foreground)] py-2 rounded-2xl w-[80%] mx-auto" onClick={handleBook} >
                    {isNew ? "Add New Book" : "Edit Book"}
                </button>
            </div>
        </div>
    )
}