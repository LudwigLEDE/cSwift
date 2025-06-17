<script lang="js">
  import { supabase } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { Github, Twitter, ArrowLeft } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let fullName = '';
  let avatarUrl = '';
  let email = '';
  let password = '';

  async function handleSubmit() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error('Signup error:', error);
      toast.error(error.message);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('Profile update error:', updateError);
        toast.error('Signup succeeded, but failed to save profile.');
      }
    }

    toast.success('Check your email for a confirmation link!');
    goto('/login');
  }

  function goBack() {
    history.back();
  }

  function handleGithub() {
    supabase.auth.signInWithOAuth({ provider: 'github' });
  }

  function handleTwitter() {
    supabase.auth.signInWithOAuth({ provider: 'twitter' });
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-[var(--color-background)] text-[var(--color-copy)]">
  <div
    class="relative z-10 w-full max-w-md p-6 bg-[var(--color-foreground)] border border-[var(--color-border)] rounded-2xl shadow-lg"
    in:fly={{ y: 25, duration: 750, easing: cubicOut }}
  >
    <button on:click={goBack} class="absolute left-4 top-4 flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline">
      <ArrowLeft size={16} /> Go back
    </button>

    <div class="mb-6 text-center">
      <h1 class="text-2xl font-semibold">Create a new account</h1>
      <p class="text-sm text-[var(--color-copy-light)]">
        Already have an account?
        <a href="/login" class="text-[var(--color-primary)] hover:underline">Sign In</a>
      </p>
    </div>

    <div class="space-y-4">
      <div class="flex gap-3">
        <button on:click={handleGithub} class="flex-1 flex items-center justify-center gap-2 rounded-md border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background)] to-[var(--color-background-light)] px-3 py-2 text-[var(--color-copy)] transition-all duration-300 hover:scale-105">
          <Github /> GitHub
        </button>
      </div>
    </div>

    <div class="my-6 flex items-center text-[var(--color-copy-light)]">
      <div class="flex-grow h-px bg-[var(--color-border)]"></div>
      <span class="mx-3">OR</span>
      <div class="flex-grow h-px bg-[var(--color-border)]"></div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="fullName" class="block mb-1 text-sm">Full Name</label>
        <input
          id="fullName"
          type="text"
          bind:value={fullName}
          required
          placeholder="Your full name"
          class="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div>
        <label for="email" class="block mb-1 text-sm">Email</label>
        <input id="email" type="email" bind:value={email} required
               placeholder="your.email@provider.com"
               class="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <div>
        <label for="password" class="block mb-1 text-sm">Password</label>
        <input id="password" type="password" bind:value={password} required
               placeholder="••••••••••••"
               class="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
      </div>
      <button type="submit" class="w-full rounded-md bg-[var(--color-primary)] text-[var(--color-primary-content)] px-4 py-2 text-lg font-semibold ring-2 ring-[var(--color-primary)]/50 ring-offset-2 ring-offset-[var(--color-background)] transition-transform hover:scale-105 active:scale-95">
        Sign Up
      </button>
    </form>

    <p class="mt-6 text-xs text-[var(--color-copy-light)] text-center">
      By signing up, you agree to our
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class="text-[var(--color-primary)] hover:underline">Terms & Conditions</a>
      and
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class="text-[var(--color-primary)] hover:underline">Privacy Policy</a>.
    </p>
  </div>
</div>
