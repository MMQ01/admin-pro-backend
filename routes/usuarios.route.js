// Ruta: api/usuarios
const { Router }=require('express')
const { getUsuarios, crearusuario}=require('../controllers/usuarios.controllers')
const {check}=require('express-validator')
const {validaCampos}=require('../middlewares/validar-campos')
const router = Router()

router.get('/',getUsuarios);

router.post('/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña en obligatorio').not().isEmpty(),
        check('email','El correo es obligatorio').isEmail(),
        validaCampos,
    ] 
        ,crearusuario);






module.exports=router