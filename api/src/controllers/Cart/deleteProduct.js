const { Cart, Product, Product_Cart } = require('../../db');
const router = require("express").Router();


router.put('/', async (req, res, next) => {
	let { userId, productId } = req.query;

	try {
		let product = await Product.findOne({
			where: {
				id: productId,
			},
		});

		if (!product)
			return res.status(400).send('No product was found with that ID');

		let cart = await Cart.findOne({
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Product,
			},
		});

		let newPrice = (
			cart.totalPrice - product.price
		).toFixed(2);

		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

    if (await cart.removeProduct(product)) {
      await cart.update({
        totalPrice: newPrice,
      });
      return res.send(
        `Product ${product.name} removed from cart`
      );
    } else
      return res.send(`No product ${product.name} in cart!`);
	} catch (err) {
		next(err);
	}
});

module.exports = router;