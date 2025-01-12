const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,  
    defaultValue: DataTypes.UUIDV4,  
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,         
  },
  email: {
    type: DataTypes.STRING,
    unique: true,             
    allowNull: false,        
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,       
  },
});

module.exports = User;
