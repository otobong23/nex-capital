import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute = ({ children, requiredRole = "user" }: ProtectedRouteProps) => {
  const token = Cookies.get(requiredRole === "admin" ? "adminToken" : "authToken");
  const userRole = Cookies.get("userRole");

  // Check if user is authenticated
  if (!token) {
    return <Navigate to={requiredRole === "admin" ? "/admin/login" : "/login"} replace />;
  }

  // Check if user has required role for admin routes
  if (requiredRole === "admin" && userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;