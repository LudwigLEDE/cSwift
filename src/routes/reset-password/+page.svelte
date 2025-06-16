<script lang="ts">
  import { resetPassword } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';
  import { onMount } from 'svelte';

  let password = '';
  let confirm = '';
  let tokenPresent = false;

  onMount(() => {
    tokenPresent = Boolean(new URLSearchParams(window.location.search).get('access_token'));
    if (!tokenPresent) toast.error('No access token—please use the link in your email.');
  });

  async function handleSubmit() {
    if (password !== confirm) return toast.error("Passwords don't match");
    try {
      await resetPassword(password);
      toast.success('Password updated—please log in.');
      // optionally redirect to /login
    } catch (err) {
      toast.error(err.message);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full bg-white p-8 rounded shadow">
    <h2 class="text-center text-2xl font-bold mb-6">Reset Password</h2>

    {#if tokenPresent}
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <input
          type="password"
          bind:value={password}
          required
          placeholder="New password"
          class="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          bind:value={confirm}
          required
          placeholder="Confirm password"
          class="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          class="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Password
        </button>
      </form>
    {/if}

    <div class="mt-4 text-center">
      <a href="/login" class="text-sm text-indigo-600 hover:underline">
        Back to Log In
      </a>
    </div>
  </div>
</div>
