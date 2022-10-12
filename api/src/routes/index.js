const { Router } = require('express');
const router = Router();
const getAllProducts = require('../controllers/getProduct');

router.get('/products', getAllProducts);


module.exports = router;
