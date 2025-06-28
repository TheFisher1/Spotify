package fmi.spotify.media.model;

import bg.spotify.artist.model.Artist;
import lombok.Data;

import java.time.Duration;
import java.util.Date;

@Data
public class AlbumDto {
    private Long id;
    private String name;
    private Artist artist;
    private Duration duration;
    private Date releaseDate;
    private String cover;
    private String genre;

    public static AlbumDto fromAlbum(Album album, String coverUrl) {
        AlbumDto dto = new AlbumDto();
        dto.setId(album.getId());
        dto.setName(album.getName());
        dto.setArtist(album.getArtist());
        dto.setDuration(album.getDuration());
        dto.setReleaseDate(album.getReleaseDate());
        dto.setCover(coverUrl);
        dto.setGenre(album.getGenre());
        return dto;
    }
}