package fmi.spotify.media.model;

import bg.spotify.artist.model.Artist;
import lombok.Data;

import java.time.Duration;

@Data
public class SongDto {
    private Long id;
    private String title;
    private Duration duration;
    private String genre;
    private String filePath;
    private String url;
    private String thumbnail;
    private Album album;
    private Artist artist;

    public static SongDto fromSong(Song song, String thumbnailUrl, String audioUrl) {
        SongDto dto = new SongDto();
        dto.setId(song.getId());
        dto.setTitle(song.getTitle());
        dto.setDuration(song.getDuration());
        dto.setGenre(song.getGenre());
        dto.setFilePath(song.getFilePath());
        dto.setThumbnail(thumbnailUrl);
        dto.setUrl(audioUrl);
        dto.setAlbum(song.getAlbum());
        dto.setArtist(song.getArtist());
        return dto;
    }
}