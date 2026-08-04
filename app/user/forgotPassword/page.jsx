"use client"

import InputBox from "@/app/components/InputBox";
import { loginUser, resetPassword, sendOTP } from "@/app/utils/userUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const isSubmit = useRef(false);
    const [forgot, setForgot] = useState({
        email: "",
    });

    const [fieldState, setFieldState] = useState({
        email: {
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
            await sendOTP(forgot, setFieldState, router);
        }
        finally {
            isSubmit.current = false;
            setLoading(false);
        }
    }

    return (
        <div className="right rounded-l-2xl p-6 lg:p-10 flex flex-col gap-4 justify-center w-full">
            <div className="heading">
                <h3 className="text-4xl font-semibold">Welcome Back</h3>
                <p className="text-sm text-slate-500">Access your account to buy books, track orders, and enjoy priority support.</p>
            </div>
            <div className="inputs flex flex-col gap-5">
                <InputBox classid="email" field="email" icon={<FaUserAlt />} type="text" value={forgot.email} setValue={setForgot} state={fieldState.email} clearFieldState={clearFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                    <FiArrowRight />
                </button>
            </div>
        </div>
    )
}