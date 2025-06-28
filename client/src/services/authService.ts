import api from './api';
import { LoginForm, RegistrationForm, AuthResponse, User } from '../types';

export const authService = {
    // Login user
    async login(credentials: LoginForm): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    // Register new user
    async register(userData: RegistrationForm): Promise<User> {
        const response = await api.post<User>('/auth/register', userData);
        return response.data;
    },

    // Get current user info (if you have an endpoint for this)
    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    // Logout user
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    },

    // Get stored auth token
    getToken(): string | null {
        return localStorage.getItem('authToken');
    },

    // Store auth token
    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    },

    // Store user data
    setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Get stored user data
    getUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}; 