import { createBrowserClient } from '@supabase/ssr'
import { getEnvVariables } from './getEnvVaribales';

let client;

export function getSupabaseBrowserClient() {
    // if (client) return client
    // ;
    if(client){
        return client
    }

    const { supaBaseUrl, supaBaseAnonKey } = getEnvVariables();

    client = createBrowserClient(supaBaseUrl, supaBaseAnonKey);

    return client;

}