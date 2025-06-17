<script>
  const year = new Date().getFullYear();
  import { Github } from 'lucide-svelte';
</script>

<footer class="w-full bg-[var(--color-foreground)] text-[var(--color-primary-content)] rounded-lg p-4 mt-12">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <div class="text-sm">
      © {year} CryptoLearn.com All Rights Reserved.
    </div>
    <div class="flex space-x-4">
      <a href="https://dribbble.com" aria-label="Dribbble" class="hover:text-[var(--color-primary)]">
        <Github />
      </a>
    </div>
  </div>
</footer>
