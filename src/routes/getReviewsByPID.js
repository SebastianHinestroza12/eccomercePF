const router = require("express").Router();
const { Review, User } = require("../db.js");

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {

    const resp = await Review.findAll({
      where: { productId: productId },
      include: { model: User }
    });

    return res.json(resp);
  
  } catch (err) {
    console.log("Error en getReviewsBy.js" + err.message);
    return res.json("No se encontró reseña");
  }
});

module.exports = router;