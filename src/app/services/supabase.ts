// Supabase client — singleton used throughout the app
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[RideChecka] Supabase credentials not set. ' +
    'Copy .env.example → .env and fill in your project values. ' +
    'The app will work offline with local fare models until then.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'ridechecka_sb_auth',
      },
    })
  : null;

/** Returns true when a real Supabase connection is configured */
export function isSupabaseConfigured(): boolean {
  return (
    !!supabase &&
    !!supabaseUrl &&
    !supabaseUrl.includes('YOUR_PROJECT')
  );
}
