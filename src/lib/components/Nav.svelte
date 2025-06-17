<script>
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import LogoButton from './Nav/LogoButton.svelte';
  import AccountDropdown from './Nav/Dropdown.svelte';
  import { CircleUserRound, LogIn, UserPlus, BarChart2, TrendingUp } from 'lucide-svelte';

  let currentUser = null;
  const unsubscribe = user.subscribe(u => currentUser = u);

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }

  import { onDestroy } from 'svelte';
  onDestroy(unsubscribe);
</script>

<nav class="bg-[var(--color-background)] text-[var(--color-copy)] p-4 flex items-center justify-between">
  <div class="flex items-center">
    <LogoButton />
    <div class="mx-4 h-6 w-px bg-[var(--color-border)]"></div>
    <a href="/dashboard" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <BarChart2 class="w-5 h-5" />
      <span>Portfolio</span>
    </a>
    <a href="/trading" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <TrendingUp class="w-5 h-5" />
      <span>Trading</span>
    </a>
    <a href="/trading" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <TrendingUp class="w-5 h-5" />
      <span>Leaderboard</span>
    </a>
  </div>

 <div class="flex items-center space-x-4">
    {#if currentUser}
      <AccountDropdown />

    {:else}
      <a
        href="/login"
        class="rounded-lg relative w-24 h-8 cursor-pointer flex items-center border border-[var(--color-primary)] bg-[var(--color-background)] group hover:bg-[var(--color-background)] active:bg-[var(--color-background)] active:border-[var(--color-primary)] overflow-hidden"
      >
        <span
          class="text-[var(--color-primary-content)] font-semibold ml-4 transform transition-all duration-300 group-hover:translate-x-12"
          >Log In</span
        >
        <span
          class="absolute right-0 h-full w-8 rounded-lg bg-[var(--color-background)] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
        >
          <LogIn class="w-4 h-4 text-[var(--color-primary-content)]" />
        </span>
      </a>

      <a
        href="/signup"
        class="rounded-lg relative w-26 h-8 cursor-pointer flex items-center border border-[var(--color-primary)] bg-[var(--color-primary)] group hover:bg-[var(--color-primary)] active:bg-[var(--color-primary)] active:border-[var(--color-primary)] overflow-hidden"
      >
        <span
          class="text-[var(--color-primary-content)] font-semibold ml-1 p-1 transform transition-all duration-300 group-hover:translate-x-12"
          >Sign Up</span
        >
        <span
          class="absolute right-0 h-full w-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
        >
          <UserPlus class="w-4 h-4 text-[var(--color-primary-content)]" />
        </span>
      </a>
    {/if}
  </div>
</nav>
