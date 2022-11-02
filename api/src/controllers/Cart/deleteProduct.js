const { Cart, Product, Item, User } = require('../../db');
const router = require("express").Router();


router.delete('/', async (req, res, next) => {
	let { email, productId, size } = req.body;

	try {

		let user = await User.findOne({
			where:{
				email
			}
		})

		let userId = user.id

		let product = await Item.findOne({
			where: {
				size: size.toUpperCase(),
				productId: productId,
				cartId: userId
			},
		});
		
		//console.log('prroduc', product)
		if (!product)
			return res.status(400).send('No product was found with that ID');
4
		let cart = await Cart.findOne({
			where: {
				userId: userId,
				status: 'Active',
			},
		});

		let subtotalProduct = product.units * product.price;

		//console.log('cart', cart)
		let newPrice = (
			cart.totalPrice - subtotalProduct
		).toFixed(2);

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

      await cart.update({
        totalPrice: newPrice,
      });
			await Item.destroy({
				where:{
					size: size.toUpperCase(),
					productId: productId,
					cartId: userId
				}
			})
      return res.send(
        `Product removed from cart`
      );
			
      // return res.send(`No product ${product.name} in cart!`);
	} catch (err) {
		next(err);
	}
});

module.exports = router;