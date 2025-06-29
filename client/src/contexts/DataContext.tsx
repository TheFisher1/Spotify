import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Song, Playlist, Album, Artist } from '../types';
import { mediaService } from '../services/mediaService';
import { artistService } from '../services/artistService';
import { useAuth } from './AuthContext';

interface DataContextType {
    songs: Song[];
    playlists: Playlist[];
    albums: Album[];
    artists: Artist[];

    pagination: {
        songs: { pageNumber: number; pageSize: number; hasMore: boolean };
        playlists: { pageNumber: number; pageSize: number; hasMore: boolean };
    };

    loading: {
        songs: boolean;
        playlists: boolean;
        albums: boolean;
        artists: boolean;
        search: boolean;
        loadMoreSongs: boolean;
        loadMorePlaylists: boolean;
    };

    error: {
        songs: string;
        playlists: string;
        albums: string;
        artists: string;
        search: string;
    };

    fetchSongs: (pageSize?: number, pageNumber?: number, append?: boolean) => Promise<void>;
    fetchPlaylists: (pageSize?: number, pageNumber?: number, append?: boolean) => Promise<void>;
    fetchAlbums: () => Promise<void>;
    fetchArtists: () => Promise<void>;
    loadMoreSongs: () => Promise<void>;
    loadMorePlaylists: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const { user } = useAuth();

    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [searchResults, setSearchResults] = useState<{
        songs: Song[];
        albums: Album[];
        playlists: Playlist[];
        artists: Artist[];
    }>({ songs: [], albums: [], playlists: [], artists: [] });

    const [pagination, setPagination] = useState({
        songs: { pageNumber: 0, pageSize: 5, hasMore: true },
        playlists: { pageNumber: 0, pageSize: 10, hasMore: true }
    });

    const [loading, setLoading] = useState({
        songs: false,
        playlists: false,
        albums: false,
        artists: false,
        search: false,
        loadMoreSongs: false,
        loadMorePlaylists: false
    });

    const [error, setError] = useState({
        songs: '',
        playlists: '',
        albums: '',
        artists: '',
        search: ''
    });

    const fetchSongs = async (pageSize: number = 5, pageNumber: number = 0, append: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, songs: true }));
            setError(prev => ({ ...prev, songs: '' }));

            const songsData = await mediaService.getSongs({ pageSize, pageNumber });

            const validSongs = Array.isArray(songsData) ? songsData : [];

            if (append) {
                setSongs(prev => [...prev, ...validSongs]);
            } else {
                setSongs(validSongs);
            }

            setPagination(prev => ({
                ...prev,
                songs: {
                    ...prev.songs,
                    pageNumber,
                    hasMore: validSongs.length === pageSize
                }
            }));
        } catch (err: any) {
            setError(prev => ({ ...prev, songs: 'Failed to load songs' }));
            console.error('Error fetching songs:', err);
            if (!append) {
                setSongs([]);
            }
        } finally {
            setLoading(prev => ({ ...prev, songs: false }));
        }
    };

    const fetchPlaylists = async (pageSize: number = 10, pageNumber: number = 0, append: boolean = false) => {
        try {
            setLoading(prev => ({ ...prev, playlists: true }));
            setError(prev => ({ ...prev, playlists: '' }));

            const playlistsData = await mediaService.getUserPlaylists(user?.id!, pageNumber, pageSize);

            const validPlaylists = Array.isArray(playlistsData) ? playlistsData : [];

            if (append) {
                setPlaylists(prev => [...prev, ...validPlaylists]);
            } else {
                setPlaylists(validPlaylists);
            }

            setPagination(prev => ({
                ...prev,
                playlists: {
                    ...prev.playlists,
                    pageNumber,
                    hasMore: validPlaylists.length === pageSize
                }
            }));
        } catch (err: any) {
            setError(prev => ({ ...prev, playlists: 'Failed to load playlists' }));
            console.error('Error fetching playlists:', err);
            if (!append) {
                setPlaylists([]);
            }
        } finally {
            setLoading(prev => ({ ...prev, playlists: false }));
        }
    };

    const fetchAlbums = async () => {
        try {
            setLoading(prev => ({ ...prev, albums: true }));
            setError(prev => ({ ...prev, albums: '' }));

            const albumsData = await mediaService.getAllAlbums();
            setAlbums(albumsData);
        } catch (err: any) {
            setError(prev => ({ ...prev, albums: 'Failed to load albums' }));
            console.error('Error fetching albums:', err);
        } finally {
            setLoading(prev => ({ ...prev, albums: false }));
        }
    };

    const fetchArtists = async () => {
        try {
            setLoading(prev => ({ ...prev, artists: true }));
            setError(prev => ({ ...prev, artists: '' }));

            const artistsData = await artistService.getAllArtists();
            setArtists(artistsData);
        } catch (err: any) {
            setError(prev => ({ ...prev, artists: 'Failed to load artists' }));
            console.error('Error fetching artists:', err);
        } finally {
            setLoading(prev => ({ ...prev, artists: false }));
        }
    };

    const loadMoreSongs = async () => {
        if (loading.loadMoreSongs || !pagination.songs.hasMore) return;

        try {
            setLoading(prev => ({ ...prev, loadMoreSongs: true }));

            const nextPage = pagination.songs.pageNumber + 1;
            await fetchSongs(pagination.songs.pageSize, nextPage, true);
        } catch (err: any) {
            console.error('Error loading more songs:', err);
        } finally {
            setLoading(prev => ({ ...prev, loadMoreSongs: false }));
        }
    };

    const loadMorePlaylists = async () => {
        if (loading.loadMorePlaylists || !pagination.playlists.hasMore) return;

        try {
            setLoading(prev => ({ ...prev, loadMorePlaylists: true }));

            const nextPage = pagination.playlists.pageNumber + 1;
            await fetchPlaylists(pagination.playlists.pageSize, nextPage, true);
        } catch (err: any) {
            console.error('Error loading more playlists:', err);
        } finally {
            setLoading(prev => ({ ...prev, loadMorePlaylists: false }));
        }
    };

    useEffect(() => {
        if (user) {
            fetchSongs();
            fetchPlaylists();
            fetchAlbums();
            fetchArtists();
        }
    }, [user]);

    const value: DataContextType = {
        songs,
        playlists,
        albums,
        artists,
        pagination,
        loading,
        error,
        fetchSongs,
        fetchPlaylists,
        fetchAlbums,
        fetchArtists,
        loadMoreSongs,
        loadMorePlaylists
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}; 