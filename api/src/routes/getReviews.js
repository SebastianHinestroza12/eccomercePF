const router = require("express").Router();
const { Review } = require("../db.js");

router.get("/", async (req, res) => {

  try {

    const resp = await Review.findAll();

    return res.json(resp);
  
  } catch (err) {
    console.log("Error en getReviews.js" + err.message);
    return res.json("Error en getReviews.js");
  }
});

module.exports = router;