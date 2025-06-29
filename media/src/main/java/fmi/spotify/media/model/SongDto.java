package fmi.spotify.media.model;

import bg.spotify.artist.model.Artist;
import lombok.Data;

import java.time.Duration;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class SongDto {
    private Long id;
    private String title;
    private Duration duration;
    private String url;
    private String thumbnail;
    private Album album;
    private Artist artist;
    private Set<String> genres;

    private static final String DEFAULT_SONG_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrx_eYu5bcjKMz1ByHVZ6Uy5z1in4cDGWAA&s";
    private static final String DEFAULT_AUDIO_URL = "https://spotifyfmi.blob.core.windows.net/songs/avicii-hey-brother.mp3";

    public static SongDto fromSong(Song song) {
        SongDto dto = new SongDto();
        dto.setId(song.getId());
        dto.setTitle(song.getTitle());
        dto.setDuration(song.getDuration());
        dto.setThumbnail(DEFAULT_SONG_IMAGE);
        dto.setUrl(DEFAULT_AUDIO_URL);
        dto.setAlbum(song.getAlbum());
        dto.setArtist(song.getArtist());

        if (song.getGenres() != null) {
            dto.setGenres(song.getGenres().stream()
                    .map(Genre::getName)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}