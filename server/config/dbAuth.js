const { Sequelize } = require('sequelize');

const authDB = new Sequelize('fatal_query', 'root', 'blacksheep', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
});

module.exports = authDB;
