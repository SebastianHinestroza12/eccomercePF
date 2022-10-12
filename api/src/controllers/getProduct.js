const jsonProducts = require('../JSON/JsonProducts');

const product = () => {
  const data = jsonProducts
  let response = data.map(el => {
    return ({
      id: el.id,
      name: el.nombre,
      price: el.precio,
      detail: el.detalle,
      size: el.talla,
      image: el.imagen,
      stock: el.stock,
      qualificacion: el.calificación,
      visible: el.visible
    })
  })
  return response;
};

// Devuelve una lista de productos, o todos los producto que en su name contengan  el input ingresado por el cliente

const getAllProducts = async (req, res) => {
  const { name } = req.query;
  const products = product();

  try {
    if (name) {
      const filterName = products.filter(el => el.name.toLowerCase().trim().includes(name.toLowerCase().trim()));
      if (filterName.length > 0) return res.status(200).json(filterName);
      else return res.status(404).json(`No tenemos este producto disponible`);
    }
    return res.status(200).json(products)
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllProducts