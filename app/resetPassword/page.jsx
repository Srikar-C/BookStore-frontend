"use client"

import { SiBookstack } from "react-icons/si";
import InputBox from "../components/InputBox";
import { useRef, useState } from "react";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { useAppContext } from "../hooks/AppContext";
import { useRouter } from "next/navigation";
import useFetch from "../hooks/useFetch";
import { showError, showSuccess } from "../utils/showToasts";

export default function ResetPassword() {

    const { user } = useAppContext();
    const router = useRouter();
    const isSubmit = useRef(false);
    const [spin, setSpin] = useState(false);

    console.log("user", user);

    if (!user) {
        return <div>Loading...</div>;
    }

    const [reset, setReset] = useState({
        email: user?.email,
        password: "",
        cfnpassword: ""
    });

    const [error, setError] = useState({
        passError: "",
        cfnpassError: "",
    })

    const [color, setColor] = useState({
        passColor: "text-red-400",
        cfnpassColor: "text-red-400",
    });

    async function handleReset() {
        if (isSubmit.current) return;
        isSubmit.current = true;
        setSpin(true);
        const response = await useFetch("post", process.env.NEXT_PUBLIC_API_User, process.env.NEXT_PUBLIC_MAPPING_User, "reset", reset, false);
        const result = response.data;
        if (result.success) {
            showSuccess(result.message);
            router.replace("/login");
        }
        else {
            const errors = result.object;
            if (errors != null) {
                setError({
                    passError: errors.password || "",
                    cfnpassError: errors.cfnpassword || ""
                });
            }
            if (result.kind == "validation") {
                setColor({
                    passColor: "text-red-400",
                })
            }
            else if (result.kind == "warning") {
                showWarning(result.message);
            }
            else if (result.kind == "info") {
                showInfo(result.message);
                console.log("Info: ", result.message);
            }
            else {
                showError(result.message);
            }
        }
        setSpin(false);
        isSubmit.current = false;
    }


    return (
        <div className="box w-[25%] h-106 backdrop-blur-2xl bg-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center p-4 gap-6 bg-[color-var(--foreground)] rounded-lg shadow-sm shadow-[color:var(--foreground)]">
            <div className="flex flex-col p-2 rounded-xl shadow-inner shadow-[color:var(--foreground)]">
                <SiBookstack className="text-5xl p-2 bg-[#4A7766] text-[#ECE7E2] rounded-xl justify-center" />
            </div>
            <div className="inputs flex flex-col gap-4 items-center space-y-1 *:w-full">
                <h1 className="heading font-semibold text-2xl text-[color:var(--heading)] text-center uppercase tracking-wider ">
                    Reset Password
                </h1>
                <InputBox classid="email" field="email" icon={<MdEmail />} value={reset.email} object={reset} setObject={setReset} type="text" placeholder="Enter Email" spin={true} />
                <InputBox classid="pass" field="password" icon={<TbPassword />} value={reset.password} object={reset} setObject={setReset} type="password" placeholder="Enter Password" spin={spin} error={error.passError} color={color.passColor} />
                <InputBox classid="cfnpass" field="cfnpassword" icon={<MdOutlinePassword />} value={reset.cfnpassword} object={reset} setObject={setReset} type="password" placeholder="Confirm Password" spin={spin} error={error.cfnpassError} color={color.cfnpassColor} />
                <button
                    onClick={handleReset}
                    className={`${spin ? "cursor-not-allowed" : "cursor-pointer"}
                        text-white px-3 py-1 justify-center mx-auto flex items-center gap-3 rounded-full bg-[#008236] hover:bg-[#4A7766] font-semibold`}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}