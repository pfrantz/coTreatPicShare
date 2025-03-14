import React, { createContext, useContext, useState } from 'react';
import { AuthException } from '~/utils/exceptions';

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: string | null;
    authToken: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
    fetchWithAuth: (url: string, options?: RequestInit) => Promise<any>;
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

    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        const headers = {
            ...options.headers,
        };

        if (authToken) {
            headers['Authorization'] =`Bearer ${authToken}`;
        }

        //@ts-ignore
        const fullUrl = `${process.env.REACT_APP_PIC_SHARE_ENDPOINT}${url}`
       //@ts-ignore
        const response = await fetch(fullUrl, {...options, headers});

        if (response.status === 401) {
            throw new AuthException('Unauthorized access');
        } else if (response.status === 403) {
            throw new AuthException('Forbidden access - you do not have permission to access this resource');
        } else if (!response.ok) {
            throw new Error(`Unable to get data from the server (status=${response.status})`);
        }

        return response.json();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, authToken, login, logout, fetchWithAuth }}>
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
