package fmi.spotify.media.service;

public interface BlobService {
    /**
     * Generate a public URL for a blob
     * 
     * @param blobName The blob name/path
     * @return Public URL for the blob
     */
    String getPublicUrl(String blobName);

    /**
     * Generate a blob name for a file
     * 
     * @param originalFileName The original file name
     * @param folder           The folder path
     * @return Generated blob name
     */
    String generateBlobName(String originalFileName, String folder);

    /**
     * Get default image URL for a specific type
     * 
     * @param type The type of image (album, artist, playlist, etc.)
     * @return Default image URL
     */
    String getDefaultImageUrl(String type);

    /**
     * Generate a pre-signed URL for uploading
     * 
     * @param fileName          The original file name
     * @param folder            The folder path
     * @param contentType       The content type
     * @param expirationMinutes Expiration time in minutes
     * @return PreSignedUrlResponse containing upload details
     */
    AzureBlobService.PreSignedUrlResponse generateUploadUrl(String fileName, String folder, String contentType,
            int expirationMinutes);

    /**
     * Generate a pre-signed URL for downloading/viewing
     * 
     * @param blobName          The blob name/path
     * @param expirationMinutes Expiration time in minutes
     * @return Pre-signed URL for viewing/downloading
     */
    String generateDownloadUrl(String blobName, int expirationMinutes);

    /**
     * Generate a pre-signed URL for album cover upload
     * 
     * @param fileName The original file name
     * @return PreSignedUrlResponse for album cover upload
     */
    AzureBlobService.PreSignedUrlResponse generateAlbumCoverUploadUrl(String fileName);

    /**
     * Generate a pre-signed URL for artist image upload
     * 
     * @param fileName The original file name
     * @return PreSignedUrlResponse for artist image upload
     */
    AzureBlobService.PreSignedUrlResponse generateArtistImageUploadUrl(String fileName);

    /**
     * Generate a pre-signed URL for playlist cover upload
     * 
     * @param fileName The original file name
     * @return PreSignedUrlResponse for playlist cover upload
     */
    AzureBlobService.PreSignedUrlResponse generatePlaylistCoverUploadUrl(String fileName);
}
