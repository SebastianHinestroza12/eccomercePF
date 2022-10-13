const { Router } = require('express');
const router = Router();

const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');

const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');

router.use('/product', getProduct);
router.use('/product', putProduct);

router.use('/postProduct', postProduct);
router.use('/postAdmin', postAdmin);

module.exports = router;
