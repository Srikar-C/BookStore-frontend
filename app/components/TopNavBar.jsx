"use client"
import { useState } from "react";
import { useAppContext } from "../hooks/AppContext";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

export default function TopNavBar() {

    const { search, setSearch, setCurrentPage } = useAppContext();

    const [searchText, setSearchText] = useState(search);

    console.log(search, search.length);

    return (
        <div className="top flex items-center gap-3 justify-between bg-[color:var(--background)] px-5 py-3 w-full rounded-lg">
            <div className="left">
                <h2 className="text-2xl font-semibold">Welcome Back!</h2>
            </div>
            <div className="right flex gap-2 items-center justify-between px-3 py-1 mr-20 w-75 shadow-md bg-(--section-hover) rounded-xl">
                <FaSearch className="text-xl" />
                <input type="text" className="text-xs p-2 w-full border-none outline-none" placeholder="Search By Title and Enter" value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setCurrentPage(0);
                            setSearch(searchText);
                        }
                    }} />
                <RxCross2 className={`text-xl cursor-pointer ${searchText.length > 0 ? "opacity-100" : "opacity-0"}`} onClick={() => {
                    setSearch("");
                    setCurrentPage(0);
                    setSearchText("");
                }} />
            </div>
        </div>
    )
}