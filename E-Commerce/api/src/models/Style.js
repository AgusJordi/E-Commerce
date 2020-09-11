const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('style', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) { this.setDataValue('name', value.toLowerCase()); }
      // validate: { isAlphanumeric: true }

    }, description: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) { this.setDataValue('description', value.toLowerCase()); }
    }
  });
};