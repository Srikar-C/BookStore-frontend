"use client";

import Link from "next/link";
import Logo from "../assets/Logo";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useAppContext } from "../hooks/AppContext";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FcSettings } from "react-icons/fc";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/useFetch";
import { showError, showSuccess } from "../utils/showToasts";

export default function BookStoreNav() {

    const router = useRouter();
    const { user, search, setSearch, cartItems, cartCount, setCartCount, resetContext, setCurrentPage } = useAppContext();

    const [searchText, setSearchText] = useState(search);

    useEffect(() => {
        setCartCount(cartItems.length);
    }, [cartItems, setCartCount]);

    const [drop, setDrop] = useState(false);

    function handleBook() {
        router.push("/bookstore/new");
    }

    function handleCart() {
        router.push("/bookstore/carts");
        setDrop(false);
    }

    function handleSettings() {
        router.push("/bookstore/settings");
        setDrop(false);
    }
    async function handleLogout() {
        const logoutResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "logout", "", true)
        const logoutResult = logoutResponse.data;
        if (logoutResult.success) {
            resetContext();
            router.replace("/");
            showSuccess(logoutResult.message);
            setDrop(false);
        }
        else {
            showError("Error in logout");
        }
    }

    return (
        <div className="book-navigation fixed w-full bg-[color:var(--background)] z-20">
            <nav className="nav shadow-xs shadow-[color:var(--foreground)] flex justify-between items-center p-2">
                <Link href="/bookstore" className="left">
                    <Logo />
                </Link>
                <nav className="right flex flex-row items-center gap-4">
                    {user?.role == "ADMIN" && <span className="addbook text-[color:var(--background)] hover:text-[color:var(--textground)] p-2 rounded-xl bg-[color:var(--foreground)] hover:bg-[color:var(--background)] hover:shadow-xs hover:shadow-[color:var(--foreground)] cursor-pointer" onClick={handleBook}>Add Book</span>}
                    <div className="search text-black bg-white p-1 rounded-xl flex gap-2 items-center border-2 border-[color:var(--foreground)]">
                        <FaSearch className="text-xl" />
                        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setCurrentPage(0);
                                setSearch(searchText);
                            }
                        }}
                            className="search bg-transparent outline-none border-none items-center" placeholder="Search Title and Click Enter" />
                        <RxCross2 className={`text-xl cursor-pointer ${search.length > 0 ? "opacity-100" : "opacity-0"}`} onClick={() => {
                            setSearch("");
                            setCurrentPage(0);
                        }} />
                    </div>
                    {user?.role == "USER" &&
                        <div className={`cart relative hover:bg-white hover:text-black p-1 rounded-2xl cursor-pointer}`} onClick={handleCart}>
                            <PiShoppingCartSimpleBold className={`text-3xl cursor-pointer`} />
                            {cartCount > 0 &&
                                <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 cursor-pointer`}>{cartCount}</span>
                            }
                        </div>
                    }
                    <nav className="userdrop w-10 flex justify-around" onClick={() => setDrop(!drop)}>
                        <FaRegUserCircle className="text-4xl cursor-pointer" />
                    </nav>
                </nav>
                <nav className={`dropdown absolute right-3 top-[10vh] shadow-inner shadow-[#c3c3c3] p-1 *:p-2 flex flex-col gap-2 items-start *:cursor-pointer transform transition-all duration-300 ease-out ${drop ? 'translate-y-0 opacity-100 pointer-events-auto' : ' -translate-y-16 opacity-0 pointer-events-none'} z-15 bg-[color:var(--background)] text-[color:var(--foreground)] `}>
                    <div className="settings flex gap-3 items-center " onClick={handleSettings}>
                        <FcSettings className="text-xl" />
                        <p>Settings</p>
                    </div>
                    <div className="logout flex gap-3 items-center" onClick={handleLogout}>
                        <IoMdLogOut className="text-xl" />
                        <p>Logout</p>
                    </div>
                </nav>
            </nav>
        </div>
    )
}