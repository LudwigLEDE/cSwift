<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/user';

  let email = '';
  let password = '';
  let error = '';

  // sync Supabase session → our store
  onMount(async () => {
    const { data } = await supabase.auth.getSession();
    user.set(data.session?.user ?? null);

    supabase.auth.onAuthStateChange((_e, session) => {
      user.set(session?.user ?? null);
    });
  });

  // email sign-up
  async function signUp() {
    error = '';
    const { error: err } = await supabase.auth.signUp({ email, password });
    if (err) error = err.message;
    else alert('Check your email for a confirmation link!');
  }

  // email login
  async function signInEmail() {
    error = '';
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) error = err.message;
  }

  // GitHub OAuth
  function signInGithub() {
    supabase.auth.signInWithOAuth({ provider: 'github' });
  }

  // log out
  function signOut() {
    supabase.auth.signOut();
  }
</script>

<div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
  <!-- If logged in, show logout -->
  {#if $user}
    <p class="mb-4">Logged in as {$user.email}</p>
    <button on:click={signOut} class="w-full py-2 rounded bg-gray-800 text-white">Log Out</button>
  {:else}
    <!-- Sign Up -->
    <h2 class="text-xl font-bold mb-2">Sign Up</h2>
    <input type="email" bind:value={email} placeholder="Email" class="w-full mb-2 p-2 border rounded" />
    <input type="password" bind:value={password} placeholder="Password" class="w-full mb-4 p-2 border rounded" />
    <button on:click={signUp} class="w-full py-2 rounded bg-green-600 text-white mb-4">Create Account</button>

    <!-- Log In -->
    <h2 class="text-xl font-bold mb-2">Log In</h2>
    <input type="email" bind:value={email} placeholder="Email" class="w-full mb-2 p-2 border rounded" />
    <input type="password" bind:value={password} placeholder="Password" class="w-full mb-4 p-2 border rounded" />
    <button on:click={signInEmail} class="w-full py-2 rounded bg-blue-600 text-white mb-4">Log In</button>

    <div class="text-center my-2">OR</div>
    <button on:click={signInGithub} class="w-full py-2 rounded bg-gray-700 text-white">Continue with GitHub</button>

    {#if error}
      <p class="mt-4 text-red-600 text-center">{error}</p>
    {/if}
  {/if}
</div>

<style>
  /* nothing extra */
</style>
