package bg.spotify.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UsersExceptionHandler {
    
    @ExceptionHandler(AlreadyExistingUserException.class)
    public ResponseEntity<Object> handleAlreadyExistingUserException(AlreadyExistingUserException ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongCredentialException.class)
    public ResponseEntity<Object> handleWrongCredentialException(WrongCredentialException ex) {
        return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
    }

}