<script lang="ts">
  import { sendResetEmail } from '$lib/supabase';
  import toast from 'svelte-hot-french-toast';
  let email = '';

  async function handleSubmit() {
    const { data, error } = await sendResetEmail(email);
    if (error) return toast.error(error.message);
    toast.success('Reset link sent—check your inbox!');
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="max-w-md w-full bg-white p-8 rounded shadow">
    <h2 class="text-center text-2xl font-bold mb-6">Forgot Password</h2>

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <input
        type="email"
        bind:value={email}
        required
        placeholder="Email"
        class="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        class="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Send Reset Link
      </button>
    </form>

    <div class="mt-4 text-center">
      <a href="/login" class="text-sm text-indigo-600 hover:underline">
        Back to Log In
      </a>
    </div>
  </div>
</div>
