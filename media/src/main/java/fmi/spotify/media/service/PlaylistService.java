package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Playlist;
import fmi.spotify.media.model.SongDto;

public interface PlaylistService {
    List<Playlist> getAllPlaylists();

    Optional<Playlist> getPlaylistById(Long id);

    Playlist createPlaylist(Playlist playlist);

    Optional<Playlist> updatePlaylist(Long id, Playlist playlist);

    void deletePlaylist(Long id);

    void addSongToPlaylist(Long playlistId, Long songId);

    void removeSongFromPlaylist(Long playlistId, Long songId);

    List<Playlist> getPlaylistsByUserId(Long userId);

    List<SongDto> getSongsInPlaylist(Long playlistId);
}