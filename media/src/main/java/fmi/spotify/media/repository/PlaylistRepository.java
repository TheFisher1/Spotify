package fmi.spotify.media.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fmi.spotify.media.model.Playlist;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUserId(Long userId);

    @Query("SELECT p FROM Playlist p WHERE p.userId = :userId OR p.userId IS NULL")
    Page<Playlist> findAllVisibleToUser(@Param("userId") Long userId, Pageable pageable);
}