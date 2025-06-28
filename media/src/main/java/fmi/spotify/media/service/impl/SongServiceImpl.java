package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import bg.spotify.recommendations.service.RecommendationService;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.SongService;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private RecommendationService recommendationService;

    private static final String DEFAULT_SONG_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrx_eYu5bcjKMz1ByHVZ6Uy5z1in4cDGWAA&s";
    private static final String DEFAULT_AUDIO_URL = "https://spotifyfmi.blob.core.windows.net/songs/avicii-hey-brother.mp3";

    @Override
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Override
    public List<SongDto> getAllSongsDto() {
        List<Song> songs = songRepository.findAll();
        return songs.stream()
                .map(song -> {
                    String thumbnailUrl = generateSongThumbnailUrl(song);
                    String audioUrl = generateSongAudioUrl(song);
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
            String thumbnailUrl = generateSongThumbnailUrl(song);
            String audioUrl = generateSongAudioUrl(song);
            return SongDto.fromSong(song, thumbnailUrl, audioUrl);
        });
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
                    String thumbnailUrl = generateSongThumbnailUrl(song);
                    String audioUrl = generateSongAudioUrl(song);
                    return SongDto.fromSong(song, thumbnailUrl, audioUrl);
                })
                .collect(Collectors.toList());
    }

    private String generateSongThumbnailUrl(Song song) {
        return DEFAULT_SONG_IMAGE;
    }

    private String generateSongAudioUrl(Song song) {
        return DEFAULT_AUDIO_URL;
    }
}