<script lang="js">
      import toast, { Toaster } from 'svelte-5-french-toast';

      import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


  let name = '';
  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      await apiClient.post('/auth/signup', { name, email, password });
      toast.success('Account created successfully');
    } catch (err) {
      toast.error(`Sign up failed: ${err.message}`);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-white p-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center text-3xl font-extrabold">Create your account</h2>
    <form on:submit|preventDefault={handleSubmit} class="mt-6 space-y-4">
      <input type="text" bind:value={name} required placeholder="Full Name" class="w-full px-3 py-2 border rounded" />
      <input type="email" bind:value={email} required placeholder="Email address" class="w-full px-3 py-2 border rounded" />
      <input type="password" bind:value={password} required placeholder="Password" class="w-full px-3 py-2 border rounded" />
      <button type="submit" class="w-full py-2 rounded bg-indigo-600 text-white">Sign up</button>
    </form>
  </div>
</div>