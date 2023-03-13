// Hospitales
// /api/hospitales
const { Router }=require('express')
const {check}=require('express-validator')
const {validaCampos}=require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
const {
getHospitales,
crearHospital,
borrarHospital,
actualizarHospital} = require('../controllers/hospitales.controller')



router.get('/',getHospitales);

router.post('/', 
    [
        validarJWT,
        check('nombre','Nombre del hospital obligatorio').not().isEmpty(),
        validaCampos
    ] ,crearHospital);

router.put('/:id',
[
    [
        validarJWT,
        check('nombre','Nombre del hospital obligatorio').not().isEmpty(),
        validaCampos
    ] ,actualizarHospital
])

router.delete('/:id',validarJWT,borrarHospital)

module.exports=router;