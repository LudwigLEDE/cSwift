<!-- src/lib/components/OrderTicket.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  import toast from 'svelte-hot-french-toast';
  import { placeOrder } from '$lib/supabase';

  export let symbol;
  export let portfolioId;

  const dispatch = createEventDispatcher();

  let side = 'buy';
  let orderType = 'market';
  let quantity = 0;
  let price = 0;
  let stopPrice = 0;
  let takeProfit = 0;
  let submitting = false;

  async function submitOrder() {
    if (!portfolioId) {
      return toast.error('Portfolio ID is required');
    }
    if (quantity <= 0) {
      return toast.error('Quantity must be > 0');
    }
    const payload = {
      portfolio_id: portfolioId,
      symbol,
      side,
      order_type: orderType,
      quantity,
      price: null
    };
    if (orderType === 'limit') payload.price = price;
    if (orderType === 'stop-loss') payload.price = stopPrice;
    if (orderType === 'take-profit') payload.price = takeProfit;

    submitting = true;
    const { data, error } = await placeOrder(payload);
    submitting = false;

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        `${side === 'buy' ? 'Bought' : 'Sold'} ${quantity} ${symbol}`
      );
      dispatch('filled', { data });
    }
  }
</script>

<div class="border p-4 rounded bg-white space-y-4">
  <h3 class="font-semibold">Order Ticket: {symbol}</h3>

  <!-- Side & Order Type -->
  <div class="flex space-x-2">
    <div class="flex-1">
      <label for="sideSelect" class="block text-sm font-medium">Side</label>
      <select
        id="sideSelect"
        bind:value={side}
        class="w-full px-2 py-1 border rounded"
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
    </div>

    <div class="flex-1">
      <label for="typeSelect" class="block text-sm font-medium">Order Type</label>
      <select
        id="typeSelect"
        bind:value={orderType}
        class="w-full px-2 py-1 border rounded"
      >
        <option value="market">Market</option>
        <option value="limit">Limit</option>
        <option value="stop-loss">Stop-Loss</option>
        <option value="take-profit">Take-Profit</option>
      </select>
    </div>
  </div>

  <!-- Quantity -->
  <div>
    <label for="quantityInput" class="block text-sm font-medium">Quantity</label>
    <input
      id="quantityInput"
      type="number"
      bind:value={quantity}
      min="0"
      step="any"
      class="w-full px-2 py-1 border rounded"
    />
  </div>

  <!-- Conditional Price Inputs -->
  {#if orderType === 'limit'}
    <div>
      <label for="limitPrice" class="block text-sm font-medium">Limit Price</label>
      <input
        id="limitPrice"
        type="number"
        bind:value={price}
        min="0"
        step="any"
        class="w-full px-2 py-1 border rounded"
      />
    </div>
  {:else if orderType === 'stop-loss'}
    <div>
      <label for="stopPrice" class="block text-sm font-medium">Stop Price</label>
      <input
        id="stopPrice"
        type="number"
        bind:value={stopPrice}
        min="0"
        step="any"
        class="w-full px-2 py-1 border rounded"
      />
    </div>
  {:else if orderType === 'take-profit'}
    <div>
      <label for="takeProfit" class="block text-sm font-medium">Take-Profit Price</label>
      <input
        id="takeProfit"
        type="number"
        bind:value={takeProfit}
        min="0"
        step="any"
        class="w-full px-2 py-1 border rounded"
      />
    </div>
  {/if}

  <!-- Submit -->
  <button
    on:click={submitOrder}
    class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
    disabled={submitting}
  >
    {submitting
      ? 'Placing…'
      : side === 'buy'
      ? 'Buy'
      : 'Sell'}
  </button>
</div>
