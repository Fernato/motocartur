const {Router} = require('express');



const { login, crearUsuario, revalidadToken } = require('../controllers/usuarioController');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()


router.post('/login', login)

router.post('/new', crearUsuario)

router.get('/renew', validarJWT, revalidadToken);



module.exports = router;