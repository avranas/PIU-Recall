const express = require('express');
const songsController = require("./controllers/songs-controller");
const songsRouter = express.Router();

// Get all songs without charts
songsRouter.get('/', songsController.getAllSongs, (req, res) => {
  res.send(res.locals.allSongs);
});

// Get one song and its charts by ID
songsRouter.get('/:id', songsController.getSongById, (req, res) => {
  res.send(res.locals.song);
});

// Add a new song
songsRouter.post('/', songsController.createSong, (req, res) => {
  res.send(res.locals.newSong);
});

// Modify an existing song by ID
songsRouter.patch('/:id', songsController.modifySongById, (req, res) => {
  res.send(res.locals.updatedSong);
});

// Delete a new song by ID
songsRouter.delete('/:id', songsController.deleteSongById, (req, res) => {
  res.send(res.locals.deletedSong);
});

module.exports = songsRouter;