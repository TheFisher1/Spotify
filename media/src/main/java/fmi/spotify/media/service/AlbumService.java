package fmi.spotify.media.service;

import java.util.List;
import java.util.Optional;

import fmi.spotify.media.model.Album;
import fmi.spotify.media.model.AlbumDto;

public interface AlbumService {
    List<Album> getAllAlbums();

    List<AlbumDto> getAllAlbumsDto();

    Optional<Album> getAlbumById(Long id);

    Optional<AlbumDto> getAlbumDtoById(Long id);

    Album createAlbum(Album album);

    AlbumDto createAlbumDto(Album album);

    Optional<Album> updateAlbum(Long id, Album album);

    Optional<AlbumDto> updateAlbumDto(Long id, Album album);

    void deleteAlbum(Long id);

    List<Album> searchAlbums(String query);

    List<AlbumDto> searchAlbumsDto(String query);

    List<Album> getAlbumsByArtistId(Long artistId);

    List<AlbumDto> getAlbumsDtoByArtistId(Long artistId);
}