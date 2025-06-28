package bg.spotify.actions.service;

import bg.spotify.artist.model.Artist;

import java.util.List;

public interface FollowService {
    void followArtist(Long userId, Long artistId);

    void unfollowArtist(Long userId, Long artistId);

    List<Artist> getFollowedArtists(Long userId);

    boolean isArtistFollowedByUser(Long userId, Long artistId);

    int countByArtist(Artist artist);

}
