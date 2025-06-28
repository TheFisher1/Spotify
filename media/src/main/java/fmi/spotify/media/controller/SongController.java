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

import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;
import fmi.spotify.media.service.SongService;

@RestController
@RequestMapping("/media/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @GetMapping
    public ResponseEntity<List<SongDto>> getAllSongs(@RequestParam int pageSize, @RequestParam int pageNumber) {
        List<SongDto> songs = songService.getAllSongsDto();

        return ResponseEntity
                .ok(songs.subList(pageNumber * pageSize, Math.min(pageNumber * pageSize + pageSize, songs.size())));
    }

    @GetMapping("/{songId}")
    public ResponseEntity<SongDto> getSongById(@RequestParam Long userId, @PathVariable Long songId) {
        return songService.getSongDtoById(userId, songId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SongDto> createSong(@RequestBody Song song) {
        return ResponseEntity.ok(songService.createSongDto(song));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SongDto> updateSong(@PathVariable Long id, @RequestBody Song song) {
        return songService.updateSongDto(id, song)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        songService.deleteSong(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<SongDto>> searchSongs(@RequestParam String query) {
        return ResponseEntity.ok(songService.searchSongsDto(query));
    }

    @GetMapping("/artists/{artistId}")
    public ResponseEntity<List<SongDto>> getSongsByArtist(@PathVariable Long artistId) {
        List<SongDto> songs = songService.getSongsDtoByArtistId(artistId);
        if (songs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(songs);
    }
}