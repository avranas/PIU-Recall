import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import Register from "./pages/Register.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SongList from "./pages/SongList.jsx";
import '../styles.css';
import ScoreEntry from "./pages/ScoreEntry.jsx";

//TODO: Refreshing the page gives a 404 error

function App() {
  const navigate = useNavigate();

  // TODO: BAD NOT DRY CODE FIX THIS
  useEffect(() => {
    async function goToSongListIfAlreadyLoggedIn() {
      const response = await fetch('/users');
      const text = await response.text();
      // If a User exists, navigate to song list
      if (response.status === 200) {
        navigate('/song-list')
      }
    }
    goToSongListIfAlreadyLoggedIn();
  }, []);

  return (
    <div>
      <h1>PIU Recall</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/song-list" element={<SongList />} />
        <Route path="/score-entry" element={<ScoreEntry />} />
        <Route />
      </Routes>
      <footer>
        <p>
          Made with ❤️ by <a href="http://github.com/avranas">Alex Vranas</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
