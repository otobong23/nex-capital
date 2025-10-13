import { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
  symbol?: string;
  width?: string;
  height?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  container_id?: string;
}

const TradingViewWidget = ({
  symbol = "BINANCE:BTCUSDT",
  width = "100%",
  height = "600",
  interval = "D",
  theme = "dark",
  style = "1",
  locale = "en",
  toolbar_bg = "#f1f3f6",
  enable_publishing = false,
  hide_top_toolbar = false,
  hide_legend = false,
  save_image = false,
  container_id = "tradingview_widget"
}: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol,
        interval,
        timezone: "Etc/UTC",
        theme,
        style,
        locale,
        toolbar_bg,
        enable_publishing,
        hide_top_toolbar,
        hide_legend,
        save_image,
        container_id: containerRef.current.id
      });

      containerRef.current.appendChild(script);
    }
  }, [symbol, interval, theme, style, locale, toolbar_bg, enable_publishing, hide_top_toolbar, hide_legend, save_image]);

  return (
    <div 
      ref={containerRef}
      id={container_id}
      style={{ height, width }}
      className="tradingview-widget-container"
    />
  );
};

export default TradingViewWidget;