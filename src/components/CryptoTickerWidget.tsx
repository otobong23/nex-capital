import { useEffect, useRef } from 'react';

interface CryptoTickerWidgetProps {
  colorTheme?: 'light' | 'dark';
  isTransparent?: boolean;
  showSymbolLogo?: boolean;
  locale?: string;
  width?: string;
  height?: string;
}

const CryptoTickerWidget = ({
  colorTheme = "dark",
  isTransparent = false,
  showSymbolLogo = true,
  locale = "en",
  width = "100%",
  height = "78"
}: CryptoTickerWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous widget
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
          { proName: "BINANCE:BNBUSDT", title: "BNB" },
          { proName: "BINANCE:XRPUSDT", title: "XRP" },
          { proName: "BINANCE:ADAUSDT", title: "Cardano" },
          { proName: "BINANCE:SOLUSDT", title: "Solana" },
          { proName: "BINANCE:DOTUSDT", title: "Polkadot" },
          { proName: "BINANCE:LINKUSDT", title: "Chainlink" }
        ],
        showSymbolLogo,
        colorTheme,
        isTransparent,
        displayMode: "adaptive",
        locale
      });

      containerRef.current.appendChild(script);
    }
  }, [colorTheme, isTransparent, showSymbolLogo, locale]);

  return (
    <div 
      ref={containerRef}
      style={{ height, width }}
      className="tradingview-widget-container"
    />
  );
};

export default CryptoTickerWidget;