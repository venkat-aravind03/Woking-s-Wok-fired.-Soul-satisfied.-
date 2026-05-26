import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-side Supabase client for use in Client Components.
 */
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

/**
 * Creates a server-side Supabase client.
 * Will be fully configured with cookie handling in a later phase.
 */
export function createServerSupabase() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
