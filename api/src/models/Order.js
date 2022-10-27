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
      client: {
        type: DataTypes.STRING,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.STRING(5000)),
        allowNull: false
      },
      total_purchase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );
};

