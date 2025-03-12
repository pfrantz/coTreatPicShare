import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: string | null;
    authToken: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('AUTH_TOKEN'));
    const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem('AUTH_USERNAME'));
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('AUTH_TOKEN'));

    const login = (username: string, token: string) => {
        localStorage.setItem('AUTH_USERNAME', username);
        localStorage.setItem('AUTH_TOKEN', token);
        setIsAuthenticated(true);
        setCurrentUser(username);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('AUTH_USERNAME');
        localStorage.removeItem('AUTH_TOKEN');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
