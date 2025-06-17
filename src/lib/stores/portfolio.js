// src/lib/stores/portfolio.js
import { writable } from 'svelte/store';
import { getPortfolio } from '$lib/supabase';

// Holds the UUID of the portfolio you’ve chosen on the symbol page
export const selectedPortfolioId = writable(null);

// Holds the full portfolio object (cash, positions, etc.)
export const selectedPortfolio = writable(null);

// Whenever selectedPortfolioId changes, re‐fetch the portfolio
selectedPortfolioId.subscribe(async (id) => {
	if (!id) {
		selectedPortfolio.set(null);
	} else {
		const { data, error } = await getPortfolio(id);
		if (error) {
			console.error('Failed to load portfolio', error);
			selectedPortfolio.set(null);
		} else {
			selectedPortfolio.set(data);
		}
	}
});
