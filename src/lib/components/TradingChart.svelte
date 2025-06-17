<script>
  import { onMount } from 'svelte';
  export let symbol;

  onMount(() => {
    // ensure the TradingView script is loaded only once
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.onload = initWidget;
      document.head.appendChild(script);
    } else {
      initWidget();
    }

    function initWidget() {
      new window.TradingView.widget({
        container_id: 'tv_chart',
        symbol: symbol.toUpperCase(),
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        studies: [
          'MAExp@tv-basicstudies',
          'RelativeStrengthIndex@tv-basicstudies',
          'MACD@tv-basicstudies'
        ],
        show_popup_button: true,
        popup_width: '1000',
        popup_height: '650'
      });
    }
  });
</script>

<div id="tv_chart" style="height: 500px; width: 100%;"></div>
