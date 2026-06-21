import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase is OPTIONAL. When the env vars are missing (e.g. local dev or a
 * static demo deploy) the whole app runs in guest mode against localStorage.
 * `isSupabaseEnabled` lets the rest of the app branch cleanly.
 */
export const isSupabaseEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;
