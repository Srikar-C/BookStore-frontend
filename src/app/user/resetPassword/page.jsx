"use client"

import InputBox from "@/app/user/components/InputBox";
import { getUserFromToken, resetPassword } from "@/services/userServices";
import { useAppContext } from "@/store/AppContext";
import { clearFieldState } from "@/utils/FunctionalUtils";
import { showSuccess, showToast } from "@/utils/showToasts";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

export default function ResetPassword() {

    const token = localStorage.getItem("token");
    const { router, loading, setLoading, isSubmit, dummy } = useAppContext();
    const [reset, setReset] = useState({
        email: dummy?.email,
        password: "",
        cfnpassword: "",
    });

    useEffect(() => {
        console.log(token, reset);
        getUserFromToken({ token: token }, setReset);
    }, [token]);

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

    async function handleReset() {
        if (isSubmit.current) return;
        try {
            isSubmit.current = true;
            setLoading(true);
            const result = await resetPassword(reset, setFieldState);
            if (!result.success) {
                showToast(result);
            }
            else {
                showSuccess(result.message);
                router.replace("/user/login");
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
                <h3 className="text-4xl font-semibold">Reset Password</h3>
            </div>
            <div className="inputs flex flex-col gap-5">
                <InputBox classid="email" field="email" icon={<FaUserAlt />} type="text" value={reset.email} setValue={setReset} state={fieldState.name} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={true} />
                <InputBox classid="password" field="password" icon={<MdOutlinePassword />} type="password" value={reset.password} setValue={setReset} state={fieldState.password} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <InputBox classid="Confirm Password" field="cfnpassword" icon={<MdOutlinePassword />} type="password" value={reset.cfnpassword} setValue={setReset} state={fieldState.cfnpassword} clearFieldState={clearFieldState} setFieldState={setFieldState} loading={loading} />
                <button
                    type="submit"
                    className={`${loading ? "cursor-not-allowed" : "cursor-pointer"} flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90`}
                    onClick={handleReset}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset"}
                    <FiArrowRight />
                </button>
            </div>
        </div>
    )
}