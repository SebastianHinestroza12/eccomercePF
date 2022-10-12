const { Router } = require('express');
const router = Router();
const getAllProducts = require('../controllers/getProduct');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/postProduct', postProduct);
router.use('/postAdmin', postAdmin);

module.exports = router;
