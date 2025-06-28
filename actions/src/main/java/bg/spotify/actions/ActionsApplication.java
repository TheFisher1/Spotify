package bg.spotify.actions;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "bg.spotify.actions", "bg.spotify.artist", "bg.spotify.users" })
@EntityScan(basePackages = { "bg.spotify.actions.model", "bg.spotify.artist.model", "bg.spotify.users.model",
                "fmi.spotify.media.model" })
@EnableJpaRepositories(basePackages = { "bg.spotify.actions.repository", "bg.spotify.artist.repository",
                "bg.spotify.users.repository", "fmi.spotify.media.repository" })
public class ActionsApplication {

        public static void main(String[] args) {
                SpringApplication.run(ActionsApplication.class, args);
        }

}
