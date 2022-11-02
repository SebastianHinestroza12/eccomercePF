const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
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

