const router = require("express").Router();
const { Cart, Product, User, Product_Cart, Item } = require("../../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
  try {
    let { size, units, price, cartId, productId, userId } = req.body;

		let product = await Item.findOne({
      where:{
				size: size.toUpperCase(),
        productId: productId
				
      }
    })

		let cart = await Cart.findOne({  
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Item,
			},
		});

		let total = units * price;

		let newPrice = (
			cart.totalPrice + total
		);

		if(product)
		return res.status(400).send(`Product is already in the cart`)
		
    let newItem = await Item.create({
        size: size.toUpperCase(),
        units: units,
        price: price,
        cartId: cartId,	
        productId: productId
    });

		await cart.update({ 
			totalPrice: newPrice
		});
		return res.send(newItem)
  } catch (err) {
    res.status(400).send("Error al agregar producto al carrito");
    console.log("Error", err.message);
  }
});

module.exports = router;