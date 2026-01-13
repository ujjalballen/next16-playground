import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from './config'

export function createSupabaseBrowserClient() {
    const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig()
    return createBrowserClient(supabaseUrl, supabasePublishableKey)
}


// we can make them into one function...
let supabase;

export function getSupabaseBrowserClient() {
    if (!supabase) {
        supabase = createSupabaseBrowserClient();
    }

    return supabase;
}