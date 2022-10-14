const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "size",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
