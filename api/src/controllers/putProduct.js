const router = require("express").Router();
const { Product, Category } = require('../db');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.put('/', async (req, res) => {
  const { id } = req.body;
  const { name, price, detail, size_stock, image, stars, visible, category } = req.body;

  try {
    if (name || price || detail || image || size_stock || stars || visible || category) {

      await Product.update({ name, price, detail, image, size_stock, stars, visible }, {
        where: {
          id: id
        }
      }
      );

      let producto = await Product.findOne({
        where: { id: id }, include: { all: true },
      })

      const matchingCategorys = await Category.findOne({
        where: {
          name: {
            [Op.eq]: category,
          },
        },
      });

      await producto.setCategories(matchingCategorys);

      return res.status(200).json({
        IdProduct: id,
        modificado: true,
        dataActualizada: await Product.findOne({
          where: {
            id: id
          },
          include: { all: true }
        })
      });
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json('No se selecciono ninguna propiedad a modificar');
  }
})

module.exports = router;