const { Cart, Product, Product_Cart } = require('../../db');
const router = require("express").Router();


router.post('/', async (req, res, next) => {

	let { size, units, cartId, productId, userId } = req.body; //por body envian el id del producto y el id del usuario

	try {
		let product = await Product.findOne({		//busco en la tabla productos donde el id sea igual al id que me pasan
			where: {
				id: productId,
			},
		});

		if (!product)			//si no lo encuentro devuelvo un error y se corta la ejecucion
			return res.status(400).send('No product was found with that ID');

		let cart = await Cart.findOne({  //si lo encuentro busco el carrito del usuario que me pasan por parametro (userId)
			where: {
				userId: userId,
				status: 'Active',
			},
			include: {
				model: Product,
			},
			through: { attributes: ['units', 'size'] },
		});

		const total = units * product.price;

		//declaro una variable para modificar el precio total del carrito
		let newPrice = (
			cart.totalPrice + total
		);

		let cartProduct = await Product_Cart.findOne({
			where:{
				productId: productId,
				size: size.toUpperCase()
			}
		})

		// console.log('1', cart.products)
		// console.log('2', containProduct)
		console.log('3', cartProduct)

		if (cartProduct) {
			return res.status(400).send(`${product.name} is already in the cart`)

		} else {
			

    await Product_Cart.create({
        size: size,
        units: units,
        //price: price,
        cartId: cartId,
        productId: productId
        //productx: productx
    });
		// await cart.addProduct(product); //se agrega el producto al carrito
		await cart.update({  //se actualiza el precio del carrito
			totalPrice: newPrice
		});

		// let productCart = await Product_Cart.findOne({
		// 	where:{
		// 		productId: productId
		// 	}
		// })

		// //console.log('product cart', productCart)

		// await productCart.update({ 
		// 	size: size.toUpperCase(),
		// 	units
		// });

		return res.send(`${product.name} added to cart!`);
	}
	} catch (err) {
		next(err);
	}
  

});

module.exports = router;