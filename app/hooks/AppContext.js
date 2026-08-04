"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useFetch from "./useFetch";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [carts, setCarts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderBooks, setSelectedOrderBooks] = useState(null);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 8;

    async function initialize() {
        setLoadingUser(true);
        setBooks([]);
        setCategory([]);
        setCartItems([]);
        setCartCount(0);

        try {
            const userResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "auth", "", true);
            const userResult = userResponse?.data;
            if (!userResult?.success) {
                setLoadingUser(false);
                return;
            }
            setUser(userResult.object);

            const cartResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Cart, process.env.NEXT_PUBLIC_MAPPING_Cart, userResult.object.id, "", false);
            const cartResult = cartResponse?.data;
            if (cartResult?.success) {
                setCarts(cartResult.object);
            }

            const cartBooks = cartResult?.object?.books || [];
            const bookResponse = await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, `?page=${currentPage}&size=${pageSize}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(selectedCategory)}`, { books: cartBooks }, false);
            const bookResult = bookResponse?.data;
            if (bookResult?.success) {
                const freshBooks = bookResult.object.content || [];
                const items = freshBooks.filter(book => book.count > 0);
                setBooks(freshBooks);
                setTotalPages(bookResult.object.totalPages || 0);
                setCartItems(items);
                setCartCount(items.length);
            }

            const categoryResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, "category", "", false);
            const categoryResult = categoryResponse?.data;
            if (categoryResult?.success) {
                const cats = categoryResult.object;
                const categories = ["All", ...cats];
                setCategory(categories);
            }
        } catch (error) {
            console.error("Failed to initialize bookstore data", error);
        } finally {
            setLoadingUser(false);
        }
    }

    useEffect(() => {
        initialize();
    }, [currentPage, search, selectedCategory]);

    function resetContext() {
        setUser(null);
        setLoadingUser(true);
        setSearch("");
        setBooks([]);
        setCarts(null);
        setCartItems([]);
        setCartCount(0);
        setSelectedOrder(null);
        setSelectedOrderBooks([]);
        setCurrentPage(0);
        setTotalPages(0);
    }

    return (
        <AppContext.Provider value={{
            user, setUser, search, setSearch, books, setBooks, loadingUser, carts,
            setCarts, cartItems, setCartItems, initialize, cartCount, setCartCount, selectedOrder, setSelectedOrder,
            selectedOrderBooks, setSelectedOrderBooks, resetContext, category, setCategory, selectedCategory, setSelectedCategory,
            currentPage, setCurrentPage, totalPages, setTotalPages
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}