// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    token: string | null;
    userId: number | null;
    name: string | null;
    setAuthData: (data: { token: string; userId: number; name: string }) => void;
    clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();  // For redirecting to login page
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [userId, setUserId] = useState<number | null>(localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null);
    const [name, setName] = useState<string | null>(localStorage.getItem('name'));

    // Function to set authentication data
    const setAuthData = ({ token, userId, name }: { token: string; userId: number; name: string }) => {
        setToken(token);
        setUserId(userId);
        setName(name);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('name', name);
    };

    // Function to clear authentication data (logout)
    const clearAuthData = () => {
        setToken(null);
        setUserId(null);
        setName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        navigate('/login');  // Redirect to login page after logout
    };

    // Initial setup from localStorage
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setUserId(localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null);
        setName(localStorage.getItem('name'));
    }, []);

    return (
        <AuthContext.Provider value={{ token, userId, name, setAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication data
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
