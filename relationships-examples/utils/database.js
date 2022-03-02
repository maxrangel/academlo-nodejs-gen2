const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	host: 'localhost',
	username: 'postgres',
	password: 'password',
	database: 'relations-example',
	dialect: 'postgres',
});

module.exports = { sequelize };
