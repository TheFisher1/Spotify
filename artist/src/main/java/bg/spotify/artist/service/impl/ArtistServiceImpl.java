package bg.spotify.artist.service.impl;

import bg.spotify.artist.model.Artist;
import bg.spotify.artist.repository.ArtistRepository;
import bg.spotify.artist.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtistServiceImpl implements ArtistService {
    @Autowired
    private ArtistRepository artistRepository;

    @Override
    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    @Override
    public Optional<Artist> getArtistById(Long id) {
        return artistRepository.findById(id);
    }

    @Override
    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    @Override
    public Optional<Artist> updateArtist(Long id, Artist updatedArtist) {
        if (artistRepository.existsById(id)) {
            updatedArtist.setId(id);
            return Optional.of(artistRepository.save(updatedArtist));
        }

        return Optional.empty();
    }

    @Override
    public void deleteArtist(Long id) {
        artistRepository.deleteById(id);
    }
}
