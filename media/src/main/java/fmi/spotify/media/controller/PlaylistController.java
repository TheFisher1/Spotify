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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;

import fmi.spotify.media.model.Playlist;
import fmi.spotify.media.model.PlaylistDTO;
import fmi.spotify.media.model.SongDto;
import fmi.spotify.media.service.PlaylistService;
import fmi.spotify.media.util.PlaylistAuthorizationUtil;

@RestController
@RequestMapping("/media/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable Long id) {

        var playlist = playlistService.getPlaylistById(id);
        if (playlist.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(playlist.get());
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist) {
        return ResponseEntity.ok(playlistService.createPlaylist(playlist));
    }

    @PutMapping("/{playlistId}")
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable Long playlistId, @RequestBody Playlist playlist,
            ServerWebExchange exchange) {
        return PlaylistAuthorizationUtil.withPlaylistAuthorization(
                playlistId,
                exchange,
                playlistService,
                existingPlaylist -> {
                    existingPlaylist.setName(playlist.getName());
                    existingPlaylist.setDescription(playlist.getDescription());
                    existingPlaylist.setPublic(playlist.isPublic());
                    return ResponseEntity.ok(playlistService.updatePlaylist(playlistId, existingPlaylist).orElse(null));
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlaylist(@PathVariable Long id, ServerWebExchange exchange) {
        return PlaylistAuthorizationUtil.withPlaylistAuthorization(
                id,
                exchange,
                playlistService,
                playlist -> {
                    if (playlist.isPublic()) {
                        return ResponseEntity.badRequest().body("Playlist is currently public and cannot be deleted.");
                    }
                    playlistService.deletePlaylist(id);
                    return ResponseEntity.status(204).body("");
                },
                () -> ResponseEntity.status(401).body("Unauthorized"));
    }

    @GetMapping("/{playlistId}/songs")
    public ResponseEntity<List<SongDto>> getSongsInPlaylist(@PathVariable Long playlistId) {
        if (playlistService.getPlaylistById(playlistId).isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(playlistService.getSongsInPlaylist(playlistId));
    }

    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId,
            ServerWebExchange exchange) {
        return PlaylistAuthorizationUtil.withPlaylistOwnership(
                playlistId,
                exchange,
                playlistService,
                () -> {
                    playlistService.addSongToPlaylist(playlistId, songId);
                    return ResponseEntity.ok().<Void>build();
                });
    }

    @DeleteMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Void> removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId,
            ServerWebExchange exchange) {
        return PlaylistAuthorizationUtil.withPlaylistOwnership(
                playlistId,
                exchange,
                playlistService,
                () -> {
                    playlistService.removeSongFromPlaylist(playlistId, songId);
                    return ResponseEntity.ok().<Void>build();
                });
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlaylistDTO>> getPlaylistsByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {

        var playlistsPage = playlistService
                .getPlaylistsByUserId(userId, pageNumber, pageSize).stream()
                .map(PlaylistDTO::fromPlaylist)
                .toList();

        return ResponseEntity.ok(playlistsPage);
    }
}