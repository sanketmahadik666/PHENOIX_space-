import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Please configure them in the Secrets tab.");
}

export const supabase = createClient(
  supabaseUrl || "https://nwkunxztysbmswrzqyha.supabase.co", 
  supabaseAnonKey || "sb_publishable_dEhCiP8LN_K2nVHAPufaDw_9V0ckqKm"
);
