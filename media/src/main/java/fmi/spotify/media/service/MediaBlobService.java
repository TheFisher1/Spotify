package fmi.spotify.media.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fmi.spotify.media.config.BlobServiceConfig;
import fmi.spotify.media.model.Album;
import fmi.spotify.media.model.Song;
import bg.spotify.artist.model.Artist;

/**
 * Service for handling media-specific blob operations
 * Provides a higher-level interface for media-related blob operations
 */
@Service
public class MediaBlobService {

    private static final Logger logger = LoggerFactory.getLogger(MediaBlobService.class);

    @Autowired
    private BlobService blobService;

    /**
     * Generate thumbnail URL for a song
     * 
     * @param song The song object
     * @return Thumbnail URL
     */
    public String generateSongThumbnailUrl(Song song) {
        if (song == null) {
            logger.warn("Attempted to generate thumbnail URL for null song");
            return blobService.getDefaultImageUrl("song");
        }

        if (song.getTitle() != null && song.getArtist() != null) {
            String fileName = generateSongThumbnailName(song.getTitle(), song.getArtist().getName());
            String url = blobService.getPublicUrl(fileName);
            logger.debug("Generated thumbnail URL for song {}: {}", song.getTitle(), url);
            return url;
        } else {
            logger.warn("Song title or artist is null for song ID: {}", song.getId());
            return blobService.getDefaultImageUrl("song");
        }
    }

    /**
     * Generate audio URL for a song
     * 
     * @param song The song object
     * @return Audio URL
     */
    public String generateSongAudioUrl(Song song) {
        if (song == null) {
            throw new IllegalArgumentException("Song cannot be null");
        }

        if (song.getTitle() != null && song.getArtist() != null) {
            String fileName = generateSongAudioName(song.getTitle(), song.getArtist().getName());
            String url = blobService.getPublicUrl(fileName);
            logger.debug("Generated audio URL for song {}: {}", song.getTitle(), url);
            return url;
        } else {
            throw new IllegalArgumentException("Song title and artist are required for audio URL generation");
        }
    }

    /**
     * Generate thumbnail URL for an album
     * 
     * @param album The album object
     * @return Thumbnail URL
     */
    public String generateAlbumThumbnailUrl(Album album) {
        if (album == null) {
            logger.warn("Attempted to generate thumbnail URL for null album");
            return blobService.getDefaultImageUrl("album");
        }

        if (album.getName() != null) {
            String fileName = generateAlbumThumbnailName(album.getName());
            String url = blobService.getPublicUrl(fileName);
            logger.debug("Generated thumbnail URL for album {}: {}", album.getName(), url);
            return url;
        } else {
            logger.warn("Album name is null for album ID: {}", album.getId());
            return blobService.getDefaultImageUrl("album");
        }
    }

    /**
     * Generate thumbnail URL for an artist
     * 
     * @param artist The artist object
     * @return Thumbnail URL
     */
    public String generateArtistThumbnailUrl(Artist artist) {
        if (artist == null) {
            logger.warn("Attempted to generate thumbnail URL for null artist");
            return blobService.getDefaultImageUrl("artist");
        }

        if (artist.getName() != null) {
            String fileName = generateArtistThumbnailName(artist.getName());
            String url = blobService.getPublicUrl(fileName);
            logger.debug("Generated thumbnail URL for artist {}: {}", artist.getName(), url);
            return url;
        } else {
            logger.warn("Artist name is null for artist ID: {}", artist.getId());
            return blobService.getDefaultImageUrl("artist");
        }
    }

    /**
     * Generate upload URL for song thumbnail
     * 
     * @param fileName Original file name
     * @return PreSignedUrlResponse for upload
     */
    public AzureBlobService.PreSignedUrlResponse generateSongThumbnailUploadUrl(String fileName) {
        logger.info("Generating upload URL for song thumbnail: {}", fileName);
        return blobService.generateUploadUrl(fileName, BlobServiceConfig.FOLDER_SONG_THUMBNAILS,
                BlobServiceConfig.CONTENT_TYPE_JPEG, 15);
    }

    /**
     * Generate upload URL for song audio
     * 
     * @param fileName Original file name
     * @return PreSignedUrlResponse for upload
     */
    public AzureBlobService.PreSignedUrlResponse generateSongAudioUploadUrl(String fileName) {
        logger.info("Generating upload URL for song audio: {}", fileName);
        return blobService.generateUploadUrl(fileName, BlobServiceConfig.FOLDER_SONG_AUDIO,
                BlobServiceConfig.CONTENT_TYPE_MP3, 15);
    }

    /**
     * Generate upload URL for album cover
     * 
     * @param fileName Original file name
     * @return PreSignedUrlResponse for upload
     */
    public AzureBlobService.PreSignedUrlResponse generateAlbumCoverUploadUrl(String fileName) {
        logger.info("Generating upload URL for album cover: {}", fileName);
        return blobService.generateAlbumCoverUploadUrl(fileName);
    }

    /**
     * Generate upload URL for artist image
     * 
     * @param fileName Original file name
     * @return PreSignedUrlResponse for upload
     */
    public AzureBlobService.PreSignedUrlResponse generateArtistImageUploadUrl(String fileName) {
        logger.info("Generating upload URL for artist image: {}", fileName);
        return blobService.generateArtistImageUploadUrl(fileName);
    }

    /**
     * Generate a blob name for song thumbnail based on title and artist
     */
    private String generateSongThumbnailName(String title, String artistName) {
        String cleanTitle = cleanFileName(title);
        String cleanArtist = cleanFileName(artistName);
        String hash = String.valueOf(Math.abs((cleanTitle + cleanArtist).hashCode()));
        return BlobServiceConfig.FOLDER_SONG_THUMBNAILS + "/" + cleanArtist + "-" + cleanTitle + "-" + hash + ".jpg";
    }

    /**
     * Generate a blob name for song audio based on title and artist
     */
    private String generateSongAudioName(String title, String artistName) {
        String cleanTitle = cleanFileName(title);
        String cleanArtist = cleanFileName(artistName);
        String hash = String.valueOf(Math.abs((cleanTitle + cleanArtist).hashCode()));
        return BlobServiceConfig.FOLDER_SONG_AUDIO + "/" + cleanArtist + "-" + cleanTitle + "-" + hash + ".mp3";
    }

    /**
     * Generate a blob name for album thumbnail based on album name
     */
    private String generateAlbumThumbnailName(String albumName) {
        String cleanAlbumName = cleanFileName(albumName);
        String hash = String.valueOf(Math.abs(cleanAlbumName.hashCode()));
        return BlobServiceConfig.FOLDER_ALBUM_COVERS + "/" + cleanAlbumName + "-" + hash + ".jpg";
    }

    /**
     * Generate a blob name for artist thumbnail based on artist name
     */
    private String generateArtistThumbnailName(String artistName) {
        String cleanArtistName = cleanFileName(artistName);
        String hash = String.valueOf(Math.abs(cleanArtistName.hashCode()));
        return BlobServiceConfig.FOLDER_ARTIST_IMAGES + "/" + cleanArtistName + "-" + hash + ".jpg";
    }

    /**
     * Clean a string for use as a filename
     * 
     * @param input The input string
     * @return Cleaned filename-safe string
     */
    private String cleanFileName(String input) {
        if (input == null) {
            return "unknown";
        }
        return input.replaceAll("[^a-zA-Z0-9\\s-]", "").trim().replaceAll("\\s+", "-").toLowerCase();
    }
}