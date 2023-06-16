const Chart = require('../../db/Models/Chart');
const Score = require("../../db/Models/Score");
const Song = require('../../db/Models/Song');

const songsController = {
  getAllSongs: async function (req, res, next) {
    try {
      console.log('req.user', req.user);
      const allSongs = await Song.findAll({
        include: [
          {
            model: Chart,
            required: true,
          },
        ]});
      res.locals.allSongs = allSongs;
      return next();
    } catch (err) {
      err.log = 'An error occured in songsController.getAllSongs';
      return next(err);
    }
  },
  getSongById: async function (req, res, next) {
    try {
      const id = req.params.id;
      const song = await Song.findOne({
        include: [
          {
            model: Chart,
            required: true,
          },
        ],
        where: { id: id },
      });
      if (!song) {
        throw {
          statusCode: 404,
          message: `Unable to find the song with the id: ${id}`,
        };
      }
      res.locals.song = song;
      return next();
    } catch (err) {
      err.log = 'An error occured in songsController.getSongById';
      return next(err);
    }
  },
  createSong: async function (req, res, next) {
    try {
      console.log('creating song');
      const body = req.body;
      const title = body.title;
      const artist = body.artist;
      const type = body.type;
      const max_bpm = body.max_bpm;
      const min_bpm = body.min_bpm;
      const charts = body.charts;
      const banner_img = body.banner_img;
      // Return an error if anything is missing in the request body
      let missingField = null;
      if (!title) missingField = 'title';
      if (!artist) missingField = 'artist';
      if (!type) missingField = 'type';
      if (!max_bpm) missingField = 'max_bpm';
      if (!min_bpm) missingField = 'min_bpm';
      if (!charts) missingField = 'charts';
      if (!banner_img) missingField = 'banner_img';
      if (missingField) {
        throw {
          statusCode: 400,
          message: `'${missingField}' is missing from the request body`,
        };
      }
      // type can only be one of these:
      const typeOptions = ['Normal', 'Full Song', 'Shortcut', 'Remix'];
      if (!typeOptions.includes(type)) {
        throw {
          statusCode: 400,
          message: `Invalid entry for 'type'`,
        };
      }
      // charts must be an array
      if (!Array.isArray(charts)) {
        throw {
          statusCode: 400,
          message: `'charts' must be an array'`,
        };
      }
      // charts must also have a length greater than zero
      if (charts.length === 0) {
        throw {
          statusCode: 400,
          message: `charts must have at least one value`,
        };
      }
      // For each chart in the song, make sure the JSON data is good
      charts.forEach((chart) => {
        const style = chart.style;
        const rating = chart.rating;
        const max_combo = chart.max_combo;
        let missingField = null;
        if (!style) missingField = 'style';
        if (!rating) missingField = 'rating';
        if (!max_combo) missingField = 'max_combo';
        if (missingField) {
          throw {
            statusCode: 400,
            message: `'${missingField}' is missing from one of the charts`,
          };
        }
        // Type checking must be done before we attempt to create anything
        if (!Number.isInteger(rating)) {
          throw {
            statusCode: 400,
            message: 'rating must be an integer',
          };
        }
        if (!Number.isInteger(max_combo)) {
          throw {
            statusCode: 400,
            message: 'max_combo must be an integer',
          };
        }
        const styleOptions = [
          'Single',
          'Double',
          'Single-Performance',
          'Double-Performance',
          'Co-Op',
        ];
        if (!styleOptions.includes(style)) {
          throw {
            statusCode: 400,
            message: `Invalid entry for 'style' in charts`,
          };
        }
      });
      // Create the song
      const newSong = await Song.create({
        title,
        artist,
        type,
        max_bpm,
        min_bpm,
        banner_img,
      });
      // For each chart in the song, create a new chart
      await Promise.all(
        charts.map((chart) => {
          //Create a new chart here
          const style = chart.style;
          const rating = chart.rating;
          const max_combo = chart.max_combo;
          return Chart.create({
            style,
            rating,
            max_combo,
            song_id: newSong.id,
          });
        })
      );
      res.locals.newSong = newSong;
      return next();
    } catch (err) {
      err.log = 'An error occured in songsController.createSong';
      return next(err);
    }
  },
  modifySongById: async function (req, res, next) {
    try {
      const id = req.params.id;
      // Make sure the song exists first
      const song = await Song.findOne({
        where: { id: id },
      });
      if (!song) {
        throw {
          statusCode: 404,
          message: `Unable to find a song with the id: '${id}'`,
        };
      }
      const body = req.body;
      const title = body.title;
      const artist = body.artist;
      const type = body.type;
      const max_bpm = body.max_bpm;
      const min_bpm = body.min_bpm;
      // Copy only the properties that can exist on a song
      const newProperties = {};
      if (title) newProperties.title = title;
      if (artist) newProperties.artist = artist;
      if (type) newProperties.type = type;
      if (max_bpm) newProperties.max_bpm = max_bpm;
      if (min_bpm) newProperties.min_bpm = min_bpm;
      const updatedSong = await Song.update(newProperties, {
        where: { id: id },
        returning: true,
      });
      // Nice hacky way of accessing the data that I want
      res.locals.updatedSong = updatedSong[1][0];
      return next();
    } catch (err) {
      err.log = 'An error occured in songsController.modifySongById';
      return next(err);
    }
  },
  deleteSongById: async function (req, res, next) {
    try {
      const id = req.params.id;
      // Check if the song exists
      const song = await Song.findOne({
        where: { id: id },
      });
      if (!song) {
        throw {
          statusCode: 404,
          message: `Unable to find a song with the id: '${id}'`,
        };
      }
      console.log(1);
      //Get all of the song's charts
      const charts = await Chart.findAll({
        where: { song_id: song.id },
      });
      await Promise.all(
        charts.map((chart) => {
          //Create a new chart here
          const style = chart.style;
          const rating = chart.rating;
          const max_combo = chart.max_combo;
          return Score.destroy({
            where: {chart_id: chart.id}
          });
        })
      );





      //Delete all of the song's charts here
      await Chart.destroy({ where: { song_id: song.id } });
      console.log(2);





      
      // Delete the song
      await Song.destroy({
        where: { id: id },
      });
      console.log(3);

      res.locals.deletedSong = song;
      return next();
    } catch (err) {
      err.log = 'An error occured in songsController.deleteSongById';
      return next(err);
    }
  },
  // Gets song_id from the request body and throws an error if it doesn't exist
  checkIfChartExists: async function (req, res, next) {
    try {
      const id = req.body.song_id;
      if (!id) {
        throw {
          statusCode: 400,
          message: 'Missing song_id from the request body',
        };
      }
      const song = await Song.findOne({
        where: { id: id },
      });
      if (!song) {
        throw {
          statusCode: 400,
          message: `Unable to find song with the id: ${id}`,
        };
      }
      return next();
    } catch (err) {
      err.log = 'Error in get songsController.checkIfSongExists';
      return next(err);
    }
  },
};
module.exports = songsController;
