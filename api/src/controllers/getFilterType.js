const router = require("express").Router();
const { Product } = require('../db')
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  let { type } = req.query;

  if(type){ 
    const filterType = await Product.findAll({
      where: {
        name: {
          [Op.substring]: type.toUpperCase()
        }
      }
    })

    res.status(200).json(filterType)
  }
});

module.exports = router;