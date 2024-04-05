const { Cart, Item } = require('../../db');
const router = require("express").Router();

router.get('/', async (req, res, next) => {

    try {
      let userCart = await Cart.findAll({
        where:{
          status: 'Active'
        },
        include: {
          model: Item,
          attributes: [
            'productId',
            'name',
            'size',
            'units',
            'price',
            'subtotal',
            'image'
          ],
        }
      });
      if (userCart) res.status(200).json(userCart);
      else res.status(400).send('No user was found with that ID');
    } catch (err) {
      next(err);
    }
});

module.exports = router;