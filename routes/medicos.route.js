// Hospitales
// /api/medicos
const { Router }=require('express')
const {check}=require('express-validator')
const {validaCampos}=require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()
const {
getMedicos,
crearMedico,
borrarMedico,
actualizarMedico,
getMedicosById} = require('../controllers/medicos.controller')



router.get('/',getMedicos,validarJWT);

router.post('/', 
    [
        validarJWT,
        check('nombre','El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital','El hospitalID debe de ser valido').isMongoId(),
        validaCampos
    ] ,crearMedico);

router.put('/:id',
[
    [   validarJWT,
        check('nombre','El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital','El hospitalID debe de ser valido').isMongoId(),
        validaCampos] ,actualizarMedico
])

router.delete('/:id',borrarMedico,validarJWT)
router.get('/:id',getMedicosById,validarJWT)

module.exports=router;