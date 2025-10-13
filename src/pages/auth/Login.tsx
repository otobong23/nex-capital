import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, Navigate } from "react-router-dom";
import api from "@/lib/api";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const token = Cookies.get("authToken")
  const userRole = Cookies.get("userRole")

  // Check if user is authenticated
  if (token && userRole === "user") {
    return <Navigate to={"/dashboard"} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - replace with actual authentication
    setTimeout(async () => {
      if (username && password) {
        try {
          const response = await api.post<signResponse>('/auth/signin', { username, password })
          toast({
            title: "Login Successful",
            description: response.data.message,
          });
          Cookies.set("authToken", response.data.token, { expires: 30 });
          Cookies.set("userRole", "user", { expires: 30 });
          // Redirect to login would happen here
          window.location.href = "/dashboard";
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
              description: 'Failed to load Login. Please try again later or reload page',
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
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
            <CardTitle className="text-2xl font-bold">{t('auth.login.title')}</CardTitle>
            <p className="text-muted-foreground">{t('auth.login.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">{t('auth.login.username')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t('auth.login.usernamePlaceholder')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-black/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full button-gradient"
                disabled={isLoading}
              >
                {isLoading ? t('auth.login.signingIn') : t('auth.login.signIn')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.login.noAccount')}{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  {t('auth.login.signUpHere')}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <Link to="/" className="text-primary hover:underline">
                  {t('auth.login.backToHome')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;