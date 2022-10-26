const { Cart, Product } = require('../../db');
const router = require("express").Router();

router.get('/', async (req, res, next) => {

    try {
      let userCart = await Cart.findAll({
        include: {
          model: Product,
          attributes: [
            'id',
            'name',
            // 'size_stock',
            'price',
            // 'detail',
            'image',
          ],
          through: { attributes: ['units', 'size'] },
        },
      });
      if (userCart) res.status(200).json(userCart);
      else res.status(400).send('No user was found with that ID');
    } catch (err) {
      next(err);
    }
});

module.exports = router;