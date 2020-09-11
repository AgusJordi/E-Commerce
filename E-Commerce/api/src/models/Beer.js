
const { DataTypes, Sequelize } = require('sequelize');
const { Style: Style } = require("../db.js");

module.exports = (sequelize) => {
  sequelize.define('beer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) { this.setDataValue('name', value.toLowerCase()); },
    }, price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0.1 },
    }, stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    }, description: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) { this.setDataValue('description', value.toLowerCase()); }
    }, image: {
      type: DataTypes.TEXT,
      defaultValue: "https://www.billsbeercans.com/~billsbee/canstore/images/IMG_2947.JPG"
    }, IBU: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    }, ABV: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { min: 0 },
    }, container: {
      type: DataTypes.ENUM('chop','growler','lata','botella','barril'),
      allowNull: false
    }, capacity: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
