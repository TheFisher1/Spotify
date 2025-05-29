package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Album;

public interface AlbumService {
    List<Album> getAllAlbums();
    Optional<Album> getAlbumById(Long id);
    Album createAlbum(Album album);
    Optional<Album> updateAlbum(Long id, Album album);
    void deleteAlbum(Long id);
    List<Album> searchAlbums(String query);
} 