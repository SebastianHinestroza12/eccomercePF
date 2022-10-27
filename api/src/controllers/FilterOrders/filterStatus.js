const router = require("express").Router();
const { Order } = require('../../db');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
  const { status } = req.body;
  try {
    const filter = await Order.findAll({
      where: {
        status: {
          [Op.iLike]: status
        }
      }
    })

    if (!status) {
      return res.status(404).json({
        filtro: 'fallo',
        message: 'El estado es obligatorio para el filtro'
      })
    }
    else if (filter.length < 1) {
      return res.status(404).json({
        message: 'No se han hecho compras por el momento.'
      })
    }
    else return res.status(200).json(filter)
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;