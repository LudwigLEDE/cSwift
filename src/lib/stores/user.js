import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const user = writable(null);

// Initialize: read current session
supabase.auth.getSession().then(({ data: { session } }) => {
	user.set(session?.user ?? null);
});

// Subscribe to auth changes (login, logout, token refresh…)
supabase.auth.onAuthStateChange((_event, session) => {
	user.set(session?.user ?? null);
});
