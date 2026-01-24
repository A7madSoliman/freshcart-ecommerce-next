"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "./token";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
