<script>
  import { onMount } from 'svelte';
  import { GET } from '$lib/api/quote';
  import { placeOrder } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';

  export let data; // from load()
  let symbol = data.params.symbol;
  let price;

  async function fetchPrice() {
    const res = await fetch(`/api/quote?symbol=${symbol}`);
    const json = await res.json();
    price = json.price;
  }

  onMount(fetchPrice);

  let quantity = 0;
  async function buy() {
    const { data, error } = await placeOrder({ portfolio_id: /*...*/, symbol, side: 'buy', order_type: 'market', price: null, quantity });
    if (error) return toast.error(error.message);
    toast.success('Bought!');
  }
</script>

<h1>{symbol}</h1>
<p>Price: {price}</p>
<input type="number" bind:value={quantity} placeholder="Qty" />
<button on:click={buy}>Buy Market</button>