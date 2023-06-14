const { DataTypes } = require('sequelize');
const pool = require('../db-config')

const User = pool.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true
});

module.exports = User;
