package fmi.spotify.media.model;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

public record PlaylistDTO(
        Long id,
        String name,
        String description,
        String coverUrl) {

    static String COVER_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrx_eYu5bcjKMz1ByHVZ6Uy5z1in4cDGWAA&s";
    private static final String IMAGE_URL = "https://res.cloudinary.com/dbsilwgqs/image/upload/";
    private static final String IMAGE_EXTENSION = ".jpg";
    public static PlaylistDTO fromPlaylist(Playlist playlist) {
        List<Song> songs = playlist.getSongs().stream().toList();
        String coverUrl;
        if (songs.isEmpty()) {
            coverUrl = COVER_URL;
        } else {
            Song song = songs.getFirst();
            coverUrl = IMAGE_URL +
                URLEncoder.encode(song.getAlbum().getName(), StandardCharsets.UTF_8)
                    .replace("+", "%20")
                + IMAGE_EXTENSION;
        }

        return new PlaylistDTO(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                coverUrl);
    }
}