package fmi.spotify.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fmi.spotify.media.model.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    List<Album> findByNameContainingIgnoreCaseOrArtist_NameContainingIgnoreCase(String name, String artistName);
    List<Album> findByArtistId(Long artistId);
} 