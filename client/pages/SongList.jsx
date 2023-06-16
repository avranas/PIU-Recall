import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongCard from '../Components/SongCard';
import { v4 as uuidv4 } from 'uuid';

function SongList() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState();
  async function logout() {
    await fetch('/logout');
    navigate('/login-page');
  }
  useEffect(() => {
    async function fetchSongs() {
      const songs = await fetch('/songs');
      const json = await songs.json();
      console.log(json);
      setSongs(
        json.map((song) => {
          return (
            <SongCard
              key={uuidv4()}
              title={song.title}
              artist={song.artist}
              type={song.type}
              max_bpm={song.max_bpm}
              min_bpm={song.min_bpm}
              banner_img={song.banner_img}
              charts={song.charts}
              songId={song.id}
            />
          );
        })
      );
    }
    fetchSongs();
  }, []);

  return (
    <div>
      {songs}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default SongList;
