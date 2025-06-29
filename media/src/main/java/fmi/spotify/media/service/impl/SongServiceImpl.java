package fmi.spotify.media.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import bg.spotify.recommendations.service.RecommendationService;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.model.SongDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fmi.spotify.media.repository.SongRepository;
import fmi.spotify.media.service.SongService;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private RecommendationService recommendationService;

    @Override
    public List<Song> getAllSongs(int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return songRepository.findAll(pageable).getContent();
    }

    @Override
    public Optional<Song> getSongById(Long userId, Long songId) {
        recommendationService.recordSongClick(userId, songId);
        return songRepository.findById(songId);
    }

    @Override
    public Optional<SongDto> getSongDtoById(Long userId, Long songId) {
        Optional<Song> songOpt = getSongById(userId, songId);
        return songOpt.map(song -> {
            return SongDto.fromSong(song);
        });
    }

    @Override
    public List<Song> getSongsByArtistId(Long artistId) {
        return songRepository.findByArtist_Id(artistId);
    }

    @Override
    public List<SongDto> getSongsDtoByArtistId(Long artistId) {
        List<Song> songs = getSongsByArtistId(artistId);
        return songs.stream()
                .map(SongDto::fromSong)
                .collect(Collectors.toList());
    }
}