import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, User, Loader2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const UserDetail = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const { toast } = useToast();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);
  const [tempValue, setTempValue] = useState("");

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
        // Fetch user data
        const userResponse = await api.get<userResponseType>(`/admin/user?username=${userId}`);
        setUser(userResponse.data.data);
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message || "Failed to load user data",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load user data. Please try again later or reload page',
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getAllData();
  }, [toast, userId]);

  const handleEdit = (field: string, currentValue: string | number | boolean) => {
    setEditingField(field);
    setTempValue(currentValue.toString());
  };

  const handleSave = async (field: string) => {
    if (!user) return;

    try {
      // Convert tempValue to appropriate type based on field
      let updateValue: any = tempValue;
      if (field === 'verified') {
        updateValue = tempValue === 'true';
      } else if (field === 'balance' || field === 'assetValue' || field === 'assetLoss') {
        updateValue = parseFloat(tempValue);
      }

      // Update user locally (you might want to make an API call here to persist changes)
      const updatedUser = { ...user };
      if (field === 'balance' || field === 'assetValue' || field === 'assetLoss') {
        updatedUser.wallet = { ...updatedUser.wallet, [field]: updateValue };
      } else {
        (updatedUser as any)[field] = updateValue;
      }
      const USER_TOKEN = Cookies.get('adminToken');
      if (!USER_TOKEN) {
        window.location.href = "/admin/login";
        return;
      }

      setLoading(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      // update user data
      const payload = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        verified: updatedUser.verified,
        wallet: updatedUser.wallet
      }
      const userResponse = await api.put<userResponseType>(`/admin/user?username=${userId}`, payload);
      setUser(userResponse.data.data);
      setEditingField(null);

      toast({
        title: t('admin.userDetail.updatedSuccessfully'),
        description: t('admin.userDetail.fieldUpdated', { field }),
      })
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to load user data",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to load user data. Please try again later or reload page',
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    };
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const getStatusColor = (verified: boolean) => {
    return verified
      ? "bg-green-500/10 text-green-500"
      : "bg-orange-500/10 text-orange-500";
  };

  const getStatusText = (verified: boolean) => {
    return verified ? "Verified" : "Unverified";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderEditableField = (
    label: string,
    field: string,
    value: string | number | boolean,
    type: string = "text",
    isWalletField: boolean = false
  ) => (
    <div className="space-y-2">
      <Label className="text-gray-400">{label}</Label>
      {editingField === field ? (
        <div className="flex gap-2">
          {field === 'verified' ? (
            <select
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 text-white border border-white/10"
            >
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </select>
          ) : (
            <Input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="bg-black/50"
            />
          )}
          <Button size="sm" onClick={() => handleSave(field)}>
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
          <span className="text-white">
            {field === 'verified' ? (
              <Badge className={getStatusColor(value as boolean)}>
                {getStatusText(value as boolean)}
              </Badge>
            ) : field === 'balance' || field === 'assetValue' || field === 'assetLoss' ? (
              `$${(value as number).toLocaleString()}`
            ) : (
              value.toString()
            )}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(field, value)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading user data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <p className="text-gray-400">User not found</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>
          <Badge className={getStatusColor(user.verified)}>
            {getStatusText(user.verified)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{t('admin.userDetail.personalInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderEditableField(t('admin.userDetail.firstName'), "firstName", user.firstName)}
              {renderEditableField(t('admin.userDetail.lastName'), "lastName", user.lastName)}
              {renderEditableField(t('admin.userDetail.username'), "username", user.username)}
              {renderEditableField("Verification Status", "verified", user.verified)}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">{t('admin.userDetail.accountInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderEditableField("Wallet Balance", "balance", user.wallet.balance, "number", true)}
              {renderEditableField("Asset Balance", "assetValue", user.wallet.assetValue, "number", true)}
              {renderEditableField("Asset Loss", "assetLoss", user.wallet.assetLoss, "number", true)}

              <div className="space-y-2">
                <Label className="text-gray-400">Join Date</Label>
                <div className="p-3 rounded-lg bg-black/20">
                  <span className="text-white">{formatDate(user.createdAt)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Last Updated</Label>
                <div className="p-3 rounded-lg bg-black/20">
                  <span className="text-white">{formatDate(user.updatedAt)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Watch List Count</Label>
                <div className="p-3 rounded-lg bg-black/20">
                  <span className="text-white">{user.wallet.watchList.length} items</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Summary */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-white">${user.wallet.balance.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">Asset Value</p>
                <p className="text-2xl font-bold text-green-500">${user.wallet.assetValue.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-black/20">
                <p className="text-gray-400 text-sm">Asset Loss</p>
                <p className="text-2xl font-bold text-red-500">${user.wallet.assetLoss.toLocaleString()}</p>
              </div>
            </div>

            {/* Additional wallet info */}
            <div className="mt-6 p-4 rounded-lg bg-black/20">
              <h3 className="text-white font-semibold mb-3">Portfolio Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Portfolio Value: </span>
                  <span className="text-white font-medium">
                    ${(user.wallet.balance + user.wallet.assetValue).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Net P&L: </span>
                  <span className={`font-medium ${user.wallet.assetValue - user.wallet.assetLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${(user.wallet.assetValue - user.wallet.assetLoss).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Watch List */}
        {user.wallet.watchList.length > 0 && (
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Watch List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.wallet.watchList.map((item, index) => (
                  <Badge key={index} variant="outline" className="bg-black/20 text-white border-white/20">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDetail;