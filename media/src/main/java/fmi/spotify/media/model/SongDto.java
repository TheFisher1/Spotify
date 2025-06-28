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

    public static SongDto fromSong(Song song, String thumbnailUrl, String audioUrl) {
        SongDto dto = new SongDto();
        dto.setId(song.getId());
        dto.setTitle(song.getTitle());
        dto.setDuration(song.getDuration());
        dto.setThumbnail(thumbnailUrl);
        dto.setUrl(audioUrl);
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