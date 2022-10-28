const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'cart',
		{
			status:
        {
          type: DataTypes.ENUM(["Active", "Disabled"]),
          defaultValue: "Disabled",
        },
			totalPrice:
        {
          type: DataTypes.FLOAT,
          defaultValue: 0,
        }
		},
		{ timestamps: false }
	);
};