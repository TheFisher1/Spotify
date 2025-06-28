package fmi.spotify.media.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for blob storage service
 */
@Configuration
@ConfigurationProperties(prefix = "azure.storage")
public class BlobServiceConfig {

    private String accountName = "spotifyfmi";
    private String containerName = "spotify-media";
    private String connectionString;
    private int defaultUploadExpirationMinutes = 15;
    private int defaultDownloadExpirationMinutes = 60;

    // Content type constants
    public static final String CONTENT_TYPE_JPEG = "image/jpeg";
    public static final String CONTENT_TYPE_PNG = "image/png";
    public static final String CONTENT_TYPE_MP3 = "audio/mpeg";
    public static final String CONTENT_TYPE_WAV = "audio/wav";

    // Folder constants
    public static final String FOLDER_SONG_THUMBNAILS = "song-thumbnails";
    public static final String FOLDER_SONG_AUDIO = "song-audio";
    public static final String FOLDER_ALBUM_COVERS = "album-covers";
    public static final String FOLDER_ARTIST_IMAGES = "artist-images";
    public static final String FOLDER_PLAYLIST_COVERS = "playlist-covers";

    // Default image URLs
    public static final String DEFAULT_ALBUM_IMAGE = "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
    public static final String DEFAULT_ARTIST_IMAGE = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
    public static final String DEFAULT_PLAYLIST_IMAGE = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
    public static final String DEFAULT_SONG_IMAGE = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

    // Getters and setters
    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getContainerName() {
        return containerName;
    }

    public void setContainerName(String containerName) {
        this.containerName = containerName;
    }

    public String getConnectionString() {
        return connectionString;
    }

    public void setConnectionString(String connectionString) {
        this.connectionString = connectionString;
    }

    public int getDefaultUploadExpirationMinutes() {
        return defaultUploadExpirationMinutes;
    }

    public void setDefaultUploadExpirationMinutes(int defaultUploadExpirationMinutes) {
        this.defaultUploadExpirationMinutes = defaultUploadExpirationMinutes;
    }

    public int getDefaultDownloadExpirationMinutes() {
        return defaultDownloadExpirationMinutes;
    }

    public void setDefaultDownloadExpirationMinutes(int defaultDownloadExpirationMinutes) {
        this.defaultDownloadExpirationMinutes = defaultDownloadExpirationMinutes;
    }
}