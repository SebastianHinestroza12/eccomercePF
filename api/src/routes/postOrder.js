const router = require("express").Router();
const { Order, Product } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
  try {
    let { total, shipping_address, postal_code, state, sent_date, delivered_date, products } = req.body;

    let newOrder = await Order.create({
      total: total,
      shipping_address: shipping_address,
      postal_code: postal_code,
      state: state,
      sent_date: sent_date,
      delivered_date: delivered_date,
    });

    const matchingProducts = await Product.findAll({
      where: {
        name: {
          [Op.in]: products,
        },
      },
    });

    await newOrder.setProducts(matchingProducts);

    res.send("Pedido creado correctamente");
  } catch (err) {
    res.send("Error al agregar pedidos");
    console.log("Error en postOrder.js:", err.message);
  }
});

module.exports = router;
