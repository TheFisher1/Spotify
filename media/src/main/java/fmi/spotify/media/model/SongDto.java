package fmi.spotify.media.model;

import bg.spotify.artist.model.Artist;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

    private static final String IMAGE_URL = "https://res.cloudinary.com/dbsilwgqs/image/upload/";
    private static final String IMAGE_EXTENSION = ".jpg";
    private static final String AUDIO_EXTENSION = ".mp3";
    private static final String AUDIO_URL = "https://res.cloudinary.com/dbsilwgqs/video/upload/";


    private static final String DEFAULT_SONG_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrx_eYu5bcjKMz1ByHVZ6Uy5z1in4cDGWAA&s";
    private static final String DEFAULT_AUDIO_URL = "https://spotifyfmi.blob.core.windows.net/songs/avicii-hey-brother.mp3";

    public static SongDto fromSong(Song song) {
        SongDto dto = new SongDto();
        Album album = song.getAlbum();
        String title = song.getTitle();
        dto.setId(song.getId());
        dto.setTitle(title);
        dto.setDuration(song.getDuration());
        dto.setThumbnail(IMAGE_URL + URLEncoder.encode(album.getName(), StandardCharsets.UTF_8)
            .replace("+", "%20") + IMAGE_EXTENSION);
        dto.setUrl(AUDIO_URL + URLEncoder.encode(title, StandardCharsets.UTF_8).replace("+", "%20") + AUDIO_EXTENSION);
        dto.setAlbum(album);
        dto.setArtist(song.getArtist());

        if (song.getGenres() != null) {
            dto.setGenres(song.getGenres().stream()
                    .map(Genre::getName)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}