<script>
  import { createPortfolio } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';
  import { user } from '$lib/stores/user';

  let name = '';
  let cash = 100000;
  let currency = 'USD';
  let asset_classes = ['stocks', 'crypto', 'forex', 'fx', 'crypto'];
  let order_types = ['market', 'limit', 'stop-loss', 'take-profit'];
  let leverage = false;

  async function handleSubmit() {
    const { data, error } = await createPortfolio({
      user_id: $user.id,
      name,
      initial_cash: cash,
      currency,
      asset_classes,
      order_types,
      leverage
    });
    if (error) return toast.error(error.message);
    toast.success('Portfolio created!');
    location.href = '/dashboard';
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <form on:submit|preventDefault={handleSubmit} class="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
    <h2 class="text-2xl font-bold text-center">Create Portfolio</h2>
    <input type="text" bind:value={name} placeholder="Portfolio Name" required class="w-full px-3 py-2 border rounded" />
    <input type="number" bind:value={cash} placeholder="Initial Cash (e.g. 100000)" required class="w-full px-3 py-2 border rounded" />
    <select bind:value={currency} class="w-full px-3 py-2 border rounded">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
    <!-- asset_classes & order_types toggles can be added here -->
    <label class="flex items-center space-x-2">
      <input type="checkbox" bind:checked={leverage} />
      <span>Enable short selling / leverage</span>
    </label>
    <button type="submit" class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
      Create
    </button>
  </form>
</div>