import api from './api';
import { Song } from '../types';
import { mediaService } from './mediaService';

export const recommendationService = {
    async getRecommendedSongs(userId: number): Promise<Song[]> {
        const response = await api.get<number[]>(`/recommendations/${userid}`);
        const songIds = response.data;

        const songs = await Promise.all(
          songIds.map(id => mediaService.getSongById(id, userId))
        );

        return songs;
      }
};