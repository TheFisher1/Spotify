package bg.spotify.actions.controller;

import bg.spotify.actions.service.LikeService;
import fmi.spotify.media.model.Song;
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
@RequestMapping("/likes")
public class LikeController {
    @Autowired
    private LikeService likeService;

    @PostMapping("/user/{userId}/song/{songId}")
    public ResponseEntity<Void> likeSong(@PathVariable Long userId, @PathVariable Long songId) {
        likeService.likeSong(userId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{userId}/song/{songId}")
    public ResponseEntity<Void> unlikeSong(@PathVariable Long userId, @PathVariable Long songId) {
        likeService.unlikeSong(userId, songId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/songs")
    public ResponseEntity<List<Song>> getLikedSongs(@PathVariable Long userId) {
        List<Song> likedSongs = likeService.getLikedSongs(userId);
        if (likedSongs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(likedSongs);
    }

    @GetMapping("/count/song/{songId}")
    public ResponseEntity<Integer> countBySong(@PathVariable Long songId) {
        int count = likeService.countBySongId(songId);
        return ResponseEntity.ok(count);
    }

}
