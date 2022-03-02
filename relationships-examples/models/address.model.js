const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Address = sequelize.define('address', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
	},
	street: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	state: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	zipCode: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = { Address };
