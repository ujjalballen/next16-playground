import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const supabase = await createSupabaseServerClient();

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        // Optional: log server-side only
        console.error("Faild to get the user: ", error.message)
        redirect("/sign-in");
    }

    // 2️⃣ Not authenticated
    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg border p-6 shadow-sm">
                <h1 className="text-2xl font-semibold mb-6">Profile</h1>

                <div className="flex items-center gap-4">
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                    />

                    <div>
                        <p className="text-lg font-medium">{user.user_metadata.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {user.user_metadata.email}
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-2 text-sm">
                    <div>
                        <span className="font-medium">Provider:</span>{" "}
                        {user.app_metadata.provider}
                    </div>
                    <div>
                        <span className="font-medium">User ID:</span>{" "}
                        {user.id}
                    </div>
                </div>
            </div>
        </div>
    )
}