const express = require('express');
const chartsController = require("./controllers/charts-controller.js");
const chartsRouter = express.Router();

// Get one chart by ID and all of its scores
chartsRouter.get('/:id', chartsController.getChartById, (req, res) => {
  res.send(res.locals.chart);
});

// Modify an existing chart by ID
chartsRouter.patch('/:id', chartsController.modifyChartById, (req, res) => {
  res.send(res.locals.updatedChart);
});

// Delete a new chart by ID
chartsRouter.delete('/:id', chartsController.deleteChartById, (req, res) => {
  res.send(res.locals.deletedChart);
});


module.exports = chartsRouter;