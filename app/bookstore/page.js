"use client"
import Pagination from "@mui/material/Pagination";
import BookCard from "../components/BookCard";
import { useAppContext } from "../hooks/AppContext";
import BookCardSkeleton from "../components/BookCardSkeleton";
import Skeleton from "@mui/material/Skeleton";

export default function BookStore() {

    const { user, books, category, selectedCategory, setSelectedCategory, currentPage, setCurrentPage, totalPages, loadingUser } = useAppContext();

    const skeletonStyle = {
        bgcolor: "var(--skeleton-bg)",
        "&::after": {
            background:
                "linear-gradient(90deg, transparent, var(--skeleton-wave), transparent)",
        },
    };

    return (
        <div className="flex flex-col overflow-auto h-full w-full bg-[color:var(--background)] rounded-xl">
            <div className="categories sticky top-0 flex gap-3 items-center px-4 py-4 z-[20] w-full bg-[color:var(--background)]">
                {loadingUser ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={100} height={36} sx={skeletonStyle} />
                    ))
                ) :
                    (category.map((item, index) => (
                        <span key={index} className={`p-1 border-2 border-[color:var(--order)] rounded-xl px-3 py-1 cursor-pointer font-semibold text-[color:var(--foreground)] ${selectedCategory == item ? "bg-gray-300 text-black" : " "} `}
                            onClick={() => {
                                setSelectedCategory(item);
                                setCurrentPage(0);
                            }} >{item}</span>
                    )))}
            </div>
            {loadingUser && !books.length ? (
                <div className="grid grid-cols-4 grid-rows-2 gap-5 h-fit text-[color:var(--input-label)] mx-auto items-center justify-center">

                    {Array.from({ length: 8 }).map((_, index) => (
                        <BookCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="main grid grid-cols-4 grid-rows-2 gap-5 h-fit text-[color:var(--foreground)] mx-auto items-center justify-center">
                    {user && books?.map((item) => (
                        <BookCard key={item.id} book={item} user={user} />
                    ))}
                </div>
            )}
            <div className="pagination flex justify-center p-4">
                <Pagination count={Math.max(totalPages, 1)} page={currentPage + 1} color="secondary" shape="rounded" size="large"
                    onChange={(event, page) => {
                        setCurrentPage(page - 1);
                    }}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "var(--foreground)",
                            borderColor: "var(--foreground)",
                        },
                        "& .Mui-selected": {
                            backgroundColor: "var(--input-icon) !important",
                            color: "#fff",
                        },
                    }} />
            </div>
        </div>
    )
}