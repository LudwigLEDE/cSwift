<script>
  import { onMount } from 'svelte';
  import { createChart } from 'lightweight-charts';
  export let portfolio;

  let container;

  onMount(async () => {
    const chart = createChart(container, { width: container.clientWidth, height: 300 });
    const series = chart.addLineSeries({ color: 'blue' });

    // Fetch transaction history + compute equity over time
    const res = await fetch(`/api/portfolio/${portfolio.id}/equity`);
    const data = await res.json(); // [{ time: 1685000000, equity: 100000 }, ...]
    series.setData(data);
    window.addEventListener('resize', () =>
      chart.applyOptions({ width: container.clientWidth })
    );
  });
</script>

<div bind:this={container} style="width:100%; height:300px;"></div>
