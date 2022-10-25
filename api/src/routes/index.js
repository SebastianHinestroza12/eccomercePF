const { Router } = require('express');
const router = Router();

const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');
const productId = require('../controllers/productId');
const getFilterPrice = require('../controllers/getFilterPrice');
const getFilterType = require('../controllers/getFilterType');
const getFilterSize = require('../controllers/getFilterSize');
const getFilterEquipement = require('../controllers/getFilterEquipment');

// login y register
const getLogin = require('../controllers/User/getLogin');
const postRegister = require('../controllers/User/postRegister');
const modifyUser = require('../controllers/User/modifyUser');

// orden del cliente
const postOrder = require('../controllers/Orders/postOrder');
const modifyStatusOrder = require('../controllers/Orders/modifyStatus');
const OrderId = require('../controllers/Orders/OrderId');



const postProduct = require('./postProduct');
const postCategory = require('./postCategory');

const postAdmin = require('./postAdmin');
const getCategories = require('./getCategories');

router.use('/product', getProduct);
router.use('/product', putProduct);
router.use('/product', productId);
router.use('/filterPrice', getFilterPrice);
router.use('/filterType', getFilterType);
router.use('/filterSize', getFilterSize);
router.use('/filterEquipement', getFilterEquipement);

router.use('/postProduct', postProduct);
router.use('/postCategory', postCategory);
router.use('/getCategories', getCategories);

router.use('/postAdmin', postAdmin);

// login , register Y recuperePaaswword users
router.use('/user/login', getLogin);
router.use('/user/register', postRegister);
router.use('/user/modify', modifyUser);

// Ordenes de usuarios
router.use('/order', modifyStatusOrder);
router.use('/order', postOrder);
router.use('/order', OrderId);

module.exports = router;
