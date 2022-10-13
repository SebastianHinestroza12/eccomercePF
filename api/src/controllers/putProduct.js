const router = require("express").Router();
const { Product } = require('../db');


router.put('/', async (req, res) => {
  const { productId } = req.body;
  const { name, price, detail, size, image, stock, stars, visible } = req.body;

  try {
    if (name || price || detail || size || image || stock || stars || visible) {

      await Product.update({ name, price, detail, size, image, stock, stars, visible }, {
        where: {
          id: productId
        }
      }
      );
      return res.status(200).json({
        IdProduct: productId,
        modificado: true,
        dataActualizada: await Product.findOne({
          where: {
            id: productId
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