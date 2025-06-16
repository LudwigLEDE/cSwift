<script>
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores/user';
  import Button from './Button.svelte';

  async function logout() {
    await supabase.auth.signOut();
  }
</script>

<nav class="bg-gray-800 text-white p-4 flex justify-between">
  <div class="space-x-4">
    <a href="/" class="hover:underline">Home</a>

    {#if $user}
      <a href="/dashboard" class="hover:underline">Dashboard</a>
      <a href="/verify" class="hover:underline">Verify Account</a>
    {:else}
      <a href="/login" class="hover:underline">Log In</a>
      <a href="/signup" class="hover:underline">Sign Up</a>
      <a href="/forgot-password" class="hover:underline">Forgot Password</a>
    {/if}
  </div>

  <div class="space-x-4">
    {#if $user}
      <button
        on:click={logout}
        class="hover:underline focus:outline-none"
      >
        Log Out
      </button>
    {:else}
      <Button>
        Test
      </Button>
    {/if}
  </div>
</nav>
