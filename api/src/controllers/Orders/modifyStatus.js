const router = require("express").Router();
const { Order } = require('../../db');

router.put('/', async (req, res) => {
  const { id, status } = req.body;

  const NumberOrder = await Order.findOne({
    where: {
      id
    }
  });

  try {
    if (!id || !status) {
      return res.status(304).json({
        modificado: false,
        message: 'proporcione informacion valida para la modificacion'
      })
    }
    else if (!NumberOrder) {
      return res.status(404).json({
        exiteOrden: false,
        message: `No existe un numero de  orden con el id ${id}`
      })
    }
    else {
      await Order.update({ status }, {
        where: {
          id
        }
      });
      return res.status(200).json({
        modificado: true,
        message: `El estado de la compra es ${status}`
      })
    }
  } catch (error) {
    console.log(error.message)
  }
})


module.exports = router;