"use client"

import InputBox from "@/app/components/InputBox";
import { useAppContext } from "@/app/hooks/AppContext";
import { loginUser } from "@/app/utils/userUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {

    const [loading, setLoading] = useState(false);
    const isSubmit = useRef(false);
    const router = useRouter();
    const { user, initialize } = useAppContext();
    const [login, setLogin] = useState({
        name: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            router.replace("/bookstore");
        }
    }, [])

    const [fieldState, setFieldState] = useState({
        name: {
            message: "",
            kind: "",
        },
        password: {
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

    async function handleLogin(e) {
        e.preventDefault();
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            await loginUser(login, setFieldState, initialize, router);
        }
        finally {
            isSubmit.current = false;
            setLoading(false);
        }
    }

    return (
        <div className="right rounded-l-2xl p-6 lg:p-10 flex flex-col gap-4 justify-evenly w-full">
            <div className="heading">
                <h3 className="text-4xl font-semibold">Welcome Back</h3>
                <p className="text-sm text-slate-500">Access your account to buy books, track orders, and enjoy priority support.</p>
            </div>
            <div className="inputs flex flex-col gap-5">
                <InputBox classid="name" field="name" icon={<FaUserAlt />} type="text" value={login.name} setValue={setLogin} state={fieldState.name} clearFieldState={clearFieldState} loading={loading} />
                <InputBox classid="password" field="password" icon={<MdOutlinePassword />} type="password" value={login.password} setValue={setLogin} state={fieldState.password} clearFieldState={clearFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                    <FiArrowRight />
                </button>
            </div>
            <div className="footer flex lg:flex-row flex-col items-center justify-between font-semibold mt-5 lg:mt-0 gap-5 lg:gap-0">
                <Link href="/user/forgotPassword" onClick={(e) => loading && e.preventDefault()}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} text-[color:var(--input-icon)]`}>Forgot Password?</Link>
                <Link href="/user/register" onClick={(e) => loading && e.preventDefault()}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} text-[color:var(--input-icon)]`}>Create an Account</Link>
            </div>
        </div>
    )
}