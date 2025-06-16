import { json } from '@sveltejs/kit';

// Simple in-memory cache
const cache = new Map();
const TTL = 60 * 1000; // 1 minute

export async function GET({ url }) {
	const symbol = url.searchParams.get('symbol');
	if (!symbol) return json({ error: 'symbol required' }, { status: 400 });

	const now = Date.now();
	if (cache.has(symbol) && now - cache.get(symbol).ts < TTL) {
		return json({ price: cache.get(symbol).price });
	}

	// Fetch from Alpha Vantage
	const key = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
	const res = await fetch(
		`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
	);
	const payload = await res.json();
	const price = parseFloat(payload['Global Quote']['05. price']);

	cache.set(symbol, { price, ts: now });
	return json({ price });
}
