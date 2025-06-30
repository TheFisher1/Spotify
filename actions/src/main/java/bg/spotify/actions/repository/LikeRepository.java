package bg.spotify.actions.repository;

import bg.spotify.actions.model.Like;
import bg.spotify.users.model.User;
import fmi.spotify.media.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndSong(User user, Song song);

    @Query("SELECT l.song FROM Like l WHERE l.user.id = :userId")
    List<Song> findLikedSongsByUserId(@Param("userId") Long userId);

    int countBySong_Id(Long songId);

    boolean existsByUserIdAndSongId(Long userId, Long songId);

}
