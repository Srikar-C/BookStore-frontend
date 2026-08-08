export function HashTag({ icon, text }) {
    return (
        <div className="flex gap-5 items-center">
            <span className="text-2xl p-2 bg-white text-black rounded-2xl">{icon}</span>
            <p className="text-xl">{text}</p>
        </div>
    )
}

export function clearFieldState(field, setFieldState) {
    setFieldState(prev => ({
        ...prev,
        [field]: {
            message: "",
            kind: "",
        },
    }));
}

export function Section({ icon, text, click, path, url, count }) {
    const active = path === url;
    return (
        <div className={`flex gap-2 items-center justify-between ${active ? "bg-[color:var(--section-hover)]" : "hover:bg-[color:var(--section-hover)]"} p-2 cursor-pointer`} onClick={click}>
            <div className="text flex gap-2 items-center">
                <span className="text-2xl">{icon}</span>
                <h5>{text}</h5>
            </div>
            {path == "/bookstore/carts" && <span className="rounded-full w-7 h-7 flex items-center font-semibold text-md justify-center bg-red-400 text-white">{count}</span>}
        </div>
    )
}