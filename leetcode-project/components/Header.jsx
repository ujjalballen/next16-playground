"use client";

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
import { getSupabaseBrowserClient } from "@/lib/supabase/supabase-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function Header({ user }) {

    const supabase = getSupabaseBrowserClient();
    const router = useRouter()

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            toast.error("Faild to Sign Out!")
        }

        router.push("/sign-in")

    }

    return (
        <div className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
            <div>

            </div>
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
                    <Button><Link href={"/sign-in"}>Sign in</Link></Button>
                )
            }
        </div>
    )
}