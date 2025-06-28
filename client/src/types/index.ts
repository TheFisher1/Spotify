// User related types
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
    artist?: any;
    album?: any;
    duration?: any;
    thumbnail?: string;
    cover?: string;
    audioUrl?: string;
    url?: string;
    artistId?: number;
    genre?: string;
    filePath?: string;
}

export interface Album {
    id?: number;
    title: string;
    artist: string;
    cover?: string;
    releaseDate?: string;
    songs?: Song[];
}

export interface Playlist {
    id?: number;
    name: string;
    description?: string;
    cover?: string;
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

export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    cover: string;
    audioUrl?: string;
    url?: string;
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