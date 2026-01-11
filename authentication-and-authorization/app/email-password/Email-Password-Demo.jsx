"use client"

import { AuthDemoPage } from "@/components/auth-demo-page";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react"

export function EmailPassDemo({ user }) {
    const [mode, setMode] = useState('signup');
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("");
    const supabaseBrowserClient = getSupabaseBrowserClient();
    const [currentUser, setCurrentUser] = useState(user)

    useEffect(() => {
        const { data: { subscription } } = supabaseBrowserClient.auth.onAuthStateChange((event, session) => {
            console.log('Auth Event:', event);
            console.log("Auth Session: ", session)

            setCurrentUser(session?.user || null)
        })


        // To stop listening:
        return () => {
            subscription.unsubscribe();
        }
    }, [supabaseBrowserClient])


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,          // 1. Copy the existing state
            [name]: value,    // 2. Update only the field that changed
        }));
    }


    const hanldeSubmit = async (e) => {
        e.preventDefault();

        // Call Supabase Auth signup method
        if (mode === "signup") {
            const { data, error } = await supabaseBrowserClient.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    // Use 'data' to store extra info in the user's metadata
                    // data: {
                    //     display_name: username
                    // },
                    // Optional: Where to send the user after they click the email link
                    emailRedirectTo: `${window.location.origin}/welcome`
                }
            })

            if (error) {
                console.error("Signup error:", error.message);
                setStatus(error.message);
            } else {
                console.log("Check your email for the confirmation link!", data.user);
                setStatus("Check your email for the confirmation link!")
            }
        } else {
            const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })

            if (error) {
                // Handle incorrect password or non-existent user
                console.error("Login failed:", error.message);
                setStatus(error.message);
            } else {
                console.log("FUll Data: ", data)
                // 2. Success! data.session contains the JWT token
                console.log("Logged in successfully:", data.user);
                setStatus("Logged in successfully")
                // Use window.location or your router to redirect
                // window.location.href = '/dashboard';
            }
        }

    }


    const handleSignOut = async () => {
        const {error} = await supabaseBrowserClient.auth.signOut();
        if(error){
            console.log("Error SignOut: ", error)
        };

        setCurrentUser(null);
        setStatus("User successfully signOut")
    }

    return (
        <div>

            <AuthDemoPage
                title="Email + Password"
                intro="Classic credentials—users enter details, Supabase secures the rest while getSession + onAuthStateChange keep the UI live."
                steps={[
                    "Toggle between sign up and sign in.",
                    "Submit to watch the session card refresh instantly.",
                    "Sign out to reset the listener.",
                ]}
            />

            {
                !currentUser && (
                    <form
                        onSubmit={hanldeSubmit}
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
                                    name="email"
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
                                    name="password"
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

                        {status && (
                            <p className="mt-4 text-sm text-slate-300" role="status" aria-live="polite">
                                {status}
                            </p>
                        )}
                    </form>
                )
            }

            <div className="rounded-[28px] border border-white/10 bg-black p-7 text-slate-200 shadow-[0_25px_70px_rgba(2,6,23,0.65)] backdrop-blur">
                {currentUser ? (
                    <>
                        <dl className="mt-5 space-y-3 text-sm text-slate-200">
                            <div className="flex items-center justify-between gap-6">
                                <dt className="text-slate-400">User ID</dt>
                                <dd className="font-mono text-xs">{currentUser.id}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <dt className="text-slate-400">Email</dt>
                                <dd>{currentUser.email}</dd>
                            </div>
                            <div className="flex items-center justify-between gap-6">
                                <dt className="text-slate-400">Last sign in</dt>
                                <dd>
                                    {currentUser.last_sign_in_at
                                        ? new Date(currentUser.last_sign_in_at).toLocaleString()
                                        : "—"}
                                </dd>
                            </div>
                        </dl>
                        <button
                        onClick={handleSignOut}
                            className="mt-6 inline-flex cursor-pointer w-full items-center justify-center rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-5 text-sm text-slate-400">
                        Session metadata will show up here after a successful sign in.
                    </div>
                )}
            </div>
        </div>
    )
}