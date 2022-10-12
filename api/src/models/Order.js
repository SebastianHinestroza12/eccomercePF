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
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sent_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      delivered_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
