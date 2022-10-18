const { Router } = require('express');
const router = Router();

const authLogin = require('../controllers/User/authLogin');
const authRegister = require('../controllers/User/authRegister');
const forgotPassword = require('../controllers/User/forgotPassword');

const getProduct = require('../controllers/getProduct');
const putProduct = require('../controllers/putProduct');
const productId = require('../controllers/productId');
const getFilterPrice = require('../controllers/getFilterPrice');
const getFilterType = require('../controllers/getFilterType');
const getFilterSize = require('../controllers/getFilterSize');
const getFilterEquipement = require('../controllers/getFilterEquipment');

const postProduct = require('./postProduct');
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
router.use('/getCategories', getCategories);
router.use('/postAdmin', postAdmin);


// login , register Y recuperePaaswword users

router.use('/user/login', authLogin);
router.use('/user/register', authRegister);
router.use('/user/forgotPassword', forgotPassword);

module.exports = router;
