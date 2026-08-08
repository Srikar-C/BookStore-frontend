"use client"

import InputBox from "@/app/user/components/InputBox";
import { loginUser } from "@/services/userServices";
import { useAppContext } from "@/store/AppContext";
import { useUserStore } from "@/store/useUserStore";
import { clearFieldState } from "@/utils/FunctionalUtils";
import { showSuccess, showToast } from "@/utils/showToasts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {

    const { router, loading, setLoading, isSubmit } = useAppContext();
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const keepKeys = ["theme"];
        Object.keys(localStorage).forEach((key) => {
            if (!keepKeys.includes(key)) {
                localStorage.removeItem(key);
            }
        });
    }, [])

    useEffect(() => {
        if (user !== null) {
            router.replace("/bookstore");
        }
    }, [user, router])

    const [login, setLogin] = useState({
        name: "",
        password: "",
    });

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

    async function handleLogin() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await loginUser(login, setFieldState);
            if (!result.success) {
                if (result.kind != "validation") {
                    showToast(result);
                }
            }
            else {
                showSuccess(result.message);
                if (result.kind == "info") {
                    router.replace(`/verify/${result.object.token}`);
                }
                else {
                    setUser(result.object);
                    router.replace("/bookstore");
                }
                return;
            }
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
                <InputBox classid="name" field="name" icon={<FaUserAlt />} type="text" value={login.name} setValue={setLogin} state={fieldState.name} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <InputBox classid="password" field="password" icon={<MdOutlinePassword />} type="password" value={login.password} setValue={setLogin} state={fieldState.password} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-(--input-icon) px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}
                    <FiArrowRight />
                </button>
            </div>
            <div className="footer flex lg:flex-row flex-col items-center justify-between font-semibold mt-5 lg:mt-0 gap-5 lg:gap-0">
                <Link href="/user/forgotPassword" onClick={(e) => loading && e.preventDefault()}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} text-(--input-icon)`}>Forgot Password?</Link>
                <Link href="/user/register" onClick={(e) => loading && e.preventDefault()}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} text-(--input-icon)`}>Create an Account</Link>
            </div>
        </div>
    )
}