const { Router } = require('express');
const router = Router();
const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');
const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');
const getFilterType = require('../controllers/getFilterType');
const getFilterSize = require('../controllers/getFilterSize');
const getFilterEquipement = require('../controllers/getFilterEquipment');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', getProduct);
router.use('/product', putProduct);

router.use('/filterType', getFilterType);
router.use('/filterSize', getFilterSize);
router.use('/filterEquipement', getFilterEquipement);

router.use('/postProduct', postProduct);
router.use('/postAdmin', postAdmin);

module.exports = router;
