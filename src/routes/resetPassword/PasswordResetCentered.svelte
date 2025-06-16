<script lang="js">
      import toast, { Toaster } from 'svelte-5-french-toast';

      import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


  let password = '';
  let confirmPassword = '';

  async function handleSubmit() {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await apiClient.post('/auth/reset-password', { password });
      toast.success('Password reset successful');
    } catch (err) {
      toast.error(`Reset failed: ${err.message}`);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-white p-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center text-3xl font-extrabold">Set a new password</h2>
    <form on:submit|preventDefault={handleSubmit} class="mt-6 space-y-4">
      <input type="password" bind:value={password} required placeholder="New password" class="w-full px-3 py-2 border rounded" />
      <input type="password" bind:value={confirmPassword} required placeholder="Confirm password" class="w-full px-3 py-2 border rounded" />
      <button type="submit" class="w-full py-2 rounded bg-indigo-600 text-white">Reset password</button>
    </form>
  </div>
</div>