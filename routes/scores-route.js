const express = require('express');
const scoresController = require('./controllers/scores-controller');
const chartsController = require('./controllers/charts-controller');
const usersController = require("./controllers/users-controller");
const scoresRouter = express.Router();

// Get one score
scoresRouter.get('/:id', scoresController.getScoreById, (req, res) => {
  res.send(res.locals.score);
});

// Add a new score
scoresRouter.post(
  '/',
  usersController.checkIfUserExists,
  chartsController.checkIfChartExists,
  scoresController.createScore,
  (req, res) => {
    res.send(res.locals.newScore);
  }
);

// Modify an existing score by ID
scoresRouter.patch('/:id', scoresController.modifyScoreById, (req, res) => {
  res.send(res.locals.updatedScore);
});

// Delete a new score by ID
scoresRouter.delete('/:id', scoresController.deleteScoreById, (req, res) => {
  res.send(res.locals.deletedScore);
});

module.exports = scoresRouter;
