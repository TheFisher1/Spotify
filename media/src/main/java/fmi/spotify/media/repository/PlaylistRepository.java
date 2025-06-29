package fmi.spotify.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fmi.spotify.media.model.Playlist;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUserId(Long userId);

    @Query("SELECT DISTINCT p FROM Playlist p LEFT JOIN FETCH p.songs WHERE p.userId = :userId OR p.userId IS NULL")
    List<Playlist> findAllVisibleToUser(@Param("userId") Long userId);
}