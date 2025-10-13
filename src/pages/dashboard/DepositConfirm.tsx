import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Upload, CheckCircle, QrCode } from "lucide-react";
import imageCompression from 'browser-image-compression';
import DashboardLayout from "@/components/DashboardLayout";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { QRCodeCanvas } from "qrcode.react";
import Cookies from "js-cookie";

const DepositConfirm = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [globalData, setGlobalData] = useState<globalDataType>(null)

  const MAX_FILE_SIZE_MB = 5;

  // Get crypto and amount from navigation state
  const { selectedCrypto, amount } = location.state || {};

  if (!selectedCrypto || !amount) {
    navigate("/dashboard/deposit");
    return null;
  }

  useEffect(() => {
    const getGlobalData = async () => {
      try {
        const response = await api.get<globalDataresponseType>('/admin/global-data')
        setGlobalData(response.data.data)
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
    getGlobalData()
  }, [])

  const cryptoData = {
    BTC: {
      name: "Bitcoin",
      address: globalData ? globalData.BTC : "1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG",
      currentPrice: 45250.50,
      network: "Bitcoin Network"
    },
    ETH: {
      name: "Ethereum",
      address: globalData ? globalData.ETH : "0xc92adc6fa9dc7d1aa8cbb10e2250f29f84669139",
      currentPrice: 2850.75,
      network: "Ethereum Network (ERC-20)"
    },
    USDT: {
      name: "Tether",
      address: globalData ? globalData.USDT : "TEZdBcxRZpMw4yJtA9RVTX8WyiCtXCzLzd",
      currentPrice: 1.00,
      network: "Tether(TRC-20)"
    },
  };

  const crypto = cryptoData[selectedCrypto as keyof typeof cryptoData];
  const cryptoAmount = (parseFloat(amount) / crypto.currentPrice).toFixed(8);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t('common.success'),
      description: t('dashboard.depositConfirm.addressCopied'),
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return
    if (file && file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
      toast({
        title: t('common.error'),
        description: t('File too large. Max size is 5MB.'),
        variant: "destructive",
      });
      return;
    }
    try {
      const options = {
        maxSizeMB: MAX_FILE_SIZE_MB,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      setSelectedFile(compressedFile);
    } catch (error) {
      console.error('Image compression error:', error);
      toast({
        title: t('common.error'),
        description: 'Failed to compress image.',
        variant: "destructive",
      })
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // includes mime type like "data:image/png;base64,..."
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleConfirmDeposit = async () => {
    if (!selectedFile) {
      toast({
        title: t('common.error'),
        description: t('dashboard.depositConfirm.pleaseUploadProof'),
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload delay
    setTimeout(async () => {
      const USER_TOKEN =  Cookies.get('authToken')
      if (!USER_TOKEN) {
        window.location.href = "/login";
        return
      }
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
        const response = await api.post<transactionResponseType>('/user/deposit/', {
          amount: cryptoAmount,
          blockchain: crypto.name == 'Bitcoin' ? 'BTC' : crypto.name == 'Ethereum' ? 'ETH' : 'USDT',
          image: await toBase64(selectedFile)
        })
        toast({
          title: t('dashboard.depositConfirm.depositRequested'),
          description: t('dashboard.depositConfirm.depositBeingProcessed'),
          variant: "default"
        });
        setIsUploading(false);
        navigate("/dashboard/history");
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
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t('dashboard.depositConfirm.title')}</h1>
          <p className="text-gray-400">{t('dashboard.depositConfirm.subtitle')}</p>
        </div>

        {/* Deposit Summary */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.depositConfirm.currentValue')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-lg bg-black/20">
              <span className="text-gray-400">Amount (USD)</span>
              <span className="text-white font-medium">${amount}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-black/20">
              <span className="text-gray-400">Cryptocurrency</span>
              <span className="text-white font-medium">{crypto.name} ({selectedCrypto})</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-black/20">
              <span className="text-gray-400">Current Rate</span>
              <span className="text-white font-medium">${crypto.currentPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-gray-400">Amount to Send</span>
              <span className="text-primary font-bold">{cryptoAmount} {selectedCrypto}</span>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Address */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              {t('dashboard.depositConfirm.walletAddress')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-400">Network</Label>
              <div className="p-3 rounded-lg bg-black/20 text-white">
                {crypto.network}
              </div>
            </div>

            <div>
              <Label className="text-gray-400">Send to Address</Label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 rounded-lg bg-black/20 text-white font-mono text-sm break-all">
                  {crypto.address}
                </div>
                <Button
                  onClick={() => copyToClipboard(crypto.address)}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-48 py-6 bg-white rounded-lg flex items-center justify-center">
                <div className="text-black text-center">
                  <QRCodeCanvas value={crypto.address} size={100} />
                  <p className="text-sm mt-3">QR Code</p>
                  <p className="text-xs">{selectedCrypto} Address</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deposit Instructions */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.depositConfirm.depositInstructions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">1</div>
                <p className="text-gray-300">{t('dashboard.depositConfirm.instruction1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">2</div>
                <p className="text-gray-300">{t('dashboard.depositConfirm.instruction2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">3</div>
                <p className="text-gray-300">{t('dashboard.depositConfirm.instruction3')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold">4</div>
                <p className="text-gray-300">{t('dashboard.depositConfirm.instruction4')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Payment Proof */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('dashboard.depositConfirm.uploadProof')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="receipt" className="text-gray-400">
                Upload your payment screenshot or receipt
              </Label>
              <div className="mt-2">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="receipt"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-black/20 hover:bg-black/30 transition-colors"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-gray-400 text-sm">
                    {selectedFile ? selectedFile.name : t('dashboard.depositConfirm.selectFile')}
                  </p>
                </label>
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-500">File uploaded: {selectedFile.name}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <Card className="glass border-white/10">
          <CardContent className="pt-6">
            <Button
              onClick={handleConfirmDeposit}
              disabled={!selectedFile || isUploading}
              className="w-full button-gradient"
            >
              {isUploading ? t('common.processing') : t('dashboard.depositConfirm.confirmDeposit')}
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Your deposit will be processed within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DepositConfirm;