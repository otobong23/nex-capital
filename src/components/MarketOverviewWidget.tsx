import { useEffect, useRef } from 'react';

interface MarketOverviewWidgetProps {
  colorTheme?: 'light' | 'dark';
  dateRange?: string;
  showChart?: boolean;
  locale?: string;
  width?: string;
  height?: string;
}

const MarketOverviewWidget = ({
  colorTheme = "dark",
  dateRange = "12M",
  showChart = true,
  locale = "en",
  width = "100%",
  height = "400"
}: MarketOverviewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme,
        dateRange,
        showChart,
        locale,
        width,
        height,
        tabs: [
          {
            title: "Crypto",
            symbols: [
              { s: "BINANCE:BTCUSDT", d: "Bitcoin" },
              { s: "BINANCE:ETHUSDT", d: "Ethereum" },
              { s: "BINANCE:BNBUSDT", d: "BNB" },
              { s: "BINANCE:XRPUSDT", d: "XRP" },
              { s: "BINANCE:ADAUSDT", d: "Cardano" },
              { s: "BINANCE:SOLUSDT", d: "Solana" }
            ],
            originalTitle: "Crypto"
          }
        ]
      });

      containerRef.current.appendChild(script);
    }
  }, [colorTheme, dateRange, showChart, locale, width, height]);

  return (
    <div 
      ref={containerRef}
      style={{ height, width }}
      className="tradingview-widget-container"
    />
  );
};

export default MarketOverviewWidget;