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
const getOrder = require('../controllers/Orders/getOrder');
const filterStatusOrder = require('../controllers/FilterOrders/filterStatus');



const postProduct = require('./postProduct');
const postCategory = require('./postCategory');

const postAdmin = require('./postAdmin');
const getCategories = require('./getCategories');

const addProductToCart = require('../controllers/Cart/addProductToCart');
const getCartByUser = require('../controllers/Cart/getCarByUser');
const getAllCarts = require('../controllers/Cart/getAllCarts');
const clearCart = require('../controllers/Cart/clearCart');
const deleteProduct = require('../controllers/Cart/deleteProduct');
const addUnit = require('../controllers/Cart/addUnit');
const removeUnit = require('../controllers/Cart/removeUnit');

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

//cart
router.use('/cart', addProductToCart);
router.use('/cart', getCartByUser);
router.use('/cart/all', getAllCarts);
router.use('/', deleteProduct);
router.use('/clear', clearCart);
router.use('/cart/add', addUnit);
router.use('/cart/remove', removeUnit);


// Ordenes de usuarios
router.use('/order', modifyStatusOrder);
router.use('/order', postOrder);
router.use('/order', OrderId);
router.use('/order', getOrder);
router.use('/filterStatusOrder', filterStatusOrder);


module.exports = router;
