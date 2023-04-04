// Ruta: api/usuarios
const { Router }=require('express')
const { getUsuarios, crearusuario, actualizarUsuario, borrarUsuario}=require('../controllers/usuarios.controllers')
const {check}=require('express-validator')
const {validaCampos}=require('../middlewares/validar-campos')
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt')
const router = Router()

router.get('/',validarJWT,getUsuarios);

router.post('/', 
    [    
        validarADMIN_ROLE,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña en obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').isEmail(),
        validaCampos,
    ] ,crearusuario);

router.put('/:id',
[
    [   validarADMIN_ROLE_o_MismoUsuario,validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('role','El role es obligatorio').not().isEmpty(),
        validaCampos,
    ] ,actualizarUsuario
])

router.delete([validarADMIN_ROLE,'/:id',validarJWT],borrarUsuario)





module.exports=router