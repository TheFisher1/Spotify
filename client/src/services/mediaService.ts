import api from './api';
import { Album, Playlist, Song } from '../types';

export const mediaService = {

    async getSongs({ pageSize, pageNumber }: { pageSize: number, pageNumber: number }): Promise<Song[]> {
        const response = await api.get<Song[]>(`/media/songs?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data;
    },

    async getSongById(songId: number, userId: number): Promise<Song> {
        const response = await api.get<Song>(`/media/songs/${songId}?userId=${userId}`);
        return response.data;
    },

    async getSongsByArtist(artistId: number): Promise<Song[]> {
        const response = await api.get<Song[]>(`/media/songs/artists/${artistId}`);
        return response.data;
    },

    async createSong(song: Song): Promise<Song> {
        const response = await api.post<Song>('/media/songs', song);
        return response.data;
    },

    async updateSong(id: number, song: Song): Promise<Song> {
        const response = await api.put<Song>(`/media/songs/${id}`, song);
        return response.data;
    },

    async deleteSong(id: number): Promise<void> {
        await api.delete(`/media/songs/${id}`);
    },

    async getAllAlbums(): Promise<Album[]> {
        const response = await api.get<Album[]>('/media/albums');
        return response.data;
    },

    async getAlbumById(id: number): Promise<Album> {
        const response = await api.get<Album>(`/media/albums/${id}`);
        return response.data;
    },

    async createAlbum(album: Album): Promise<Album> {
        const response = await api.post<Album>('/media/albums', album);
        return response.data;
    },

    async updateAlbum(id: number, album: Album): Promise<Album> {
        const response = await api.put<Album>(`/media/albums/${id}`, album);
        return response.data;
    },

    async deleteAlbum(id: number): Promise<void> {
        await api.delete(`/media/albums/${id}`);
    },

    async getPlaylistById(id: string): Promise<Playlist> {
        const response = await api.get<Playlist>(`/media/playlists/${id}`);
        return response.data;
    },

    async getPlaylistWithSongs(id: string): Promise<Playlist> {
        const playlist = await this.getPlaylistById(id);
        const songs = await this.getSongsInPlaylist(id);
        return {
            ...playlist,
            songs: songs
        };
    },

    async getSongsInPlaylist(playlistId: string): Promise<Song[]> {
        const response = await api.get<Song[]>(`/media/playlists/${playlistId}/songs`);
        return response.data;
    },

    async getUserPlaylists(userId: number, page: number = 0, size: number = 10): Promise<{
        content: Playlist[];
        totalElements: number;
        totalPages: number;
        currentPage: number;
        size: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }> {
        const response = await api.get(`/media/playlists/user/${userId}?page=${page}&size=${size}`);
        return response.data;
    },

    async createPlaylist(playlist: Playlist): Promise<Playlist> {
        const response = await api.post<Playlist>('/media/playlists', playlist);
        return response.data;
    },

    async updatePlaylist(id: number, playlist: Playlist): Promise<Playlist> {
        const response = await api.put<Playlist>(`/media/playlists/${id}`, playlist);
        return response.data;
    },

    async deletePlaylist(id: number): Promise<void> {
        await api.delete(`/media/playlists/${id}`);
    },

    async addSongToPlaylist(playlistId: number, songId: number): Promise<void> {
        await api.post(`/media/playlists/${playlistId}/songs/${songId}`);
    },

    async removeSongFromPlaylist(playlistId: number, songId: number): Promise<void> {
        await api.delete(`/media/playlists/${playlistId}/songs/${songId}`);
    },

    async getSongsBySearchQuery(q: string): Promise<Song[]> {
        const response = await api.get(`media/songs/search?q=${q}`);
        return response.data;
    },
}; 