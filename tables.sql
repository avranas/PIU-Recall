-- drop table score;
-- drop table chart;
-- drop table users;
-- drop table songs;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  artist text NOT NULL,
  type text NOT NULL, --Normal, shortcut, full song, remix
  max_bpm float NOT NULL,
  min_bpm float NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL
);

CREATE TABLE chart (
  id SERIAL PRIMARY KEY,
  rating integer NOT NULL, --For co-op: number of players
  max_perfects integer NOT NULL,
  song_id integer NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  FOREIGN KEY(song_id) REFERENCES songs(id)
);

CREATE TABLE score (
  id SERIAL PRIMARY KEY,
  greats integer,
  goods integer,
  bads integer,
  misses integer,
  max_combo integer,
  total_score integer NOT NULL,
  pass boolean NOT NULL, --Pass or fail?
  user_id integer NOT NULL,
  chart_id integer NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(chart_id) REFERENCES chart(id)
);

-- INSERT INTO users(username, password, created_at, updated_at)
-- VALUES ('StretchDDR', 'p@ssword', '2023-06-14', '2023-06-14');