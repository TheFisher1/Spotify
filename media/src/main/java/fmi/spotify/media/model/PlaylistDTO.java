package fmi.spotify.media.model;

public record PlaylistDTO(
        Long id,
        String name,
        String description,
        String coverUrl) {

    static String COVER_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrx_eYu5bcjKMz1ByHVZ6Uy5z1in4cDGWAA&s";

    public static PlaylistDTO fromPlaylist(Playlist playlist) {
        return new PlaylistDTO(
                playlist.getId(),
                playlist.getName(),
                playlist.getDescription(),
                COVER_URL);
    }
}