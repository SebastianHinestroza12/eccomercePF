const { Cart, Product, Product_Cart } = require('../../db');
const router = require("express").Router();


router.put('/', async (req, res, next) => {

	let { userId } = req.query;
	try {
		let cart = await Cart.findOne({
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Product,
			},
		});
		if (!cart)
			return res.status(400).send('No cart was found with that user ID');

		await cart.update({
			totalPrice: 0,
		});

		await cart.setProducts([]);
		res.status(200).send('Cart has been emptied');
	} catch (err) {
		next(err);
	}
});

module.exports = router;