const { Sequelize } = require('sequelize');

const gameDB = new Sequelize('hidden_symphony_db', 'root', 'blacksheep', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});
module.exports = gameDB;