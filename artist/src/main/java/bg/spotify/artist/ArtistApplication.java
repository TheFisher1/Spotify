package bg.spotify.artist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "bg.spotify.artist", "bg.spotify.recommendations" })
public class ArtistApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArtistApplication.class, args);
	}

}
