import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	const {
		data: { session }
	} = await supabase.auth.getSession();
	if (!session) {
		throw redirect(303, '/login');
	}
	return { user: session.user };
};
