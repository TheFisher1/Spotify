package bg.spotify.actions.repository;

import bg.spotify.actions.model.Follow;
import bg.spotify.artist.model.Artist;
import bg.spotify.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByUserAndArtist(User user, Artist artist);

    @Query("SELECT f.artist FROM Follow f WHERE f.user.id = :userId")
    List<Artist> findFollowedArtistsByUserId(@Param("userId") Long userId);

    int countByArtist(Artist artist);

}
