const { DataTypes } = require('sequelize');
const pool = require('../db-config');
const Chart = require('./Chart');
const User = require('./User');

const Score = pool.define(
  'score',
  {
    greats: DataTypes.INTEGER,
    goods: DataTypes.INTEGER,
    bads: DataTypes.INTEGER,
    misses: DataTypes.INTEGER,
    total_score: DataTypes.INTEGER,
    stage_pass: DataTypes.BOOLEAN,
  },
  {
    underscored: true,
  }
);

Score.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
  },
});
User.hasMany(Score, {
  foreignKey: {
    name: 'user_id',
  },
});

Score.belongsTo(Chart, {
  foreignKey: {
    name: 'chart_id',
  },
});
Chart.hasMany(Score, {
  foreignKey: {
    name: 'chart_id',
  },
});

module.exports = Score;
