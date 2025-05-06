const { Sequelize } = require('sequelize');

module.exports = new Sequelize('hidden_symphony_db', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});