const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      size_stock: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
    },
    {
      timestamps: false,
    }
  );
};

