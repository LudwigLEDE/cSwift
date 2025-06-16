<script lang="ts">
  import { supabase, signIn } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';
  let email = '', password = '';

  async function handleSubmit() {
    const { data, error } = await signIn(email, password);
    if (error) return toast.error(error.message);
    toast.success('Signed in successfully');
    // TODO: redirect or update your user store
  }

  function handleGithub() {
    supabase.auth.signInWithOAuth({ provider: 'github' });
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full bg-white p-8 rounded shadow">
    <h2 class="text-center text-2xl font-bold mb-6">Log In</h2>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <input
        type="email"
        bind:value={email}
        required
        placeholder="Email"
        class="w-full px-3 py-2 border rounded"
      />
      <input
        type="password"
        bind:value={password}
        required
        placeholder="Password"
        class="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Sign In
      </button>
    </form>

    <div class="my-4 text-center">OR</div>

    <button
      on:click={handleGithub}
      class="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
    >
      Continue with GitHub
    </button>

    <div class="mt-4 text-center">
      <a href="/forgot-password" class="text-sm text-indigo-600 hover:underline">
        Forgot password?
      </a>
    </div>
  </div>
</div>
