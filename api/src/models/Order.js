const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      products: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      shipping_address: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};

