"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { showError, showSuccess } from "../utils/showToasts";
import { SiBookstack } from "react-icons/si";
import InputBox from "../components/InputBox";
import { MdEmail } from "react-icons/md";

export default function ForgotPassword() {
    const router = useRouter();
    const isSubmit = useRef(false);

    const [dtls, setDtls] = useState({
        email: "",
    });
    const [spin, setSpin] = useState(false);

    async function handleOTP() {
        if (isSubmit.current) return;
        isSubmit.current = true;
        setSpin(true);
        const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "resendOTP", dtls, false)
        const result = response.data;
        if (result.success) {
            showSuccess(result.message);
            setTimeout(() => {
                localStorage.setItem("mode", "resetpassword");
                router.push(`/verify/${result.object.token}`);
            }, 1500)
        }
        else {
            showError(result.message);
        }
        setSpin(false);
        isSubmit.current = false;
    }

    return (
        <div className="forgot w-[25%] h-70 backdrop-blur-2xl bg-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-4 gap-6 bg-[color-var(--foreground)] rounded-lg shadow-sm shadow-[color:var(--foreground)]">
            <div className="flex flex-col p-2 rounded-xl shadow-inner shadow-[color:var(--foreground)]">
                <SiBookstack className="text-5xl p-2 bg-[#4A7766] text-[#ECE7E2] rounded-xl justify-center" />
            </div>
            <div className="inputs flex flex-col gap-4 items-center space-y-1 *:w-full">
                <h1 className="heading font-semibold text-2xl text-[color:var(--heading)] text-center uppercase tracking-wider ">
                    Verify Email
                </h1>
                <InputBox classid="email" field="email" icon={<MdEmail />} value={dtls.email} object={dtls} setObject={setDtls} type="text" placeholder="Enter Email" spin={spin} />
                <button
                    onClick={handleOTP}
                    className={`${spin ? "cursor-not-allowed" : "cursor-pointer"}
                            text-white px-3 py-1 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#008236] hover:bg-[#4A7766] font-semibold`}
                >
                    Sent OTP to Verify
                </button>
            </div>
        </div>
    )
}