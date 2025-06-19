package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;

import bg.spotify.artist.model.Artist;
import bg.spotify.artist.repository.ArtistRepository;
import bg.spotify.recommendations.service.RecommendationService;
import fmi.spotify.media.model.Album;
import fmi.spotify.media.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.model.Song;
import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.SongService;

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
    @Override
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Override
    public Optional<Song> getSongById(Long userId, Long songId) {
        recommendationService.recordSongClick(userId, songId);
        return songRepository.findById(songId);
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
    public Optional<Song> updateSong(Long id, Song song) {
        if (songRepository.existsById(id)) {
            song.setId(id);
            return Optional.of(songRepository.save(song));
        }
        return Optional.empty();
    }

    @Override
    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }

    @Override
    public List<Song> searchSongs(String query) {
        return songRepository.findByTitleContainingIgnoreCaseOrArtist_NameContainingIgnoreCase(query, query);
    }

    @Override
    public List<Song> getSongsByArtistId(Long artistId) {
        return songRepository.findByArtist_Id(artistId);
    }
} 