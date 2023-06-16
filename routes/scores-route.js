const express = require('express');
const scoresController = require('./controllers/scores-controller');
const chartsController = require('./controllers/charts-controller');
const usersController = require('./controllers/users-controller');
const authController = require('./controllers/auth-controller');
const scoresRouter = express.Router();

// Get all of a user's scores (not private)
scoresRouter.get('/:chart_id/:user_id', scoresController.getUsersScoreByChartId, (req, res) => {
  res.json(res.locals.score);
});

// Get a user's score for a chart
scoresRouter.get('/:chart_id/', authController.checkIfLoggedIn, scoresController.getScore, (req, res) => {
  res.json(res.locals.score); 
})

// // Get one score
// scoresRouter.get('/:id', scoresController.getScoreById, (req, res) => {
//   res.send(res.locals.score);
// });

// Add a new score
scoresRouter.post(
  '/',
  authController.checkIfLoggedIn,
  chartsController.checkIfChartExists,
  scoresController.createScore,
  (req, res) => {
    res.send(res.locals.newScore);
  }
);

// Modify an existing score by ID
scoresRouter.patch(
  '/:id',
  authController.checkIfLoggedIn,
  scoresController.modifyScoreById,
  (req, res) => {
    res.send(res.locals.updatedScore);
  }
);

// Delete a new score by ID
scoresRouter.delete(
  '/:id',
  authController.checkIfLoggedIn,
  scoresController.deleteScoreById,
  (req, res) => {
    res.send(res.locals.deletedScore);
  }
);

module.exports = scoresRouter;
