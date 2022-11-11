const {Router} = require('express');


const {crearEgresoFerney, getEgresosFerney, actualizarEgresoFerney, eliminarEgresoFerney } = require('../controllers/egresoFerneyControler')

const router = Router()

router.post('/new', crearEgresoFerney)

router.get('/', getEgresosFerney)

router.put('/:id', actualizarEgresoFerney )

router.delete('/:id', eliminarEgresoFerney)



module.exports = router;