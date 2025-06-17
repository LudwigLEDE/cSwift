<script>
  const year = new Date().getFullYear();
  import { Github } from 'lucide-svelte';
</script>

<footer class="w-full bg-[var(--color-primary-dark)] text-[var(--color-primary-content)] rounded-lg p-4 mt-12">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <div class="text-sm">
      © {year} CryptoLearn.com All Rights Reserved.
    </div>
    <div class="flex space-x-4">
      <a href="https://github.com/LudwigLEDE/cSwift" aria-label="GitHub" class="hover:text-[var(--color-primary)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.836 2.807 1.306 3.492.998.108-.776.417-1.306.76-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.123-.303-.535-1.52.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.657.242 2.874.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.625-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </a>
      <a href="https://dribbble.com" aria-label="Dribbble" class="hover:text-[var(--color-primary)]">
        <Github />
      </a>
    </div>
  </div>
</footer>
