package bg.spotify.actions.controller;

import bg.spotify.actions.service.FollowService;
import bg.spotify.artist.model.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/follows")
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping("/user/{userId}/artist/{artistId}")
    public ResponseEntity<Void> followArtist(@PathVariable Long userId, @PathVariable Long artistId) {
        followService.followArtist(userId, artistId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{userId}/artist/{artistId}")
    public ResponseEntity<Void> unfollowArtist(@PathVariable Long userId, @PathVariable Long artistId) {
        followService.unfollowArtist(userId, artistId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/artists")
    public ResponseEntity<List<Artist>> getFollowedArtists(@PathVariable Long userId) {
        List<Artist> artists = followService.getFollowedArtists(userId);
        if (artists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(artists);
    }

    @GetMapping("/user/{userId}/artist/{artistId}/exists")
    public ResponseEntity<Boolean> isArtistFollowed(@PathVariable Long userId, @PathVariable Long artistId) {
        boolean followed = followService.isArtistFollowedByUser(userId, artistId);
        return ResponseEntity.ok(followed);
    }

    @GetMapping("/count/artist/{artistId}")
    public ResponseEntity<Integer> countByArtist(@PathVariable Long artistId) {
        Artist artist = new Artist();
        artist.setId(artistId);
        int count = followService.countByArtist(artist);
        return ResponseEntity.ok(count);
    }

}
