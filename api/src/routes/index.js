const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const postProduct = require('./postProduct');
const postAdmin = require('./postAdmin');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/postProduct', postProduct);
router.use('/postAdmin', postAdmin);

module.exports = router;
