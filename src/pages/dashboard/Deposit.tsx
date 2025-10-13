import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { useTranslation } from "react-i18next";
import btcImage from '@/assets/btc.png'
import ethImage from '@/assets/eth.png'
import usdtImage from '@/assets/usdt.png'

const Deposit = () => {
  const { t } = useTranslation();
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", address: "19fvgJE2dnTg2fYbKeBcAWtZ6TLhE85w4b" },
    { symbol: "ETH", name: "Ethereum", address: "0x3c7948d38321ca986910aae0c06fefccb71e2e56" },
    { symbol: "USDT", name: "Tether", address: "TSHvZdovbWLMEAmJEWZbro97CGUB8zKEfP" },
  ];

  const handleCryptoSelect = (crypto: typeof cryptos[0]) => {
    setSelectedCrypto(crypto.symbol);
  };

  const handleDeposit = () => {
    if (!selectedCrypto || !amount) {
      toast({
        title: t('dashboard.deposit.error'),
        description: t('dashboard.deposit.selectCryptoAndAmount'),
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to confirmation page with selected crypto and amount
    navigate("/dashboard/deposit/confirm", {
      state: { selectedCrypto, amount }
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t('dashboard.deposit.title')}</h1>
          <p className="text-gray-400">{t('dashboard.deposit.subtitle')}</p>
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.deposit.selectCrypto')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cryptos.map((crypto) => (
                <div
                  key={crypto.symbol}
                  onClick={() => handleCryptoSelect(crypto)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedCrypto === crypto.symbol
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <img src={crypto.symbol === 'BTC' ? btcImage : crypto.symbol === 'ETH' ? ethImage : usdtImage} className="w-6 object-cover" />
                    </div>
                    <p className="text-white font-medium">{crypto.name}</p>
                    <p className="text-sm text-gray-400">{crypto.symbol}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.deposit.depositAmount')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="amount">{t('dashboard.deposit.amount')}</Label>
              <Input
                id="amount"
                type="number"
                placeholder={t('dashboard.deposit.enterAmount')}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/50"
              />
            </div>
            <Button onClick={handleDeposit} className="w-full button-gradient">
              {t('dashboard.deposit.proceedToDeposit')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Deposit;