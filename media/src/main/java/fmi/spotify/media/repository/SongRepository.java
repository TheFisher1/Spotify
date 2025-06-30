package fmi.spotify.media.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fmi.spotify.media.model.Song;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query("SELECT s FROM Song s WHERE s.artist.id = :artistId")
    List<Song> findSongsByArtistId(@Param("artistId") Long artistId);

    @Query(value = """
                SELECT * FROM song
                WHERE search_vector @@ plainto_tsquery('english', :query)
            """, nativeQuery = true)
    List<Song> searchByFullText(@Param("query") String query);
}