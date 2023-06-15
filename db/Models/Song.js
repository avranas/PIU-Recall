const { DataTypes } = require('sequelize');
const pool = require('../db-config')

const Song = pool.define('song', {
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  type: DataTypes.STRING,
  max_bpm: DataTypes.FLOAT,
  min_bpm: DataTypes.FLOAT,
  banner_img: DataTypes.STRING
}, {
  underscored: true,
});

module.exports = Song;
