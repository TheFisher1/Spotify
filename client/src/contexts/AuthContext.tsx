import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginForm, RegistrationForm } from '../types';
import { authService } from '../services/authService';
import { jwtUtils } from '../utils/jwtUtils';

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
        const initializeAuth = () => {
            const token = authService.getToken();

            if (token && jwtUtils.validateToken(token)) {
                const userFromToken = jwtUtils.getUserFromToken(token);
                if (userFromToken) {
                    setUser(userFromToken);
                    authService.setUser(userFromToken);
                }
            } else if (token) {
                authService.logout();
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials: LoginForm) => {
        try {
            const response = await authService.login(credentials);

            authService.setToken(response.token);

            const userFromToken = jwtUtils.getUserFromToken(response.token);
            if (userFromToken) {
                setUser(userFromToken);
                authService.setUser(userFromToken);
            } else {
                throw new Error('Invalid token received');
            }
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