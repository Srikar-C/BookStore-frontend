"use client"

import GradingIcon from '@mui/icons-material/Grading';
import { MdLogout } from 'react-icons/md';
import { RiProfileLine, RiSettingsFill } from "react-icons/ri";
import { useAppContext } from '../hooks/AppContext';
import { useRouter } from 'next/navigation';
import { FaUsers } from 'react-icons/fa';
import { useEffect } from 'react';

export default function SettingsNav() {

    const router = useRouter();
    const { theme, user, loadingUser } = useAppContext();

    useEffect(() => {
        if (!loadingUser && user == null) {
            router.replace("/login");
        }
    }, [loadingUser, user])

    if (loadingUser) {
        return <p>Loading...</p>
    }

    function handleOrders() {
        console.log("clicked");
        router.push("/bookstore/settings/orders")
    }

    function handleProfile() {
        console.log("clicked");
        router.push("/bookstore/settings/profile")
    }

    function handleLogout() {
        console.log("clicked");
        router.push("/")
    }

    function handleOthers() {
        console.log("clicked");
        router.push("/bookstore/settings/others")
    }

    function handleUsers() {
        router.push("/bookstore/settings/users");
    }

    return (
        <div className="settings fixed flex flex-col gap-3 items-center w-[16vw] border-r-2 border-[color:var(--foreground)] h-[90vh] top-[10vh] left-0 ">
            <div className="categories flex flex-col gap-5 items-start w-full *:w-full p-5">
                {user.role == "USER" &&
                    <div className="orders flex gap-2 items-center cursor-pointer px-3 py-2" onClick={handleOrders}>
                        <GradingIcon sx={{ fontSize: "30px" }} />
                        <span className="text-xl">Orders</span>
                    </div>
                }
                {user.role == "ADMIN" &&
                    <div className="orders flex gap-2 items-center cursor-pointer px-3 py-2" onClick={handleUsers}>
                        <FaUsers className="text-3xl" />
                        <span className="text-xl">Users</span>
                    </div>
                }
                <hr className={`${theme ? "text-gray-700" : "text-gray-200"}`} />
                <div className="profile flex gap-2 items-center cursor-pointer px-3 py-2" onClick={handleProfile}>
                    <RiProfileLine className="text-3xl" />
                    <span className="text-xl">Profile</span>
                </div>
                <hr className={`${theme ? "text-gray-700" : "text-gray-200"}`} />
                <div className="others flex gap-2 items-center cursor-pointer px-3 py-2" onClick={handleOthers}>
                    <RiSettingsFill className="text-3xl" />
                    <span className="text-xl">Others</span>
                </div>
                <hr className={`${theme ? "text-gray-700" : "text-gray-200"}`} />
            </div>
            <div className="logout absolute bottom-5 mx-auto flex gap-2 items-center cursor-pointer" onClick={handleLogout}>
                <MdLogout className="text-3xl" />
                <span className="text-xl">Logout</span>
            </div>
        </div>
    )
}