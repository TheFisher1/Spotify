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

// Song represents the backend data structure
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

// Duration object from backend (ISO 8601 format like "PT3M30S")
export interface Duration {
    seconds?: number;
    nano?: number;
    negative?: boolean;
    zero?: boolean;
    units?: any[];
}

// Utility function to format duration
export const formatDuration = (duration: Duration | string | undefined): string => {
    if (!duration) return '0:00';

    // If it's already a string, return as is
    if (typeof duration === 'string') return duration;

    // If it's a Duration object with seconds
    if (duration.seconds !== undefined) {
        const minutes = Math.floor(duration.seconds / 60);
        const seconds = duration.seconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return '0:00';
};

// Track represents the music player data structure
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