import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Theme() {
    return (
        <div className="fixed top-5 right-5 rounded-full bg-[color:var(--foreground)] flex items-end justify-start p-1 z-50 shadow-2xl border-2 border-[color:var(--background)]">
            <AnimatedThemeToggler className="text-[color:var(--background)] cursor-pointer" />
        </div>
    )
}