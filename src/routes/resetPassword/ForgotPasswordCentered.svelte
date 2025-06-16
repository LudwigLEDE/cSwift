<script lang="js">
    import toast, { Toaster } from 'svelte-5-french-toast';
    import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


    let email = '';

    async function handleSubmit() {
    try {
      await apiClient.post('/auth/forgot-password', { email });
      toast.success('Password reset email sent');
    } catch (err) {
      toast.error(`Failed to send reset email: ${err.message}`);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 p-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center text-3xl font-extrabold">Forgot your password?</h2>
    <form on:submit|preventDefault={handleSubmit} class="mt-6">
      <input type="email" bind:value={email} required placeholder="Email address" class="w-full px-3 py-2 border rounded" />
      <button type="submit" class="w-full mt-4 py-2 rounded bg-indigo-600 text-white">Send reset link</button>
    </form>
  </div>
</div>