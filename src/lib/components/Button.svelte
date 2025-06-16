<script>
  export let onClick = () => {};
  export let className = '';
  export let size = 'md'; // 'sm', 'md', 'lg'
</script>

<button class="btn {size} {className}" on:click={onClick}>
  <slot />
</button>

<style>
  :global(:root) {
    /* Fallbacks if not using a theme manager */
    --btn-bg: var(--color-primary-light);
    --btn-fg: var(--color-primary-content);
    --btn-hover-bg: var(--color-primary);
    --btn-hover-fg: var(--color-copy);
    --btn-border: var(--color-border);
  }

  .btn {
    display: grid;
    place-items: center;
    background: var(--btn-bg);
    color: var(--btn-fg);
    border-radius: 10px;
    box-shadow: 6px 6px 10px -1px rgba(0,0,0,0.15),
                -6px -6px 10px -1px rgba(255,255,255,0.7);
    border: 1px solid var(--btn-border);
    cursor: pointer;
    transition: transform 0.3s, background 0.3s, color 0.3s;
  }

  .btn:hover {
    background: var(--btn-hover-bg);
    color: var(--btn-hover-fg);
    box-shadow: inset 4px 4px 6px -1px rgba(0,0,0,0.2),
                inset -4px -4px 6px -1px rgba(255,255,255,0.7),
                -0.5px -0.5px 0px rgba(255,255,255,1),
                0.5px 0.5px 0px rgba(0,0,0,0.15),
                0px 12px 10px -10px rgba(0,0,0,0.05);
    transform: translateY(0.5em);
  }

  .btn :global(svg) {
    transition: transform 0.3s, fill 0.3s;
    fill: currentColor;
  }

  .btn:hover :global(svg) {
    transform: scale(0.9);
  }

  /* Size Variants */
  .sm { padding: 0.6em; font-size: 0.85rem; }
  .md { padding: 1.2em; font-size: 1rem; }
  .lg { padding: 2em; font-size: 1.15rem; }

  /* Dark mode support using data-theme or prefers-color-scheme */
  :global(html[data-theme='dark']) .btn {
    --btn-bg: var(--color-primary-dar);
    --btn-fg: var(--color-copy-light);
    --btn-hover-bg: var(--color-primary);
    --btn-hover-fg: var(--color-copy);
    --btn-border: var(--color-border);
  }

  @media (prefers-color-scheme: dark) {
    .btn {
      --btn-bg: var(--color-primary-dar);
      --btn-fg: var(--color-copy-light);
      --btn-hover-bg: var(--color-primary);
      --btn-hover-fg: var(--color-copy);
      --btn-border: var(--color-border);
    }
  }
</style>
