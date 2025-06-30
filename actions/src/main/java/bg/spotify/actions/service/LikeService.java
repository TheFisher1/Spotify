package bg.spotify.actions.service;

import fmi.spotify.media.model.Song;

import java.util.List;

public interface LikeService {
    void likeSong(Long userId, Long songId);

    void unlikeSong(Long userId, Long songId);

    List<Song> getLikedSongs(Long userId);

    int countBySongId(Long songId);

    boolean isSongLiked(Long userId, Long songId);
}
