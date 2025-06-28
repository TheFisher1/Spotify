import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginForm, RegistrationForm } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginForm) => Promise<void>;
    register: (userData: RegistrationForm) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated on app load
        const token = authService.getToken();
        const storedUser = authService.getUser();

        if (token && storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginForm) => {
        try {
            const response = await authService.login(credentials);
            authService.setToken(response.token);

            // Get user data (you might need to adjust this based on your backend)
            const userData = { username: credentials.username, email: '' }; // Adjust as needed
            authService.setUser(userData);
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData: RegistrationForm) => {
        try {
            const newUser = await authService.register(userData);
            setUser(newUser);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 