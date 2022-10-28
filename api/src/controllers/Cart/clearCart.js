const { Cart, Product, Item } = require('../../db');
const router = require("express").Router();


router.delete('/', async (req, res, next) => {

	let { userId } = req.body;

	let cart = await Cart.findOne({
		where: {
			userId: userId,
			status: 'Active',
		},
	});
	try {
		
		await cart.update({
			totalPrice: 0,
		});

		await Item.destroy({
			where:{
				cartId: userId
			}
		})
		return res.send('Cart has been emptied');
	} catch (err) {
		next(err);
	}
});

module.exports = router;