package bg.spotify.recommendations.config;

import com.recombee.api_client.RecombeeClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RecombeeConfig {

    @Bean
    RecombeeClient recombeeClient() {
        return new RecombeeClient("database-id", "token");
    }
}