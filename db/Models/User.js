const { DataTypes } = require('sequelize');
const pool = require('../db-config')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = pool.define('user', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  hooks: {
    beforeValidate: async function(user, options) {
      //Use bcrypt to hash the password
      const hash = await bcrypt.hash(user.password, saltRounds);
      user.password = hash;
    },
  }
});

module.exports = User;
