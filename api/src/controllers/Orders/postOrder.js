const router = require("express").Router();
const { Order } = require("../../db");
const transporter = require('../../config/nodemailer');
const messageOrder = require('../../templates/messageOrder');

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


      transporter.sendMail({
        from: '"QatarEshop🏪" <qatareshop08@gmail.com>',
        to: client,
        subject: "Clientes como tú hacen la diferencia. Es un placer servirte",
        html: messageOrder(newOrder.id, newOrder.createdAt, newOrder.products.map(data => data), newOrder.total_purchase)
      });

      return res.status(201).json({
        creado: true,
        message: 'Numero de orden creada correctamente',
        datosOrden: newOrder
      })
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
