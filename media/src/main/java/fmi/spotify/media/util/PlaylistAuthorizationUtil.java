package fmi.spotify.media.util;

import fmi.spotify.media.model.Playlist;
import fmi.spotify.media.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ServerWebExchange;

import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;

public class PlaylistAuthorizationUtil {

    public static <T> ResponseEntity<T> withPlaylistAuthorization(
            Long playlistId,
            ServerWebExchange exchange,
            PlaylistService playlistService,
            Function<Playlist, ResponseEntity<T>> operation) {

        return withPlaylistAuthorization(
                playlistId,
                exchange,
                playlistService,
                operation,
                () -> ResponseEntity.status(401).<T>body(null));
    }

    public static <T> ResponseEntity<T> withPlaylistAuthorization(
            Long playlistId,
            ServerWebExchange exchange,
            PlaylistService playlistService,
            Function<Playlist, ResponseEntity<T>> operation,
            Supplier<ResponseEntity<T>> unauthorizedResponse) {

        Optional<Playlist> playlistOpt = playlistService.getPlaylistById(playlistId);

        if (playlistOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Playlist playlist = playlistOpt.get();

        if (exchange.getAttributes().containsKey("userId")) {
            Object userId = exchange.getAttribute("userId");
            if (userId != null && userId.toString().equals(playlist.getUserId().toString())) {
                return operation.apply(playlist);
            }
        }

        return unauthorizedResponse.get();
    }

    public static <T> ResponseEntity<T> withPlaylistOwnership(
            Long playlistId,
            ServerWebExchange exchange,
            PlaylistService playlistService,
            Supplier<ResponseEntity<T>> operation) {

        return withPlaylistAuthorization(
                playlistId,
                exchange,
                playlistService,
                playlist -> operation.get(),
                () -> ResponseEntity.status(401).<T>body(null));
    }
}