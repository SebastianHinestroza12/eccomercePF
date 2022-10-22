const router = require("express").Router();
const { Product } = require('../db');


router.put('/', async (req, res) => {
  const { id } = req.body;
  const { name, price, detail, size_stock, image, stars, visible } = req.body;

  try {
    if (name || price || detail || image || size_stock || stars || visible) {

      await Product.update({ name, price, detail, image, size_stock, stars, visible }, {
        where: {
          id: id
        }
      }
      );
      return res.status(200).json({
        IdProduct: id,
        modificado: true,
        dataActualizada: await Product.findOne({
          where: {
            id: id
          }
        })
      });
    }
    return res.status(400).json('No se selecciono ninguna propiedad a modificar');
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;