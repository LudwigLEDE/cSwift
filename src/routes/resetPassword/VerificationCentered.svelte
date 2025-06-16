<script lang="js">
    import toast, { Toaster } from 'svelte-5-french-toast';
      import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


  let code = '';

  async function handleSubmit() {
    try {
      await apiClient.post('/auth/verify', { code });
      toast.success('Verification successful');
    } catch (err) {
      toast.error(`Verification failed: ${err.message}`);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center text-3xl font-extrabold">Verification Code</h2>
    <form on:submit|preventDefault={handleSubmit} class="mt-6">
      <input type="text" bind:value={code} required placeholder="Enter code" class="w-full px-3 py-2 border rounded" />
      <button type="submit" class="w-full mt-4 py-2 rounded bg-indigo-600 text-white">Verify</button>
    </form>
  </div>
</div>