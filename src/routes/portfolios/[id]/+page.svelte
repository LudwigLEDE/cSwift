<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/user';
  import toast from 'svelte-hot-french-toast';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let currentUser;
  let portfolioId;
  let portfolio = null;
  let trades = [];
  let positions = [];
  let loading = true;

  // Subscribe to auth and route params
  const unsubscribeUser = user.subscribe(u => currentUser = u);
  const unsubscribePage = page.subscribe(p => portfolioId = p.params.id);

  onMount(async () => {
    if (!currentUser) {
      goto('/login');
      return;
    }

    // Fetch portfolio
    const { data: p, error: pErr } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', portfolioId)
      .single();
    if (pErr) {
      toast.error(pErr.message);
      goto('/dashboard');
      return;
    }
    portfolio = p;

    // Fetch trades
    const { data: t, error: tErr } = await supabase
      .from('trades')
      .select('*')
      .eq('portfolio_id', portfolioId)
      .order('executed_at', { ascending: true });
    if (tErr) {
      toast.error(tErr.message);
    } else {
      trades = t;

      // Aggregate positions
      const map = {};
      for (const tr of trades) {
        const sym = tr.symbol;
        if (!map[sym]) map[sym] = { qty: 0, cost: 0 };
        const delta = tr.side === 'buy' ? tr.quantity : -tr.quantity;
        map[sym].qty += delta;
        map[sym].cost += tr.price * delta;
      }
      positions = Object.entries(map)
        .filter(([_, v]) => v.qty !== 0)
        .map(([symbol, v]) => ({
          symbol,
          quantity: v.qty,
          avgCost: v.cost / v.qty
        }));
    }

    loading = false;
  });
</script>

{#if loading}
  <div class="p-8">Loading portfolio…</div>
{:else}
  <div class="p-8 space-y-8">
    <!-- Portfolio Summary -->
    <div>
      <h1 class="text-3xl font-bold">{portfolio.name}</h1>
      <p class="text-gray-600">
        Cash: {portfolio.currency} {portfolio.cash.toFixed(2)} &mdash;
        Initial: {portfolio.currency} {portfolio.initial_cash.toFixed(2)}
      </p>
    </div>

    <!-- Positions -->
    <div>
      <h2 class="text-2xl font-semibold mb-2">Open Positions</h2>
      {#if positions.length === 0}
        <p>No open positions.</p>
      {:else}
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-2 py-1 text-left">Symbol</th>
              <th class="border px-2 py-1 text-right">Quantity</th>
              <th class="border px-2 py-1 text-right">Avg Cost</th>
              <th class="border px-2 py-1 text-right">Unrealized P/L</th>
            </tr>
          </thead>
          <tbody>
            {#each positions as pos}
              <tr>
                <td class="border px-2 py-1">{pos.symbol}</td>
                <td class="border px-2 py-1 text-right">{pos.quantity.toFixed(4)}</td>
                <td class="border px-2 py-1 text-right">{pos.avgCost.toFixed(2)}</td>
                <td class="border px-2 py-1 text-right">—</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>

    <!-- Trade History -->
    <div>
      <h2 class="text-2xl font-semibold mb-2">Trade History</h2>
      {#if trades.length === 0}
        <p>No trades executed yet.</p>
      {:else}
        <ul class="space-y-2">
          {#each trades as t}
            <li class="flex justify-between p-2 border rounded">
              <span>
                <strong>{t.symbol}</strong>
                <span class="ml-2">
                  {t.side === 'buy' ? 'Buy' : 'Sell'} {t.quantity} @ {t.price.toFixed(2)}
                </span>
              </span>
              <span class="text-gray-500 text-sm">
                {new Date(t.executed_at).toLocaleString()}
              </span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div>
      <a href="/dashboard" class="text-indigo-600 hover:underline">← Back to Dashboard</a>
    </div>
  </div>
{/if}
