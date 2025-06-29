import { User } from '../types';

export interface JWTPayload {
    id: string;
    username: string;
    email: string;
    iat: number;
    exp: number;
}

export const jwtUtils = {
    parseToken(token: string): JWTPayload | null {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing JWT token:', error);
            return null;
        }
    },

    isTokenExpired(token: string): boolean {
        const payload = this.parseToken(token);
        if (!payload) return true;

        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    },

    getUserFromToken(token: string): User | null {
        const payload = this.parseToken(token);
        if (!payload) return null;

        return {
            id: parseInt(payload.id),
            username: payload.username,
            email: payload.email
        };
    },

    validateToken(token: string): boolean {
        if (!token) return false;

        const payload = this.parseToken(token);
        if (!payload) return false;

        return !this.isTokenExpired(token);
    }
}; 