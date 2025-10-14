import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { useTranslation } from "react-i18next";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { DollarSign, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import btcImage from '@/assets/btc.png'
import ethImage from '@/assets/eth.png'
import usdtImage from '@/assets/usdt.png'
import Cookies from "js-cookie";

const Withdrawal = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState('')
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<userType>(null)

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

  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", balance: 110000 },
    { symbol: "ETH", name: "Ethereum", balance: 2500 },
    { symbol: "USDT", name: "Tether", balance: 1 },
  ];

  const handleWithdrawal = async () => {
    if (!amount || !selectedCrypto) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const USER_TOKEN = Cookies.get('authToken')
    if (!USER_TOKEN) {
      window.location.href = "/login";
      return
    }

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const response = await api.post<transactionResponseType>('/user/withdraw/', {
        amount,
        blockchain: selectedCrypto,
        walletAddress: address
      })
      toast({
        title: "Withdrawal Requested",
        description: "Your withdrawal is being processed",
        variant: "default"
      });
      navigate("/dashboard/history");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to load Signup. Please try again later or reload page',
          variant: "destructive",
        });
      }
    }
  };

  if (!user) {
    return (<div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t('dashboard.withdrawal.title')}</h1>
          <p className="text-gray-400">{t('dashboard.withdrawal.subtitle')}</p>
        </div>

        <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium text-gray-400">{t('dashboard.home.totalBalance')}</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${user.wallet.balance ? user.wallet.balance.toLocaleString() : 0}</div>
            <p className="text-xs text-gray-400">+12.5% from last month</p>
          </CardContent>
        </Card>

        {!user.verified && <Card className="glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium text-gray-400">Welcome Bonus</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${user.wallet.bonus ? user.wallet.bonus.toLocaleString() : (3200).toLocaleString()}</div>
            <p className="text-xs text-gray-400">Make a minimum deposit of $1,000 to unlock and withdraw your $10,000 new-user bonus.</p>
          </CardContent>
        </Card>}

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Select Crypto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptos.map((crypto) => (
                <div
                  key={crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedCrypto === crypto.symbol
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <img src={crypto.symbol === 'BTC' ? btcImage : crypto.symbol === 'ETH' ? ethImage : usdtImage} className="w-6 object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{crypto.name}</p>
                        <p className="text-sm text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{crypto.balance} USDT</p>
                      <p className="text-sm text-gray-400">Current Price</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Enter Your Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-black/50"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/50"
              />
            </div>
            <Button onClick={handleWithdrawal} className="w-full button-gradient">
              Request Withdrawal
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Withdrawal;
