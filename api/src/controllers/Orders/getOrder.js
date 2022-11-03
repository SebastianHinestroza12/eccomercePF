const router = require("express").Router();
const { Order } = require('../../db');


router.get('/', async (req, res) => {
  const allOder = await Order.findAll({include: {all: true}});

  try {
    if (allOder.length > 0) {
      return res.status(200).json(allOder);
    }
    else {
      return res.status(404).json({
        message: 'No hay compras en estos momentos'
      })
    }
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;