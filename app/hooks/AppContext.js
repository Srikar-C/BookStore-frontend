"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useFetch from "./useFetch";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [theme, setTheme] = useState(false);
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
        //Get User Details
        const userResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Auth, process.env.NEXT_PUBLIC_MAPPING_Auth, "auth", "", true);
        const userResult = userResponse.data;
        if (!userResult.success) {
            setLoadingUser(false);
            return;
        }
        setUser(userResult.object);
        //Get User Cart
        const cartResponse = await useFetch("get", process.env.NEXT_PUBLIC_API_Cart, process.env.NEXT_PUBLIC_MAPPING_Cart, userResult.object.id, "", false);
        const cartResult = cartResponse.data;
        if (cartResult.success) {
            setCarts(cartResult.object);
        }
        //Get Books as Per User
        console.log(cartResult);
        const books = cartResult.object?.books || [];
        const bookResponse = await useFetch("post", process.env.NEXT_PUBLIC_API_Book, process.env.NEXT_PUBLIC_MAPPING_Book, `?page=${currentPage}&size=${pageSize}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(selectedCategory)}`, { books }, false);
        const bookResult = bookResponse.data;
        if (bookResult.success) {
            setBooks(bookResult.object.content);
            setTotalPages(bookResult.object.totalPages);
        }
        const items = bookResult.object.content.filter(book => book.count > 0);
        setCartItems(items);
        const categories = ["All", ...new Set(bookResult.object.content.map(book => book.category))];
        setCategory(categories);
        console.log("Responses: ", userResult, cartResult, bookResult, categories);
        setLoadingUser(false);
        setCartCount(cartItems.length);
    }

    useEffect(() => {
        initialize();
    }, [currentPage, search, selectedCategory]);

    function resetContext() {
        setUser(null);
        setLoadingUser(true);
        setTheme(false);
        setSearch("");
        setBooks([]);
        setCarts(null);
        setCartItems([]);
        setCartCount(0);
        setSelectedOrder(null);
        setSelectedOrderBooks([]);
    }

    return (
        <AppContext.Provider value={{
            user, setUser, theme, setTheme, search, setSearch, books, setBooks, loadingUser, carts,
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