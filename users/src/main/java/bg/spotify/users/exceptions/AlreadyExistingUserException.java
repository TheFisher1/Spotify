package bg.spotify.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class AlreadyExistingUserException extends RuntimeException {
    public AlreadyExistingUserException(String message) {
        super(message);
    }
}