<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/user';
  import toast from 'svelte-hot-french-toast';

  let portfolios = [];
  let currentUser = null;

  const unsubscribe = user.subscribe((u) => (currentUser = u));

  onMount(async () => {
    if (!currentUser) return;
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', currentUser.id);
    if (error) return toast.error(error.message);
    portfolios = data;
  });
</script>


<div class="p-8">
  <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

  <section class="mb-8">
    <a href="/portfolios/create" class="text-indigo-600 hover:underline">
      + Create New Portfolio
    </a>
  </section>

  <section>
    <h2 class="text-2xl font-semibold mb-4">Your Portfolios</h2>
    {#if portfolios.length === 0}
      <p>No portfolios yet. Create one above!</p>
    {:else}
      <ul class="space-y-2">
        {#each portfolios as p}
          <li class="p-4 border rounded hover:bg-gray-50">
            <a href={`/portfolios/${p.id}`} class="font-medium text-lg">
              {p.name} — ${p.cash.toFixed(2)} {p.currency}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</div>