import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Edit, Loader2, User, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const AllUsers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<userType[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const [userStats, setUserStats] = useState({
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
        // Fetch users
        const allUsersResponse = await api.get<allUserResponseType>(`/admin/users?limit=50&page=${userStats.page}`);
        setUsers(allUsersResponse.data.data.users);
        setUserStats({
          total: allUsersResponse.data.data.total,
          totalPages: allUsersResponse.data.data.totalPages,
          page: allUsersResponse.data.data.page
        });
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          toast({
            title: "Error",
            description: err.response?.data.message || "Failed to load users",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: 'Failed to load users data. Please try again later or reload page',
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getAllData();
  }, [userStats.page, toast]);

  const handleDeleteConfirmation = (username: string) => {
    setUserToDelete(username);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async (username: string) => {
    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setDeleting(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      await api.delete(`/admin/user?username=${username}`);

      // Remove user from the current list
      if (isSearchMode) {
        setSearchedUsers(prev => prev.filter(user => user.username !== username));
      } else {
        setUsers(prev => prev.filter(user => user.username !== username));
        setUserStats(prev => ({ ...prev, total: prev.total - 1 }));
      }

      toast({
        title: "Success",
        description: `User ${username} has been deleted successfully`,
        variant: "default",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to delete user",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to delete user. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearchMode(false);
      setSearchedUsers([]);
      return;
    }

    const USER_TOKEN = Cookies.get('adminToken');
    if (!USER_TOKEN) {
      window.location.href = "/admin/login";
      return;
    }

    setSearching(true);
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${USER_TOKEN}`;
      const allUsersResponse = await api.get<searchUsersResponse>(`/admin/users/search?keyword=${searchTerm}`);
      setSearchedUsers(allUsersResponse.data.data);
      setIsSearchMode(true);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data.message || "Failed to search users",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: 'Failed to search users. Please try again later',
          variant: "destructive",
        });
      }
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchMode(false);
    setSearchedUsers([]);
  };

  const changePage = async (newPage: number) => {
    setUserStats(prev => ({ ...prev, page: newPage }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (verified: boolean) => {
    return verified
      ? "bg-green-500/10 text-green-500"
      : "bg-gray-500/10 text-gray-500";
  };

  const getStatusText = (verified: boolean) => {
    return verified ? "Verified" : "Unverified";
  };

  // Determine which users to display
  const displayUsers = isSearchMode ? searchedUsers : users;
  const displayCount = isSearchMode ? searchedUsers.length : userStats.total;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-400">Loading users data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('admin.users.title')}</h1>
            <p className="text-gray-400">{t('admin.users.subtitle')}</p>
          </div>
          <div className="text-white">
            {t('admin.users.totalUsers')}: <span className="font-bold">{userStats.total}</span>
          </div>
        </div>

        {/* Search Filter */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              {t('admin.users.filterUsers')}
              {isSearchMode && (
                <Button variant="outline" size="sm" onClick={clearSearch}>
                  Clear Search
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <div className="flex gap-3">
                <Input
                  placeholder={t('admin.users.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-black/50"
                />
                <Button onClick={handleSearch} disabled={searching}>
                  {searching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="text-white w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">
              {isSearchMode
                ? `Search Results (${displayCount})`
                : `${t('admin.users.usersList', { count: displayCount })}`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayUsers.length > 0 ? (
                displayUsers.map((user, index) => (
                  <motion.div
                    key={`${user.username}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors space-y-3 md:space-y-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        {user.firstName && user.lastName ? (
                          <span className="text-primary font-bold">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        ) : (
                          <User className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.username
                          }
                        </p>
                        <p className="text-sm text-gray-400">@{user.username}</p>
                        <p className="text-xs text-gray-500">
                          Joined: {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex justify-between md:block md:text-right">
                        <div>
                          <p className="text-white font-medium">
                            ${user.wallet?.balance?.toLocaleString() || '0.00'}
                          </p>
                          <p className="text-xs text-gray-400">{t('admin.users.balance')}</p>
                        </div>
                        <div className="md:mt-1">
                          <p className="text-sm text-gray-300">
                            Assets: ${user.wallet?.assetValue?.toLocaleString() || '0.00'}
                          </p>
                          {user.wallet?.assetLoss > 0 && (
                            <p className="text-xs text-red-400">
                              Loss: ${user.wallet.assetLoss.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <Badge className={getStatusColor(user.verified)}>
                          {getStatusText(user.verified)}
                        </Badge>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteConfirmation(user.username)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Link to={`/admin/users/${user.username}`}>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    {isSearchMode ? "No users found matching your search" : "No users found"}
                  </p>
                </div>
              )}
            </div>

            {/* Pagination - only show when not in search mode */}
            {!isSearchMode && userStats.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  Showing {((userStats.page - 1) * 50) + 1} to {Math.min(userStats.page * 50, userStats.total)} of {userStats.total} users
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(userStats.page - 1)}
                    disabled={userStats.page === 1 || loading}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-white px-3 py-1 bg-primary/20 rounded text-sm">
                    {userStats.page} of {userStats.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(userStats.page + 1)}
                    disabled={userStats.page === userStats.totalPages || loading}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Modal */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="bg-gray-900 border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete User
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to delete the user <span className="font-semibold text-white">@{userToDelete}</span>?
                This action cannot be undone and will permanently remove all user data including their wallet, transactions, and assets.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-gray-700 text-gray-300 hover:bg-gray-600"
                disabled={deleting}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => userToDelete && handleDeleteUser(userToDelete)}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AllUsers;