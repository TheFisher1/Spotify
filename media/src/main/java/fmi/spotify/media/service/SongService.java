package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;

public interface SongService {
    List<Song> getAllSongs();

    List<SongDto> getAllSongsDto();

    Optional<Song> getSongById(Long userId, Long songId);

    Optional<SongDto> getSongDtoById(Long userId, Long songId);

    Song createSong(Song song);

    SongDto createSongDto(Song song);

    Optional<Song> updateSong(Long id, Song song);

    Optional<SongDto> updateSongDto(Long id, Song song);

    void deleteSong(Long id);

    List<Song> searchSongs(String query);

    List<SongDto> searchSongsDto(String query);

    List<Song> getSongsByArtistId(Long artistId);

    List<SongDto> getSongsDtoByArtistId(Long artistId);
}