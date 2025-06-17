<script>
  // Home page component
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { CircleUserRound } from 'lucide-svelte';
	import SmoothScrollHero from '$lib/components/home/SmoothScrollHero.svelte';

  let portfolios = [];
  let totalValue = 0;
  let chartData = [];

  // Fetch portfolios when user logs in
  $: if ($user?.id) fetchPortfolios($user.id);

  async function fetchPortfolios(userId) {
    const { data } = await supabase
      .from('portfolios')
      .select('name,value')
      .eq('user_id', userId);
    portfolios = data || [];
    totalValue = portfolios.reduce((sum, p) => sum + p.value, 0);
    chartData = portfolios.map(p => p.value);
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
  <!-- User Header -->
  <section class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <CircleUserRound class="w-12 h-12 text-[var(--color-primary)]" />
      <div>
        <h2 class="text-xl font-semibold truncate">{$user.user_metadata.full_name || $user.email}</h2>
        <div class="text-sm text-[var(--color-copy-light)]">UID: {$user.id}</div>
      </div>
    </div>
    <button on:click={logout} class="px-4 py-2 bg-[var(--color-background-light)] text-[var(--color-copy)] rounded-lg hover:bg-[var(--color-border)] transition">Log Out</button>
  </section>

  <!-- Total Portfolio Value with Chart -->
  <section class="bg-[var(--color-background-light)] p-6 rounded-lg shadow">
    <div class="mb-4">
      <div class="text-sm text-[var(--color-copy-light)]">Total Portfolio Value</div>
      <div class="text-3xl font-bold mt-1">${totalValue.toFixed(2)}</div>
    </div>
    <svg width="100%" height="100" class="overflow-visible">
      <polyline
        fill="none"
        stroke="var(--color-primary)"
        stroke-width="2"
        points={
          chartData.length > 1
            ? chartData.map((v, i) => {
                const x = (i / (chartData.length - 1)) * 100;
                const max = Math.max(...chartData);
                const y = 100 - (v / max) * 100;
                return `${x},${y}`;
              }).join(' ')
            : ''
        }
      />
    </svg>
  </section>

  <!-- Portfolios List -->
  <section class="bg-[var(--color-background-light)] p-6 rounded-lg shadow">
    <header class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">Your Portfolios</h3>
      <a href="/portfolios" class="text-sm hover:text-[var(--color-primary)]">Manage →</a>
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
              <td class="py-3 text-sm">${p.value.toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>
{:else}
<main class="bg-[var(--color-background)] text-[var(--color-copy)]">
  <!-- Hero & Sidebar -->
  <div class="">
      <SmoothScrollHero />
  </div>
</main>
{/if}
