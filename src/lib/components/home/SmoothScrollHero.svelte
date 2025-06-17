<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
    import { ChartCandlestick } from 'lucide-svelte';


  const sectionHeight = 1000;
  let scrollY = 0;
  let lenis;

  function handleScroll() {
    scrollY = window.scrollY;
  }

  onMount(async () => {
    if (!browser) return;
    window.addEventListener('scroll', handleScroll);

    try {
      const { default: Lenis } = await import('@studio-freight/lenis');
      lenis = new Lenis({ lerp: 0.05 });
      const loop = (t) => {
        lenis.raf(t);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    } catch (e) {
      console.warn('Lenis failed to load:', e);
    }
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener('scroll', handleScroll);
    lenis = null;
  });

  const numbers = Array.from({ length: 25 }, () => {
    const value = (Math.random() * 20 - 10).toFixed(2);
    const positive = Number(value) > 0;
    return {
      label: `${positive ? '+' : ''}${value}%`,
      top: `${Math.random() * 60 + 5}%`,
      left: `${Math.random() * 90}%`,
      fontSize: `${Math.random() * 2 + 1.5}rem`,
      fontWeight: 900,
      opacity: Math.random() * 0.9 + 0.9,
      color: positive ? 'rgba(34,197,94,1)' : 'rgba(239,68,68,1)'
    };
  });

  // Sample popular items data
  const popular = [
    { icon: '₿', name: 'Bitcoin', price: '$103,659.70', change: '-3.95%' },
    { icon: 'Ξ', name: 'Ethereum', price: '$2,468.86', change: '-6.52%' },
    { icon: '🟨', name: 'BNB', price: '$653.83', change: '-2.44%' },
    { icon: '❌', name: 'XRP', price: '$2.15', change: '-7.40%' }
  ];
</script>

<!-- Hero Section -->
<section style="height: calc({sectionHeight}px + 100vh)" class="relative w-full bg-black text-white overflow-hidden">
  <div
  class="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-center px-20 py-16 bg-background"
>
  <!-- Left panel -->
  <div class="flex-1 text-center lg:text-left">
    <div class="text-secondary-light text-sm font-semibold mb-2 flex items-center justify-center lg:justify-start space-x-2">
      <ChartCandlestick class="h-5 w-5" />
      <span>5,000,000+ Traders Educated</span>
    </div>

    <h1 class="text-5xl font-extrabold mb-2 leading-tight">
      LEARN TO <span class="text-secondary">TRADE</span> WITH <span class="bg-gradient-to-r from-primary-dar to-primary-light
             bg-clip-text text-transparent">cSwift</span>
    </h1>

    <p class="text-gray-300 text-lg max-w-xl mb-6">
      Hands-on simulations, live market data, and step-by-step tutorials to make you a confident trader—without risking a dime.
    </p>

    <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
<a
  href="/signup"
  class="group relative inline-block overflow-hidden rounded-md border border-secondary bg-secondary"
>
  <!-- First copy: sits on top, slides left on hover -->
  <span
    class="relative z-10 inline-block px-6 py-3 text-white font-semibold transition-transform duration-300 group-hover:-translate-x-full"
  >
    Get Started Free
  </span>

  <!-- Second copy: sits underneath, starts off‐screen left, slides in on hover -->
  <span
    class="absolute inset-0 flex items-center justify-center text-white font-semibold bg-secondary-dark transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
  >
    Signup
  </span>
</a>

      <div class="text-sm text-gray-400 text-center sm:text-left">
        ⭐ Rated 4.9/5 on TrustLearn<br />Loved by 500K+ students
      </div>
    </div>
  </div>

  <!-- Right panel (charts placeholders) -->
  <div class="flex-1 grid grid-cols-2 gap-6 mt-12 lg:mt-0">
    {#each Array(4) as _, i}
      <div
        id="chart-container-{i}"
        class="bg-background-secondary rounded-lg shadow-lg p-4 flex items-center justify-center text-gray-500"
        style="height: 140px;"
      >
        Chart {i + 1}
      </div>
    {/each}
  </div>
</div>
<!--
  {#each numbers as n}
    <div
      class="absolute pointer-events-none select-none"
      style="
        top: {n.top};
        left: {n.left};
        font-size: {n.fontSize};
        font-weight: {n.fontWeight};
        color: {n.color};
        opacity: {scrollY > 0 ? n.opacity : 0};
        filter: drop-shadow(0 0 10px rgba(0,0,0,0.8)) blur(0.2px);
        transition: opacity 0.3s ease;
      "
    >
      {n.label}
    </div>
  {/each}
-->
</section>

<!-- Markets Section -->
<section class="bg-black text-white px-6 py-20">
  <h2 class="text-3xl font-bold mb-8 text-center">Most Popular on CryptoLearn</h2>
  <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each popular as item}
      <div class="bg-zinc-900 rounded-lg p-4 flex flex-col items-start shadow-md">
        <div class="text-2xl mb-2">{item.icon}</div>
        <div class="font-semibold text-lg">{item.name}</div>
        <div class="text-xl mt-1">{item.price}</div>
        <div class="text-sm mt-1 {item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}">{item.change}</div>
      </div>
    {/each}
  </div>
</section>

<!-- FAQ Section -->
<section class="bg-black text-white px-6 py-20 max-w-4xl mx-auto">
  <h2 class="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
  <div class="space-y-4">
    <details class="bg-zinc-900 p-4 rounded-md">
      <summary class="font-semibold cursor-pointer">What is CryptoLearn?</summary>
      <p class="mt-2 text-zinc-300">CryptoLearn is a crypto education platform offering real-time practice and tutorials for traders of all levels.</p>
    </details>
    <details class="bg-zinc-900 p-4 rounded-md">
      <summary class="font-semibold cursor-pointer">Is CryptoLearn free?</summary>
      <p class="mt-2 text-zinc-300">Yes, you can sign up and explore learning resources and simulation tools at no cost.</p>
    </details>
    <details class="bg-zinc-900 p-4 rounded-md">
      <summary class="font-semibold cursor-pointer">Can I trade real crypto?</summary>
      <p class="mt-2 text-zinc-300">CryptoLearn is for simulation and education. We help you prepare before using real exchanges.</p>
    </details>
    <details class="bg-zinc-900 p-4 rounded-md">
      <summary class="font-semibold cursor-pointer">How do I start?</summary>
      <p class="mt-2 text-zinc-300">Click on "Sign Up" on the homepage and begin with our guided tutorials and practice features.</p>
    </details>
  </div>
</section>
