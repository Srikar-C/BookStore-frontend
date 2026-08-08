"use client"

import { getUserFromToken, resendOTP, verifyOTP } from "@/services/userServices";
import { useAppContext } from "@/store/AppContext";
import { showSuccess, showToast } from "@/utils/showToasts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiRefreshLine } from "react-icons/ri"
import { SiBookstack } from "react-icons/si"
import OTPInput from "react-otp-input"

export default function Verify() {

    const token = useParams();
    const mode = localStorage.getItem("mode");
    const { router, loading, setLoading, isSubmit, dummy, setDummy } = useAppContext();
    const [dtls, setDtls] = useState({
        email: "",
        otp: ""
    })

    useEffect(() => {
        console.log(token, dtls);
        getUserFromToken(token, setDtls);
    }, [token]);

    async function handleResend() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await resendOTP(dtls, setDtls);
            if (!result.success) {
                showToast(result);
            }
            else {
                showSuccess(result.message);
                router.replace(`/verify/${result.object.token}`);
            }
        }
        finally {
            isSubmit.current = false;
            setLoading(false);
        }
    }

    async function handleVerify() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await verifyOTP(dtls);
            if (!result.success) {
                showToast(result);
            }
            else {
                showSuccess(result.message);
                if (mode == "register") {
                    router.replace("/user/login");
                }
                else {
                    setDummy(dtls);
                    localStorage.setItem("token", result.object.token);
                    router.replace("/user/resetPassword");
                }
            }
        }
        finally {
            isSubmit.current = false;
            setLoading(false);
        }
    }

    return (
        <div className="box w-[92%] max-w-md lg:w-[500px] min-h-fit h-95 backdrop-blur-2xl bg-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-5 lg:p-8 gap-5 lg:gap-7 rounded-2xl shadow-sm shadow-[color:var(--foreground)]" data-aos="flip-right">
            <div className="flex flex-col p-2 rounded-xl shadow-inner shadow-[color:var(--foreground)]">
                <SiBookstack className="text-4xl lg:text-5xl p-2 lg:p-3 bg-[#2563eb] text-[#ECE7E2] rounded-xl justify-center" />
            </div>
            <div className="inputs flex flex-col text-wrap gap-4 items-center space-y-1 w-full">
                <h1 className="heading font-semibold text-xl lg:text-3xl text-[color:var(--heading)] text-center uppercase tracking-wider">
                    Verify Email
                </h1>
                <p className="text-xs lg:text-base text-center wrap-break-word">Enter the verification code we sent to your email address: <b>{dtls.email}</b></p>
                <div className="tags flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between w-full items-center">
                    <span className="font-semibold">Verification Code</span>
                    <div className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} resend flex items-center gap-2 rounded-full px-3 py-1 text-sm lg:text-base w-full lg:w-auto justify-center
                        border-2 border-[color:var(--input-icon)]  hover:bg-[color:var(--background)] 
                        text-[color:var(--input-icon)] hover:text-[color:var(--foreground)]`} onClick={handleResend}
                        disabled={loading}>
                        <RiRefreshLine />
                        <span>Resend Code</span>
                    </div>
                </div>
                <div className="input w-full justify-center flex flex-wrap">
                    <OTPInput value={dtls.otp} onChange={(value) => {
                        setDtls((prev) => ({
                            ...prev,
                            otp: value
                        }))
                    }} numInputs={6} renderSeparator={<span className="hidden lg:flex">-</span>} renderInput={(props) => <input {...props} />} inputStyle={{ width: "2.2rem", height: "2.2rem", border: "1px solid var(--foreground)", borderRadius: "0.25rem", display: "flex", justifyContent: "center", textAlign: "center" }}
                        containerStyle={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "0.1rem" }} />
                </div>
                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} w-full lg:w-full
                            text-white px-6 py-2 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#2563eb] hover:bg-[#60a5fa] font-semibold`}
                >
                    Verify
                </button>
            </div>
        </div>
    )
}