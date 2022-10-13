const { Router } = require('express');
const router = Router();

const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');

const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');

const getCategories = require('./getCategories');

router.use('/product', getProduct);
router.use('/product', putProduct);

router.use('/postProduct', postProduct);
router.use('/getCategories', getCategories);

//
router.use('/postAdmin', postAdmin);

module.exports = router;
