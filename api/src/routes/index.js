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
const getPrueba = require('../controllers/User/getPrueba');
const postRegister = require('../controllers/User/postRegister');
const modifyUser = require('../controllers/User/modifyUser');

// orden del cliente
const postOrder = require('../controllers/Orders/postOrder');
const modifyStatusOrder = require('../controllers/Orders/modifyStatus');
const OrderId = require('../controllers/Orders/OrderId');
const getOrder = require('../controllers/Orders/getOrder');
const filterStatusOrder = require('../controllers/FilterOrders/filterStatus');

const getBuyedProducts = require('./getBuyedProducts');


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

const getReviews = require('./getReviews');
const getReviewsByPID = require('./getReviewsByPID');
const postReview = require('./postReview');
const putReview = require('./putReview');
const getUsers = require('./getUsers');
const putUser = require('./putUser');


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
router.use('/user/prueba', getPrueba);
router.use('/user/register', postRegister);
router.use('/user/modify', modifyUser);
router.use('/getUsers', getUsers);

//cart
router.use('/cart', addProductToCart);
router.use('/cart', getCartByUser);
router.use('/cart/all', getAllCarts);
router.use('/cart', deleteProduct);
router.use('/clear', clearCart);
router.use('/cart/add', addUnit);
router.use('/cart/remove', removeUnit);


// Ordenes de usuarios
router.use('/order', modifyStatusOrder);
router.use('/order', postOrder);
router.use('/order', OrderId);
router.use('/order', getOrder);
router.use('/filterStatusOrder', filterStatusOrder);

router.use('/getBuyedProducts', getBuyedProducts);


//review
router.use('/postReview', postReview);
router.use('/getReviews', getReviews);
router.use('/getReviews', getReviewsByPID);
router.use('/putReview', putReview)

router.use('/putUser', putUser)

module.exports = router;
