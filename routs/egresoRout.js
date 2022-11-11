const {Router} = require('express');


const {crearEgreso, getEgresos, actualizarEgreso, eliminarEgreso } = require('../controllers/egresoControler')

const router = Router()

router.post('/new', crearEgreso)

router.get('/', getEgresos)

router.put('/:id', actualizarEgreso )

router.delete('/:id', eliminarEgreso)



module.exports = router;