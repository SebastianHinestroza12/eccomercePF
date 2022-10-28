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

		console.log(product)

		let infProduct = await Product.findOne({
			where: {
				id: productId
			}
		})

		console.log(infProduct)

		let stockProduct = infProduct.size_stock.find(el => el.size = size);
		
    let newPrice = cart.totalPrice + product.price;
    let newUnits = product.units + 1;

		console.log(stockProduct)

		if(stockProduct.stock > product.units){
			
			await cart.update({
				totalPrice: newPrice,
			});

			await product.update({
				units: newUnits,
			});
			
			return res.send(product);
		}

		return res.status(400).send('The quantity cannot exceed the available stock')

	} catch (err) {
		next(err);
	}
});

module.exports = router;