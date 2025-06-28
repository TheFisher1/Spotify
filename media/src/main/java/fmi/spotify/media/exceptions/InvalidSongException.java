package fmi.spotify.media.exceptions;

public class InvalidSongException extends RuntimeException {

    public InvalidSongException() {
        super("Invalid song data provided");
    }

    public InvalidSongException(String message) {
        super(message);
    }

    public InvalidSongException(String message, Throwable cause) {
        super(message, cause);
    }
}
