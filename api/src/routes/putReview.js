const router = require("express").Router();
const { Review } = require('../db');

router.put('/', async (req, res) => {
  const { id } = req.body;
  const { stars, comment, visible } = req.body;

  try {
    if (stars || comment || visible) {

      await Review.update({ stars, comment, visible }, {
        where: { id: id }
      });

      return res.send("Review modificada correctamente")
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json('No se selecciono ninguna propiedad a modificar');
  }
})

module.exports = router;