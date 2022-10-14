const router = require("express").Router();
const { Product } = require('../db')
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  const { budGet } = req.query;

  try {
    /* Una consulta a la base de datos, Pedir los productos mas economicos precio  menor a $1000 */
    const lowPrice = await Product.findAll({
      where: {
        price: {
          [Op.lte]: 1000,
        }
      }
    });

    /* Una consulta a la base de datos, Pedir los productos mas de mediano precio precio, que este entre $1000 & $3000 */
    const mediumPrice = await Product.findAll({
      where: {
        price: {
          [Op.and]: {
            [Op.gt]: 1000,
            [Op.lte]: 3000,
          }
        }
      }
    });

    /* Una consulta a la base de datos, Pedir los productos de mayor precio, que esten por encima de  $3000 */
    const highPrice = await Product.findAll({
      where: {
        price: {
          [Op.gt]: 3000,
        }
      }
    });

    if (!budGet) return res.status(404).json({
      status: 'error',
      message: 'No selecciono ningun rango de precio a filtrar'
    })
    else {
      if (!isNaN(budGet)) return res.status(400).json({
        error: 'esta ingresando un valor numerico',
        message: 'puede filtrar por la siguientes data: low, medium, high'
      })

      else if (budGet.toLowerCase().trim() === 'low') return res.status(200).json(lowPrice);
      else if (budGet.toLowerCase().trim() === 'medium') return res.status(200).json(mediumPrice);
      else return res.status(200).json(highPrice);
    }
  } catch (error) {
    console.log({
      error: 'error en la consulta',
      error
    })
  }
});

module.exports = router;