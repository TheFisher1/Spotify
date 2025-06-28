package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import bg.spotify.artist.model.Artist;
import bg.spotify.artist.repository.ArtistRepository;
import bg.spotify.recommendations.service.RecommendationService;
import fmi.spotify.media.exceptions.InvalidSongException;
import fmi.spotify.media.model.Album;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;
import fmi.spotify.media.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.SongService;
import fmi.spotify.media.service.MediaBlobService;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private RecommendationService recommendationService;
    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private MediaBlobService mediaBlobService;

    @Override
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Override
    public List<SongDto> getAllSongsDto() {
        List<Song> songs = songRepository.findAll();
        return songs.stream()
                .map(song -> {
                    String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(song);
                    String audioUrl = mediaBlobService.generateSongAudioUrl(song);
                    return SongDto.fromSong(song, thumbnailUrl, audioUrl);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Song> getSongById(Long userId, Long songId) {
        recommendationService.recordSongClick(userId, songId);
        return songRepository.findById(songId);
    }

    @Override
    public Optional<SongDto> getSongDtoById(Long userId, Long songId) {
        Optional<Song> songOpt = getSongById(userId, songId);
        return songOpt.map(song -> {
            String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(song);
            String audioUrl = mediaBlobService.generateSongAudioUrl(song);
            return SongDto.fromSong(song, thumbnailUrl, audioUrl);
        });
    }

    @Override
    public Song createSong(Song song) {
        Song saved = songRepository.save(song);
        String albumName = albumRepository.findById(saved.getAlbum().getId()).map(Album::getName).orElse(null);
        String artistName = artistRepository.findById(saved.getArtist().getId()).map(Artist::getName).orElse(null);

        recommendationService.addNewSong(saved.getId(), saved.getTitle(), artistName,
                albumName, saved.getGenre());

        return saved;
    }

    @Override
    public SongDto createSongDto(Song song) {
        Song saved = createSong(song);
        String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(saved);
        String audioUrl = mediaBlobService.generateSongAudioUrl(saved);
        return SongDto.fromSong(saved, thumbnailUrl, audioUrl);
    }

    @Override
    public Optional<Song> updateSong(Long id, Song song) {
        if (songRepository.existsById(id)) {
            song.setId(id);
            Song savedSong = songRepository.save(song);
            return Optional.of(savedSong);
        }
        return Optional.empty();
    }

    @Override
    public Optional<SongDto> updateSongDto(Long id, Song song) {
        Optional<Song> updatedSong = updateSong(id, song);
        return updatedSong.map(savedSong -> {
            String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(savedSong);
            String audioUrl = mediaBlobService.generateSongAudioUrl(savedSong);
            return SongDto.fromSong(savedSong, thumbnailUrl, audioUrl);
        });
    }

    @Override
    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }

    @Override
    public List<Song> searchSongs(String query) {
        return songRepository.findByTitleContainingIgnoreCaseOrArtist_NameContainingIgnoreCase(query,
                query);
    }

    @Override
    public List<SongDto> searchSongsDto(String query) {
        List<Song> songs = searchSongs(query);
        return songs.stream()
                .map(song -> {
                    String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(song);
                    String audioUrl = mediaBlobService.generateSongAudioUrl(song);
                    return SongDto.fromSong(song, thumbnailUrl, audioUrl);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Song> getSongsByArtistId(Long artistId) {
        return songRepository.findByArtist_Id(artistId);
    }

    @Override
    public List<SongDto> getSongsDtoByArtistId(Long artistId) {
        List<Song> songs = getSongsByArtistId(artistId);
        return songs.stream()
                .map(song -> {
                    String thumbnailUrl = mediaBlobService.generateSongThumbnailUrl(song);
                    String audioUrl = mediaBlobService.generateSongAudioUrl(song);
                    return SongDto.fromSong(song, thumbnailUrl, audioUrl);
                })
                .collect(Collectors.toList());
    }
}