import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Key, Wallet, Loader2, User } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useTranslation } from "react-i18next";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const AdminSettings = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [admin, setAdmin] = useState<adminType | null>(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [walletAddresses, setWalletAddresses] = useState({
    BTC: "",
    ETH: "",
    USDT: "",
  });

  const [adminUsername, setAdminUsername] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      const USER_TOKEN = Cookies.get('adminToken');
      if (!USER_TOKEN) {
        window.location.href = "/admin/login";
        return;
      }

      setLoading(true);
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
        const adminResponse = await api.get<adminResponseType>('/admin/');

        // Set admin data
        setAdmin(adminResponse.data.data);
        setAdminUsername(adminResponse.data.data.username);
        setWalletAddresses(adminResponse.data.data.walletAddress);

      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message || "Failed to load admin data",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load admin data. Please try again later or reload page',
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getAllData();
  }, [toast]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("admin.settings.passwordsDoNotMatch"),
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: t("common.error"),
        description: t("admin.settings.passwordTooShort"),
        variant: "destructive",
      });
      return;
    }

    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setUpdateLoading(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const adminResponse = await api.put<adminResponseType>('/admin/', { 
        password: passwordData.newPassword
      });

      // Update admin data
      setAdmin(adminResponse.data.data);

      toast({
        title: t("admin.settings.passwordUpdated"),
        description: t("admin.settings.passwordUpdatedSuccess"),
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to update password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to update password. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleWalletUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setUpdateLoading(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const adminResponse = await api.put<adminResponseType>('/admin/', { 
        walletAddress: walletAddresses 
      });

      // Update admin data
      setAdmin(adminResponse.data.data);
      setWalletAddresses(adminResponse.data.data.walletAddress);

      toast({
        title: t("admin.settings.addressesUpdated"),
        description: t("admin.settings.walletAddressesUpdated"),
      });

    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to update wallet addresses",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to update wallet addresses. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!adminUsername.trim()) {
      toast({
        title: t("common.error"),
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setUpdateLoading(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const adminResponse = await api.put<adminResponseType>('/admin/', { 
        username: adminUsername 
      });

      // Update admin data
      setAdmin(adminResponse.data.data);
      setAdminUsername(adminResponse.data.data.username);

      toast({
        title: "Username Updated",
        description: "Your username has been updated successfully",
      });

    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to update username",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to update username. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading admin settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!admin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-gray-400">Failed to load admin data</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-white">{t("admin.settings.title")}</h1>
            <p className="text-gray-400">{t("admin.settings.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admin Profile */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Admin Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUsernameUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="bg-black/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full button-gradient"
                  disabled={updateLoading || adminUsername === admin.username}
                >
                  {updateLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Username"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5" />
                {t("admin.settings.changePassword")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">{t("admin.settings.currentPassword")}</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value
                    })}
                    className="bg-black/50"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">{t("admin.settings.newPassword")}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value
                    })}
                    className="bg-black/50"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">{t("admin.settings.confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })}
                    className="bg-black/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full button-gradient"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    t("admin.settings.updatePassword")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Addresses */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              {t("admin.settings.walletAddresses")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWalletUpdate} className="space-y-4">
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="bitcoin">{t("admin.settings.bitcoinAddress")}</Label>
                  <Input
                    id="bitcoin"
                    type="text"
                    required
                    value={walletAddresses.BTC}
                    onChange={(e) => setWalletAddresses({
                      ...walletAddresses,
                      BTC: e.target.value
                    })}
                    className="bg-black/50 font-mono text-sm"
                    placeholder="Bitcoin wallet address"
                  />
                </div>

                <div>
                  <Label htmlFor="ethereum">{t("admin.settings.ethereumAddress")}</Label>
                  <Input
                    id="ethereum"
                    type="text"
                    required
                    value={walletAddresses.ETH}
                    onChange={(e) => setWalletAddresses({
                      ...walletAddresses,
                      ETH: e.target.value
                    })}
                    className="bg-black/50 font-mono text-sm"
                    placeholder="Ethereum wallet address"
                  />
                </div>

                <div>
                  <Label htmlFor="usdt">{t("admin.settings.usdtAddress")}</Label>
                  <Input
                    id="usdt"
                    type="text"
                    required
                    value={walletAddresses.USDT}
                    onChange={(e) => setWalletAddresses({
                      ...walletAddresses,
                      USDT: e.target.value
                    })}
                    className="bg-black/50 font-mono text-sm"
                    placeholder="USDT wallet address"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full button-gradient"
                disabled={updateLoading || (
                  walletAddresses.BTC === admin.walletAddress.BTC &&
                  walletAddresses.ETH === admin.walletAddress.ETH &&
                  walletAddresses.USDT === admin.walletAddress.USDT
                )}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  t("admin.settings.updateAddresses")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t("admin.settings.systemInformation")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5 lg:gap-6">
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">Admin Username</p>
                <p className="text-lg font-bold text-white">{admin.username}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">Account Created</p>
                <p className="text-lg font-bold text-white">{formatDate(admin.createdAt)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">{t("admin.settings.lastUpdated")}</p>
                <p className="text-lg font-bold text-white">{formatDate(admin.updatedAt)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">{t("admin.settings.serverStatus")}</p>
                <p className="text-lg font-bold text-green-500">{t("admin.settings.online")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Wallet Addresses Display */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Current Wallet Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-black/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-orange-500 font-bold text-sm">₿</span>
                    </div>
                    <span className="text-white font-medium">Bitcoin (BTC)</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono break-all">
                    {admin.walletAddress.BTC || "Not set"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-500 font-bold text-sm">Ξ</span>
                    </div>
                    <span className="text-white font-medium">Ethereum (ETH)</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono break-all">
                    {admin.walletAddress.ETH || "Not set"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-black/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-500 font-bold text-sm">₮</span>
                    </div>
                    <span className="text-white font-medium">Tether (USDT)</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono break-all">
                    {admin.walletAddress.USDT || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;