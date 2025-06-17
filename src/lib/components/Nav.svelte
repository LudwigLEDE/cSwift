<script>
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let currentUser = null;
  const unsubscribe = user.subscribe(u => currentUser = u);

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<nav class="bg-gray-800 text-white p-4 flex items-center justify-between">
  <div class="flex items-center space-x-4">
    <a href="/" class="hover:underline">Home</a>
    <a href="/dashboard" class="hover:underline">Portfolio Dashboard</a>
    <a href="/trading" class="hover:underline">Trading Dashboard</a>
  </div>

  <div class="flex items-center space-x-4">
    {#if currentUser}
      <a href="/user" class="hover:underline">My Account</a>
      <button on:click={logout} class="hover:underline">Log Out</button>
    {:else}
      <a href="/login" class="hover:underline">Log In</a>
      <a href="/signup" class="hover:underline">Sign Up</a>
    {/if}
  </div>
</nav>
