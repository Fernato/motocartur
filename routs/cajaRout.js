const {Router} = require('express');




const {getCaja} = require('../controllers/cajaController')

const router = Router()

router.get('/', getCaja)



module.exports = router;