const jsonProducts = require("../JSON/JsonProducts");
const router = require("express").Router();
const { Product } = require("../db");
const { Op } = require("sequelize");

/* Una ruta que devuelve una lista de productos, o todos los productos que en su nombre contienen la
entrada ingresada por el cliente, ademas guarda los productos en la tabla Product. */

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filterName = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      if (filterName.length > 0) return res.status(200).json(filterName);
      else
        return res.status(404).json({
          error: "no tenemos este producto disponible",
          message:
            "verifique si tiene la base de datos llena, haga la peticion a la ruta get  /product",
        });
    }

    const product = {};
    const productSet = jsonProducts.filter((e) => {
      return product[e.name] ? false : (product[e.name] = true);
    });

    productSet.forEach((el) => {
      Product.findOrCreate({
        where: {
          name: el.name,
          price: el.price,
          detail: el.detail,
          size: el.size,
          image: el.image,
          stock: el.stock,
          stars: el.stars,
          visible: el.visible,
        },
      });
    });

    const consult = await Product.findAll();
    // console.log(consult.length);
    return res.status(200).json(consult);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
