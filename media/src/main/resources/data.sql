INSERT INTO genre (name, description) VALUES
('Electronic', 'Electronic dance music and electronic sounds'),
('Indie Pop', 'Independent pop music with alternative influences'),
('Alternative Rock', 'Alternative rock music with experimental elements'),
('Pop Rock', 'Pop music with rock influences'),
('Reggaeton', 'Latin American music with reggae and hip-hop influences'),
('R&B', 'Rhythm and blues music'),
('Pop', 'Popular music with broad appeal');

INSERT INTO artist (name, info) VALUES
('Avicii', 'Swedish DJ, remixer, record producer, musician, and songwriter who specialized in audio programming, remixing and record producing.'),
('BANNERS', 'British singer-songwriter known for his indie pop sound and emotive vocals.'),
('Calvin Harris', 'Scottish DJ, record producer, singer, and songwriter known for his electronic dance music.'),
('Coldplay', 'British rock band formed in London, known for their alternative rock and pop rock sound.'),
('Fall Out Boy', 'American rock band from Wilmette, Illinois, formed in 2001, known for their pop punk and alternative rock.'),
('Farruko', 'Puerto Rican singer and rapper known for his Latin trap and reggaeton music.'),
('Fun.', 'American indie pop band known for their anthemic songs and collaborations.'),
('Imagine Dragons', 'American pop rock band from Las Vegas, known for their alternative rock and pop sound.'),
('Janji', 'Electronic music producer known for his melodic and atmospheric tracks.'),
('Kwabs', 'British singer-songwriter known for his soulful voice and R&B influenced music.'),
('Panic! At The Disco', 'American rock band from Las Vegas, known for their pop rock and alternative sound.');

INSERT INTO albums (name, artist_id, release_date, genre) VALUES
('True', 1, '2013-09-13', 'Electronic'),
('BANNERS', 2, '2019-03-01', 'Indie Pop'),
('Motion', 3, '2014-10-31', 'Electronic'),
('Mylo Xyloto', 4, '2011-10-24', 'Alternative Rock'),
('American Beauty American Psycho', 5, '2015-01-20', 'Pop Rock'),
('La 167', 6, '2021-11-19', 'Reggaeton'),
('Some Nights', 7, '2012-02-21', 'Indie Pop'),
('Evolve', 8, '2017-06-23', 'Alternative Rock'),
('Mercury - Act 1', 8, '2018-11-09', 'Alternative Rock'),
('Loom', 8, '2021-09-03', 'Alternative Rock'),
('Mercury - Act 2', 8, '2022-07-01', 'Alternative Rock'),
('Electronic Vibes', 9, '2020-01-01', 'Electronic'),
('Love + War', 10, '2015-09-11', 'R&B'),
('Death of a Bachelor', 11, '2016-01-15', 'Pop Rock'),
('Origins', 8, '2018-11-09', 'Alternative Rock');

INSERT INTO song (title, duration, album_id, artist_id) VALUES
('Hey Brother', 255, 1, 1),
('Someone To You', 220, 2, 2),
('Summer', 222, 3, 3),
('Paradise', 278, 4, 4),
('Centuries', 228, 5, 5),
('Pepas', 287, 6, 6),
('We Are Young ft. Janelle Monae', 252, 7, 7),
('Bad Liar', 260, 15, 8),
('My Life', 222, 9, 8),
('Wake Up', 175, 10, 8),
('Walking The Wire', 217, 8, 8),
('Waves', 225, 11, 8),
('Heroes Tonight feat. Johnning', 198, 12, 9),
('Walk', 214, 13, 10),
('House of memories', 208, 14, 11),
('Addicted to You', 148, 1, 1),
('Heart Upon My Sleeve', 280, 1, 1),
('Wake Me Up', 249, 1, 1),
('Liar Liar', 232, 1, 1);

INSERT INTO song_genres (song_id, genre_id) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4),
(6, 5),
(7, 2),
(8, 3),
(9, 3),
(10, 3),
(11, 3),
(12, 3),
(13, 1),
(14, 6),
(15, 4),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1);

INSERT INTO playlist (name, description, is_public) VALUES ('Home Workout', 'Chill songs', true), ('Techno', 'Techno songs', true), ('Pop', 'Pop songs', true);

INSERT INTO playlist_songs (playlist_id, song_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 7), (1, 10), (1, 11), (1, 14), (1, 16), (2, 3), (2, 4), (2, 6), (2, 11), (2, 12), (2, 13), (2, 15), (2, 17), (2, 18), (3, 1), (3, 2), (3, 4), (3, 5), (3, 6), (3, 7), (3, 12), (3, 14), (3, 15), (3, 19), (3, 20);

ALTER TABLE song ADD COLUMN IF NOT EXISTS search_vector tsvector;

UPDATE song s
SET search_vector = to_tsvector('english',
  coalesce(s.title, '') || ' ' ||
  coalesce((SELECT name FROM artist WHERE id = s.artist_id), '') || ' ' ||
  coalesce((SELECT name FROM albums WHERE id = s.album_id), '')
);

CREATE INDEX IF NOT EXISTS song_search_vector_idx ON song USING GIN(search_vector);