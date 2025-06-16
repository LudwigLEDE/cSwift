import { json } from '@sveltejs/kit';
import { placeOrder } from '$lib/supabase';

export async function POST({ request }) {
	const body = await request.json();
	const { data, error } = await placeOrder(body);
	if (error) return json({ error: error.message }, { status: 400 });
	return json(data);
}
