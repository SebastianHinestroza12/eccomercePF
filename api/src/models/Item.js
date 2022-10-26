const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define("item", 
  {
    size: {
      type: DataTypes.STRING,
    },
    units: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    productId: {
        type: DataTypes.STRING,
    }
  }, 
  {timestamps: false}
);