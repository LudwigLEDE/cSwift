<script>
	import '../app.css';
	let { children } = $props();
	import Nav from '$lib/components/Nav.svelte';
</script>
<Nav />
{@render children()}
