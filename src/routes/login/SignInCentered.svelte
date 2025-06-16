<script lang="js">
      import toast, { Toaster } from 'svelte-5-french-toast';

    import { signUp, sendResetEmail, resetPassword, verifyCode } from '$lib/supabase.js';


  let email = '';
  let password = '';

  async function handleSubmit() {
    try {
      await apiClient.post('/auth/signin', { email, password });
      toast.success('Signed in successfully');
      // TODO: handle redirect on success
    } catch (err) {
      toast.error(`Sign in failed: ${err.message}`);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <input id="email" type="email" bind:value={email} required placeholder="Email address"
          class="block w-full px-3 py-2 border rounded-t-md focus:outline-none" />
        <input id="password" type="password" bind:value={password} required placeholder="Password"
          class="block w-full px-3 py-2 border rounded-b-md focus:outline-none" />
      </div>
      <button type="submit" class="w-full py-2 px-4 rounded-md bg-indigo-600 text-white">Sign in</button>
    </form>
  </div>
</div>