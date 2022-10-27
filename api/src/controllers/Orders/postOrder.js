const router = require("express").Router();
const { Order } = require("../../db");

router.post("/", async (req, res) => {
  try {
    let { products, total_purchase, status, client } = req.body;

    if (!products || !total_purchase || !status) {
      return res.status(404).json({
        creado: false,
        message: `Debe proporcionar los datos necesarios para crear una nueva orden`
      })
    }
    else {
      let newOrder = await Order.create({
        products,
        total_purchase,
        status,
        client
      });

      return res.status(201).json({
        creado: true,
        message: 'Numero de orden creada correctamente',
        datosOrden: newOrder
      })
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
