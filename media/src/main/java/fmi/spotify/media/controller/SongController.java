package fmi.spotify.media.controller;

import java.util.List;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
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
    public ResponseEntity<List<SongDto>> getAllSongs() {
        return ResponseEntity.ok(songService.getAllSongsDto());
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

    @GetMapping("/audio/{songId}")
    public ResponseEntity<Resource> getAudioFile(@PathVariable Long songId,
            @RequestParam(required = false) Long userId) {
        try {
            // For audio file access, we'll use a default userId if not provided
            Long defaultUserId = userId != null ? userId : 1L;

            Song song = songService.getSongById(defaultUserId, songId)
                    .orElseThrow(() -> new RuntimeException("Song not found"));

            if (song.getFilePath() == null || song.getFilePath().isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Create a file resource from the file path
            Path filePath = Paths.get(song.getFilePath());
            Resource resource = new FileSystemResource(filePath.toFile());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header("Content-Type", "audio/mpeg")
                    .header("Content-Disposition", "inline; filename=\"" + filePath.getFileName() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}