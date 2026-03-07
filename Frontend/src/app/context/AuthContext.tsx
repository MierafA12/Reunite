"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { profileApi, authApi } from "@/app/lib/api";

interface User {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    name?: string;
    email: string;
    email_verified_at?: string | null;
    phone?: string;
    workplace?: string;
    address?: string;
    profile_image?: string;
    profile?: {
        phone?: string;
        workplace?: string;
        address?: string;
        profile_image?: string;
        gender?: string;
        date_of_birth?: string;
        bio?: string;
    };
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    updateUser: (userData: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // If we have a user in local storage, use it initially for faster UI but verify
                const storedUser = localStorage.getItem("reunite_user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    setIsLoggedIn(true);
                }

                // Verify with backend
                const data = await profileApi.getUserProfile();
                if (data.user) {
                    setUser(data.user);
                    setIsLoggedIn(true);
                    localStorage.setItem("reunite_user", JSON.stringify(data.user));
                }
            } catch (error) {
                setUser(null);
                setIsLoggedIn(false);
                localStorage.removeItem("reunite_user");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("reunite_user", JSON.stringify(userData));
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem("reunite_user", JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem("reunite_user");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, updateUser, logout }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
