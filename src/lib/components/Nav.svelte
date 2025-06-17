<script>
  import { onMount, onDestroy } from 'svelte';
  import { scrollingDown } from '$lib/stores/scroll';
  import { user } from '$lib/stores/user';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import LogoButton from './Nav/LogoButton.svelte';
  import AccountDropdown from './Nav/Dropdown.svelte';
  import { BarChart2, TrendingUp, CircleUserRound, LogIn, UserPlus } from 'lucide-svelte';

  let lastY = 0;
  onMount(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      scrollingDown.set(y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  let currentUser = null;
  const unsubscribe = user.subscribe(u => currentUser = u);
  onDestroy(unsubscribe);

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<nav class="sticky top-0 z-50 bg-[var(--color-foreground)] text-[var(--color-copy)] p-4 flex items-center justify-between">
  <!-- Left Links: fade when scrolling down -->
  <div class="flex items-center transition-opacity duration-300" class:opacity-0={$scrollingDown}>
    <LogoButton />
    <div class="mx-4 h-6 w-px bg-[var(--color-border)]"></div>
    <a href="/dashboard" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <BarChart2 class="w-5 h-5" />
      <span>Portfolios</span>
    </a>
    <a href="/trading" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <TrendingUp class="w-5 h-5" />
      <span>Trading</span>
    </a>
    <a href="/leaderboard" class="flex items-center space-x-1 px-2 py-1 rounded transition-colors hover:text-[var(--color-primary)]">
      <CircleUserRound class="w-5 h-5" />
      <span>Leaderboard</span>
    </a>
  </div>

  <!-- Center Logo on Scroll Down -->
  {#if $scrollingDown}
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 opacity-100">
      <a href="/"> <img
      src="/counterSwiftLogoL.svg"
      alt="CounterSwift Logo"
      class="w-12 h-10"
    /></a>
  
    </div>
  {/if}

  <!-- Right User Controls: fade when scrolling down -->
  <div class="flex items-center space-x-4 transition-opacity duration-300" class:opacity-0={$scrollingDown}>
    {#if currentUser}
      <AccountDropdown />
    {:else}
      <a href="/login" class="rounded-lg relative w-24 h-8 flex items-center border border-[var(--color-primary)] bg-[var(--color-foreground)] group overflow-hidden transition-all duration-300">
        <span class="text-[var(--color-primary-content)] font-semibold ml-4 transform transition-all duration-300 group-hover:translate-x-12">
          Log In
        </span>
        <span class="absolute right-0 h-full w-8 flex items-center justify-center bg-[var(--color-foreground)] transition-all duration-300 group-hover:w-full group-hover:translate-x-0">
          <LogIn class="w-4 h-4 text-[var(--color-primary-content)]" />
        </span>
      </a>

      <a href="/signup" class="rounded-lg relative w-26 h-8 flex items-center border border-[var(--color-secondary)] bg-[var(--color-secondary)] group overflow-hidden transition-all duration-300">
        <span class="text-[var(--color-primary-content)] font-semibold ml-1 p-1 transform transition-all duration-300 group-hover:translate-x-12">
          Sign Up
        </span>
        <span class="absolute right-0 h-full w-8 flex items-center justify-center bg-[var(--color-secondary)] transition-all duration-300 group-hover:w-full group-hover:translate-x-0">
          <UserPlus class="w-4 h-4 text-[var(--color-primary-content)]" />
        </span>
      </a>
    {/if}
  </div>
</nav>
