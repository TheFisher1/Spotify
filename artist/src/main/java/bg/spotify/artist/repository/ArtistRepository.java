package bg.spotify.artist.repository;

import bg.spotify.artist.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long>{
}
