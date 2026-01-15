"use client"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function Navbar({ user, userRole }) {
    const supabase = getSupabaseBrowserClient();
    const router = useRouter()


    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            toast.error("Faild to Sign Out!")
        }

        router.refresh();

    }

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
                <div className="px-6 py-4 flex justify-between items-center">
                    <Link href={"/"} className="flex items-center gap-2">
                        <Image src={"/logo.svg"} alt="TreeBio" width={42} height={42} />
                        <span className="font-bold text-2xl tracking-widest text-amber-300">
                            LeetCode
                        </span>
                    </Link>

                    <div className="flex flex-row items-center justify-center gap-x-4">
                        <Link
                            href="/problems"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
                        >
                            Problems
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
                        >
                            About
                        </Link>
                        <Link
                            href="/profile"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400  hover:text-amber-600 cursor-pointer dark:hover:text-amber-400"
                        >
                            Profile
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <ModeToggle />

                        {/* userRole === UserRole.ADMIN */}
                        {userRole && userRole === "ADMIN" && (
                            <Link href={"/create-problem"}>
                                <Button variant={"outline"} size={"default"}>
                                    Create Problem
                                </Button>
                            </Link>
                        )}


                        <div className="flex items-center gap-2">

                            {
                                user ? (
                                    <DropdownMenu className={""}>
                                        <DropdownMenuTrigger>
                                            <Avatar className={'rounded-lg cursor-pointer'}>
                                                <AvatarImage src={user?.avatar_url} alt={user?.name} />
                                                <AvatarFallback>IG</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className={"mr-2"}>
                                            {/* User info */}
                                            <div className="flex items-center gap-3 px-3 py-2">
                                                <Image
                                                    src={user?.avatar_url}
                                                    alt={user?.name}
                                                    width={36}
                                                    height={36}
                                                    className="rounded-full"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium truncate">{user?.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                            <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                            <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                            <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleSignOut}
                                                className={"cursor-pointer"}>
                                                Log out
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (

                                    <>
                                        < Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10 cursor-pointer"
                                        >
                                            <Link href={"/sign-in"}>Sign in</Link>
                                        </Button>

                                        <Button
                                            size="sm"
                                            className="text-sm font-medium bg-amber-400 hover:bg-amber-500 cursor-pointer text-white"
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}