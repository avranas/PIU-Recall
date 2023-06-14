-- drop table scores;
-- drop table charts;
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

CREATE TABLE charts (
  id SERIAL PRIMARY KEY,
  style text NOT NULL,
  rating integer NOT NULL, --For co-op: number of players
  max_combo integer NOT NULL,
  song_id integer NOT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  FOREIGN KEY(song_id) REFERENCES songs(id)
);

CREATE TABLE scores (
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
  FOREIGN KEY(chart_id) REFERENCES charts(id)
);

-- INSERT INTO users(username, password, created_at, updated_at)
-- VALUES ('StretchDDR', 'p@ssword', '2023-06-14', '2023-06-14');