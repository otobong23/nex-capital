import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Eye
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<userType[]>([]);
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [userStats, setUserStats] = useState({
    total: 0,
    totalPages: 0,
    page: 1
  });
  const [transactionStats, setTransactionStats] = useState({
    total: 0,
    totalPages: 0,
    page: 1
  });

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

        // Fetch users and transactions in parallel
        const [allUsersResponse, allTransactionResponse] = await Promise.all([
          api.get<allUserResponseType>('/admin/users?limit=10&page=1'),
          api.get<allTransactionsResponseType>('/admin/transactions?limit=5&page=1')
        ]);

        // Set users data
        setUsers(allUsersResponse.data.data.users);
        setUserStats({
          total: allUsersResponse.data.data.total,
          totalPages: allUsersResponse.data.data.totalPages,
          page: allUsersResponse.data.data.page
        });

        // Set transactions data
        console.dir(allTransactionResponse.data.data.transactions, allTransactionResponse.data)
        setTransactions(allTransactionResponse.data.data.transactions);
        setTransactionStats({
          total: allTransactionResponse.data.data.total,
          totalPages: allTransactionResponse.data.data.totalPages,
          page: allTransactionResponse.data.data.page
        });

      } catch (err) {
        console.log(err)
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message || "Failed to load data",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load dashboard data. Please try again later or reload page',
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getAllData();
  }, [toast]);

  // Calculate statistics from real data
  const stats = useCallback(() => ({
    totalUsers: userStats.total,
    totalTransactions: transactionStats.total,
    totalDeposits: transactions
      .filter(t => t.type === "deposit" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawals: transactions
      .filter(t => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: transactions.filter(t => t.status === "pending").length,
    completedTransactions: transactions.filter(t => t.status === "completed").length,
    rejectedTransactions: transactions.filter(t => t.status === "failed").length,
    totalBalance: users.reduce((sum, user) => sum + (user.wallet?.balance || 0), 0),
    totalAssetValue: users.reduce((sum, user) => sum + (user.wallet?.assetValue || 0), 0),
    verifiedUsers: users.filter(user => user.verified).length
  }), [transactions]);

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
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "rejected":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('admin.dashboard.title')}</h1>
          <p className="text-gray-400">{t('admin.dashboard.subtitle')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('admin.dashboard.totalUsers')}</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats().totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-400">{t('admin.dashboard.newUsersWeek')}</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('admin.dashboard.totalTransactions')}</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats().totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-gray-400">{t('admin.dashboard.monthlyGrowth')}</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('admin.dashboard.totalDeposits')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${stats().totalDeposits.toLocaleString()}</div>
              <p className="text-xs text-gray-400">{t('admin.dashboard.depositsGrowth')}</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('admin.dashboard.totalWithdrawals')}</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">${stats().totalWithdrawals.toLocaleString()}</div>
              <p className="text-xs text-gray-400">{t('admin.dashboard.withdrawalsChange')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                {t('admin.dashboard.pendingTransactions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{stats().pendingTransactions}</div>
              <p className="text-sm text-gray-400">{t('admin.dashboard.requiresAttention')}</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                {t('admin.dashboard.completedTransactions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{stats().completedTransactions}</div>
              <p className="text-sm text-gray-400">{t('admin.dashboard.successfullyProcessed')}</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                {t('admin.dashboard.rejectedTransactions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{stats().rejectedTransactions}</div>
              <p className="text-sm text-gray-400">{t('admin.dashboard.failedTransactions')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{t('admin.dashboard.recentTransactions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((transaction, index) => (
                  <motion.div
                    key={`${transaction.userId}-${transaction.createdAt}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-black/20 space-y-2 md:space-y-0"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="text-white font-medium">@{transaction.username}</p>
                        <p className="text-sm text-gray-400">
                          {formatDate(transaction.createdAt)} • {transaction.blockchain}
                        </p>
                        <p className="text-xs text-gray-400">{transaction.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400">{capitalizeFirst(transaction.type)}</p>
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {capitalizeFirst(transaction.status)}
                      </Badge>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent transactions found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.slice(0, 5).map((user, index) => (
                  <motion.div
                    key={`${user.username}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-black/20 space-y-2 md:space-y-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.verified ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                        {user.firstName?.charAt(0) || user.username?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                        </p>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                        <p className="text-xs text-gray-400">Joined: {formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-white font-medium">
                          ${user.wallet?.balance?.toLocaleString() || '0'}
                        </p>
                        <p className="text-sm text-gray-400">
                          Assets: ${user.wallet?.assetValue?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <Link to={`/admin/users/${user.username}`}>
                        <Button size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Badge className={user.verified ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}>
                        {user.verified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No users found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;