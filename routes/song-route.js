const express = require('express');
const songController = require("./controllers/song-controller");
const songRouter = express.Router();

// Get all songs
songRouter.get('/', songController.getAllSongs, (req, res) => {
  res.send(res.locals.allSongs);
});

// Get one song and its charts by ID
songRouter.get('/:id', songController.getSongById, (req, res) => {
  res.send(res.locals.song);
});

// Add a new song
songRouter.post('/', songController.createSong, (req, res) => {
  res.send(res.locals.newSong);
});

// Modify an existing song by ID
songRouter.patch('/:id', songController.modifySongById, (req, res) => {
  res.send(res.locals.updatedSong);
});

// Delete a new song by ID
songRouter.delete('/:id', songController.deleteSongById, (req, res) => {
  res.send(res.locals.deletedSong);
});


module.exports = songRouter;