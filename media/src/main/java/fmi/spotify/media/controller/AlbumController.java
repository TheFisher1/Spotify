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

import fmi.spotify.media.model.Album;
import fmi.spotify.media.service.AlbumService;

@RestController
@RequestMapping("/media/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @GetMapping
    public ResponseEntity<List<Album>> getAllAlbums() {
        return ResponseEntity.ok(albumService.getAllAlbums());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable Long id) {
        return albumService.getAlbumById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Album> createAlbum(@RequestBody Album album) {
        return ResponseEntity.ok(albumService.createAlbum(album));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable Long id, @RequestBody Album album) {
        return albumService.updateAlbum(id, album)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbum(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Album>> searchAlbums(@RequestParam String query) {
        return ResponseEntity.ok(albumService.searchAlbums(query));
    }

    @GetMapping("/artists/{artistId}")
    public ResponseEntity<List<Album>> getAlbumsByArtist(@PathVariable Long artistId) {
        List<Album> albums = albumService.getAlbumsByArtistId(artistId);
        return albums.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(albums);
    }
}