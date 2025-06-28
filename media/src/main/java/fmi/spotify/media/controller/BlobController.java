package fmi.spotify.media.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import fmi.spotify.media.service.AzureBlobService;
import fmi.spotify.media.service.MediaBlobService;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for handling blob storage operations
 * Provides endpoints for generating pre-signed URLs for file uploads
 */
@RestController
@RequestMapping("/api/blob")
@CrossOrigin(origins = "*")
public class BlobController {

    private static final Logger logger = LoggerFactory.getLogger(BlobController.class);

    @Autowired
    private MediaBlobService mediaBlobService;

    @Autowired
    private AzureBlobService azureBlobService;

    /**
     * Generate upload URL for song thumbnail
     * 
     * @param request Request containing file name
     * @return Pre-signed URL response
     */
    @PostMapping("/song-thumbnail/upload-url")
    public ResponseEntity<AzureBlobService.PreSignedUrlResponse> generateSongThumbnailUploadUrl(
            @RequestBody Map<String, String> request) {
        try {
            String fileName = request.get("fileName");
            if (fileName == null || fileName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            logger.info("Generating upload URL for song thumbnail: {}", fileName);
            AzureBlobService.PreSignedUrlResponse response = mediaBlobService.generateSongThumbnailUploadUrl(fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error generating song thumbnail upload URL", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Generate upload URL for song audio
     * 
     * @param request Request containing file name
     * @return Pre-signed URL response
     */
    @PostMapping("/song-audio/upload-url")
    public ResponseEntity<AzureBlobService.PreSignedUrlResponse> generateSongAudioUploadUrl(
            @RequestBody Map<String, String> request) {
        try {
            String fileName = request.get("fileName");
            if (fileName == null || fileName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            logger.info("Generating upload URL for song audio: {}", fileName);
            AzureBlobService.PreSignedUrlResponse response = mediaBlobService.generateSongAudioUploadUrl(fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error generating song audio upload URL", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Generate upload URL for album cover
     * 
     * @param request Request containing file name
     * @return Pre-signed URL response
     */
    @PostMapping("/album-cover/upload-url")
    public ResponseEntity<AzureBlobService.PreSignedUrlResponse> generateAlbumCoverUploadUrl(
            @RequestBody Map<String, String> request) {
        try {
            String fileName = request.get("fileName");
            if (fileName == null || fileName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            logger.info("Generating upload URL for album cover: {}", fileName);
            AzureBlobService.PreSignedUrlResponse response = mediaBlobService.generateAlbumCoverUploadUrl(fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error generating album cover upload URL", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Generate upload URL for artist image
     * 
     * @param request Request containing file name
     * @return Pre-signed URL response
     */
    @PostMapping("/artist-image/upload-url")
    public ResponseEntity<AzureBlobService.PreSignedUrlResponse> generateArtistImageUploadUrl(
            @RequestBody Map<String, String> request) {
        try {
            String fileName = request.get("fileName");
            if (fileName == null || fileName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            logger.info("Generating upload URL for artist image: {}", fileName);
            AzureBlobService.PreSignedUrlResponse response = mediaBlobService.generateArtistImageUploadUrl(fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error generating artist image upload URL", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Generate download URL for a blob
     * 
     * @param blobName          The blob name/path
     * @param expirationMinutes Expiration time in minutes (optional, default 60)
     * @return Download URL
     */
    @GetMapping("/download-url")
    public ResponseEntity<Map<String, String>> generateDownloadUrl(
            @RequestParam String blobName,
            @RequestParam(defaultValue = "60") int expirationMinutes) {
        try {
            if (blobName == null || blobName.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            logger.info("Generating download URL for blob: {}", blobName);
            String downloadUrl = azureBlobService.generateDownloadUrl(blobName, expirationMinutes);

            Map<String, String> response = new HashMap<>();
            response.put("downloadUrl", downloadUrl);
            response.put("blobName", blobName);
            response.put("expirationMinutes", String.valueOf(expirationMinutes));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error generating download URL for blob: {}", blobName, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get default image URL for a specific type
     * 
     * @param type The type of image (album, artist, playlist, song)
     * @return Default image URL
     */
    @GetMapping("/default-image")
    public ResponseEntity<Map<String, String>> getDefaultImageUrl(@RequestParam String type) {
        try {
            String defaultUrl = azureBlobService.getDefaultImageUrl(type);
            Map<String, String> response = new HashMap<>();
            response.put("defaultImageUrl", defaultUrl);
            response.put("type", type);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error getting default image URL for type: {}", type, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}