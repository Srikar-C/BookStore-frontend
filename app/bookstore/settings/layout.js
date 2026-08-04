import SettingsNav from "@/app/components/SettingsNav";

export default function Settings({ children }) {
    return (
        <div className="h-screen flex gap-3">
            <SettingsNav />
            <div className="ml-[18vw] flex-1 p-5">{children}</div>
        </div>
    )
}