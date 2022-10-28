const { Cart, Product, Item, User } = require('../../db');
const router = require("express").Router();


router.put('/', async (req, res, next) => {

	let { email, productId, size } = req.body;
	try {

		let user = await User.findOne({
			where:{
				email
			}
		})

		let userId = user.id

		let cart = await Cart.findOne({
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Item,
			},
		});

    let product = await Item.findOne({
      where:{
				size: size.toUpperCase(),
        productId: productId,
				cartId: userId
      }
    })

		let infProduct = await Product.findOne({
			where: {
				id: productId
			}
		})
		
		let newPrice = cart.totalPrice - product.price;
    let newUnits = product.units - 1;

		if(product.units > 1){
    
			await cart.update({
				totalPrice: newPrice,
			});

			await product.update({
				units: newUnits,
			});

			return res.send(product)
		}
    return res.status(400).send('Quantity cannot be less than 1');

	} catch (err) {
		next(err);
	}
});

module.exports = router;