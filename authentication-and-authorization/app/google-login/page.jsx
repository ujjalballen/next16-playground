import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { GoogleLoginDemo } from "./GoogleLoginDemo";

export default async function GoogleLogIn() {

    const supabase = await createSupabaseServerClient();

    const {data: {user}} = await supabase.auth.getUser()

    return (
       <GoogleLoginDemo user={user} />
    )
}