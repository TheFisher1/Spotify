package fmi.spotify.media.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fmi.spotify.media.model.Playlist;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;
import fmi.spotify.media.repository.PlaylistRepository;
import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.PlaylistService;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongRepository songRepository;

    @Override
    public Optional<Playlist> getPlaylistById(Long id) {
        return playlistRepository.findById(id);
    }

    @Override
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @Override
    public Optional<Playlist> updatePlaylist(Long id, Playlist playlist) {
        if (playlistRepository.existsById(id)) {
            playlist.setId(id);
            return Optional.of(playlistRepository.save(playlist));
        }
        return Optional.empty();
    }

    @Override
    public void deletePlaylist(Long id) {
        playlistRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void addSongToPlaylist(Long playlistId, Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        playlist.getSongs().add(song);
        playlistRepository.save(playlist);
    }

    @Override
    @Transactional
    public void removeSongFromPlaylist(Long playlistId, Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new RuntimeException("Playlist not found"));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found"));
        playlist.getSongs().remove(song);
        playlistRepository.save(playlist);
    }

    @Override
    public List<Playlist> getPlaylistsByUserId(Long userId) {
        return playlistRepository.findAllVisibleToUser(userId);
    }

    @Override
    public List<SongDto> getSongsInPlaylist(Long playlistId) {
        return playlistRepository.findById(playlistId)
                .map(Playlist::getSongs)
                .orElseGet(HashSet::new)
                .stream()
                .map(song -> SongDto.fromSong(song, null, null))
                .toList();
    }
}