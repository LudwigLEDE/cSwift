<script>
  import { ChevronDown, User, Settings , LogOut as LogoutIcon } from 'lucide-svelte';
  import { scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  let open = false;
  const options = [
    { icon: User, text: 'Account', action: () => {/* navigate to edit */} },
    { icon: Settings , text: 'Setting', action: () => {/* duplicate logic */} },
    { icon: LogoutIcon, text: 'Log Out', action: async () => { await supabase.auth.signOut(); goto('/login'); } }
  ];

  function toggle() {
    open = !open;
  }

  function handleOutsideClick(event) {
    if (open && !event.target.closest('.dropdown-container')) {
      open = false;
    }
  }

  function onKey(event) {
    if (event.key === 'Escape') open = false;
  }

  onMount(() => {
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', handleOutsideClick);
  });
  onDestroy(() => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('click', handleOutsideClick);
  });
</script>

<div class="relative inline-block dropdown-container">
  <button
    type="button"
    aria-haspopup="menu"
    aria-expanded={open}
    on:click={toggle}
    class={`rounded-lg relative h-8 flex items-center border border-[var(--color-primary)] bg-[var(--color-primary)] overflow-hidden transition-all duration-300 ${open ? 'w-8' : 'w-36'}`}
  >
    <span
      class={`text-[var(--color-primary-content)] font-semibold ml-4 transition-all duration-300 ${open ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}
    >
      My Account
    </span>
    <span
      class="absolute right-0 h-full w-8 flex items-center justify-center bg-[var(--color-primary)] transition-transform duration-200"
    >
      <ChevronDown
        class={`w-4 h-4 text-[var(--color-primary-content)] transform ${open ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
    </span>
  </button>

  {#if open}
    <ul
      role="menu"
      in:scale={{ duration: 200, easing: cubicOut }}
      out:scale={{ duration: 150, easing: cubicOut }}
      style="transform-origin: top center;"
      class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[var(--color-background)] shadow-lg rounded-lg w-48 overflow-hidden z-10"
    >
      {#each options as { icon: Icon, text, action }, idx}
        <li role="none"
          in:fly={{ y: -10, duration: 200, delay: idx * 50, easing: cubicOut }}
          out:fly={{ y: -10, duration: 150, delay: (options.length - idx - 1) * 50, easing: cubicOut }}
        >
          <button
            type="button"
            role="menuitem"
            on:click={() => { action(); open = false; }}
            class={
              `w-full text-left flex items-center gap-2 p-2 text-xs font-medium transition-colors ` +
              (text === 'Log Out'
                ? 'text-red-600 hover:bg-red-100 hover:text-red-600'
                : 'text-[var(--color-copy)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color--primary-content)]')
            }
          >
            <Icon class="w-4 h-4" aria-hidden="true" />
            <span>{text}</span>
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
