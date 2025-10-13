import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  History as HistoryIcon,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTranslation } from "react-i18next";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import downloadGroupedTransactionsAsPDF from "@/lib/export_transactions_as_pdf";
import Cookies from "js-cookie";

const History = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [userTransactions, setTransactions] = useState<transactionType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; balance: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getTransactions = async () => {
      const USER_TOKEN =  Cookies.get('authToken');
      if (!USER_TOKEN) {
        window.location.href = "/login";
        return;
      }

      setLoading(true);
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
        const response = await api.get<transactionListResponseType>(`/user/getTransactions?limit=50&page=${page}`);

        setTransactions(response.data.data.transactions);
        setPage(response.data.data.page);
        setTotalPages(response.data.data.totalPages);
        setTotalTransactions(response.data.data.total);
        setUser(response.data.data.user);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message || "Failed to load transactions",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load transactions. Please try again later or reload page',
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [page, toast]);

  const downloadFile = (data: any, fileName: string = "Transaction.json") => {
    const jsonStr = JSON.stringify(data, null, 2); // pretty-print with indentation
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    return url
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
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
    switch (status) {
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

  const getTypeIcon = (type: string) => {
    return type === "deposit" ? (
      <ArrowDownLeft className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-orange-500" />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Filter transactions
  const filteredTransactions = userTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.blockchain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Statistics
  const stats = {
    total: userTransactions.length,
    completed: userTransactions.filter(t => t.status === "completed").length,
    pending: userTransactions.filter(t => t.status === "pending").length,
    failed: userTransactions.filter(t => t.status === "failed").length,
    totalDeposited: userTransactions.filter(t => t.type === "deposit" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawn: userTransactions.filter(t => t.type === "withdrawal" && t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading transactions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.history.title')}</h1>
            <p className="text-gray-400">{t('dashboard.history.subtitle')}</p>
            {user && (
              <p className="text-sm text-gray-400 mt-1">
                Balance: <span className="text-primary font-medium">${user.balance}</span>
              </p>
            )}
          </div>
          <Button variant="outline" onClick={() => downloadGroupedTransactionsAsPDF(userTransactions)}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400">Total Transactions</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
              <p className="text-xs text-gray-400">Completed</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <p className="text-xs text-gray-400">Pending</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
              <p className="text-xs text-gray-400">Failed</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">${stats.totalDeposited.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Total Deposited</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500">${stats.totalWithdrawn.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Total Withdrawn</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t('dashboard.history.filterByType')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t('common.search')}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={t('dashboard.history.searchTransactions')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t('dashboard.history.type')}</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-black/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('dashboard.history.allTypes')}</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t('dashboard.history.status')}</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-black/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('dashboard.history.allStatuses')}</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <HistoryIcon className="w-5 h-5" />
              {t('dashboard.history.title')} ({filteredTransactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={`${transaction.userId}-${transaction.createdAt}-${index}`}
                  viewport={{ once: false }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors space-y-3 md:space-y-0"
                >
                  <div className="flex items-center justify-between md:justify-start md:gap-4">
                    <div className="flex items-center gap-2 md:gap-2">
                      {getTypeIcon(transaction.type)}
                      {getStatusIcon(transaction.status)}
                    </div>
                    <div className="md:block">
                      <p className="text-white font-medium text-sm md:text-base">{transaction.description}</p>
                      <p className="text-xs md:text-sm text-gray-400">{formatDate(transaction.createdAt)}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-white font-medium">{capitalizeFirst(transaction.type)}</p>
                      <p className="text-sm text-gray-400">{transaction.blockchain}</p>
                    </div>
                  </div>

                  {/* Mobile: Type and Crypto info */}
                  <div className="flex justify-between items-center md:hidden">
                    <div>
                      <p className="text-white font-medium text-sm">{capitalizeFirst(transaction.type)}</p>
                      <p className="text-xs text-gray-400">{transaction.blockchain}</p>
                    </div>
                    <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                      {capitalizeFirst(transaction.status)}
                    </Badge>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <div className="flex justify-between md:block md:text-right">
                      <div>
                        <p className={`font-medium text-sm md:text-base ${transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          {transaction.walletAddress ? `To: ${transaction.walletAddress.slice(0, 8)}...` : 'No address'}
                        </p>
                      </div>
                    </div>

                    <Badge className={`${getStatusColor(transaction.status)} hidden md:inline-flex`}>
                      {capitalizeFirst(transaction.status)}
                    </Badge>
                  </div>
                </motion.div>
              ))}

              {filteredTransactions.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-400">{t('dashboard.history.noTransactions')}</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Showing {((page - 1) * 50) + 1} to {Math.min(page * 50, totalTransactions)} of {totalTransactions} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-white px-3 py-1 bg-primary/20 rounded text-sm">
                    {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};


export default History;