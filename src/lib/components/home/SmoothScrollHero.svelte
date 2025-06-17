<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
    import { ChartCandlestick, ChevronDown } from 'lucide-svelte';
	import Footer from '../Footer.svelte';


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

  // Popular items data
  const groupedPopular = [
  [ // Crypto
    { icon: '₿', name: 'Bitcoin', ticker: 'BTC', type: 'Crypto', price: '$103,750.42', change: '-3.16%' },
    { icon: 'Ξ', name: 'Ethereum', ticker: 'ETH', type: 'Crypto', price: '$2,480.37', change: '-5.98%' },
    { icon: '🟨', name: 'Binance Coin', ticker: 'BNB', type: 'Crypto', price: '$656.12', change: '-2.22%' },
    { icon: '❌', name: 'XRP', ticker: 'XRP', type: 'Crypto', price: '$2.18', change: '-6.80%' },
    { icon: '🌞', name: 'Solana', ticker: 'SOL', type: 'Crypto', price: '$147.05', change: '-6.60%' },
  ],
  [ // Stocks
    { icon: '🍎', name: 'Apple Inc.', ticker: 'AAPL', type: 'Stock', price: '$172.30', change: '+0.45%' },
    { icon: '🟦', name: 'Microsoft', ticker: 'MSFT', type: 'Stock', price: '$310.85', change: '+0.30%' },
    { icon: '🚗', name: 'Tesla', ticker: 'TSLA', type: 'Stock', price: '$720.50', change: '-1.25%' },
    { icon: '🛒', name: 'Amazon', ticker: 'AMZN', type: 'Stock', price: '$3,425.15', change: '+0.10%' },
    { icon: '🔍', name: 'Alphabet', ticker: 'GOOGL', type: 'Stock', price: '$2,750.80', change: '+0.75%' },
  ],
  [ // Commodities
    { icon: '📈', name: 'Gold Futures', ticker: 'GC=F', type: 'Commodity', price: '$1,934.20', change: '-0.75%' },
    { icon: '⚪', name: 'Silver Futures', ticker: 'SI=F', type: 'Commodity', price: '$24.30', change: '-1.10%' },
    { icon: '🛢️', name: 'Crude Oil', ticker: 'CL=F', type: 'Commodity', price: '$75.40', change: '+0.50%' },
    { icon: '🔥', name: 'Natural Gas', ticker: 'NG=F', type: 'Commodity', price: '$3.25', change: '-2.00%' },
    { icon: '🥇', name: 'Copper', ticker: 'HG=F', type: 'Commodity', price: '$4.15', change: '+1.25%' },
  ],
  [ // Forex
    { icon: '💵', name: 'EUR/USD', ticker: 'EURUSD', type: 'Forex', price: '1.0865', change: '+0.12%' },
    { icon: '🇬🇧', name: 'GBP/USD', ticker: 'GBPUSD', type: 'Forex', price: '1.2680', change: '-0.05%' },
    { icon: '💴', name: 'USD/JPY', ticker: 'USDJPY', type: 'Forex', price: '110.75', change: '+0.20%' },
    { icon: '🇦🇺', name: 'AUD/USD', ticker: 'AUDUSD', type: 'Forex', price: '0.7205', change: '-0.30%' },
    { icon: '🇨🇦', name: 'USD/CAD', ticker: 'USDCAD', type: 'Forex', price: '1.2600', change: '+0.15%' },
  ]
];

let faqs = [
    {
      title: "Why is the sky blue?",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        laboriosam neque reprehenderit saepe eius dolorum vel consequuntur
        perspiciatis ad vero.`,
      open: true
    },
    {
      title: "Why did the chicken cross the road?",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        laboriosam neque reprehenderit saepe eius dolorum vel consequuntur
        perspiciatis ad vero.`
    },
    {
      title: "How many licks does it take to get to the center of a tootsie pop?",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        laboriosam neque reprehenderit saepe eius dolorum vel consequuntur
        perspiciatis ad vero.`
    },
    {
      title: "Where's Waldo?",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        laboriosam neque reprehenderit saepe eius dolorum vel consequuntur
        perspiciatis ad vero.`
    }
  ];

</script>

