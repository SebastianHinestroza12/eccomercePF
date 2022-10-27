const router = require("express").Router();
const { Review } = require("../db.js");

router.post("/", async (req, res) => {
  try {
    let { stars, comment, userId, productId } = req.body;

    await Review.create({
      stars: stars,
      comment: comment,
      userId: userId,
      productId: productId,
    });

    res.send("Reseña añadida correctamente");
  } catch (err) {
    res.send("Error al agregar reseña/review");
    console.log("Error en postReview.js:", err.message);
  }
});

module.exports = router;
