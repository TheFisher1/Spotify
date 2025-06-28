package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import bg.spotify.artist.repository.ArtistRepository;
import fmi.spotify.media.model.Album;
import fmi.spotify.media.model.AlbumDto;
import fmi.spotify.media.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.service.AlbumService;
import fmi.spotify.media.service.BlobService;
import jakarta.transaction.Transactional;

@Service
public class AlbumServiceImpl implements AlbumService {
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private BlobService blobService;

    @Override
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    @Override
    public List<AlbumDto> getAllAlbumsDto() {
        List<Album> albums = albumRepository.findAll();
        return albums.stream()
                .map(album -> {
                    String coverUrl = generateCoverUrl(album);
                    return AlbumDto.fromAlbum(album, coverUrl);
                })
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Album> getAlbumById(Long id) {
        return albumRepository.findById(id);
    }

    @Override
    public Optional<AlbumDto> getAlbumDtoById(Long id) {
        Optional<Album> albumOpt = albumRepository.findById(id);
        return albumOpt.map(album -> {
            String coverUrl = generateCoverUrl(album);
            return AlbumDto.fromAlbum(album, coverUrl);
        });
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
    public AlbumDto createAlbumDto(Album album) {
        Album saved = albumRepository.save(album);
        String coverUrl = generateCoverUrl(saved);
        return AlbumDto.fromAlbum(saved, coverUrl);
    }

    @Override
    public Optional<Album> updateAlbum(Long id, Album album) {
        if (albumRepository.existsById(id)) {
            album.setId(id);
            Album savedAlbum = albumRepository.save(album);
            return Optional.of(savedAlbum);
        }
        return Optional.empty();
    }

    @Override
    public Optional<AlbumDto> updateAlbumDto(Long id, Album album) {
        Optional<Album> updatedAlbum = updateAlbum(id, album);
        return updatedAlbum.map(savedAlbum -> {
            String coverUrl = generateCoverUrl(savedAlbum);
            return AlbumDto.fromAlbum(savedAlbum, coverUrl);
        });
    }

    @Override
    public void deleteAlbum(Long id) {
        albumRepository.deleteById(id);
    }

    @Override
    public List<Album> searchAlbums(String query) {
        return albumRepository.findByNameContainingIgnoreCaseOrArtist_NameContainingIgnoreCase(query, query);
    }

    @Override
    public List<AlbumDto> searchAlbumsDto(String query) {
        List<Album> albums = searchAlbums(query);
        return albums.stream()
                .map(album -> {
                    String coverUrl = generateCoverUrl(album);
                    return AlbumDto.fromAlbum(album, coverUrl);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Album> getAlbumsByArtistId(Long artistId) {
        return albumRepository.findByArtistId(artistId);
    }

    @Override
    public List<AlbumDto> getAlbumsDtoByArtistId(Long artistId) {
        List<Album> albums = getAlbumsByArtistId(artistId);
        return albums.stream()
                .map(album -> {
                    String coverUrl = generateCoverUrl(album);
                    return AlbumDto.fromAlbum(album, coverUrl);
                })
                .collect(Collectors.toList());
    }

    /**
     * Generate cover URL for an album based on album name and artist
     */
    private String generateCoverUrl(Album album) {
        if (album.getName() != null && album.getArtist() != null) {
            // Generate blob name based on album name and artist
            String fileName = generateAlbumCoverName(album.getName(), album.getArtist().getName());
            String imageUrl = blobService.getPublicUrl(fileName);
            return imageUrl;
        } else {
            // Return default image URL if no name or artist is provided
            return blobService.getDefaultImageUrl("album");
        }
    }

    /**
     * Generate a blob name for album cover based on album name and artist
     */
    private String generateAlbumCoverName(String songName, String artistName) {
        return "https://.blob.core.windows.net/songs/" + songName + "-" + artistName + ".jpg";

    }
}