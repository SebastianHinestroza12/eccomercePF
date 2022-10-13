const { Router } = require('express');
const router = Router();
const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');
const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');

const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', getProduct);
router.use('/product', putProduct);

router.use('/postProduct', postProduct);
router.use('/postAdmin', postAdmin);

module.exports = router;
