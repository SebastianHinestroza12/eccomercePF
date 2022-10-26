const { Cart, Product, Product_Cart } = require('../../db');
const router = require("express").Router();


router.put('/', async (req, res, next) => {

	let { userId, productId, size } = req.body;
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

    let product = await Product.findOne({
      where:{
        id: productId
      }
    })

		let productCart = await Product_Cart.findOne({
			where:{
				productId,
        size: size.toUpperCase()
			}
		})
    
    let newPrice = cart.totalPrice - product.price
    let newUnits = productCart.units - 1;

    await cart.update({
			totalPrice: newPrice,
		});
    
    await productCart.update({ 
			units: newUnits
		});

    return res.send(`${product.name} remove`);

	} catch (err) {
		next(err);
	}
});

module.exports = router;