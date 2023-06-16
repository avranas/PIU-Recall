const Score = require('../../db/Models/Score');

const scoreController = {
  getScoreById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const score = await Score.findOne({
        where: { id: id },
      });
      if (!score) {
        throw {
          statusCode: 404,
          message: `Unable to find the score with the id: ${id}`,
        };
      }
      res.locals.score = score;
      return next();
    } catch (err) {
      err.log = 'An error occured in scoresController.getScoreById';
      return next(err);
    }
  },
  getScore: async function (req, res, next) {
    try {
      console.log(req.user.id)
      console.log(req.params.chart_id)
      console.log("==========")
      const score = await Score.findOne({
        where: { user_id: req.user.id, chart_id: req.params.chart_id },
      });
      if (!score) {
        throw {
          statusCode: 400,
          message: "No score for this song"
        }
      }
      res.locals.score = score;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  getUsersScoreByChartId: async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const chart_id = req.params.chart_id;
      const score = await Score.findOne({
        where: {
          user_id: user_id,
          chart_id: chart_id,
        },
      });
      if (!score) {
        throw {
          statusCode: 404,
          message: 'Unable to find this score',
        };
      }
      res.locals.score = score;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  createScore: async function (req, res, next) {
    try {
      const body = req.body;
      console.log(body);
      const greats = body.greats;
      const goods = body.goods;
      const bads = body.bads;
      const misses = body.misses;
      const total_score = body.total_score;
      const stage_pass = body.stage_pass;
      const user_id = req.user.id;
      const chart_id = body.chart_id;
      // Return an error if anything is missing in the request body
      let missingField = null;
      if (greats === undefined) missingField = 'greats';
      if (goods === undefined) missingField = 'goods';
      if (bads === undefined) missingField = 'bads';
      if (misses === undefined) missingField = 'misses';
      if (total_score === undefined) missingField = 'total_score';
      if (stage_pass === undefined) missingField = 'stage_pass';
      if (chart_id === undefined) missingField = 'chart_id';
      if (missingField) {
        throw {
          statusCode: 400,
          message: `'${missingField}' is missing from the request body`,
        };
      }
      // Check if the user already has a score on this chart
      const duplicate = await Score.findAll({
        where: {
          user_id,
          chart_id,
        },
      });
      if (duplicate.length !== 0) {
        throw {
          statusCode: 400,
          message: `This user already has a score on this chart`,
        };
      }
      //Create the new score
      const newScore = await Score.create({
        greats,
        goods,
        bads,
        misses,
        total_score,
        stage_pass,
        user_id,
        chart_id,
      });
      res.locals.newScore = newScore;
      return next();
    } catch (err) {
      err.log = 'An error occured in scoresController.createScore';
      return next(err);
    }
  },
  modifyScoreById: async function (req, res, next) {
    try {
      const id = req.params.id;
      // Check if the score exists
      const score = await Score.findOne({
        where: { id: id },
      });
      if (!score) {
        throw {
          statusCode: 404,
          message: `Unable to find a score with the id: '${id}'`,
        };
      }
      const body = req.body;
      const greats = body.greats;
      const goods = body.goods;
      const bads = body.bads;
      const misses = body.misses;
      const total_score = body.total_score;
      const stage_pass = body.stage_pass;
      // Copy only the properties that can exist on a song
      const newProperties = {};
      if (greats) newProperties.greats = greats;
      if (goods) newProperties.goods = goods;
      if (bads) newProperties.bads = bads;
      if (misses) newProperties.misses = misses;
      if (total_score) newProperties.total_score = total_score;
      if (stage_pass) newProperties.stage_pass = stage_pass;
      const updatedScore = await Score.update(newProperties, {
        where: { id: id },
        returning: true,
      });
      res.locals.updatedScore = updatedScore[1][0];
      return next();
    } catch (err) {
      err.log = 'An error occured in scoresController.modifyScoreById';
      return next(err);
    }
  },
  deleteScoreById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const score = await Score.findOne({
        where: { id: id },
      });
      if (!score) {
        throw {
          statusCode: 404,
          message: `Unable to find a score with the id: '${id}'`,
        };
      }
      // Delete the score
      await Score.destroy({
        where: { id: id },
      });
      res.locals.deletedScore = score;
      return next();
    } catch (err) {
      err.log = 'An error occured in scoresController.deleteScoreById';
      return next(err);
    }
  },
};

module.exports = scoreController;
