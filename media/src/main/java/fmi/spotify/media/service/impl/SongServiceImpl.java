package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.model.Song;
import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.SongService;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    private SongRepository songRepository;

    @Override
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Override
    public Optional<Song> getSongById(Long id) {
        return songRepository.findById(id);
    }

    @Override
    public Song createSong(Song song) {
        System.out.println("Received song: " + song.getTitle());
        return songRepository.save(song);
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