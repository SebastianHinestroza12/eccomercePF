const router = require('express').Router();
const jsonProducts = require('../JSON/JsonProducts');
//const { Category } = require('../../db.js');

const product = () => {
    const data = jsonProducts.map(data => data);
    return data;
  };

router.get("/", async (req, res) => {
  const products = product();

  res.json(products);
});

module.exports = router;