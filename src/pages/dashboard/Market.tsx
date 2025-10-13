import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  Star,
  Eye
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import TradingViewWidget from "@/components/TradingViewWidget";
import MarketOverviewWidget from "@/components/MarketOverviewWidget";
import { useTranslation } from "react-i18next";

const Market = () => {
  const { t } = useTranslation();
  const featuredMarkets = [
    { 
      pair: "BTC/USDT", 
      price: 45250.50, 
      change: 2.45, 
      volume: "1.2B", 
      high: 46100.00, 
      low: 44200.00, 
      positive: true,
      symbol: "BINANCE:BTCUSDT" 
    },
    { 
      pair: "ETH/USDT", 
      price: 2850.75, 
      change: -1.23, 
      volume: "850M", 
      high: 2920.00, 
      low: 2780.00, 
      positive: false,
      symbol: "BINANCE:ETHUSDT" 
    },
    { 
      pair: "BNB/USDT", 
      price: 320.25, 
      change: 5.67, 
      volume: "420M", 
      high: 325.00, 
      low: 305.00, 
      positive: true,
      symbol: "BINANCE:BNBUSDT" 
    }
  ];

  const allMarkets = [
    { pair: "BTC/USDT", price: 45250.50, change: 2.45, volume: "1.2B", positive: true },
    { pair: "ETH/USDT", price: 2850.75, change: -1.23, volume: "850M", positive: false },
    { pair: "BNB/USDT", price: 320.25, change: 5.67, volume: "420M", positive: true },
    { pair: "ADA/USDT", price: 0.45, change: -3.21, volume: "180M", positive: false },
    { pair: "SOL/USDT", price: 98.50, change: 8.90, volume: "650M", positive: true },
    { pair: "XRP/USDT", price: 0.62, change: 1.45, volume: "320M", positive: true },
    { pair: "DOT/USDT", price: 7.25, change: -2.15, volume: "95M", positive: false },
    { pair: "LINK/USDT", price: 15.80, change: 4.32, volume: "150M", positive: true },
    { pair: "UNI/USDT", price: 6.75, change: -1.85, volume: "80M", positive: false },
    { pair: "MATIC/USDT", price: 0.88, change: 3.67, volume: "200M", positive: true }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.market.title')}</h1>
            <p className="text-gray-400">{t('dashboard.market.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder={t('dashboard.market.searchMarkets')} className="pl-10 w-64 bg-black/50" />
            </div>
          </div>
        </div>

        {/* Featured Markets */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            {t('dashboard.market.featuredMarkets')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMarkets.map((market, index) => (
              <motion.div
                key={market.pair}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass border-white/10 hover:border-primary/30 transition-colors cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{market.pair}</CardTitle>
                      <Badge variant="outline" className="text-gray-400">
                        Vol: {market.volume}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">${market.price.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 text-sm ${market.positive ? 'text-green-500' : 'text-red-500'}`}>
                          {market.positive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {market.change.toFixed(2)}%
                        </div>
                      </div>
                      <Button size="sm" className="button-gradient">
                        {t('dashboard.market.startTrading')}
                      </Button>
                    </div>
                    
                     <div className="grid grid-cols-2 gap-4 text-sm">
                       <div>
                         <p className="text-gray-400">{t('dashboard.market.high24h')}</p>
                         <p className="text-white font-medium">${market.high.toLocaleString()}</p>
                       </div>
                       <div>
                         <p className="text-gray-400">{t('dashboard.market.low24h')}</p>
                         <p className="text-white font-medium">${market.low.toLocaleString()}</p>
                       </div>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trading Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="glass border-white/10">
             <CardHeader>
               <CardTitle className="text-white">{t('dashboard.market.bitcoinChart')}</CardTitle>
             </CardHeader>
            <CardContent>
              <TradingViewWidget symbol="BINANCE:BTCUSDT" height="600" />
            </CardContent>
          </Card>

           <Card className="glass border-white/10">
             <CardHeader>
               <CardTitle className="text-white">{t('dashboard.market.ethereumChart')}</CardTitle>
             </CardHeader>
            <CardContent>
              <TradingViewWidget symbol="BINANCE:ETHUSDT" height="600" />
            </CardContent>
          </Card>
        </div>

        {/* All Markets */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('dashboard.market.tradingPairs')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Header */}
               <div className="grid grid-cols-5 gap-4 py-3 px-4 text-sm font-medium text-gray-400 border-b border-white/10">
                 <div>{t('dashboard.market.pair')}</div>
                 <div className="text-right">{t('dashboard.market.price')}</div>
                 <div className="text-right">{t('dashboard.market.change')}</div>
                 <div className="text-right">{t('dashboard.market.volume')}</div>
                 <div className="text-right">{t('dashboard.market.action')}</div>
               </div>
              
              {/* Market Rows */}
              {allMarkets.map((market, index) => (
                <motion.div
                  key={market.pair}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="grid grid-cols-5 gap-4 py-3 px-4 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {market.pair.split('/')[0]}
                      </span>
                    </div>
                    <span className="text-white font-medium">{market.pair}</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-medium">${market.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`flex items-center justify-end gap-1 ${market.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {market.positive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {market.change.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gray-400">{market.volume}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        {t('dashboard.market.startTrading')}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Overview Widget */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.home.portfolioOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketOverviewWidget height="500" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Market;