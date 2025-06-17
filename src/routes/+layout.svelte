<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import { Toaster } from 'svelte-hot-french-toast';
  import '$lib/toast.css';
  import { scrollingDown } from '$lib/stores/scroll';
</script>

<Toaster position="bottom-end" />

<Nav />

<main>
  <slot />
</main>
