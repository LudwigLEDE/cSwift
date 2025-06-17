<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { Toaster } from 'svelte-hot-french-toast';
  import '$lib/toast.css';
  import { scrollingDown } from '$lib/stores/scroll';
</script>

<Toaster position="top-end" />

<Nav />

<main
  class="transition-opacity duration-300 ease-in-out"
  class:opacity-0={$scrollingDown}
  class:opacity-100={!$scrollingDown}
>
  <slot />
</main>
