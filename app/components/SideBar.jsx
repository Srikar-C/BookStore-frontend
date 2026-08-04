"use client"

import Avatar from "@mui/material/Avatar";
import { useAppContext } from "../hooks/AppContext"
import { useParams, usePathname, useRouter } from "next/navigation";
import { MdFeedback, MdOutlineSpaceDashboard } from "react-icons/md";
import { RiProfileLine, RiSettingsFill } from "react-icons/ri";
import { FaBook, FaShoppingCart, FaUsers } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Section } from "../utils/FunctionaliUtils";
import { logout } from "../utils/userUtils";
import { LuBadgeHelp } from "react-icons/lu";
import { useEffect } from "react";

export default function SideBar() {

    const { user, resetContext, cartCount, setCartCount, cartItems } = useAppContext();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        setCartCount(cartItems.length);
    }, [cartItems, setCartCount]);

    if (user == null) {
        router.replace("/user/login");
        return;
    }

    async function handleLogout() {
        await logout(router, resetContext);
    }

    function addNewBook() {
        router.push("/bookstore/new");
    }

    function handleBook() {
        router.push("/bookstore");
    }

    function handleCart() {
        router.push("/bookstore/carts");
    }

    function handleOrder() {
        router.push("/bookstore/orders");
    }

    return (
        <div className="main flex flex-col gap-3 py-4 px-3 bg-[color:var(--background)] rounded-xl w-full h-full relative">
            <div className="user flex gap-2 items-center mb-5">
                <div className="logo flex">
                    <Avatar sx={{
                        bgcolor: "var(--input-icon)",
                        color: "white",
                    }}>{user.name.substring(0, 2).toUpperCase()}</Avatar>
                </div>
                <div className="dtls flex flex-col gap-0 items-center">
                    <h4 className="tracking-[0.1em]">{user.name.toUpperCase()}</h4>
                    <p className="text-xs text-slate-500">{user.role}</p>
                </div>
            </div>
            <hr className="text-[color:var(--hr)]" />
            <div className="sections flex flex-col gap-4">
                <section className="flex flex-col gap-3">
                    <h3 className="text-sm text-slate-500">MAIN</h3>
                    <Section icon={<MdOutlineSpaceDashboard />} text="Dashboard" click={handleBook} path="/bookstore" url={pathName} />
                </section>
                <hr className="text-[color:var(--hr)]" />
                <section className="flex flex-col gap-3">
                    <h3 className="text-sm text-slate-500">SETTINGS</h3>
                    {user.role == "USER" ?
                        <Section icon={<RiSettingsFill />} text="Orders" click={handleOrder} path="/bookstore/orders" url={pathName} /> :
                        <Section icon={<FaUsers />} text="Users" path="/bookstore/users" url={pathName} />}
                    <Section icon={<FaShoppingCart />} text="Carts" path="/bookstore/carts" click={handleCart} url={pathName} count={cartCount} />
                    <Section icon={<RiProfileLine />} text="Profile" path="/bookstore/profile" url={pathName} />
                </section>
                <hr className="text-[color:var(--hr)]" />
                {user.role == "ADMIN" &&
                    <section className="flex flex-col gap-3 mt-auto">
                        <h3 className="text-sm text-slate-500">MANAGEMENT</h3>
                        <Section icon={<FaBook />} text="Add New Book" click={addNewBook} path="/bookstore/new" url={pathName} />
                    </section>}
                <section className="flex flex-col gap-3">
                    <h3 className="text-sm text-slate-500">SUPPORT</h3>
                    <Section icon={<MdFeedback />} text="Suggestions" path="/bookstore/suggestions" url={pathName} />
                    <Section icon={<LuBadgeHelp />} text="Help" path="/bookstore/help" url={pathName} />
                </section>
            </div>
            {user.role == "ADMIN" && <hr className="text-[color:var(--hr)]" />}
            <section className="flex flex-col gap-3 mt-auto">
                <hr className="text-[color:var(--hr)]" />
                <Section icon={<IoMdLogOut />} text="Logout" click={handleLogout} path="/logout" url={pathName} />
            </section>
        </div>
    )
}