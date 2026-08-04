"use client";

import { useState } from "react";
import { FiArrowRight, FiBookOpen, FiLock, FiMail, FiShield } from "react-icons/fi";

export default function DummyPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.16),_transparent_35%),linear-gradient(135deg,_rgba(248,250,252,0.95),_rgba(226,232,240,0.95))] px-4 py-8 text-[color:var(--foreground)] sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[32px] border border-slate-200/70 bg-[color:var(--input-bg)] shadow-[0_30px_90px_rgba(15,23,42,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="relative overflow-hidden bg-[linear-gradient(135deg,_#0f172a,_#1d4ed8)] p-8 text-white sm:p-10 lg:p-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_30%)]" />
                        <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                                    <FiBookOpen className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold tracking-[0.25em] text-white/85">BOOKFORGE</p>
                                    <p className="text-sm text-white/70">Industrial bookstore access</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                                    Secure portal
                                </p>
                                <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                                    Sign in to unlock your next great read.
                                </h1>
                                <p className="max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
                                    Discover premium editions, curated collections, and fast checkout designed for modern readers and enterprise teams.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 rounded-full bg-white/15 p-2">
                                        <FiShield className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Protected account access</p>
                                        <p className="mt-1 text-sm text-slate-200">
                                            Your login is secured with a modern, streamlined experience built for everyday book purchasing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 sm:p-10 lg:p-12">
                        <div className="flex h-full flex-col justify-center">
                            <div className="mb-8 space-y-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--input-icon)]">Member login</p>
                                <h2 className="text-3xl font-semibold sm:text-4xl">Welcome back</h2>
                                <p className="text-sm text-[color:var(--input-label)]">
                                    Access your account to buy books, track orders, and enjoy priority support.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[color:var(--input-label)]">Username</span>
                                    <div className="flex items-center gap-3 rounded-2xl border border-(--input-border) bg-(--input-bg) px-4 py-3 shadow-sm transition focus-within:border-(--input-ring) focus-within:ring-2 focus-within:ring-(--input-focus-ring)">
                                        <FiMail className="text-lg text-(--input-icon)" />
                                        <input
                                            type="text"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                            placeholder="Enter your username"
                                            className="w-full border-none bg-transparent text-sm text-(--foreground) outline-none placeholder:text-(--input-placeholder)"
                                            required
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-[color:var(--input-label)]">Password</span>
                                    <div className="flex items-center gap-3 rounded-2xl border border-(--input-border) bg-(--input-bg) px-4 py-3 shadow-sm transition focus-within:border-(--input-ring) focus-within:ring-2 focus-within:ring-(--input-focus-ring)">
                                        <FiLock className="text-lg text-(--input-icon)" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="w-full border-none bg-transparent text-sm text-(--foreground) outline-none placeholder:text-(--input-placeholder)"
                                            required
                                        />
                                    </div>
                                </label>

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--input-icon)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                                >
                                    {loading ? "Signing in..." : "Sign In"}
                                    <FiArrowRight />
                                </button>
                            </form>

                            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                                <a href="#" className="font-medium text-[color:var(--input-icon)] transition hover:opacity-80">
                                    Forgot password?
                                </a>
                                <a href="#" className="font-medium text-[color:var(--input-label)] transition hover:text-[color:var(--foreground)]">
                                    Create an account
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
