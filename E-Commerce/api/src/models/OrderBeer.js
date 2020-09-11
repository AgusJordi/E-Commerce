const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orderBeer', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    });
};