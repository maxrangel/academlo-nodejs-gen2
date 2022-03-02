const { DataTypes } = require('sequelize');

// Utils
const { sequelize } = require('../utils/database');

const Post = sequelize.define('post', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING(100),
		allowNull: false, // NOT NULL
	},
	content: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = { Post };
