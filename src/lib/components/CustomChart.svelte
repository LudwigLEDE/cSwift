<!-- src/lib/components/CustomChart.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createChart, CrosshairMode } from 'lightweight-charts';
  import { SMA, RSI } from 'technicalindicators';

  export let symbol = 'AAPL';
  export let intervals = ['1m','5m','15m','60m','1d','1w'];
  let selectedInterval = '60m';

  let chartContainer;
  let rsiContainer;
  let mainChart, candleSeries, sma20, sma50;
  let rsiChart, rsiSeries;

  // Fetch OHLC data
  async function fetchCandles(interval) {
    const res = await fetch(`/api/ohlc?symbol=${symbol}&interval=${interval}`);
    if (!res.ok) return [];
    return res.json();
  }

  // Load data into series
  async function loadCandles() {
    const candles = await fetchCandles(selectedInterval);
    if (!candles.length) return;

    candleSeries.setData(candles);

    const closes = candles.map(c => c.close);

    // 20 SMA
    const sma20Data = SMA.calculate({ period: 20, values: closes })
      .map((v,i) => ({ time: candles[i + 19].time, value: v }));
    sma20.setData(sma20Data);

    // 50 SMA
    const sma50Data = SMA.calculate({ period: 50, values: closes })
      .map((v,i) => ({ time: candles[i + 49].time, value: v }));
    sma50.setData(sma50Data);

    // RSI (14)
    const rsiData = RSI.calculate({ period: 14, values: closes })
      .map((v,i) => ({ time: candles[i + 13].time, value: v }));
    rsiSeries.setData(rsiData);
  }

  // Called when user clicks an interval button
  function selectInterval(iv) {
    selectedInterval = iv;
    loadCandles();
  }

  onMount(async () => {
    // Create the main candlestick chart
    mainChart = createChart(chartContainer, {
      layout: { backgroundColor: '#1b1b1b', textColor: '#d1d4dc' },
      grid: { vertLines: { color: '#2a2a2a' }, horzLines: { color: '#2a2a2a' } },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: '#555' },
      timeScale: { borderColor: '#555', timeVisible: true },
    });
    candleSeries = mainChart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350',
      wickUpColor: '#26a69a', wickDownColor: '#ef5350'
    });
    sma20 = mainChart.addLineSeries({ color: '#2196f3', lineWidth: 2 });
    sma50 = mainChart.addLineSeries({ color: '#ffa726', lineWidth: 2 });

    // Create the RSI sub-chart
    rsiChart = createChart(rsiContainer, {
      layout: { backgroundColor: '#1b1b1b', textColor: '#d1d4dc' },
      grid: { vertLines: { color: '#2a2a2a' }, horzLines: { color: '#2a2a2a' } },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: '#555' },
      timeScale: { visible: false },
      height: 120
    });
    rsiSeries = rsiChart.addLineSeries({ color: '#fbc02d', lineWidth: 2 });

    // Initial load
    await loadCandles();

    // Responsive resizing
    window.addEventListener('resize', () => {
      mainChart.applyOptions({ width: chartContainer.clientWidth });
      rsiChart.applyOptions({ width: rsiContainer.clientWidth });
    });
  });
</script>

<style>
  .toolbar { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
  .chart { box-shadow: 0 2px 6px rgba(0,0,0,0.3); border-radius: 4px; }
  .interval-btn { 
    padding: 0.25rem 0.5rem; 
    border-radius: 0.25rem; 
    font-size: 0.875rem; 
    font-weight: 500; 
  }
  .selected { background-color: #4f46e5; color: white; }
  .unselected { background-color: #374151; color: #d1d5db; }
</style>

<div class="toolbar">
  {#each intervals as iv}
    <button
      class="interval-btn {selectedInterval === iv ? 'selected' : 'unselected'}"
      on:click={() => selectInterval(iv)}
    >
      {iv}
    </button>
  {/each}
</div>

<div bind:this={chartContainer} class="chart" style="height: 350px; width: 100%;"></div>
<div bind:this={rsiContainer} class="chart mt-2" style="height: 120px; width: 100%;"></div>
