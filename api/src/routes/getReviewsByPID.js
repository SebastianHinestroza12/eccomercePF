const router = require("express").Router();
const { Review } = require("../db.js");

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {

    const resp = await Review.findAll({
      where: { productId: productId }
    });

    return res.json(resp);
  
  } catch (err) {
    console.log("Error en getReviewsBy.js" + err.message);
    return res.json("No se encontró reseña");
  }
});

module.exports = router;