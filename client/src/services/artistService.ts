import api from './api';
import { Artist } from '../types';

export const artistService = {
    async getAllArtists(): Promise<Artist[]> {
        const response = await api.get<Artist[]>('/artists');
        return response.data;
    },

    async getArtistById(id: number): Promise<Artist> {
        const response = await api.get<Artist>(`/artists/${id}`);
        return response.data;
    },

    async createArtist(artist: Artist): Promise<Artist> {
        const response = await api.post<Artist>('/artists', artist);
        return response.data;
    },

    async updateArtist(id: number, artist: Artist): Promise<Artist> {
        const response = await api.put<Artist>(`/artists/${id}`, artist);
        return response.data;
    },

    async deleteArtist(id: number): Promise<void> {
        await api.delete(`/artists/${id}`);
    },

    async searchArtists(query: string): Promise<Artist[]> {
        const response = await api.get<Artist[]>(`/artists/search?query=${encodeURIComponent(query)}`);
        return response.data;
    }
}; 