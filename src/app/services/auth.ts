// Authentication service — wraps Supabase Auth with localStorage fallback
import { supabase, isSupabaseConfigured } from './supabase';

export interface AppUser {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  provider: 'email' | 'phone' | 'google' | 'apple' | 'local';
}

const USER_KEY = 'ridechecka_user';

// ── Local helpers ───────────────────────────────────────────────
function getLocalUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistLocalUser(user: AppUser): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
}

function clearLocalUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {}
}

// ── Public API ──────────────────────────────────────────────────

/**
 * Sign up with name + phone + password.
 * When Supabase is configured it creates a real account (phone-based OTP);
 * otherwise it falls back to localStorage.
 */
export async function signUpWithPhone(
  fullName: string,
  phone: string,
  password: string,
): Promise<AppUser> {
  if (isSupabaseConfigured() && supabase) {
    // Supabase phone auth — sends OTP
    const { data, error } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw new Error(error.message);

    const user: AppUser = {
      id: data.user?.id ?? crypto.randomUUID(),
      fullName,
      phone,
      provider: 'phone',
    };

    // Also persist profile in our profiles table
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        phone,
      })
      .then(() => {});

    persistLocalUser(user);
    return user;
  }

  // Fallback: local-only account
  const user: AppUser = {
    id: crypto.randomUUID(),
    fullName,
    phone,
    provider: 'local',
  };
  persistLocalUser(user);
  return user;
}

/**
 * Sign in with phone + password.
 * When Supabase is configured it authenticates against Supabase Auth;
 * otherwise it falls back to localStorage.
 */
export async function signInWithPhone(
  phone: string,
  password: string,
): Promise<AppUser> {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    if (error) throw new Error(error.message);

    const user: AppUser = {
      id: data.user?.id ?? crypto.randomUUID(),
      fullName: data.user?.user_metadata?.full_name || 'User',
      phone,
      provider: 'phone',
    };

    persistLocalUser(user);
    return user;
  }

  // Fallback: check localStorage for matching user
  const existing = getLocalUser();
  if (existing && existing.phone === phone) {
    return existing;
  }

  throw new Error('No account found with this phone number');
}

/**
 * Sign in with Google OAuth.
 * Redirects the browser when Supabase is configured.
 */
export async function signInWithGoogle(): Promise<AppUser | null> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw new Error(error.message);
    // After redirect the session will be picked up by onAuthStateChange
    return null;
  }

  // Fallback: pretend it worked
  const user: AppUser = {
    id: crypto.randomUUID(),
    fullName: 'Google User',
    phone: '',
    provider: 'google',
  };
  persistLocalUser(user);
  return user;
}

/**
 * Sign in with Apple OAuth.
 */
export async function signInWithApple(): Promise<AppUser | null> {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw new Error(error.message);
    return null;
  }

  const user: AppUser = {
    id: crypto.randomUUID(),
    fullName: 'Apple User',
    phone: '',
    provider: 'apple',
  };
  persistLocalUser(user);
  return user;
}

/**
 * Returns the currently logged-in user (checks Supabase first, then localStorage).
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  if (isSupabaseConfigured() && supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const appUser: AppUser = {
        id: user.id,
        fullName: user.user_metadata?.full_name || user.email || 'User',
        phone: user.phone || '',
        email: user.email,
        avatarUrl: user.user_metadata?.avatar_url,
        provider: (user.app_metadata?.provider as AppUser['provider']) || 'phone',
      };
      persistLocalUser(appUser);
      return appUser;
    }
  }
  return getLocalUser();
}

/**
 * Sign out — clears both Supabase session and localStorage.
 */
export async function signOut(): Promise<void> {
  if (isSupabaseConfigured() && supabase) {
    await supabase.auth.signOut();
  }
  clearLocalUser();
}

/**
 * Listen for auth state changes (useful after OAuth redirects).
 * Returns an unsubscribe function.
 */
export function onAuthChange(
  callback: (user: AppUser | null) => void,
): () => void {
  if (isSupabaseConfigured() && supabase) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const appUser: AppUser = {
          id: session.user.id,
          fullName:
            session.user.user_metadata?.full_name ||
            session.user.email ||
            'User',
          phone: session.user.phone || '',
          email: session.user.email,
          avatarUrl: session.user.user_metadata?.avatar_url,
          provider:
            (session.user.app_metadata?.provider as AppUser['provider']) ||
            'phone',
        };
        persistLocalUser(appUser);
        callback(appUser);
      } else {
        clearLocalUser();
        callback(null);
      }
    });
    return () => subscription.unsubscribe();
  }

  // No-op unsubscribe when Supabase isn't configured
  return () => {};
}
