import api from './api';
import { Like } from '../types';
import { Song } from '../types'

export const actionsService = {

    async likeSong(userId: number, songId: number): Promise<void> {
      await api.post(`/likes/user/${userId}/song/${songId}`);
    }

    async unlikeSong(userId: number, songId: number): Promise<void> {
        await api.delete(`/likes/user/${userId}/song/${songId}`);
    },

    async getUserLikes(userId: number): Promise<Song[]> {
        const response = await api.get<Song[]>(`/likes/user/${userId}/songs`);
        return response.data;
    },

    async getLikesCount(songId : number) : Promise<number> {
        const response = await api.get<number>(`/likes/count/song/${songId}`);
        return response.data;
    }

    async isSongLiked(userId: number, songId: number): Promise<boolean> {
        const response = await api.get<boolean>(`/likes/check/user/${userId}/song/${songId}`);
        return response.data;
    }
}; 