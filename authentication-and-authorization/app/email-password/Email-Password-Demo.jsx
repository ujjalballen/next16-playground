"use client"

import { useState } from "react"

export function EmailPassDemo() {
    const [mode, setMode] = useState('signup');
    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,          // 1. Copy the existing state
            [name]: value,    // 2. Update only the field that changed
        }));
    }

    return (
        <div>
            <form
                className="relative overflow-hidden rounded-[32px] border border-emerald-500/30 bg-gradient-to-br from-[#05130d] via-[#04100c] to-[#0c2a21] p-8 text-slate-100 shadow-[0_35px_90px_rgba(2,6,23,0.65)]"
            >
                <div
                    className="pointer-events-none absolute -left-4 -top-4 -z-10 h-20 w-28 rounded-full bg-[radial-gradient(circle,_rgba(16,185,129,0.25),_transparent)] blur-lg"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -bottom-10 right-2 -z-10 h-28 w-40 rounded-full bg-[linear-gradient(140deg,_rgba(45,212,191,0.32),_rgba(59,130,246,0.12))] blur-xl"
                    aria-hidden="true"
                />
                <div className="absolute inset-x-8 top-6 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                    <span>Primary</span>
                    <span>Flow</span>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
                            Credentials
                        </p>
                        <h3 className="text-xl font-semibold text-white">
                            {mode === "signup" ? "Create an account" : "Welcome back"}
                        </h3>
                    </div>
                    <div className="flex rounded-full border border-white/10 bg-white/[0.07] p-1 text-xs font-semibold text-slate-300">
                        {["signup", "signin"].map((option) => (
                            <button
                                key={option}
                                type="button"
                                aria-pressed={mode === option}
                                onClick={() => setMode(option)}
                                className={`rounded-full px-4 py-1 transition ${mode === option
                                    ? "bg-emerald-500/30 text-white shadow shadow-emerald-500/20"
                                    : "text-slate-400"
                                    }`}
                            >
                                {option === "signup" ? "Sign up" : "Sign in"}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <label className="block text-sm font-medium text-slate-200">
                        Email
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1b18] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                            placeholder="you@email.com"
                        />
                    </label>
                    <label className="block text-sm font-medium text-slate-200">
                        Password
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1b18] px-3 py-2.5 text-base text-white placeholder-slate-500 shadow-inner shadow-black/30 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                            placeholder="At least 6 characters"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-600/40"
                >
                    {mode === "signup" ? "Create account" : "Sign in"}
                </button>

            </form>
        </div>
    )
}