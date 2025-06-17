import { createClient } from '@supabase/supabase-js';

// —————————————————————————————————————————————————————————————
// 1️⃣ Supabase client setup
// —————————————————————————————————————————————————————————————

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export { supabase };

// —————————————————————————————————————————————————————————————
// 2️⃣ Authentication helpers
// —————————————————————————————————————————————————————————————

export async function signUp(email, password) {
	if (!email || !password) {
		return { error: new Error('Email and password are required') };
	}
	return await supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
	return await supabase.auth.signInWithPassword({ email, password });
}

export function signInWithGithub() {
	return supabase.auth.signInWithOAuth({ provider: 'github' });
}

export async function sendResetEmail(email) {
	if (!email) return { error: new Error('Email is required') };
	return await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`
	});
}

export async function resetPassword(newPassword) {
	const accessToken = new URLSearchParams(window.location.search).get('access_token');
	if (!accessToken) {
		throw new Error('No access_token found in URL');
	}
	return await supabase.auth.updateUser({ password: newPassword }, { accessToken });
}

export async function verifyOtp({ type, token, phone = null }) {
	return await supabase.auth.verifyOtp({ type, token, phone });
}

export async function signOut() {
	return await supabase.auth.signOut();
}

export async function getCurrentUser() {
	const { data, error } = await supabase.auth.getUser();
	return { user: data?.user ?? null, error };
}

// —————————————————————————————————————————————————————————————
// 3️⃣ Portfolio & trading helpers
// —————————————————————————————————————————————————————————————

export async function createPortfolio({
	user_id,
	name,
	initial_cash,
	currency,
	asset_classes,
	order_types,
	leverage
}) {
	if (!user_id || !name) {
		return { error: new Error('user_id and name are required'), data: null };
	}

	const { data, error } = await supabase
		.from('portfolios')
		.insert([
			{
				user_id,
				name,
				initial_cash,
				cash: initial_cash,
				currency,
				asset_classes,
				order_types,
				leverage
			}
		])
		.single();

	return { data, error };
}

export async function getPortfolios(user_id) {
	if (!user_id) return { error: new Error('user_id is required'), data: null };

	const { data, error } = await supabase.from('portfolios').select('*').eq('user_id', user_id);

	return { data, error };
}

export async function getPortfolio(portfolio_id) {
	const { data, error } = await supabase
		.from('portfolios')
		.select('*')
		.eq('id', portfolio_id)
		.single();

	return { data, error };
}

export async function placeOrder({ portfolio_id, symbol, side, order_type, price, quantity }) {
	if (!portfolio_id || !symbol || !side || !order_type || !quantity) {
		return { data: null, error: new Error('Missing required trade fields') };
	}

	let executedPrice = price;
	if (order_type === 'market') {
		const res = await fetch(`/api/quote?symbol=${symbol}`);
		const json = await res.json();
		executedPrice = json.price;
	}

	const { data: trade, error: tradeError } = await supabase
		.from('trades')
		.insert([{ portfolio_id, symbol, side, quantity, price: executedPrice }])
		.single();

	if (tradeError) return { data: null, error: tradeError };

	const cost = executedPrice * quantity * (side === 'buy' ? -1 : 1);

	const { error: portfolioError } = await supabase.rpc('update_portfolio_cash', {
		portfolio_id,
		amount_delta: cost
	});

	if (portfolioError) return { data: null, error: portfolioError };

	return { data: trade, error: null };
}
