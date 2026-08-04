"use client";

import { FiBookOpen, FiCompass, FiCreditCard, FiHeadphones, FiShield, FiTrendingUp } from "react-icons/fi";

const highlights = [
    {
        title: "Curated catalog",
        text: "Discover bestselling novels, academic titles, and modern classics in one seamless experience.",
        icon: <FiBookOpen />,
    },
    {
        title: "Fast checkout",
        text: "A frictionless ordering flow helps readers complete purchases quickly and confidently.",
        icon: <FiCreditCard />,
    },
    {
        title: "Smart recommendations",
        text: "Personalized suggestions guide users toward the next book they will love.",
        icon: <FiCompass />,
    },
    {
        title: "Priority support",
        text: "Dedicated assistance and secure account handling keep every purchase smooth.",
        icon: <FiHeadphones />,
    },
];

const metrics = [
    { label: "Books available", value: "10k+" },
    { label: "Daily orders", value: "2.4k" },
    { label: "Customer rating", value: "4.9/5" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[linear-gradient(135deg,_rgba(248,250,252,0.98),_rgba(226,232,240,0.9))] px-4 py-8 text-[color:var(--foreground)] sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-[color:var(--input-bg)] shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="p-8 sm:p-10 lg:p-12">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--input-border) bg-(--input-icon-bg) px-3 py-1 text-sm font-semibold text-(--input-icon)">
                                <FiTrendingUp />
                                Bookstore platform overview
                            </div>
                            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                                A modern bookstore experience for readers, users, and growing teams.
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--input-label)]">
                                This application brings together account access, book browsing, cart management, and secure ordering in one polished digital storefront designed for convenience and scale.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a href="/dummy" className="rounded-2xl bg-[color:var(--input-icon)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                                    Explore the portal
                                </a>
                                <a href="#features" className="rounded-2xl border border-(--input-border) px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-(--input-icon-bg)">
                                    View features
                                </a>
                            </div>
                        </div>

                        <div className="bg-[linear-gradient(135deg,_#0f172a,_#2563eb)] p-8 sm:p-10 lg:p-12">
                            <div className="rounded-[24px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                        <FiShield className="text-2xl text-white" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">Built for trust</p>
                                        <p className="text-sm text-slate-200">Secure login, clear flows, and dependable checkout.</p>
                                    </div>
                                </div>
                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    {metrics.map((item, index) => (
                                        <div key={index} className="rounded-2xl bg-slate-950/20 p-3 text-center">
                                            <p className="text-2xl font-semibold text-white">{item.value}</p>
                                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-200">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[28px] border border-slate-200/70 bg-[color:var(--input-bg)] p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-(--input-icon)">What this app offers</p>
                        <h2 className="mt-3 text-3xl font-semibold">Everything a modern bookstore needs</h2>
                        <p className="mt-4 text-base leading-8 text-[color:var(--input-label)]">
                            From browsing titles to completing a purchase, the experience is designed to feel simple, professional, and ready for real-world use.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {highlights.map((item, index) => (
                            <article key={index} className="rounded-[24px] border border-slate-200/70 bg-[color:var(--input-bg)] p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--input-icon-bg) text-xl text-(--input-icon)">{item.icon}</div>
                                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-[color:var(--input-label)]">{item.text}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
