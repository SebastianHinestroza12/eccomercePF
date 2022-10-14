const jsonProducts = require('../JSON/JsonProducts');
const router = require("express").Router();
const { Product, Category } = require('../db')

// Se Mapea La Informacion Del Json

const product = () => {
  const data = jsonProducts.map(data => data);
  return data;
};

/* Una ruta que devuelve una lista de productos, o todos los productos que en su nombre contienen la
entrada ingresada por el cliente, ademas guarda los productos en la tabla Product. */

router.get('/', async (req, res) => {
  const { name } = req.query;
  const products = product();

  try {
    if (name) {

      const filterName = products.filter(el => el.name.toLowerCase().trim().includes(name.toLowerCase().trim()));

      if (filterName.length > 0) return res.status(200).json(filterName);
      else return res.status(404).json(`No tenemos este producto disponible`);
    }
    products.forEach(el => {
      Product.findOrCreate({
        where: {
          name: el.name,
          price: el.price,
          detail: el.detail,
          size: el.size,
          image: el.image,
          stock: el.stock,
          stars: el.stars,
          visible: el.visible
        }
      })
    })

    const consult = await Product.findAll(  {include: Category}  );
    
    return res.status(200).json(consult);
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;