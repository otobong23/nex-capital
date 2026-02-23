import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Loader,
  Loader2
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import MarketOverviewWidget from "@/components/MarketOverviewWidget";
import TradingViewCrossRates from "@/components/TradingViewCrossRates";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userType>(null)
  const [transaction, setTransactions] = useState<transactionType[]>()
  const { toast } = useToast();
  const { t } = useTranslation();
  useEffect(() => {
    const getUser = async () => {
      const USER_TOKEN = Cookies.get('authToken')
      if (!USER_TOKEN) {
        window.location.href = "/login";
        return
      }
      setLoading(true);
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
        const [userResponse, transactionResponse] = await Promise.all([
          await api.get<profileResponse>('/user/getUser'),
          await api.get<transactionListResponseType>(`/user/getTransactions?limit=${5}&page=1`)
        ])
        setUser(userResponse.data.user)
        setTransactions(transactionResponse.data.data.transactions)
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
      } finally {
        setLoading(false);
      }
    }
    getUser()
  }, [])

  const marketData = [
    { symbol: "BTC", price: 45250.50, change: 2.45, positive: true },
    { symbol: "ETH", price: 2850.75, change: -1.23, positive: false },
    { symbol: "USDT", price: 1.00, change: 0.01, positive: true },
    { symbol: "BNB", price: 320.25, change: 5.67, positive: true },
    { symbol: "ADA", price: 0.45, change: -3.21, positive: false },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "Rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  if (!user) {
    return (<div className="h-screen w-full flex justify-center items-center">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-gray-400">Loading</p>
        </div>
      </div>
    </div>)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.home.welcome')}, <span className="capitalize">{user.firstName ?? 'user'}</span>!</h1>
            <p className="text-gray-400">Here's your trading overview</p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link to="/dashboard/deposit">{t('dashboard.wallet.deposit')}</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/dashboard/withdrawal">{t('dashboard.wallet.withdraw')}</Link>
            </Button>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-white">{user.firstName[0].toUpperCase() ?? 'U'}{user.lastName[0].toUpperCase() ?? 'S'}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.home.totalBalance')}</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${user.wallet.balance ? user.wallet.balance.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.home.dailyProfit')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${user.wallet.assetValue ? user.wallet.assetValue.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">+8.2% this month</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Loss</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">${user.wallet.assetLoss ? user.wallet.assetLoss.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">-2.1% this month</p>
            </CardContent>
          </Card>

          {user.verified ? <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.home.activeInvestments')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{user.wallet.watchList ? user.wallet.watchList.length.toLocaleString() : 0}</div>
              <p className="text-xs text-gray-400">2 new this week</p>
            </CardContent>
          </Card>
            : <a href="/dashboard/withdrawal/" className="no-underline">
              <Card className="glass border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Welcome Bonus</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${user.wallet.bonus ? user.wallet.bonus.toLocaleString() : (3200).toLocaleString()}</div>
                  <p className="text-xs text-gray-400">Starter Bonus</p>
                </CardContent>
              </Card>
            </a>}
        </div>

        {/* Market Chart */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.home.portfolioOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketOverviewWidget height="400" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{t('dashboard.home.recentTransactions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transaction.length ? transaction.map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="text-white font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-400">{transaction.updatedAt} • {transaction.blockchain}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'}`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                      </p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">{t('dashboard.history.noTransactions')}</p>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4">
                {t('dashboard.home.viewAll')}
              </Button>
            </CardContent>
          </Card>

          {/* Live Market Watch */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{t('dashboard.home.marketWatch')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{coin.symbol}</span>
                      </div>
                      <span className="text-white font-medium">{coin.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${coin.price.toLocaleString()}</p>
                      <div className={`flex items-center gap-1 text-sm ${coin.positive ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.positive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        {coin.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                {t('dashboard.home.viewAll')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market Cross Rate */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Market Cross Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <TradingViewCrossRates />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
