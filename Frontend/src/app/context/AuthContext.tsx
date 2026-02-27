"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    name?: string; // For backward compatibility if needed
    email: string;
    phone?: string;
    workplace?: string;
    address?: string;
    profile_image?: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem("reunite_user");
        const token = localStorage.getItem("reunite_token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("reunite_user", JSON.stringify(userData));
        localStorage.setItem("reunite_token", token);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("reunite_user");
        localStorage.removeItem("reunite_token");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
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
