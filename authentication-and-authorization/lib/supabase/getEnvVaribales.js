export function getEnvVariables() {
    const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supaBaseUrl || !supaBaseAnonKey) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY")
    };

    return { supaBaseUrl, supaBaseAnonKey }
}
