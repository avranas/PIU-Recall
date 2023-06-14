const { DataTypes } = require('sequelize');
const pool = require('../db-config')

const Song = pool.define('Song', {
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  type: DataTypes.STRING,
  max_bpm: DataTypes.FLOAT,
  min_bpm: DataTypes.FLOAT,
}, {
  underscored: true,
});

module.exports = Song;
