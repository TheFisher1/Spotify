package fmi.spotify.media.model;

import java.time.Duration;
import java.util.Date;

import bg.spotify.artist.model.Artist;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "albums")
@NoArgsConstructor
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Column
    private Duration duration;

    @Column
    private Date releaseDate;

    @Column
    private String coverImagePath;

    @Column
    private String genre;
}