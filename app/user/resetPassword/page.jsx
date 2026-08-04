"use client"

import InputBox from "@/app/components/InputBox";
import { useAppContext } from "@/app/hooks/AppContext";
import { loginUser, resetPassword } from "@/app/utils/userUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

export default function Login() {

    const [loading, setLoading] = useState(false);
    const isSubmit = useRef(false);
    const { user } = useAppContext();
    const router = useRouter();
    const [reset, setReset] = useState({
        email: user.email,
        password: "",
        cfnpassword: "",
    });

    const [fieldState, setFieldState] = useState({
        email: {
            message: "",
            kind: "",
        },
        password: {
            message: "",
            kind: "",
        },
        cfnpassword: {
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
            await resetPassword(reset, setFieldState, router);
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
                <InputBox classid="email" field="email" icon={<FaUserAlt />} type="text" value={reset.email} setValue={setReset} state={fieldState.name} clearFieldState={clearFieldState} loading={true} />
                <InputBox classid="password" field="password" icon={<MdOutlinePassword />} type="password" value={reset.password} setValue={setReset} state={fieldState.password} clearFieldState={clearFieldState} loading={loading} />
                <InputBox classid="Confirm Password" field="cfnpassword" icon={<MdOutlinePassword />} type="password" value={reset.cfnpassword} setValue={setReset} state={fieldState.cfnpassword} clearFieldState={clearFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset"}
                    <FiArrowRight />
                </button>
            </div>
        </div>
    )
}