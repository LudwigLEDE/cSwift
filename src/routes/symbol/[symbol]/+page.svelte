<!-- src/routes/symbol/[symbol]/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { getPortfolios } from '$lib/supabase';
  import { user } from '$lib/stores/user';
  import toast from 'svelte-hot-french-toast';
  import Chart from '$lib/components/Chart.svelte';
  import OrderTicket from '$lib/components/OrderTicket.svelte';
  import { selectedPortfolioId, selectedPortfolio } from '$lib/stores/portfolio';

  let symbol = $page.params.symbol;
  let portfolios = [];

  // fetch user’s portfolios once
  onMount(async () => {
    const currentUser = $user;
    if (!currentUser) {
      toast.error('Please log in');
      return goto('/login');
    }
    const { data, error } = await getPortfolios(currentUser.id);
    if (error) toast.error(error.message);
    else portfolios = data;
  });

  // For displaying current cash in header
  let cashDisplay = '-';
  selectedPortfolio.subscribe((p) => {
    cashDisplay = p ? `${p.currency} ${p.cash.toFixed(2)}` : '-';
  });

  // After an order fills, re‐fetch the portfolio to refresh cash
  function onOrderFilled() {
    toast.success('Order filled – portfolio updated');
    // the store subscription will auto‐refresh
  }
</script>

<div class="p-6 space-y-6">
  <h1 class="text-3xl font-bold">Trading: {symbol}</h1>

  <!-- Portfolio selector -->
  <div>
    <label for="portfolioSelect" class="block mb-1 font-medium">
      Choose Portfolio
    </label>
    <select
      id="portfolioSelect"
      class="w-full max-w-sm px-3 py-2 border rounded"
      bind:value={$selectedPortfolioId}
    >
      <option value="" disabled selected>Select a portfolio…</option>
      {#each portfolios as p}
        <option value={p.id}>
          {p.name} — {p.currency} {p.cash.toFixed(2)}
        </option>
      {/each}
    </select>
  </div>

  {#if $selectedPortfolioId}
    <!-- Show live cash balance -->
    <div>
      <p class="text-lg">Cash Balance: {cashDisplay}</p>
    </div>

    <!-- Chart -->
    <div class="border rounded shadow p-4">
      <Chart {symbol} />
    </div>

    <!-- Order ticket binds to the same portfolio store -->
    <div class="border rounded shadow p-4">
      <OrderTicket
        {symbol}
        portfolioId={$selectedPortfolioId}
        on:filled={onOrderFilled}
      />
    </div>
  {:else}
    <p class="text-gray-600">
      Please select a portfolio above to view chart and trade.
    </p>
  {/if}
</div>
