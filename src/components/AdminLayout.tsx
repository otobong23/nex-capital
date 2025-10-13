import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  History,
  Settings,
  LogOut,
  Menu,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
// import tradephereLogoSrc from "@/assets/trade_phere.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: t("admin.nav.dashboard"), href: "/admin/dashboard", icon: Home },
    { name: t("admin.nav.users"), href: "/admin/users", icon: Users },
    { name: t("admin.nav.transactions"), href: "/admin/transactions", icon: History },
    { name: t("admin.nav.settings"), href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    Cookies.remove("adminToken");
    Cookies.remove("userRole");
    window.location.href = "/";
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#1B1B1B] text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-red-500" />
          <span className="font-bold text-lg">{t("admin.nav.adminPanel")}</span>
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
                    ? "bg-red-500 text-white"
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
          {t("admin.nav.logout")}
        </Button>
      </div>
    </div>
  );

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
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-sm">{t("admin.nav.admin")}</span>
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

export default AdminLayout;