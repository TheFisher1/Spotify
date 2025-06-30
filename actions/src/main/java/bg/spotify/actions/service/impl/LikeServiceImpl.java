package bg.spotify.actions.service.impl;

import bg.spotify.actions.exceptions.SongNotFoundException;
import bg.spotify.actions.model.Like;
import bg.spotify.actions.repository.LikeRepository;
import bg.spotify.actions.service.LikeService;
import bg.spotify.recommendations.service.RecommendationService;
import bg.spotify.users.exceptions.UserNotFoundException;
import bg.spotify.users.model.User;
import bg.spotify.users.repository.UserRepository;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private RecommendationService recommendationService;

    @Override
    public void likeSong(Long userId, Long songId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        Song song = songRepository.findById(songId)
                .orElseThrow(SongNotFoundException::new);

        boolean alreadyLiked = likeRepository.findByUserAndSong(user, song).isPresent();
        if (!alreadyLiked) {
            Like like = Like.builder()
                    .user(user)
                    .song(song)
                    .build();
            likeRepository.save(like);
            recommendationService.addBookmark(userId, songId);
        }
    }

    @Override
    public void unlikeSong(Long userId, Long songId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        Song song = songRepository.findById(songId)
                .orElseThrow(SongNotFoundException::new);

        likeRepository.findByUserAndSong(user, song)
                .ifPresent(existingLike -> {
                    likeRepository.delete(existingLike);
                    recommendationService.removeBookmark(userId, songId);
                });
    }

    @Override
    public List<Song> getLikedSongs(Long userId) {
        return likeRepository.findLikedSongsByUserId(userId);
    }

    @Override
    public int countBySongId(Long songId) {
        return likeRepository.countBySong_Id(songId);
    }

    public boolean isSongLiked(Long userId, Long songId) {
        return likeRepository.existsByUserIdAndSongId(userId, songId);
    }
}
