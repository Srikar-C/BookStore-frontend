import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputBox({ classid, field, icon, type, value, setValue, state, clearFieldState, setFieldState, loading }) {

    const [showPassword, setShowPassword] = useState(false);

    function handleEye() {
        setShowPassword(!showPassword);
    }

    const COLORS = {
        validation: "#ff6467",
        warning: "#f59e0b",
        info: "#3b82f6",
        exists: "#575b21"
    };

    const borderColor = COLORS[state?.kind] || "var(--input-border)";

    return (
        <div className={`${classid} input w-full flex flex-col gap-2`} >
            <div className="label capitalize">{field}</div>
            <div className={`flex gap-3 items-center w-full shadow-xs p-3 rounded-2xl border-2 ${loading && "cursor-not-allowed"}`} style={{ borderColor }}>
                <span className="text-2xl text-(--input-icon)">{icon}</span>
                <input type={type == "password" ? showPassword ? "text" : type : type} value={value}
                    onChange={(e) => {
                        setValue((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                        }))
                    }}
                    onFocus={() => {
                        clearFieldState(field, setFieldState);
                    }}
                    disabled={loading}
                    className={`border-none outline-none w-[90%] ${loading && "cursor-not-allowed"}`} placeholder={`Enter ${classid.charAt(0).toUpperCase() + classid.slice(1)}`} />
                {type == "password" && <span
                    onClick={handleEye}
                    className="cursor-pointer text-(--input)"
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>}
            </div>
            <div className={`error my-0 leading-1.5`} style={{ color: borderColor }}>{state?.message}</div>
        </div>

    )
}