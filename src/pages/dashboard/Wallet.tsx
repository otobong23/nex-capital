import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Plus,
  Minus,
  ArrowDownRight,
  Loader
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import MarketOverviewWidget from "@/components/MarketOverviewWidget";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const Wallet = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<userType>(null)
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const USER_TOKEN = Cookies.get('authToken')
      if (!USER_TOKEN) {
        window.location.href = "/login";
        return
      }
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
        const response = await api.get<profileResponse>('/user/getUser',)
        setUser(response.data.user)
      } catch (err) {
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load Signup. Please try again later or reload page',
            variant: "destructive",
          });
        }
      }
    }
    getUser()
  }, [])

  const cryptoBalances = [
    { symbol: "BTC", amount: 0.285, value: 12895.50, change: 2.45, positive: true },
    { symbol: "ETH", amount: 4.52, value: 12886.90, change: -1.23, positive: false },
    { symbol: "USDT", amount: 5000, value: 5000.00, change: 0.01, positive: true },
  ];

  const markets = [
    { pair: "BTC/USDT", price: 45250.50, change: 2.45, volume: "1.2B", positive: true },
    { pair: "ETH/USDT", price: 2850.75, change: -1.23, volume: "850M", positive: false },
    { pair: "BNB/USDT", price: 320.25, change: 5.67, volume: "420M", positive: true },
    { pair: "ADA/USDT", price: 0.45, change: -3.21, volume: "180M", positive: false },
    { pair: "SOL/USDT", price: 98.50, change: 8.90, volume: "650M", positive: true },
  ];

  if (!user) {
      return (<div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>)
    }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.wallet.title')}</h1>
            <p className="text-gray-400">{t('dashboard.wallet.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="button-gradient">
              <Link to="/dashboard/deposit">
                <Plus className="w-4 h-4 mr-2" />
                {t('dashboard.wallet.deposit')}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/withdrawal">
                <Minus className="w-4 h-4 mr-2" />
                {t('dashboard.wallet.withdraw')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Wallet Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.wallet.totalBalance')}</CardTitle>
              <WalletIcon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${user.wallet.balance && user.wallet.assetValue ? (user.wallet.balance + user.wallet.assetValue).toLocaleString() : 0}</div>
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.wallet.availableBalance')}</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${user.wallet.balance ? user.wallet.balance.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">Ready for trading</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Locked Balance</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${user.wallet.assetValue ? user.wallet.assetValue.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">In active trades</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Crypto Holdings */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{t('dashboard.wallet.cryptoHoldings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cryptoBalances.map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-4 rounded-lg bg-black/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{crypto.symbol}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{crypto.symbol}</p>
                        <p className="text-sm text-gray-400">{crypto.amount} {crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${crypto.value.toLocaleString()}</p>
                      <div className={`flex items-center gap-1 text-sm ${crypto.positive ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.positive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {crypto.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <Button asChild className="flex-1">
                  <Link to="/dashboard/deposit">{t('dashboard.wallet.deposit')}</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/dashboard/withdrawal">{t('dashboard.wallet.withdraw')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Markets */}
          <Card className="glass border-white/10">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-white">Markets</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard/market">{t('dashboard.home.viewAll')}</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {markets.map((market) => (
                  <div key={market.pair} className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                    <div>
                      <p className="text-white font-medium">{market.pair}</p>
                      <p className="text-sm text-gray-400">Vol: {market.volume}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${market.price.toLocaleString()}</p>
                      <div className={`flex items-center gap-1 text-sm ${market.positive ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendingUp className={`w-3 h-3 ${!market.positive && 'rotate-180'}`} />
                        {market.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/dashboard/market">Explore All Markets</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market Chart */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Live Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketOverviewWidget height="400" />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;