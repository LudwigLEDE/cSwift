<script>
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/user';
</script>

<nav class="bg-gray-800 text-white p-4 flex justify-between">
  <div class="space-x-4">
    <a href="/" class="hover:underline">Home</a>
    {#if $user}
      <a href="/dashboard" class="hover:underline">Dashboard</a>
    {/if}
  </div>

  <div class="space-x-4">
    {#if $user}
      <button on:click={() => supabase.auth.signOut()} class="hover:underline">Log Out</button>
    {:else}
      <a href="/login" class="hover:underline">Log In</a>
      <a href="/signup" class="hover:underline">Sign Up</a>
    {/if}
  </div>
</nav>
