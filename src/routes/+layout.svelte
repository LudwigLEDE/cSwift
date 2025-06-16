<script lang="ts">
  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';

  // use a Svelte-5–compatible fork + vendor its CSS
  import { Toaster } from 'svelte-hot-french-toast';
  import '$lib/toast.css';
</script>

<!-- mount the toaster once, at the top level -->
<Toaster position="top-end" />

<!-- your nav bar -->
<Nav />

<!-- this is the new way to render page content in SvelteKit -->
<slot />
