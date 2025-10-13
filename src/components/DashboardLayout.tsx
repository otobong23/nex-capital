import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  CreditCard,
  Wallet,
  History,
  TrendingUp,
  LogOut,
  Menu,
  User,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import tradephereLogoSrc from "@/assets/trade_phere.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState<userType>(null)
  const { toast } = useToast();
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

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Plans", href: "/dashboard/plans", icon: CreditCard },
    { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Market", href: "/dashboard/market", icon: TrendingUp },
  ];

  const handleLogout = () => {
    // Simulate logout - replace with actual logout logic
    Cookies.remove('authToken');
    window.location.href = "/";
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#1B1B1B] text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* <img src={tradephereLogoSrc} alt="NEX_Capital" className="w-8 h-8" /> */}
          <span className="font-bold text-lg">NEX_Capital</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-white/10"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  if (!user) {
    return (<div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-40 glass"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SheetTitle className="sr-only">Sidebar Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Access different sections of the app using the sidebar links.
          </SheetDescription>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-[#1B1B1B]/80 backdrop-blur-xl px-4 sm:px-6">
          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-2 text-white">
              <User className="w-5 h-5" />
              <span className="text-sm capitalize">{user.firstName ?? 'user'} {user.lastName ?? ''}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;