const { Sequelize } = require('sequelize');
const Pool = require('sequelize-pool').Pool;

const pool = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

module.exports = pool;