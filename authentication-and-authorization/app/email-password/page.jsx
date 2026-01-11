import { EmailPassDemo } from "./Email-Password-Demo";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function EmailPasswordPage() {

    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser()

    console.log("USER: ", user)
    return (
        < EmailPassDemo user={user} />
    )
}