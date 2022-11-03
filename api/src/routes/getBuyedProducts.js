const router = require("express").Router();
const { Order } = require("../db.js");

router.get("/", async (req, res) => {

    const { client } = req.params;

  try {
   
        const resp = await Order.findAll({
        where: {
          client: client,
        },
      });

    return res.json(resp);
  
  } catch (err) {
    console.log("getBuyedProducts.js, ", err.message);
  }
});

module.exports = router;