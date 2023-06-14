const express = require('express');
const chartController = require("./controllers/chart-controller.js");
const songController = require("./controllers/song-controller");
const chartRouter = express.Router();

// Get one chart by ID and all of its scores
chartRouter.get('/:id', chartController.getChartById, (req, res) => {
  res.send(res.locals.chart);
});

// Create a new chart, then add it to a song
chartRouter.post('/', chartController.createChart, (req, res) => {
  res.send(res.locals.newChart);
});

// Modify an existing chart by ID
chartRouter.patch('/:id', chartController.modifyChartById, (req, res) => {
  res.send(res.locals.updatedChart);
});

// Delete a new chart by ID
chartRouter.delete('/:id', chartController.deleteChartById, (req, res) => {
  res.send(res.locals.deletedChart);
});


module.exports = chartRouter;