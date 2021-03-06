const {Router} = require('express');



const { getSocios, getSocio, crearSocio, actualizarSocio, eliminarSocio } = require('../controllers/socioController');
const router = Router()

router.get('/', getSocios)

router.get('/:id', getSocio)

router.post('/new', crearSocio)

router.delete('/:id', eliminarSocio)

router.put('/:id', actualizarSocio)

module.exports = router;