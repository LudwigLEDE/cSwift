<!-- src/routes/trading/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import TestChart from '$lib/components/TestChart.svelte';  // ← import it
  import { user } from '$lib/stores/user';
  import { goto } from '$app/navigation';
  import toast from 'svelte-hot-french-toast';

  let currentUser;
  user.subscribe(u => currentUser = u);

  onMount(() => {
    if (!currentUser) {
      toast.error('Please log in');
      goto('/login');
    }
  });
</script>

<div class="p-6">
  <h1 class="text-2xl font-bold mb-4">Trading Dashboard — Test Chart</h1>

  <!-- Render the TestChart component -->
  <TestChart />
</div>
