const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      detail: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      visible: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      timestamps: false,
    }
  );
};

