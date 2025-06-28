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
import fmi.spotify.media.model.AlbumDto;
import fmi.spotify.media.service.AlbumService;

@RestController
@RequestMapping("/media/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @GetMapping("/")
    public ResponseEntity<List<AlbumDto>> getAllAlbums() {
        return ResponseEntity.ok(albumService.getAllAlbumsDto());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumDto> getAlbumById(@PathVariable Long id) {
        return albumService.getAlbumDtoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AlbumDto> createAlbum(@RequestBody Album album) {
        return ResponseEntity.ok(albumService.createAlbumDto(album));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlbumDto> updateAlbum(@PathVariable Long id, @RequestBody Album album) {
        return albumService.updateAlbumDto(id, album)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable Long id) {
        albumService.deleteAlbum(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<AlbumDto>> searchAlbums(@RequestParam String query) {
        return ResponseEntity.ok(albumService.searchAlbumsDto(query));
    }

    @GetMapping("/artists/{artistId}")
    public ResponseEntity<List<AlbumDto>> getAlbumsByArtist(@PathVariable Long artistId) {
        List<AlbumDto> albums = albumService.getAlbumsDtoByArtistId(artistId);
        return albums.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(albums);
    }
}