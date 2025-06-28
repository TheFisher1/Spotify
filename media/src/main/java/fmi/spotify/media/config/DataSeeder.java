package fmi.spotify.media.config;

import fmi.spotify.media.model.Album;
import fmi.spotify.media.model.Song;
import fmi.spotify.media.repository.AlbumRepository;
import fmi.spotify.media.repository.SongRepository;
import bg.spotify.artist.model.Artist;
import bg.spotify.artist.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

        @Autowired
        private ArtistRepository artistRepository;

        @Autowired
        private AlbumRepository albumRepository;

        @Autowired
        private SongRepository songRepository;

        @Value("${spring.jpa.hibernate.ddl-auto:create-drop}")
        private String ddlAuto;

        @Value("${app.seed.database:true}")
        private boolean shouldSeedDatabase;

        @Value("${app.seed.force:false}")
        private boolean forceReseed;

        @Override
        public void run(String... args) throws Exception {
                // Wait a bit for Hibernate to finish schema generation
                Thread.sleep(2000);

                if (!shouldSeedDatabase) {
                        System.out.println("⏭️  Database seeding disabled via configuration");
                        return;
                }

                // Check if we should seed based on DDL auto setting
                boolean shouldSeed = forceReseed ||
                                artistRepository.count() == 0 ||
                                ddlAuto.equals("create") ||
                                ddlAuto.equals("create-drop");

                if (shouldSeed) {
                        if (forceReseed || ddlAuto.equals("create") || ddlAuto.equals("create-drop")) {
                                System.out.println("🗑️  Schema recreation detected - clearing existing data...");
                                songRepository.deleteAll();
                                albumRepository.deleteAll();
                                artistRepository.deleteAll();
                        }

                        seedArtists();
                        seedAlbums();
                        seedSongs();
                }
        }

        private void seedArtists() {
                List<Artist> artists = Arrays.asList(
                                Artist.builder().name("Avicii")
                                                .info("Swedish DJ, remixer, record producer, musician, and songwriter who specialized in audio programming, remixing and record producing.")
                                                .build(),
                                Artist.builder().name("BANNERS")
                                                .info("British singer-songwriter known for his indie pop sound and emotive vocals.")
                                                .build(),
                                Artist.builder().name("Calvin Harris")
                                                .info("Scottish DJ, record producer, singer, and songwriter known for his electronic dance music.")
                                                .build(),
                                Artist.builder().name("Coldplay")
                                                .info("British rock band formed in London, known for their alternative rock and pop rock sound.")
                                                .build(),
                                Artist.builder().name("Fall Out Boy")
                                                .info("American rock band from Wilmette, Illinois, formed in 2001, known for their pop punk and alternative rock.")
                                                .build(),
                                Artist.builder().name("Farruko")
                                                .info("Puerto Rican singer and rapper known for his Latin trap and reggaeton music.")
                                                .build(),
                                Artist.builder().name("Fun.")
                                                .info("American indie pop band known for their anthemic songs and collaborations.")
                                                .build(),
                                Artist.builder().name("Imagine Dragons")
                                                .info("American pop rock band from Las Vegas, known for their alternative rock and pop sound.")
                                                .build(),
                                Artist.builder().name("Janji")
                                                .info("Electronic music producer known for his melodic and atmospheric tracks.")
                                                .build(),
                                Artist.builder().name("Kwabs")
                                                .info("British singer-songwriter known for his soulful voice and R&B influenced music.")
                                                .build(),
                                Artist.builder().name("Panic! At The Disco")
                                                .info("American rock band from Las Vegas, known for their pop rock and alternative sound.")
                                                .build());

                artistRepository.saveAll(artists);
        }

        private void seedAlbums() {
                List<Artist> artists = artistRepository.findAll();

                List<Album> albums = Arrays.asList(
                                createAlbum("True", artists.get(0), "2013-09-13", "Electronic"),
                                createAlbum("BANNERS", artists.get(1), "2019-03-01", "Indie Pop"),
                                createAlbum("Motion", artists.get(2), "2014-10-31", "Electronic"),
                                createAlbum("Mylo Xyloto", artists.get(3), "2011-10-24", "Alternative Rock"),
                                createAlbum("American Beauty/American Psycho", artists.get(4), "2015-01-20",
                                                "Pop Rock"),
                                createAlbum("La 167", artists.get(5), "2021-11-19", "Reggaeton"),
                                createAlbum("Some Nights", artists.get(1), "2012-02-21", "Indie Pop"),
                                createAlbum("Evolve", artists.get(7), "2017-06-23", "Alternative Rock"),
                                createAlbum("Origins", artists.get(7), "2018-11-09", "Alternative Rock"),
                                createAlbum("Mercury - Act 1", artists.get(7), "2021-09-03", "Alternative Rock"),
                                createAlbum("Mercury - Act 2", artists.get(7), "2022-07-01", "Alternative Rock"),
                                createAlbum("Electronic Vibes", artists.get(8), "2020-01-01", "Electronic"),
                                createAlbum("Love + War", artists.get(9), "2015-09-11", "R&B"),
                                createAlbum("Death of a Bachelor", artists.get(10), "2016-01-15", "Pop Rock"));

                albumRepository.saveAll(albums);
        }

        private Album createAlbum(String name, Artist artist, String releaseDate, String genre) {
                Album album = new Album();
                album.setName(name);
                album.setArtist(artist);
                album.setReleaseDate(java.sql.Date.valueOf(releaseDate));
                album.setGenre(genre);
                return album;
        }

        private void seedSongs() {
                List<Artist> artists = artistRepository.findAll();
                List<Album> albums = albumRepository.findAll();

                List<Song> songs = Arrays.asList(
                                // Avicii - True
                                createSong("Hey Brother", Duration.ofMinutes(4).plusSeconds(15), "Electronic",
                                                "Avicii - Hey Brother.mp3",
                                                albums.get(0), artists.get(0)),

                                // BANNERS
                                createSong("Someone To You", Duration.ofMinutes(3).plusSeconds(40), "Indie Pop",
                                                "BANNERS - Someone To You.mp3",
                                                albums.get(1), artists.get(1)),

                                // Calvin Harris - Motion
                                createSong("Summer", Duration.ofMinutes(3).plusSeconds(42), "Electronic",
                                                "Calvin Harris - Summer.mp3",
                                                albums.get(2), artists.get(2)),

                                // Coldplay - Mylo Xyloto
                                createSong("Paradise", Duration.ofMinutes(4).plusSeconds(38), "Alternative Rock",
                                                "Coldplay - Paradise.mp3",
                                                albums.get(3), artists.get(3)),

                                // Fall Out Boy - American Beauty/American Psycho
                                createSong("Centuries", Duration.ofMinutes(3).plusSeconds(48), "Pop Rock",
                                                "Fall Out Boy - Centuries.mp3",
                                                albums.get(4), artists.get(4)),

                                // Farruko - La 167
                                createSong("Pepas", Duration.ofMinutes(4).plusSeconds(47), "Reggaeton",
                                                "Farruko - Pepas.mp3",
                                                albums.get(5), artists.get(5)),

                                // Fun. - Some Nights
                                createSong("We Are Young ft. Janelle Monae", Duration.ofMinutes(4).plusSeconds(12),
                                                "Indie Pop",
                                                "Fun._ We Are Young ft. Janelle Monae.mp3",
                                                albums.get(6), artists.get(6)),

                                // Imagine Dragons - Various Albums
                                createSong("Bad Liar", Duration.ofMinutes(4).plusSeconds(20), "Alternative Rock",
                                                "Imagine Dragons - Bad Liar [I-QfPUz1es8].mp3",
                                                albums.get(7), artists.get(7)),
                                createSong("My Life", Duration.ofMinutes(3).plusSeconds(42), "Alternative Rock",
                                                "Imagine Dragons - My Life (Official Lyric Video) [CBDT9LkrrVc].mp3",
                                                albums.get(8), artists.get(7)),
                                createSong("Wake Up", Duration.ofMinutes(2).plusSeconds(55), "Alternative Rock",
                                                "Imagine Dragons - Wake Up (Official Music Video) [q392mSz4VeY].mp3",
                                                albums.get(9), artists.get(7)),
                                createSong("Walking The Wire", Duration.ofMinutes(3).plusSeconds(37),
                                                "Alternative Rock",
                                                "Imagine Dragons - Walking The Wire (Official Audio) [1nv9br7P7g0].mp3",
                                                albums.get(10), artists.get(7)),
                                createSong("Waves", Duration.ofMinutes(3).plusSeconds(45), "Alternative Rock",
                                                "Imagine Dragons - Waves.mp3",
                                                albums.get(7), artists.get(7)),

                                // Janji - Electronic Vibes
                                createSong("Heroes Tonight feat. Johnning", Duration.ofMinutes(3).plusSeconds(18),
                                                "Electronic",
                                                "Janji - Heroes Tonight feat. Johnning.mp3",
                                                albums.get(11), artists.get(8)),

                                // Kwabs - Love + War
                                createSong("Walk", Duration.ofMinutes(3).plusSeconds(34), "R&B", "Kwabs - Walk.mp3",
                                                albums.get(12), artists.get(9)),

                                // Panic! At The Disco - Death of a Bachelor
                                createSong("House of Memories", Duration.ofMinutes(3).plusSeconds(28), "Pop Rock",
                                                "Panic_ At The Disco - House of Memories.mp3",
                                                albums.get(13), artists.get(10)));

                songRepository.saveAll(songs);
                System.out.println("🎵 Seeded " + songs.size() + " songs");
        }

        private Song createSong(String title, Duration duration, String genre, String filePath, Album album,
                        Artist artist) {
                Song song = new Song();
                song.setTitle(title);
                song.setDuration(duration);
                song.setGenre(genre);
                song.setFilePath(filePath);
                song.setAlbum(album);
                song.setArtist(artist);

                return song;
        }
}