// Ruta: api/usuarios
const { Router }=require('express')
const { getUsuarios, crearusuario, actualizarUsuario, borrarUsuario}=require('../controllers/usuarios.controllers')
const {check}=require('express-validator')
const {validaCampos}=require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/',validarJWT,getUsuarios);

router.post('/', 
    [    
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña en obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').isEmail(),
        validaCampos,
    ] ,crearusuario);

router.put('/:id',
[
    [   validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('role','El role es obligatorio').not().isEmpty(),
        validaCampos,
    ] ,actualizarUsuario
])

router.delete('/:id',validarJWT,borrarUsuario)





module.exports=router