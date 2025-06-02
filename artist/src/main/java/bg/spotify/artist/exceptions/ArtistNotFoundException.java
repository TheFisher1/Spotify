package bg.spotify.artist.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="No such artist")
public class ArtistNotFoundException extends RuntimeException {
}
