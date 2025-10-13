import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const Signup = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: t("common.error"),
        description: t("auth.signup.passwordsDoNotMatch"),
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate signup - replace with actual registration
    setTimeout(async () => {
      if (firstName && lastName && username && password) {
        try {
          const response = await api.post<signResponse>('/auth/signup', {
            firstName, lastName, username, password
          })
          toast({
            title: t("auth.signup.accountCreated"),
            description: response.data.message,
          });
          Cookies.set("authToken", response.data.token, { expires: 30 });
          Cookies.set("userRole", "user", { expires: 30 });
          // Redirect to login would happen here
          window.location.href = "/dashboard";
        } catch (err) {
          if (err instanceof AxiosError) {
            toast({
              title: t("common.error"),
              description: err.response?.data.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: t("common.error"),
              description: t("auth.signup.signupFailed"),
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: t("common.error"),
          description: t("auth.signup.fillAllFields"),
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
            <CardTitle className="text-2xl font-bold">{t("auth.signup.title")}</CardTitle>
            <p className="text-muted-foreground">{t("auth.signup.subtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("auth.signup.firstName")}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder={t("auth.signup.firstNamePlaceholder")}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-black/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("auth.signup.lastName")}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder={t("auth.signup.lastNamePlaceholder")}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-black/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">{t("auth.signup.username")}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t("auth.signup.usernamePlaceholder")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-black/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.signup.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("auth.signup.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("auth.signup.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t("auth.signup.confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-black/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full button-gradient"
                disabled={isLoading}
              >
                {isLoading ? t("auth.signup.creatingAccount") : t("auth.signup.createAccount")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("auth.signup.haveAccount")}{" "}
                <Link to="/login" className="text-primary hover:underline">
                  {t("auth.signup.signIn")}
                </Link>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <Link to="/" className="text-primary hover:underline">
                  {t("auth.signup.backToHome")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;