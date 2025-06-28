import api from './api';
import { LoginForm, RegistrationForm, AuthResponse, User } from '../types';

export const authService = {

    async login(credentials: LoginForm): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(userData: RegistrationForm): Promise<User> {
        const response = await api.post<User>('/auth/register', userData);
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    },

    getToken(): string | null {
        return localStorage.getItem('authToken');
    },

    setToken(token: string): void {
        localStorage.setItem('authToken', token);
    },

    setUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
    },

    getUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
}; 