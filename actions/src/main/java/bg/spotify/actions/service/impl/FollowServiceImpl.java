package bg.spotify.actions.service.impl;

import bg.spotify.actions.model.Follow;
import bg.spotify.actions.repository.FollowRepository;
import bg.spotify.actions.service.FollowService;
import bg.spotify.artist.exceptions.ArtistNotFoundException;
import bg.spotify.artist.model.Artist;
import bg.spotify.artist.repository.ArtistRepository;
import bg.spotify.users.exceptions.UserNotFoundException;
import bg.spotify.users.model.User;
import bg.spotify.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private FollowRepository followRepository;

    @Override
    public void followArtist(Long userId, Long artistId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(ArtistNotFoundException::new);

        boolean alreadyFollowed = followRepository.findByUserAndArtist(user, artist).isPresent();
        if (!alreadyFollowed) {
            Follow follow = Follow.builder()
                    .user(user)
                    .artist(artist)
                    .build();
            followRepository.save(follow);
        }
    }

    @Override
    public void unfollowArtist(Long userId, Long artistId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(ArtistNotFoundException::new);

        followRepository.findByUserAndArtist(user, artist)
                .ifPresent(followRepository::delete);
    }

    @Override
    public List<Artist> getFollowedArtists(Long userId) {
        return followRepository.findFollowedArtistsByUserId(userId);
    }

    @Override
    public boolean isArtistFollowedByUser(Long userId, Long artistId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(ArtistNotFoundException::new);

        return followRepository.findByUserAndArtist(user, artist).isPresent();
    }

    @Override
    public int countByArtist(Artist artist) {
        return followRepository.countByArtist(artist);
    }

}
