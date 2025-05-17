package bg.spotify.discovery.controller;

import bg.spotify.discovery.model.SongDto;
import bg.spotify.discovery.model.ArtistDto;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Collections;

@RestController
@RequestMapping("/api/discovery")
public class DiscoveryController {
    @GetMapping("/songs")
    public List<SongDto> searchSongs(@RequestParam String query) {
        // Dummy implementation
        return Collections.singletonList(new SongDto("Example Song", "Example Artist"));
    }

    @GetMapping("/artists")
    public List<ArtistDto> searchArtists(@RequestParam String query) {
        // Dummy implementation
        return Collections.singletonList(new ArtistDto("Example Artist"));
    }
} 