<script lang="js">
      import toast, { Toaster } from 'svelte-5-french-toast';

      import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      await apiClient.post('/auth/signin', { email, password });
      toast.success('Signed in successfully');
    } catch (err) {
      toast.error(`Sign in failed: ${err.message}`);
    }
  }
</script>

<div class="max-w-md mx-auto mt-10">
  <h2 class="text-center text-3xl font-extrabold">Sign in</h2>
  <form on:submit|preventDefault={handleSubmit} class="mt-6 space-y-4">
    <input type="email" bind:value={email} required placeholder="Email" class="w-full px-3 py-2 border rounded" />
    <input type="password" bind:value={password} required placeholder="Password" class="w-full px-3 py-2 border rounded" />
    <button type="submit" class="w-full py-2 rounded bg-indigo-600 text-white">Sign in</button>
  </form>
</div>