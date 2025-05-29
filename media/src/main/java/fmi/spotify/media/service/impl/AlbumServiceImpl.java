package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.model.Album;
import fmi.spotify.media.repository.AlbumRepository;
import fmi.spotify.media.service.AlbumService;
import jakarta.transaction.Transactional;

@Service
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;

    @Override
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @Override
    public Optional<Album> getAlbumById(Long id) {
        return albumRepository.findById(id);
    }

    @Override
    @Transactional
    public Album createAlbum(Album album) {
        if (album.getId() != null) {
            throw new IllegalArgumentException("Album ID must be null");
        }
        return albumRepository.save(album);
    }

    @Override
    public Optional<Album> updateAlbum(Long id, Album album) {
        if (albumRepository.existsById(id)) {
            album.setId(id);
            return Optional.of(albumRepository.save(album));
        }
        return Optional.empty();
    }

    @Override
    public void deleteAlbum(Long id) {
        albumRepository.deleteById(id);
    }

    @Override
    public List<Album> searchAlbums(String query) {
        return albumRepository.findByNameContainingIgnoreCaseOrArtistContainingIgnoreCase(query, query);
    }
}