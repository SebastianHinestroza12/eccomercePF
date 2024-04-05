const router = require("express").Router();
const { Product } = require('../db')
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  let { size } = req.query;

  if(size){
    const filterSize = await Product.findAll({});
    let filtrado = [];
    
    for (let i = 0; i < filterSize.length; i++) {
      for (let j = 0; j < filterSize[i].size_stock.length; j++) {

        if (filterSize[i].size_stock[j].size === size) filtrado.push(filterSize[i]);

      }
    }
    res.status(200).json(filtrado)
  }
});

module.exports = router;