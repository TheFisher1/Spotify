import api from './api';
import { Like, Follow } from '../types';

export const actionsService = {

    async likeSong(userId: number, songId: number): Promise<Like> {
        const response = await api.post<Like>('/actions/likes', { userId, songId });
        return response.data;
    },

    async unlikeSong(userId: number, songId: number): Promise<void> {
        await api.delete(`/actions/likes?userId=${userId}&songId=${songId}`);
    },

    async getUserLikes(userId: number): Promise<Like[]> {
        const response = await api.get<Like[]>(`/actions/likes/user/${userId}`);
        return response.data;
    },

    async isSongLiked(userId: number, songId: number): Promise<boolean> {
        try {
            await api.get(`/actions/likes/check?userId=${userId}&songId=${songId}`);
            return true;
        } catch {
            return false;
        }
    },

    async followArtist(followerId: number, followingId: number): Promise<Follow> {
        const response = await api.post<Follow>('/actions/follows', { followerId, followingId });
        return response.data;
    },

    async unfollowArtist(followerId: number, followingId: number): Promise<void> {
        await api.delete(`/actions/follows?followerId=${followerId}&followingId=${followingId}`);
    },

    async getUserFollows(userId: number): Promise<Follow[]> {
        const response = await api.get<Follow[]>(`/actions/follows/user/${userId}`);
        return response.data;
    },

    async isFollowingArtist(followerId: number, followingId: number): Promise<boolean> {
        try {
            await api.get(`/actions/follows/check?followerId=${followerId}&followingId=${followingId}`);
            return true;
        } catch {
            return false;
        }
    }
}; 