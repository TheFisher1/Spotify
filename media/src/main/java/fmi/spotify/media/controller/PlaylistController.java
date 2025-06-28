package fmi.spotify.media.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fmi.spotify.media.model.Playlist;
import fmi.spotify.media.service.PlaylistService;

@RestController
@RequestMapping("/media/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @GetMapping("/")
    public ResponseEntity<List<Playlist>> getAllPlaylists() {
        return ResponseEntity.ok(playlistService.getAllPlaylists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable Long id) {
        return playlistService.getPlaylistById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable Long id, @RequestBody Playlist playlist) {
        return playlistService.updatePlaylist(id, playlist)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        playlistService.deletePlaylist(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        playlistService.addSongToPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        playlistService.removeSongFromPlaylist(playlistId, songId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Playlist>> getPlaylistsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(playlistService.getPlaylistsByUserId(userId));
    }
}