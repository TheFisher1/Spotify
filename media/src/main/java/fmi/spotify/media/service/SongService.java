package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;

public interface SongService {
    List<Song> getAllSongs(int pageSize, int pageNumber);

    Optional<Song> getSongById(Long userId, Long songId);

    Optional<SongDto> getSongDtoById(Long userId, Long songId);

    List<Song> getSongsByArtistId(Long artistId);

    List<SongDto> getSongsDtoByArtistId(Long artistId);

    List<SongDto> getSongsDtoBySearchQuery(String query);

    SongDto getRandomSongDto(Long userId);
}