import React, { createContext, useContext, useState } from "react";
import SessionService from "../storage/SessionService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(SessionService.getUser());

  const login = (loggedUser) => {
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = () => {
    if (!user) {
      var sessionUser = JSON.parse(localStorage.getItem("user"));
      if (sessionUser) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const hasPermission = (moduleId, requiredRWD = null) => {
    if (!user) return false;
    if (user.isAdmin == 1) return true;

    if (requiredRWD) {
      return user.permissions.some(
        (permission) =>
          permission.moduleId == moduleId &&
          permission.rwd.includes(requiredRWD)
      );
    } else {
      return user.permissions.some(
        (permission) => permission.moduleId == moduleId
      );
    }
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
