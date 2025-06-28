import api from './api';

export interface PreSignedUrlResponse {
    blobName: string;
    uploadUrl: string;
    publicUrl: string;
    message: string;
}

export interface DownloadUrlResponse {
    downloadUrl: string;
    blobName: string;
    expirationMinutes: string;
}

export const imageService = {
    async generateAlbumCoverUploadUrl(fileName: string): Promise<PreSignedUrlResponse> {
        const response = await api.post<PreSignedUrlResponse>('/media/images/album-cover/upload-url', null, {
            params: { fileName }
        });
        return response.data;
    },

    async generateArtistImageUploadUrl(fileName: string): Promise<PreSignedUrlResponse> {
        const response = await api.post<PreSignedUrlResponse>('/media/images/artist-image/upload-url', null, {
            params: { fileName }
        });
        return response.data;
    },

    async generatePlaylistCoverUploadUrl(fileName: string): Promise<PreSignedUrlResponse> {
        const response = await api.post<PreSignedUrlResponse>('/media/images/playlist-cover/upload-url', null, {
            params: { fileName }
        });
        return response.data;
    },

    async generateDownloadUrl(blobName: string, expirationMinutes: number = 60): Promise<DownloadUrlResponse> {
        const response = await api.post<DownloadUrlResponse>('/media/images/download-url', null, {
            params: { blobName, expirationMinutes }
        });
        return response.data;
    },

    async generateUploadUrl(
        fileName: string,
        folder: string,
        contentType: string = 'image/jpeg',
        expirationMinutes: number = 15
    ): Promise<PreSignedUrlResponse> {
        const response = await api.post<PreSignedUrlResponse>('/media/images/upload-url', null, {
            params: { fileName, folder, contentType, expirationMinutes }
        });
        return response.data;
    },

    async getPublicUrl(blobName: string): Promise<{ publicUrl: string; blobName: string }> {
        const response = await api.get<{ publicUrl: string; blobName: string }>(`/media/images/public-url/${encodeURIComponent(blobName)}`);
        return response.data;
    },

    // Get default image URL for a specific type
    async getDefaultImageUrl(type: string): Promise<{ imageUrl: string; type: string }> {
        const response = await api.get<{ imageUrl: string; type: string }>(`/media/images/default/${type}`);
        return response.data;
    },

    // Generate blob name for any image type
    async generateBlobName(fileName: string, folder: string): Promise<{ blobName: string; publicUrl: string; folder: string; message: string }> {
        const response = await api.post<{ blobName: string; publicUrl: string; folder: string; message: string }>('/media/images/generate-blob-name', null, {
            params: { fileName, folder }
        });
        return response.data;
    },

    // Helper function to upload a file using a pre-signed URL
    async uploadFileToAzure(uploadUrl: string, file: File): Promise<boolean> {
        try {
            const response = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                    'x-ms-blob-type': 'BlockBlob'
                }
            });
            return response.ok;
        } catch (error) {
            console.error('Error uploading file to Azure:', error);
            return false;
        }
    },

    // Helper function to get a default image URL for albums
    getDefaultAlbumCover(): string {
        return 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
    },

    // Helper function to get a default image URL for artists
    getDefaultArtistImage(): string {
        return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
    },

    // Helper function to get a default image URL for playlists
    getDefaultPlaylistCover(): string {
        return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
    }
}; 