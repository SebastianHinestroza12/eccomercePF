const router = require("express").Router();
const { Product } = require('../db');


/* Filtrado del producto por id. */

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const filterById = await Product.findOne({
      where: {
        id: id
      }
    });
    if (!filterById) return res.status(404).json({
      status: 'error',
      message: `no existe un producto con el id ${id} `
    })
    return res.status(200).json(filterById);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;