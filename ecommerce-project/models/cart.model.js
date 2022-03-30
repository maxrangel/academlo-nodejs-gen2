const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Cart };
