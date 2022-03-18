const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const ActorInMovie = sequelize.define('actorInMovie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId: { type: DataTypes.INTEGER, allowNull: false },
  movieId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = { ActorInMovie };
