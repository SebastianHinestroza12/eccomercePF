const router = require("express").Router();
const { Cart, Product, User, Product_Cart, Item } = require("../../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
  try {
    let { size, units, productId, userId } = req.body;

		let product = await Item.findOne({
      where:{
				size: size.toUpperCase(),
        productId: productId,
				cartId: userId,
      }
    })

		let infProduct = await Product.findOne({
			where: {
				id: productId
			}
		})

		let priceProduct = infProduct.price;
		let imgProduct = infProduct.image;
		let nameProduct = infProduct.name;
		let stockProduct = infProduct.size_stock.find(el => el.size = size);

		let cart = await Cart.findOne({  
			where: {
				userId: userId,
			},
			include: {
				model: Item,
			},
		});
//
		let total = units * priceProduct;

		let newPrice = (
			cart.totalPrice + total
		);

		if(product)
		return res.status(400).send(`Product is already in the cart`)

		if(stockProduct.stock > units){
		
			let newItem = await Item.create({
					name: nameProduct,
					size: size.toUpperCase(),
					units: units,
					price: priceProduct,
					subtotal: total,
					image: imgProduct,
					cartId: userId,	
					productId: productId
			});

			await cart.update({ 
				totalPrice: newPrice,
				status: 'Active'
			});
			return res.send(newItem)
		}
		return res.status(400).send('The quantity cannot exceed the available stock')

  } catch (err) {
    res.status(400).send("Error al agregar producto al carrito");
    console.log("Error", err.message);
  }
});

module.exports = router;