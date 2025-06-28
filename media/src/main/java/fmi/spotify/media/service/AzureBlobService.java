package fmi.spotify.media.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.sas.BlobSasPermission;
import com.azure.storage.blob.sas.BlobServiceSasSignatureValues;
import fmi.spotify.media.config.BlobServiceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@ConditionalOnBean(BlobContainerClient.class)
public class AzureBlobService implements BlobService {

    private static final Logger logger = LoggerFactory.getLogger(AzureBlobService.class);

    @Autowired
    private BlobContainerClient blobContainerClient;

    @Autowired
    private BlobServiceConfig config;

    @Override
    public String getPublicUrl(String blobName) {
        if (blobName == null || blobName.trim().isEmpty()) {
            logger.warn("Attempted to generate public URL for null or empty blob name");
            return null;
        }

        String publicUrl = String.format("https://%s.blob.core.windows.net/%s/%s",
                config.getAccountName(), config.getContainerName(), blobName);
        logger.debug("Generated public URL for blob {}: {}", blobName, publicUrl);
        return publicUrl;
    }

    @Override
    public String generateBlobName(String originalFileName, String folder) {
        if (originalFileName == null || originalFileName.trim().isEmpty()) {
            throw new IllegalArgumentException("Original file name cannot be null or empty");
        }
        if (folder == null || folder.trim().isEmpty()) {
            throw new IllegalArgumentException("Folder cannot be null or empty");
        }

        String fileName = generateFileName(originalFileName);
        String blobName = folder + "/" + fileName;
        logger.debug("Generated blob name: {} for original file: {} in folder: {}", blobName, originalFileName, folder);
        return blobName;
    }

    @Override
    public String getDefaultImageUrl(String type) {
        if (type == null) {
            type = "default";
        }

        String defaultUrl = switch (type.toLowerCase()) {
            case "album" -> BlobServiceConfig.DEFAULT_ALBUM_IMAGE;
            case "artist" -> BlobServiceConfig.DEFAULT_ARTIST_IMAGE;
            case "playlist" -> BlobServiceConfig.DEFAULT_PLAYLIST_IMAGE;
            case "song" -> BlobServiceConfig.DEFAULT_SONG_IMAGE;
            default -> BlobServiceConfig.DEFAULT_ALBUM_IMAGE;
        };

        logger.debug("Returning default image URL for type {}: {}", type, defaultUrl);
        return defaultUrl;
    }

    @Override
    public PreSignedUrlResponse generateUploadUrl(String fileName, String folder, String contentType,
            int expirationMinutes) {
        validateUploadParameters(fileName, folder, contentType);

        String blobName = generateBlobName(fileName, folder);
        BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

        // Create SAS token for upload
        BlobServiceSasSignatureValues sasSignatureValues = new BlobServiceSasSignatureValues(
                OffsetDateTime.now().plusMinutes(expirationMinutes),
                BlobSasPermission.parse("w") // Write permission
        );

        String sasToken = blobClient.generateSas(sasSignatureValues);
        String preSignedUrl = blobClient.getBlobUrl() + "?" + sasToken;
        String publicUrl = getPublicUrl(blobName);

        logger.info("Generated upload URL for blob: {} in folder: {}", blobName, folder);
        return new PreSignedUrlResponse(blobName, preSignedUrl, publicUrl);
    }

    @Override
    public String generateDownloadUrl(String blobName, int expirationMinutes) {
        if (blobName == null || blobName.trim().isEmpty()) {
            logger.warn("Attempted to generate download URL for null or empty blob name");
            return null;
        }

        try {
            BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

            // Create SAS token for read
            BlobServiceSasSignatureValues sasSignatureValues = new BlobServiceSasSignatureValues(
                    OffsetDateTime.now().plusMinutes(expirationMinutes),
                    BlobSasPermission.parse("r") // Read permission
            );

            String sasToken = blobClient.generateSas(sasSignatureValues);
            String downloadUrl = blobClient.getBlobUrl() + "?" + sasToken;

            logger.debug("Generated download URL for blob: {}", blobName);
            return downloadUrl;
        } catch (Exception e) {
            logger.error("Error generating download URL for blob: {}", blobName, e);
            return null;
        }
    }

    @Override
    public PreSignedUrlResponse generateAlbumCoverUploadUrl(String fileName) {
        return generateUploadUrl(fileName, BlobServiceConfig.FOLDER_ALBUM_COVERS,
                BlobServiceConfig.CONTENT_TYPE_JPEG, config.getDefaultUploadExpirationMinutes());
    }

    @Override
    public PreSignedUrlResponse generateArtistImageUploadUrl(String fileName) {
        return generateUploadUrl(fileName, BlobServiceConfig.FOLDER_ARTIST_IMAGES,
                BlobServiceConfig.CONTENT_TYPE_JPEG, config.getDefaultUploadExpirationMinutes());
    }

    @Override
    public PreSignedUrlResponse generatePlaylistCoverUploadUrl(String fileName) {
        return generateUploadUrl(fileName, BlobServiceConfig.FOLDER_PLAYLIST_COVERS,
                BlobServiceConfig.CONTENT_TYPE_JPEG, config.getDefaultUploadExpirationMinutes());
    }

    /**
     * Generate a pre-signed URL for song audio upload
     */
    public PreSignedUrlResponse generateSongAudioUploadUrl(String fileName) {
        return generateUploadUrl(fileName, BlobServiceConfig.FOLDER_SONG_AUDIO,
                BlobServiceConfig.CONTENT_TYPE_MP3, config.getDefaultUploadExpirationMinutes());
    }

    /**
     * Generate a pre-signed URL for song thumbnail upload
     */
    public PreSignedUrlResponse generateSongThumbnailUploadUrl(String fileName) {
        return generateUploadUrl(fileName, BlobServiceConfig.FOLDER_SONG_THUMBNAILS,
                BlobServiceConfig.CONTENT_TYPE_JPEG, config.getDefaultUploadExpirationMinutes());
    }

    /**
     * Generate a unique file name
     * 
     * @param originalFileName The original file name
     * @return A unique file name
     */
    private String generateFileName(String originalFileName) {
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return UUID.randomUUID().toString() + extension;
    }

    /**
     * Validate upload parameters
     */
    private void validateUploadParameters(String fileName, String folder, String contentType) {
        if (fileName == null || fileName.trim().isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null or empty");
        }
        if (folder == null || folder.trim().isEmpty()) {
            throw new IllegalArgumentException("Folder cannot be null or empty");
        }
        if (contentType == null || contentType.trim().isEmpty()) {
            throw new IllegalArgumentException("Content type cannot be null or empty");
        }
    }

    /**
     * Response class for pre-signed URL generation
     */
    public static class PreSignedUrlResponse {
        private String blobName;
        private String uploadUrl;
        private String publicUrl;
        private String message;

        public PreSignedUrlResponse(String blobName, String uploadUrl, String publicUrl) {
            this.blobName = blobName;
            this.uploadUrl = uploadUrl;
            this.publicUrl = publicUrl;
            this.message = "Pre-signed URL generated successfully";
        }

        // Getters and setters
        public String getBlobName() {
            return blobName;
        }

        public void setBlobName(String blobName) {
            this.blobName = blobName;
        }

        public String getUploadUrl() {
            return uploadUrl;
        }

        public void setUploadUrl(String uploadUrl) {
            this.uploadUrl = uploadUrl;
        }

        public String getPublicUrl() {
            return publicUrl;
        }

        public void setPublicUrl(String publicUrl) {
            this.publicUrl = publicUrl;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}