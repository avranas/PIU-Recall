const Chart = require('../../db/Models/Chart');

const chartController = {
  getChartById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const chart = await Chart.findOne({
        where: { id: id },
      });
      if (!chart) {
        throw {
          statusCode: 404,
          message: `Unable to find the chart with the id: ${id}`,
        };
      }
      console.log('chart', chart);
      res.locals.chart = chart;
      return next();
    } catch (err) {
      err.log = 'An error occured in chartsController.getChartById';
      return next(err);
    }
  },
  modifyChartById: async function (req, res, next) {
    try {
      const id = req.params.id;
      // Make sure the chart exists firsrt
      const chart = await Chart.findOne({
        where: { id: id },
      });
      if (!chart) {
        throw {
          statusCode: 400,
          message: `Unable to find a chart with the id: '${id}'`,
        };
      }
      const body = req.body;
      const style = body.style;
      const rating = body.rating;
      const max_perfects = body.max_perfects;
      const newProperties = {};
      // Copy only the properties that can exist on a song
      if (style) newProperties.style = style;
      if (rating) newProperties.rating = rating;
      if (max_perfects) newProperties.max_perfects = max_perfects;
      const updatedChart = await Chart.update(newProperties, {
        where: { id: id },
        returning: true,
      });
      // Nice hacky way of accessing the data that I want
      res.locals.updatedChart = updatedChart[1][0];
      return next();
    } catch (err) {
      err.log = 'An error occured in chartsController.modifyChartById';
      return next(err);
    }
  },
  deleteChartById: async function (req, res, next) {
    try {
      const id = req.params.id;
      // Check if the chart exists
      const chart = await Chart.findOne({
        where: { id: id },
      });
      if (!chart) {
        throw {
          statusCode: 400,
          message: `Unable to find a chart with the id: '${id}'`,
        };
      }
      // Delete the chart
      await Chart.destroy({
        where: { id: id },
      });
      res.locals.deletedChart = chart;
      return next();
    } catch (err) {
      err.log = 'An error occured in chartsController.deleteChartById';
      return next(err);
    }
  },
  // Gets chart_id from the request body and throws an error if it doesn't exist
  checkIfChartExists: async function (req, res, next) {
    try {
      const id = req.body.chart_id;
      if (!id) {
        throw {
          statusCode: 400,
          message: 'Missing chart_id from the request body',
        };
      }
      const chart = await Chart.findOne({
        where: { id: id },
      });
      if (!chart) {
        throw {
          statusCode: 400,
          message: `Unable to find chart with the id: ${id}`,
        };
      }
      return next();
    } catch (err) {
      err.log = 'Error in get chartsController.checkIfChartExists';
      return next(err);
    }
  },
};

module.exports = chartController;
