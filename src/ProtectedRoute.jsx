import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, moduleId, requiredRWD }) => {
  const { hasPermission, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (!hasPermission(moduleId, requiredRWD)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
