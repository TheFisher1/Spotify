package fmi.spotify.media.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/artists/{artistId}")
    public ResponseEntity<List<SongDto>> getSongsByArtist(@PathVariable Long artistId) {
        List<SongDto> songs = songService.getSongsDtoByArtistId(artistId);
        if (songs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(songs);
    }
}