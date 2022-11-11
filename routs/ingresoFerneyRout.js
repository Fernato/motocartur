const {Router} = require('express');


const {crearIngresoFerney, getIngresosFerney, eliminarIngresoFerney, actualizarIngresoFerney } = require('../controllers/ingresoFerneyController')

const router = Router()

router.post('/new', crearIngresoFerney)

router.get('/', getIngresosFerney )

router.put('/:id', actualizarIngresoFerney )

router.delete('/:id', eliminarIngresoFerney)



module.exports = router;