package bg.spotify.recommendations.service;

import java.util.List;

public interface RecommendationService {

    void recordSongClick(Long userId, Long songId);

    void recordSongPlay(Long userId, Long songId);

    void addNewSong(Long songId, String title, String artist, String album, String genre);

    List<String> getRecommendedSongs(Long userId, int count);

    void addBookmark(Long userId, Long songId);

    void removeBookmark(Long userId, Long songId);

    void addNewUser(Long userId, String username, Integer age, String gender, String country);

    void updateUser(Long userId, String username, Integer age, String gender, String country);
}
