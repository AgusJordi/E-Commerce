const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) { this.setDataValue('comment', value.toLowerCase()); }
        }, rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0, max:5 },
        }
    });
};