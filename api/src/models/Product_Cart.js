const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define("Product_Cart", 
  {
    size: {
      type: DataTypes.STRING,
      defaultValue: " "
    },
    units: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, 
  {timestamps: false}
)