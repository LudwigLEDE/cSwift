<!-- src/lib/components/TestChart.svelte -->
<script>
  import { onMount } from 'svelte';
  import { createChart } from 'lightweight-charts';

  let container;
  let chartApi;

  onMount(() => {
    console.log('container is:', container);
    if (!container) {
      console.error('❌ chart container is null!');
      return;
    }

    // 1) Create the chart
    chartApi = createChart(container, {
      width: container.clientWidth,
      height: 200,
      layout: { backgroundColor: '#ffffff', textColor: '#000' }
    });
    console.log('chartApi is:', chartApi);

    // 2) Add a candlestick series
    const series = chartApi.addCandlestickSeries();
    console.log('series is:', series);

    // 3) Set some dummy data
    series.setData([
      { time: Math.floor(Date.now()/1000) - 60*60, open: 10, high: 12, low: 8, close: 11 },
      { time: Math.floor(Date.now()/1000),         open: 11, high: 13, low: 9, close: 10 }
    ]);
  });
</script>

<div bind:this={container} style="width: 100%; height: 200px; border: 1px solid #ccc"></div>
