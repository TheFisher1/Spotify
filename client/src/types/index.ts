export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegistrationForm {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface Song {
    id?: number;
    title: string;
    artist?: Artist;
    album?: Album;
    duration?: string;
    thumbnail?: string;
    url?: string;
    genre?: string;
}

export const formatDuration = (duration: string | undefined): string => {
    if (!duration) return '0:00';

    if (typeof duration === 'string') return duration;

    return '0:00';
};

export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    cover: string;
    audioUrl?: string;
}

export interface Album {
    id?: number;
    name: string;
    artist?: Artist;
    duration?: string;
    releaseDate?: string;
    cover?: string;
    genre?: string;
}

export interface Playlist {
    id: string;
    name: string;
    description?: string;
    coverUrl?: string;
    userId?: number;
    songs?: Song[];
}

export interface Artist {
    id?: number;
    name: string;
    bio?: string;
    image?: string;
    genre?: string;
}

export interface Like {
    id?: number;
    userId: number;
    songId: number;
    timestamp?: string;
}

export interface Follow {
    id?: number;
    followerId: number;
    followingId: number;
    timestamp?: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
} 