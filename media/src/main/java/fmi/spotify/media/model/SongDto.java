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
    private String url; // Azure Blob Storage URL for audio
    private String thumbnail; // Dynamically generated thumbnail URL
    private Album album;
    private Artist artist;

    // Constructor to convert from Song entity
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

    /**
     * Generate audio URL based on song title and artist
     */
    public static String generateAudioUrl(Song song, String baseUrl) {
        if (song.getTitle() != null && song.getArtist() != null) {
            // Generate blob name based on song title and artist
            String fileName = generateSongAudioName(song.getTitle(), song.getArtist().getName());
            return baseUrl + "/" + fileName;
        } else {
            return null;
        }
    }

    /**
     * Generate a blob name for song audio based on title and artist
     */
    private static String generateSongAudioName(String title, String artistName) {
        // Clean the strings for use as filename
        String cleanTitle = title.replaceAll("[^a-zA-Z0-9\\s-]", "").trim().replaceAll("\\s+", "-");
        String cleanArtist = artistName.replaceAll("[^a-zA-Z0-9\\s-]", "").trim().replaceAll("\\s+", "-");

        return cleanTitle + "-" + cleanArtist + ".mp3";
    }

    /**
     * Generate thumbnail URL based on song title and artist
     */
    private static String generateThumbnailUrl(Song song) {
        if (song.getTitle() != null && song.getArtist() != null) {
            // Generate blob name based on song title and artist
            String fileName = generateSongThumbnailName(song.getTitle(), song.getArtist().getName());
            // For now, return a placeholder URL - you can inject AzureBlobService if needed
            return "https://your-azure-storage.blob.core.windows.net/your-container/" + fileName;
        } else {
            // Return default image URL
            return "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
        }
    }

    /**
     * Generate a blob name for song thumbnail based on title and artist
     */
    private static String generateSongThumbnailName(String title, String artistName) {
        // Clean the strings for use as filename
        String cleanTitle = title.replaceAll("[^a-zA-Z0-9\\s-]", "").trim().replaceAll("\\s+", "-").toLowerCase();
        String cleanArtist = artistName.replaceAll("[^a-zA-Z0-9\\s-]", "").trim().replaceAll("\\s+", "-").toLowerCase();

        // Generate a hash to ensure uniqueness and avoid conflicts
        String hash = String.valueOf(Math.abs((cleanTitle + cleanArtist).hashCode()));

        return "song-thumbnails/" + cleanArtist + "-" + cleanTitle + "-" + hash + ".jpg";
    }
}