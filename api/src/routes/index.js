const { Router } = require('express');
const  dog = require('./dog.js')
const temeperament = require('./temperament.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog', dog)
router.use('/temperament', temeperament)

module.exports = router;
