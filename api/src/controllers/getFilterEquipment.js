const router = require("express").Router();
const { Product } = require('../db')
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  let { equipement } = req.query;

  if(equipement){
    const filterEquipement = await Product.findAll({
      where: {
        name: {
          [Op.substring]: equipement.toUpperCase()
        }
      }
    })

    res.status(200).json(filterEquipement)
  }
});

module.exports = router;


