const router = require("express").Router();
const { Order } = require('../../db');

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    if (!id) return res.status(404).json({
      reponse: null,
      message: 'Error, no ingreso el id de la orden a buscar'
    })

    const orderId = await Order.findOne({
      where: {
        id: id.trim()
      }
    });

    if (!orderId) {
      return res.status(404).json({
        response: 'fallo',
        message: `No se encontro una orden con id ${id}`
      })
    }
    return res.status(200).json(orderId)
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;