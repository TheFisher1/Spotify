package fmi.spotify.media.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@Configuration
@ConditionalOnProperty(name = "azure.storage.connection-string", matchIfMissing = false)
public class AzureBlobConfig {

    @Value("${azure.storage.connection-string}")
    private String connectionString;

    @Value("${azure.storage.container-name:spotify-media}")
    private String containerName;

    @Value("${azure.storage.account-name:spotifyfmi}")
    private String accountName;

    @Bean
    BlobServiceClient blobServiceClient() {
        return new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();
    }

    @Bean
    BlobContainerClient blobContainerClient(BlobServiceClient blobServiceClient) {
        return blobServiceClient.getBlobContainerClient(containerName);
    }
}