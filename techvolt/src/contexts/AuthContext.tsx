"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AuthContextType } from '@/types/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
        return localStorage.getItem('userEmail');
        }
        return null;
    });

    const updateAuthData = (email: string) => {
        setUserEmail(email);
        if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', email);
        }
    };

    const checkAuth = () => {
        if (typeof window !== "undefined") {
        const email = localStorage.getItem("userEmail");
        setUserEmail(email);
        setIsAuthenticated(!!email);
        }
        setIsLoading(false);
    };

    const login = async (email: string) => {
        return new Promise<void>((resolve) => {
        localStorage.setItem("userEmail", email);
        setUserEmail(email);
        setIsAuthenticated(true);
        resolve();
        });
    };

    const logout = async () => {
        return new Promise<void>((resolve) => {
        localStorage.removeItem("userEmail");
        setUserEmail(null);
        setIsAuthenticated(false);
        resolve();
        });
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, userEmail, setUserEmail, login, logout, checkAuth, updateAuthData }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
    }
    return context;
}