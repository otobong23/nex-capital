import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import api from "@/lib/api";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("adminToken");
  const userRole = Cookies.get("userRole");

  // Check if user is authenticated
  if (token && userRole === "admin") {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy admin credentials
    if (formData.username && formData.password) {
      try {
        const response = await api.post<loginResponseType>('/admin/login', { username: formData.username, password: formData.password })
        toast({
          title: "Login Successful",
          description: response.data.message,
        });
        Cookies.set("adminToken", response.data.access_token, { expires: 30 });
        Cookies.set("userRole", "admin", { expires: 30 });
        navigate("/admin/dashboard");
      } catch (err) {
        if (err instanceof AxiosError) {
          toast({
            title: t('admin.login.error'),
            description: err.response?.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: t('admin.login.error'),
            description: t('admin.login.loginFailed'),
            variant: "destructive",
          });
        }

      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: t('admin.login.error'),
        description: t('admin.login.fillAllFields'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-white/10">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-white">{t('admin.login.title')}</CardTitle>
            <p className="text-gray-400">{t('admin.login.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">{t('admin.login.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-black/50"
                />
              </div>
              <div>
                <Label htmlFor="password">{t('admin.login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-black/50"
                />
              </div>
              <Button
                type="submit"
                className="w-full button-gradient"
                disabled={isLoading}
              >
                {isLoading ? t('admin.login.loggingIn') : t('admin.login.login')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;