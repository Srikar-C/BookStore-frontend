"use client"

import InputBox from "@/app/user/components/InputBox";
import { resendOTP } from "@/services/userServices";
import { useAppContext } from "@/store/AppContext";
import { clearFieldState } from "@/utils/FunctionalUtils";
import { showSuccess, showToast } from "@/utils/showToasts";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function ForgotPassword() {

    const { router, loading, setLoading, isSubmit, dummy, setDummy } = useAppContext();
    const mode = localStorage.getItem("mode");

    const [forgot, setForgot] = useState({
        email: "",
    });

    const [fieldState, setFieldState] = useState({
        email: {
            message: "",
            kind: "",
        },
    });

    async function handleForgot() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await resendOTP(forgot, setFieldState);
            if (!result.success) {
                showToast(result);
            }
            else {
                showSuccess(result.message);
                localStorage.setItem("mode", "reset");
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
        <div className="right rounded-l-2xl p-6 lg:p-10 flex flex-col gap-4 justify-center w-full">
            <div className="heading">
                <h3 className="text-4xl font-semibold">Welcome Back</h3>
                <p className="text-sm text-slate-500">Access your account to buy books, track orders, and enjoy priority support.</p>
            </div>
            <div className="inputs flex flex-col gap-5">
                <InputBox classid="email" field="email" icon={<FaUserAlt />} type="text" value={forgot.email} setValue={setForgot} state={fieldState.email} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleForgot}
                    disabled={loading}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                    <FiArrowRight />
                </button>
            </div>
        </div>
    )
}