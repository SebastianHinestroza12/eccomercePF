const jsonProducts = require("../JSON/JsonProducts");
const router = require("express").Router();
const { Product, Category } = require("../db");
const { Sequelize, Op } = require("sequelize");

/* Una ruta que devuelve una lista de productos, o todos los productos que en su nombre contienen la
entrada ingresada por el cliente, ademas guarda los productos en la tabla Product. */

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const filterName = await Product.findAll({
        where: Sequelize.where(
          Sequelize.fn('unaccent', Sequelize.col('name')), {
              [Op.iLike]:`%${name}%`
        }),
      });

      if (filterName.length > 0) return res.status(200).json(filterName);
      else
        return res.status(404).json({
          error: "Sin resultados",
          message:
            "verifique si tiene la base de datos llena, haga la peticion a la ruta get  /product",
        });
    }

    const product = {};
    const productSet = jsonProducts.filter((e) => {
      return product[e.name] ? false : (product[e.name] = true);
    });

    /*productSet.forEach((el) => {
      Product.findOrCreate({
        where: {
          name: el.name,
          price: el.price,
          detail: el.detail,
          size_stock: el.size_stock,
          image: el.image,
          stars: el.stars,
          visible: el.visible,
          category: el.category,
        },
      })
    });*/

    const consult1 = await Product.findAll({
      where: {
        name: productSet[0].name
      }
    });

    if(!consult1[0]){
      for (let i = 0; i < productSet.length; i++) {
  
        const matchingCategorys = await Category.findAll({
          where: {
              name: {
                  [Op.eq]: productSet[i].category,
              },
          },
        });

        let newProduct = await Product.create({
          name: productSet[i].name,
          price: productSet[i].price,
          detail: productSet[i].detail,
          size_stock: productSet[i].size_stock,
          image: productSet[i].image,
          stars: productSet[i].stars,
          visible: productSet[i].visible,
        })
        await newProduct.setCategories(matchingCategorys);
      };
    }

    const consult = await Product.findAll({ include: Category });

    return res.status(200).json(consult);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