<!-- Hero Section -->
<section class="relative w-full h-screen bg-black text-white overflow-hidden">
  <div class="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 py-16 bg-background">
    <!-- Left panel -->
    <div class="flex-1 text-center lg:text-left space-y-4">
      <div class="flex items-center justify-center lg:justify-start space-x-2 text-secondary-light text-sm font-semibold">
        <ChartCandlestick class="h-5 w-5" />
        <span>5,000,000+ Traders Educated</span>
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight">
        LEARN TO <span class="text-secondary">TRADE</span> WITH
        <span class="bg-gradient-to-r from-primary-dark to-primary-light
             bg-clip-text text-transparent">
            cSwift
        </span>
      </h1>
      <p class="text-gray-300 text-base sm:text-lg max-w-lg">
        Hands-on simulations, live market data, and step-by-step tutorials to make you a confident trader—without risking a dime.
      </p>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-center lg:justify-start">
        <a
          href="/signup"
          class="group relative inline-block overflow-hidden rounded-md border border-secondary bg-secondary"
        >
          <span class="relative z-10 inline-block px-5 py-2 text-white font-semibold transition-transform duration-300 group-hover:-translate-x-full">
            Get Started Free
          </span>
          <span class="absolute inset-0 flex items-center justify-center text-white font-semibold bg-secondary-dark transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0">
            Signup
          </span>
        </a>
        <div class="text-sm text-gray-400 text-center sm:text-left">
          ⭐ Rated 4.9/5 on TrustLearn<br />Loved by 500K+ students
        </div>
      </div>
    </div>

    <!-- Right panel (charts) -->
    <div class="flex-1 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
      {#each Array(4) as _, i}
        <div
          id="chart-container-{i}"
          class="bg-background-secondary rounded-lg shadow-lg p-2 flex items-center justify-center text-gray-500"
          style="height: 120px;"
        >
          Chart {i + 1}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Markets Section -->
<section class="bg-background text-primary-content overflow-hidden ">
  <div class="px-35 py-12 max-w-6xl mx-auto">
    <div class="grid grid-cols-2 grid-rows-3 gap-5">

      <!-- Grid cell 0,0: Heading -->
      <div class="col-start-1 row-start-1 flex items-center justify-center">
        <h2 class=" text-2xl sm:text-3xl font-bold leading-tighttext-base font-bold text-center">Most Popular</h2>
      </div>

      <!-- Grid cell 0,1: Crypto with row span 2 -->
      <div class="col-start-2 row-start-1 row-span-2">
       <h3 class="text-base font-semibold mb-2 text-center">Crypto</h3>
        <div class="space-y-1">
          {#each groupedPopular[0] as item}
             <div class="flex items-center justify-between p-1.5 bg-primary hover:bg-[var(--color-primary-dark)] transition rounded text-xs">
              <div class="flex items-center space-x-2">
                <div class="h-4 w-4 bg-zinc-700 rounded-full flex items-center justify-center text-[10px]">{item.icon}</div>
                <span class="font-medium">{item.name}</span>
              </div>
              <div class="text-right space-x-1">
                <span class="text-gray-300">{item.ticker}</span>
                <span class="font-mono">{item.price}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Grid cell 1,0: Forex -->
      <div class="col-start-1 row-start-2 row-span-2">
       <h3 class="text-base font-semibold mb-2 text-center">Forex</h3>
        <div class="space-y-1">
          {#each groupedPopular[3] as item}
             <div class="flex items-center justify-between p-1.5 bg-secondary hover:bg-[var(--color-secondary-dark)] transition rounded text-xs">
              <div class="flex items-center space-x-2">
                <div class="h-4 w-4 bg-zinc-700 rounded-full flex items-center justify-center text-[10px]">{item.icon}</div>
                <span class="font-medium">{item.name}</span>
              </div>
              <div class="text-right space-x-1">
                <span class="text-gray-300">{item.ticker}</span>
                <span class="font-mono">{item.price}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Grid cell 2,0: Stocks -->
      <div class="col-start-2 row-start-3 row-span-2">
        <h3 class="text-base font-semibold mb-2 text-center">Stocks</h3>
       <div class="space-y-1">
          {#each groupedPopular[1] as item}
             <div class="flex items-center justify-between p-1.5 bg-secondary hover:bg-[var(--color-secondary-dark)] transition rounded text-xs">
              <div class="flex items-center space-x-2">
                <div class="h-4 w-4 bg-zinc-700 rounded-full flex items-center justify-center text-[10px]">{item.icon}</div>
                <span class="font-medium">{item.name}</span>
              </div>
              <div class="text-right space-x-1">
                <span class="text-gray-300">{item.ticker}</span>
                <span class="font-mono">{item.price}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Grid cell 2,1: Commodities -->
      <div class="col-start-1 row-start-4 row-span-2">
       <h3 class="text-base font-semibold mb-2 text-center">Commodities</h3>
        <div class="space-y-1">
          {#each groupedPopular[2] as item}
            <div class="flex items-center justify-between p-1.5 bg-primary hover:bg-[var(--color-primary-dark)] transition rounded text-xs">
              <div class="flex items-center space-x-2">
                <div class="h-4 w-4 bg-zinc-700 rounded-full flex items-center justify-center text-[10px]">{item.icon}</div>
                <span class="font-medium">{item.name}</span>
              </div>
              <div class="text-right space-x-1">
                <span class="text-gray-300">{item.ticker}</span>
                <span class="font-mono">{item.price}</span>
              </div>
            </div>
          {/each}
        </div>
        </div> 
        <div class="col-start-2 row-start-5 flex items-center justify-center">
        <div class="text-s text-[var(--color-copy-lighter)] text-center pb-4">
            <span class="font-semibold">crypto, stocks, forex, and commodities — all tradeable on cSwift </span>
        </div>

    </div>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<div class="px-4 py-12">
  <div class="mx-auto max-w-3xl">
    <h3 class="mb-4 text-center text-2xl sm:text-3xl font-bold">Frequently asked questions</h3>
    {#each faqs as faq, index}
      <div class="border-b border-border">
        <button
          on:click={() => faq.open = !faq.open}
          class="flex w-full items-center justify-between gap-4 py-6"
        >
          <span class="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-left text-lg font-medium text-transparent">
            {faq.title}
          </span>
          <span class:rotate-180={faq.open} class="transition-transform duration-300">
            <ChevronDown class="text-2xl text-copy" />
          </span>
        </button>
        <div class="overflow-hidden transition-all duration-300" style="max-height: {faq.open ? '200px' : '0px'}">
          <p class="pb-6 text-primary-content">{faq.content}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<Footer />

<style>
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
