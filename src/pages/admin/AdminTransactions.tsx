import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";


const AdminTransactions = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<transactionType[]>([]);
  const [updatingTransaction, setUpdatingTransaction] = useState<string | null>(null);
  const { toast } = useToast();
  const [transactionStats, setTransactionStats] = useState({
    total: 0,
    totalPages: 0,
    page: 1,
    limit: 50
  });

  useEffect(() => {
    getTransactions();
  }, [transactionStats.page]);

  const getTransactions = async () => {
    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setLoading(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;

      const allTransactionResponse = await api.get<allTransactionsResponseType>(
        `/admin/transactions?limit=${transactionStats.limit}&page=${transactionStats.page}`
      );

      console.dir(allTransactionResponse.data.data.transactions, allTransactionResponse.data);
      setTransactions(allTransactionResponse.data.data.transactions);
      setTransactionStats({
        total: allTransactionResponse.data.data.total,
        totalPages: allTransactionResponse.data.data.totalPages,
        page: allTransactionResponse.data.data.page,
        limit: allTransactionResponse.data.data.limit
      });

    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to load transactions",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to load transactions data. Please try again later or reload page',
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.blockchain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || transaction.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || transaction.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAccept = async (transactionId: string) => {
    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setUpdatingTransaction(transactionId);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const updateTransaction = await api.put<updateTransactionType>(
        `/admin/transactions?transactionID=${transactionId}`,
        {
          status: 'completed',
        }
      );

      // Update the transaction in local state
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction._id === transactionId
            ? { ...transaction, status: 'completed' as const }
            : transaction
        )
      );

      toast({
        title: t('admin.transactions.approved'),
        description: t('admin.transactions.markedCompleted'),
      });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to update transaction",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to update transaction. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setUpdatingTransaction(null);
    }
  };

  const handleReject = async (transactionId: string) => {
    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setUpdatingTransaction(transactionId);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const updateTransaction = await api.put<updateTransactionType>(
        `/admin/transactions?transactionID=${transactionId}`,
        {
          status: 'failed',
        }
      );

      // Update the transaction in local state
      setTransactions(prevTransactions =>
        prevTransactions.map(transaction =>
          transaction._id === transactionId
            ? { ...transaction, status: 'failed' as const }
            : transaction
        )
      );

      toast({
        title: t('admin.transactions.rejected'),
        description: t('admin.transactions.hasBeenRejected'),
        variant: "destructive",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to update transaction",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to update transaction. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setUpdatingTransaction(null);
    }
  };

  const handleDownloadReceipt = (transaction: transactionType) => {
    if (transaction.image) {
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = transaction.image;
      link.download = `receipt_${transaction._id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast({
      title: t('admin.transactions.downloadingReceipt'),
      description: t('admin.transactions.receiptFor', { user: transaction.username }),
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
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
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePageChange = (newPage: number) => {
    setTransactionStats(prev => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading transactions data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('admin.transactions.title')}</h1>
            <p className="text-gray-400">{t('admin.transactions.subtitle')}</p>
          </div>
          <div className="text-white">
            {t('admin.transactions.total')}: <span className="font-bold">{transactionStats.total}</span>
          </div>
        </div>

        {/* Filters */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t('admin.transactions.filterTransactions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t('admin.transactions.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/50"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-3 rounded-lg bg-black/50 text-white border border-white/10"
              >
                <option value="all">{t('admin.transactions.allTypes')}</option>
                <option value="deposit">{t('admin.transactions.deposit')}</option>
                <option value="withdrawal">{t('admin.transactions.withdrawal')}</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 rounded-lg bg-black/50 text-white border border-white/10"
              >
                <option value="all">{t('admin.transactions.allStatus')}</option>
                <option value="pending">{t('admin.transactions.pending')}</option>
                <option value="completed">{t('admin.transactions.completed')}</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              {t('admin.transactions.transactionsList', { count: filteredTransactions.length })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No transactions found matching your criteria.</p>
                </div>
              ) : (
                filteredTransactions.map((transaction) => (
                  <motion.div
                    key={transaction._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="text-white font-medium">@{transaction.username}</p>
                        <p className="text-sm text-gray-400">
                          {formatDate(transaction.createdAt)} • {transaction.blockchain} • {transaction.type}
                        </p>
                        {transaction.description && (
                          <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                            {transaction.description}
                          </p>
                        )}
                        {transaction.walletAddress && (
                          <p className="text-xs text-gray-500 mt-1 font-mono">
                            {/* Wallet: {transaction.walletAddress.slice(0, 10)}...{transaction.walletAddress.slice(-6)} */}
                            Wallet: {transaction.walletAddress}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'
                          }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </p>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        {transaction.image && transaction.type === 'deposit' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadReceipt(transaction)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}

                        {transaction.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAccept(transaction._id)}
                              disabled={updatingTransaction === transaction._id}
                            >
                              {updatingTransaction === transaction._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(transaction._id)}
                              disabled={updatingTransaction === transaction._id}
                            >
                              {updatingTransaction === transaction._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination */}
            {transactionStats.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  Showing {((transactionStats.page - 1) * transactionStats.limit) + 1} to{' '}
                  {Math.min(transactionStats.page * transactionStats.limit, transactionStats.total)} of{' '}
                  {transactionStats.total} transactions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePageChange(transactionStats.page - 1)}
                    disabled={transactionStats.page === 1 || loading}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-white px-3">
                    Page {transactionStats.page} of {transactionStats.totalPages}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePageChange(transactionStats.page + 1)}
                    disabled={transactionStats.page === transactionStats.totalPages || loading}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminTransactions;