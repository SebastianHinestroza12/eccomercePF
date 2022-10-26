const { Cart, Item } = require('../../db');
const router = require("express").Router();

router.get('/', async (req, res, next) => {

    let { userId } = req.query;
    try {
      let userCart = await Cart.findOne({
        where: {
          userId: userId,
          status: 'Active',
        },
        include: {
          model: Item,
        },
      });
      if (userCart) res.status(200).json(userCart);
      else res.status(400).send('No user was found with that ID');
    } catch (err) {
      next(err);
    }
});

module.exports = router;