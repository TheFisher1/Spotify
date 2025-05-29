package fmi.spotify.media.model;

import java.time.Duration;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "albums")
@NoArgsConstructor
public class Album {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String artist;

    @Column
    private Duration duration;

    @Column
    private Date releaseDate;

    @Column
    private String coverImagePath;

    @Column
    private String genre;
}