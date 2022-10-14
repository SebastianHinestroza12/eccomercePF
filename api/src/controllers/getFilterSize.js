const router = require("express").Router();
const { Product } = require('../db')
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  let { size } = req.query;

  if(size){
    const filterSize = await Product.findAll({
      where: {
        size: {
          [Op.iLike]: size
        }
      }
    }) 

    res.status(200).json(filterSize)
  }
});

module.exports = router;

