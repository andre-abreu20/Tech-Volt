"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const userEmail = localStorage.getItem("userEmail");
      setIsAuthenticated(!!userEmail);
    }
    setIsLoading(false);
  };

  const login = (email: string) => {
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return { isAuthenticated, isLoading, login, logout };
};
