const {Router} = require('express');


const { getFacturas, getFactura, crearFactura, eliminarFactura, actualizarFactura, getFacturasTotal } = require('../controllers/facturaControler')

const router = Router()

router.get('/', getFacturas)

router.get('/facturatotal', getFacturasTotal)

router.get('/:id', getFactura)

router.post('/new', crearFactura)

router.delete('/:id', eliminarFactura)

router.put('/:id', actualizarFactura)




module.exports = router;