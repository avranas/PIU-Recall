const express = require('express');
const songsController = require('./controllers/songs-controller');
const authController = require('./controllers/auth-controller');
const songsRouter = express.Router();

// Get all songs with charts and the logged in user's scores
songsRouter.get(
  '/',
  authController.checkIfLoggedIn,
  songsController.getAllSongs,
  (req, res) => {
    res.send(res.locals.allSongs);
  }
);

// Get one song and its charts by ID
songsRouter.get('/:id', songsController.getSongById, (req, res) => {
  res.send(res.locals.song);
});

// Add a new song
songsRouter.post(
  '/',
  authController.checkIfAdmin,
  songsController.createSong,
  (req, res) => {
    res.send(res.locals.newSong);
  }
);

// Modify an existing song by ID
songsRouter.patch(
  '/:id',
  authController.checkIfAdmin,
  songsController.modifySongById,
  (req, res) => {
    res.send(res.locals.updatedSong);
  }
);

// Delete a new song by ID
songsRouter.delete(
  '/:id',
  authController.checkIfAdmin,
  songsController.deleteSongById,
  (req, res) => {
    res.send(res.locals.deletedSong);
  }
);

module.exports = songsRouter;
