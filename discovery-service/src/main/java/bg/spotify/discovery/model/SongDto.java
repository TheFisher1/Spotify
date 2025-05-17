package bg.spotify.discovery.model;

public class SongDto {
    private String title;
    private String artist;

    public SongDto(String title, String artist) {
        this.title = title;
        this.artist = artist;
    }

    public String getTitle() {
        return title;
    }

    public String getArtist() {
        return artist;
    }
} 