package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Song;

public interface SongService {
    List<Song> getAllSongs();
    Optional<Song> getSongById(Long id);
    Song createSong(Song song);
    Optional<Song> updateSong(Long id, Song song);
    void deleteSong(Long id);
    List<Song> searchSongs(String query);
    List<Song> getSongsByArtistId(Long artistId);

} 