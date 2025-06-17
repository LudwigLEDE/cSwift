<script>
  // Home page component
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { CircleUserRound, DownloadCloud, ChevronRight } from 'lucide-svelte';

  let email = '';
  let chartData = [];
  let portfolios = [];

  // Generate dummy chart data and fetch portfolios
  onMount(async () => {
    chartData = Array.from({ length: 20 }, () => Math.random() * 100);
    const { data, error } = await supabase
      .from('portfolios')
      .select('id,name,value,change')
      .eq('user_id', $user?.id);
    if (data) portfolios = data;
  });

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }

  function handleEmailSignup() {
    supabase.auth.signUp({ email });
    goto('/signup');
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
  </section>

  <!-- Estimated Balance Card -->
  <section class="bg-[var(--color-background-light)] p-6 rounded-lg shadow flex justify-between items-center">
    <div>
      <div class="text-sm text-[var(--color-copy-light)]">Estimated Balance</div>
      <div class="text-3xl font-bold mt-1">0.00052358 <span class="text-sm">BTC</span></div>
      <div class="text-sm text-[var(--color-copy-light)]">≈ $56.21</div>
      <div class="text-sm mt-2">Today’s PnL: <span class="text-green-500">+ $0.31 (0.55%)</span></div>
    </div>
    <div class="flex flex-col items-end space-y-4">
      <div class="space-x-2">
        <button class="px-3 py-1 bg-[var(--color-border)] rounded-lg hover:bg-[var(--color-copy-light)] transition">Deposit</button>
        <button class="px-3 py-1 bg-[var(--color-border)] rounded-lg hover:bg-[var(--color-copy-light)] transition">Withdraw</button>
        <button class="px-3 py-1 bg-[var(--color-border)] rounded-lg hover:bg-[var(--color-copy-light)] transition">Cash In</button>
      </div>
      <div class="w-40 h-16 bg-gradient-to-b from-[var(--color-primary)] to-transparent rounded"></div>
    </div>
  </section>

  <!-- Portfolios Table -->
  <section class="bg-[var(--color-background-light)] p-6 rounded-lg shadow">
    <header class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold">Your Portfolios</h3>
      <a href="/portfolios" class="text-sm hover:text-[var(--color-primary)]">View All →</a>
    </header>
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="text-[var(--color-copy-light)] text-sm">
            <th class="pb-2">Name</th>
            <th class="pb-2">Value</th>
            <th class="pb-2">Change (%)</th>
            <th class="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          {#each portfolios as p}
            <tr>
              <td class="py-3 text-sm">{p.name}</td>
              <td class="py-3 text-sm">${p.value.toFixed(2)}</td>
              <td class="py-3 text-sm {p.change >= 0 ? 'text-green-500' : 'text-red-500'}">{p.change.toFixed(2)}%</td>
              <td class="py-3">
                <button type="button" class="text-[var(--color-primary)] hover:underline">View</button>
              </td>
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
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16 pb-12">
    <section class="space-y-6 px-4 lg:px-0">
      <h1 class="text-5xl font-extrabold leading-tight">
        <span class="text-[var(--color-primary)]">277,469,889</span><br />users trust us to learn & trade crypto
      </h1>
      <div class="flex max-w-md">
        <input
          type="email"
          bind:value={email}
          placeholder="Email or Phone number"
          class="flex-1 px-4 py-2 rounded-l-lg bg-[var(--color-background-light)] border border-[var(--color-border)] focus:outline-none"
        />
        <button

          class="px-6 py-2 rounded-r-lg bg-[var(--color-primary)] text-[var(--color-primary-content)] font-semibold hover:bg-[var(--color-primary-dark)] transition"
        >Sign Up</button>
      </div>
      <div class="flex space-x-4">
        <button on:click={() => supabase.auth.signInWithOAuth({ provider: 'google' })} class="p-2 bg-[var(--color-background-light)] rounded-lg hover:bg-[var(--color-border)]">G</button>
        <button on:click={() => supabase.auth.signInWithOAuth({ provider: 'apple' })} class="p-2 bg-[var(--color-background-light)] rounded-lg hover:bg-[var(--color-border)]"></button>
        <button class="p-2 bg-[var(--color-background-light)] rounded-lg hover:bg-[var(--color-border)]"><DownloadCloud /></button>
      </div>
    </section>
    <aside class="space-y-8 px-4 lg:px-0">
      <!-- Popular Section -->
      <div class="bg-[var(--color-background-light)] p-4 rounded-lg shadow">
        <header class="flex justify-between items-center mb-4">
          <h2 class="font-semibold">Popular</h2>
          <a href="/coins" class="text-sm hover:underline">View All 350+ →</a>
        </header>
        <ul class="space-y-2">
          <li class="flex justify-between"><span>BTC Bitcoin</span><span>$107,388.38 <span class="text-green-500">+1.06%</span></span></li>
          <li class="flex justify-between"><span>ETH Ethereum</span><span>$2,591.21 <span class="text-green-500">+0.67%</span></span></li>
          <li class="flex justify-between"><span>BNB BNB</span><span>$655.43 <span class="text-green-500">+0.45%</span></span></li>
          <li class="flex justify-between"><span>XRP XRP</span><span>$2.24 <span class="text-green-500">+2.59%</span></span></li>
          <li class="flex justify-between"><span>SOL Solana</span><span>$152.66 <span class="text-red-500">-2.71%</span></span></li>
        </ul>
      </div>
      <!-- News Section -->
      <div class="bg-[var(--color-background-light)] p-4 rounded-lg shadow">
        <header class="flex justify-between items-center mb-4">
          <h2 class="font-semibold">News</h2>
          <a href="/news" class="text-sm hover:underline">View All →</a>
        </header>
        <ul class="space-y-2 text-sm">
          <li>OpenAI secures $200M U.S. defense contract for AI pilot program</li>
          <li>Crypto exchange fundamentals: what every trader should know</li>
          <li>Understanding order books and trade execution</li>
          <li>Top learning resources for crypto beginners</li>
        </ul>
      </div>
    </aside>
  </div>
</main>
{/if}
