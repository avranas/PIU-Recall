const { DataTypes } = require('sequelize');
const pool = require('../db-config');
const Song = require('./Song');

const Chart = pool.define(
  'chart',
  {
    style: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    max_combo: DataTypes.INTEGER,
  },
  {
    underscored: true,
  }
);

Chart.belongsTo(Song, {
  foreignKey: {
    name: 'song_id',
  },
});
// I tried commenting this out, but songsController.getSongById broke
Song.hasMany(Chart, {
  foreignKey: {
    name: 'song_id',
  },
});

module.exports = Chart;
