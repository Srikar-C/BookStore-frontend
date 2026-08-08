"use client"

import InputBox from "@/app/user/components/InputBox";
import { registerUser } from "@/services/userServices";
import { useAppContext } from "@/store/AppContext";
import { clearFieldState } from "@/utils/FunctionalUtils";
import { showSuccess, showToast } from "@/utils/showToasts";
import Link from "next/link";
import { useState } from "react";
import { FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdEmail, MdOutlinePassword } from "react-icons/md";

export default function Register() {


    const { router, loading, setLoading, isSubmit } = useAppContext();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "USER",
    });

    const [fieldState, setFieldState] = useState({
        name: {
            message: "",
            kind: "",
        },
        email: {
            message: "",
            kind: "",
        },
        phone: {
            message: "",
            kind: "",
        },
        password: {
            message: "",
            kind: "",
        },
    });

    async function handleRegister() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await registerUser(register, setFieldState);
            if (!result.success) {
                if (result.kind != "validation" && result.kind != "exists") {
                    showToast(result);
                }
            }
            else {
                showSuccess(result.message);
                localStorage.setItem("mode", "register");
                localStorage.setItem("token", result.object.token);
                router.replace(`/verify/${result.object.token}`);
            }
        }
        finally {
            isSubmit.current = false;
            setLoading(false);
        }
    }

    return (
        <div className="right rounded-l-2xl p-6 lg:p-10 flex flex-col gap-2 justify-evenly w-full">
            <div className="heading">
                <h3 className="text-2xl font-semibold">Sign in to unlock your next great read</h3>
            </div>
            <div className="inputs flex flex-col gap-5">
                <InputBox classid="name" field="name" icon={<FaUserAlt />} type="text" value={register.name} setValue={setRegister} state={fieldState.name} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <InputBox classid="email" field="email" icon={<MdEmail />} type="text" value={register.email} setValue={setRegister} state={fieldState.email} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <InputBox classid="phone" field="phone" icon={<FaPhoneAlt />} type="text" value={register.phone} setValue={setRegister} state={fieldState.phone} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <InputBox classid="password" field="password" icon={<MdOutlinePassword />} type="password" value={register.password} setValue={setRegister} state={fieldState.password} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                    <FiArrowRight />
                </button>
            </div>
            <div className="footer flex flex-row items-center justify-center font-semibold mt-5 lg:mt-0 gap-5 lg:gap-2">
                <span className="text-[color:var(--foreground)]">Already Have a Account</span>
                <Link href="/user/login" onClick={(e) => loading && e.preventDefault()}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} text-[color:var(--input-icon)]`}>Login</Link>
            </div>
        </div>
    )
}