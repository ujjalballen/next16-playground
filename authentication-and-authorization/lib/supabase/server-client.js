import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getEnvVariables } from './getEnvVaribales';


// function getEnvVariables() {
//     const supaBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supaBaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//     if (!supaBaseUrl || !supaBaseAnonKey) {
//         throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY")
//     };

//     return { supaBaseUrl, supaBaseAnonKey }
// }


export async function createSupabaseServerClient() {
    const { supaBaseUrl, supaBaseAnonKey } = getEnvVariables();
    const cookieStore = await cookies();


    return createServerClient(supaBaseUrl, supaBaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options)
                    })

                } catch (error) {
                    console.log("Error: ", error)
                }
            }
        }
    })

}