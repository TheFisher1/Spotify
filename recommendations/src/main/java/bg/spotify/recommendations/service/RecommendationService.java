package bg.spotify.recommendations.service;

import java.util.List;
import java.util.Set;

import fmi.spotify.media.model.Genre;

public interface RecommendationService {

    void recordSongClick(Long userId, Long songId);

    void recordSongPlay(Long userId, Long songId);

    void addNewSong(Long songId, String title, String artist, String album, Set<Genre> genre);

    List<String> getRecommendedSongs(Long userId, int count);

    void addBookmark(Long userId, Long songId);

    void removeBookmark(Long userId, Long songId);

    void addNewUser(Long userId, String username, Integer age, String gender, String country);
}
