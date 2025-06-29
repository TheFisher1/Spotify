import api from './api';
import { Like } from '../types';

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
    }
}; 