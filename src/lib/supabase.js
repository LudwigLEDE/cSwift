// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

// —————————————————————————————————————————————————————————————
// 1️⃣ Instantiate the Supabase client
// —————————————————————————————————————————————————————————————
const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export { supabase };

// —————————————————————————————————————————————————————————————
// 2️⃣ Authentication helpers
// —————————————————————————————————————————————————————————————

/**
 * Sign up a new user with email & password.
 * Returns { data: { user, session }, error }.
 */
export async function signUp(email, password) {
	return await supabase.auth.signUp({ email, password });
}

/**
 * Sign in with email & password.
 * Returns { data: { session, user }, error }.
 */
export async function signIn(email, password) {
	return await supabase.auth.signInWithPassword({ email, password });
}

/**
 * Sign in via GitHub OAuth (popup/redirect).
 */
export function signInWithGithub() {
	return supabase.auth.signInWithOAuth({ provider: 'github' });
}

/**
 * Send a password-reset link to the user’s email.
 * The link will redirect back to `/reset-password`.
 */
export async function sendResetEmail(email) {
	return await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`
	});
}

/**
 * Complete the password reset using the access_token from URL.
 * Extracts `access_token` from the query string and calls updateUser.
 */
export async function resetPassword(newPassword) {
	const accessToken = new URLSearchParams(window.location.search).get('access_token');
	if (!accessToken) {
		throw new Error('No access_token found in URL');
	}
	return await supabase.auth.updateUser({ password: newPassword }, { accessToken });
}

/**
 * Verify an OTP code (if you use phone or magic link flows).
 * type: 'signup' | 'email_change' | 'sms'
 * token: the code received
 * phone: only if type === 'sms'
 */
export async function verifyOtp({ type, token, phone = null }) {
	return await supabase.auth.verifyOtp({ type, token, phone });
}

// —————————————————————————————————————————————————————————————
// 3️⃣ Portfolio & trading helpers
// —————————————————————————————————————————————————————————————

/**
 * Create a new paper-trading portfolio.
 * - user_id: UUID from auth.user.id
 * - name: string
 * - initial_cash: number (e.g. 100000)
 * - currency: 'USD'|'EUR'|'GBP', etc.
 * - asset_classes: array of strings ['stocks','crypto','forex',…]
 * - order_types: array of strings ['market','limit','stop-loss','take-profit']
 * - leverage: boolean
 *
 * Returns { data: portfolio, error }.
 */
export async function createPortfolio({
	user_id,
	name,
	initial_cash,
	currency,
	asset_classes,
	order_types,
	leverage
}) {
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

/**
 * Fetch all portfolios belonging to a given user.
 * Returns { data: [portfolios], error }.
 */
export async function getPortfolios(user_id) {
	const { data, error } = await supabase.from('portfolios').select('*').eq('user_id', user_id);
	return { data, error };
}

/**
 * Fetch a single portfolio by its ID.
 * Returns { data: portfolio, error }.
 */
export async function getPortfolio(portfolio_id) {
	const { data, error } = await supabase
		.from('portfolios')
		.select('*')
		.eq('id', portfolio_id)
		.single();
	return { data, error };
}

/**
 * Place an order on a portfolio.
 * - portfolio_id: UUID
 * - symbol: string e.g. 'AAPL'
 * - side: 'buy' | 'sell'
 * - order_type: 'market' | 'limit' | 'stop-loss' | 'take-profit'
 * - price: number (for non-market orders, ignored if 'market')
 * - quantity: number
 *
 * Returns { data: tradeRecord, error }.
 */
export async function placeOrder({ portfolio_id, symbol, side, order_type, price, quantity }) {
	// 1) Determine execution price
	let executedPrice = price;
	if (order_type === 'market') {
		// fetch latest quote via our API endpoint
		const res = await fetch(`/api/quote?symbol=${symbol}`);
		const json = await res.json();
		executedPrice = json.price;
	}

	// 2) Insert into trades
	const { data: trade, error: tradeError } = await supabase
		.from('trades')
		.insert([{ portfolio_id, symbol, side, quantity, price: executedPrice }])
		.single();
	if (tradeError) {
		return { data: null, error: tradeError };
	}

	// 3) Adjust the cash balance
	// cost is negative for buy, positive for sell
	const cost = executedPrice * quantity * (side === 'buy' ? -1 : 1);
	const { error: portfolioError } = await supabase
		.from('portfolios')
		.update({ cash: supabase.raw('cash + ?', [cost]), updated_at: new Date() })
		.eq('id', portfolio_id);

	if (portfolioError) {
		return { data: null, error: portfolioError };
	}

	return { data: trade, error: null };
}
