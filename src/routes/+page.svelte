<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { CircleUserRound } from 'lucide-svelte';
  import SmoothScrollHero from '$lib/components/home/SmoothScrollHero.svelte';
  import { Chart } from 'layerchart';

  let portfolios = [];
  let totalValue = 0;
  let chartData = [];
  let chart;

  $: if ($user?.id) fetchPortfolios($user.id);

  async function fetchPortfolios(userId) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('name, cash')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching portfolios:', error.message);
      return;
    }

    portfolios = data || [];
    totalValue = portfolios.reduce((sum, p) => sum + (p.cash || 0), 0);
    chartData = portfolios.map((p, i) => ({ x: i + 1, y: p.cash }));

    drawChart();
  }

  function drawChart() {
    if (!chartData.length) return;
    const container = document.getElementById('portfolio-chart');
    if (!container) return;

    container.innerHTML = '';

    chart = new Chart({
      target: container,
      data: [{ label: 'Portfolio Value', data: chartData }],
      x: { type: 'linear' },
      y: { type: 'linear' },
      height: 120,
      color: 'var(--color-primary)'
    });
  }

  function handleEmailSignup() {
    goto('/signup');
  }

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

{#if $user}
<main class="min-h-screen bg-[var(--color-background)] text-[var(--color-copy)] p-8 space-y-8">
  <section class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <CircleUserRound class="w-12 h-12 text-[var(--color-primary)]" />
      <div>
        <h2 class="text-xl font-semibold truncate">{$user.user_metadata.full_name || $user.email}</h2>
        <div class="text-sm text-[var(--color-copy-light)]">UID: {$user.id}</div>
      </div>
    </div>
  </section>

  <section class="bg-[var(--color-foreground)] p-6 rounded-lg shadow">
    <div class="mb-4">
      <div class="text-sm text-[var(--color-copy-light)]">Total Portfolio Value</div>
      <div class="text-3xl font-bold mt-1">${totalValue.toFixed(2)}</div>
    </div>
    <div id="portfolio-chart" class="w-full h-[120px]">
      <Chart />
    </div>
  </section>

  <section class="bg-[var(--color-background-light)] p-6 rounded-lg shadow">
    <header class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">Your Portfolios</h3>
      <a href="/dashboard" class="text-sm hover:text-[var(--color-primary)]">Manage →</a>
    </header>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="text-[var(--color-copy-light)] text-sm">
            <th class="pb-2">Name</th>
            <th class="pb-2">Value</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          {#each portfolios as p}
            <tr>
              <td class="py-3 text-sm">{p.name}</td>
              <td class="py-3 text-sm">${p.cash?.toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
{:else}
<main class="bg-[var(--color-background)] text-[var(--color-copy)]">
  <SmoothScrollHero></SmoothScrollHero>
</main>
{/if}
