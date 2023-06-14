const { DataTypes } = require('sequelize');
const pool = require('../db-config');
const Song = require("./Song");

const Chart = pool.define('Chart', {
  style: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  max_combo: DataTypes.INTEGER,
  song_id: DataTypes.INTEGER
}, {
  underscored: true,
});

Chart.belongsTo(Song);
Song.hasMany(Chart);

module.exports = Chart;
